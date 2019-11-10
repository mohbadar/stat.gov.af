import { Component, OnInit, Input, ElementRef, ViewChild, SimpleChanges, SimpleChange, HostListener } from '@angular/core';
import _ from 'lodash';
import d3 from 'd3';

import d3sankey from './../../lib/d3sankey';
import { QueryResult } from '../../../models/query-result';

@Component({
	selector: 'sankey-renderer',
	templateUrl: './sankey-renderer.component.html',
	styleUrls: ['./sankey-renderer.component.scss']
})
export class SankeyRendererComponent implements OnInit {
	@Input('options') options: any;
	@Input('query-result') queryResult: QueryResult;

	@ViewChild('sankeyContainer') sankeyContainer: ElementRef;
	sankeyElement;
	container;
	handleResize;

	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		
		const options: SimpleChange = changes.options;
		if (!options.isFirstChange() && changes.options) {
			this.refreshData();
		}

		const queryResult: SimpleChange = changes.queryResult;
		if (!queryResult.isFirstChange() && changes.queryResult) {
			this.refreshData();
		}
	}

	ngOnInit() {
		this.sankeyElement = this.sankeyContainer;
		this.sankeyElement = this.sankeyElement.nativeElement;
		this.container = this.sankeyElement;

		this.handleResize = _.debounce(this.refreshData, 50);
		this.refreshData();
		this.handleResize();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.handleResize();
	}

	refreshData() {
		const queryData = this.queryResult.getData();
		if (queryData) {
			// do the render logic.
			// angular.element(this.container).empty();
			this.container.innerHTML = ''
			this.createSankey(this.container, queryData);
		}
	}

	createSankey(element, data) {
		const margin = {
			top: 10, right: 10, bottom: 10, left: 10,
		};
		const width = element.offsetWidth - margin.left - margin.right;
		const height = element.offsetHeight - margin.top - margin.bottom;

		if ((width <= 0) || (height <= 0)) {
			return;
		}

		const format = d => d3.format(',.0f')(d);
		const color = d3.scale.category20();

		data = graph(data);
		data.nodes = _.map(
			data.nodes,
			d => _.extend(d, {
				color: color(d.name.replace(/ .*/, '')),
			}),
		);

		// append the svg canvas to the page
		const svg = d3.select(element).append('svg')
		.attr('class', 'sankey')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr(
			'transform',
			`translate(${margin.left},${margin.top})`,
		);

		// Set the sankey diagram properties
		const sankey = d3sankey()
		.nodeWidth(15)
		.nodePadding(10)
		.size([width, height]);

		const path = sankey.link();

		sankey.nodes(data.nodes)
		.links(data.links)
		.layout(0);

		spreadNodes(height, data);
		sankey.relayout();

		// add in the links
		const link = svg.append('g').selectAll('.link')
		.data(data.links)
		.enter()
		.append('path')
		.filter((l:any) => l.target.name !== 'Exit')
		.attr('class', 'link')
		.attr('d', path)
		.style('stroke-width', (d:any) => Math.max(1, d.dy))
		.sort((a:any, b:any) => b.dy - a.dy);

		// add the link titles
		link.append('title')
		.text((d:any) =>
		`${d.source.name} → ${d.target.name}\n${format(d.value)}`);

		const node = svg.append('g').selectAll('.node')
		.data(data.nodes)
		.enter()
		.append('g')
		.filter((n:any) => n.name !== 'Exit')
		.attr('class', 'node')
		.attr('transform', (d:any) => `translate(${d.x},${d.y})`);

		function nodeMouseOver(currentNode) {
			let nodes = getConnectedNodes(currentNode);
			nodes = _.map(nodes, i => i.id);
			node.filter((d:any) => {
				if (d === currentNode) {
					return false;
				}

				if (_.includes(nodes, d.id)) {
					return false;
				}

				return true;
			}).style('opacity', 0.2);
			link.filter(l =>
			!(_.includes(currentNode.sourceLinks, l) || _.includes(currentNode.targetLinks, l))).style('opacity', 0.2);
		}

		function nodeMouseOut() {
			node.style('opacity', 1);
			link.style('opacity', 1);
		}

		// add in the nodes
		node.on('mouseover', nodeMouseOver)
		.on('mouseout', nodeMouseOut);

		// add the rectangles for the nodes
		node.append('rect')
		.attr('height', (d:any) => d.dy)
		.attr('width', sankey.nodeWidth())
		.style('fill', (d:any) => { return d.color; })
		.style('stroke', (d:any) => { return d3.rgb(d.color).darker(2).toString(); })
		.append('title')
		.text((d:any) => `${d.name}\n${format(d.value)}`);

		// add in the title for the nodes
		node.append('text')
		.attr('x', -6)
		.attr('y', (d:any) => d.dy / 2)
		.attr('dy', '.35em')
		.attr('text-anchor', 'end')
		.attr('transform', null)
		.text((d:any) => d.name)
		.filter((d:any) => d.x < width / 2)
		.attr('x', 6 + sankey.nodeWidth())
		.attr('text-anchor', 'start');
	}

}

function getConnectedNodes(node) {
	// source link = this node is the source, I need the targets
	const nodes = [];
	node.sourceLinks.forEach((link) => { nodes.push(link.target); });
	node.targetLinks.forEach((link) => { nodes.push(link.source); });

	return nodes;
}

function graph(data) {
	const nodesDict = {};
	const links:any = {};
	const nodes = [];

	const validKey = key => key !== 'value' && key.indexOf('$$') !== 0;
	const keys = _.sortBy(_.filter(_.keys(data[0]), validKey), _.identity);

	function normalizeName(name) {
		if (name) {
		return name;
		}

		return 'Exit';
	}

	function getNode(name, level) {
		name = normalizeName(name);
		const key = `${name}:${String(level)}`;
		let node = nodesDict[key];
		if (!node) {
		node = { name };
		const id = nodes.push(node) - 1;
		node.id = id;
		nodesDict[key] = node;
		}
		return node;
	}

	function getLink(source, target) {
		let link = links[source+","+target];
		if (!link) {
		link = { target, source, value: 0 };
		links[source+","+target] = link;
		}

		return link;
	}

	function addLink(sourceName, targetName, value, depth) {
		if ((sourceName === '' || !sourceName) && depth > 1) {
		return;
		}

		const source = getNode(sourceName, depth);
		const target = getNode(targetName, depth + 1);
		const link = getLink(source.id, target.id);
		link.value += parseInt(value, 10);
	}

	data.forEach((row) => {
		addLink(row[keys[0]], row[keys[1]], row.value, 1);
		addLink(row[keys[1]], row[keys[2]], row.value, 2);
		addLink(row[keys[2]], row[keys[3]], row.value, 3);
		addLink(row[keys[3]], row[keys[4]], row.value, 4);
	});

	return { nodes, links: _.values(links) };
}

function spreadNodes(height, data) {
	const nodesByBreadth = d3.nest()
		.key((d:any) => { return d.x; })
		.entries(data.nodes)
		.map(d => d.values);

	nodesByBreadth.forEach((nodes) => {
		nodes = _.filter(_.sortBy(nodes, node => -node.value), node =>
		node.name !== 'Exit');

		const sum = d3.sum(nodes, (o:any) => { return o.dy; });
		const padding = (height - sum) / nodes.length;

		_.reduce(nodes, (y0, node) => {
		node.y = y0;
		return y0 + node.dy + padding;
		}, 0);
	});
}
