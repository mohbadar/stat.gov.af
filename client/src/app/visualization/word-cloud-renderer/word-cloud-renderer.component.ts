import { Component, OnInit, Input, SimpleChanges, SimpleChange, ElementRef, ViewChild, HostListener } from '@angular/core';
import { QueryResult } from '../../models/query-result';
import d3 from 'd3';
import cloud from 'd3-cloud';
import { each } from 'lodash';

@Component({
	selector: 'word-cloud-renderer',
	templateUrl: './word-cloud-renderer.component.html',
	styleUrls: ['./word-cloud-renderer.component.scss']
})
export class WordCloudRendererComponent implements OnInit {
	@Input('options') options: any;
	@Input('query-result') queryResult: QueryResult;

	@ViewChild('wordCloudContainer', { static: false }) wordCloudContainer: ElementRef;
	wordCloudElement;
	layout;
	fill;

	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		const options: SimpleChange = changes.options;
		if (!options.isFirstChange() && changes.options) {
			this.reloadCloud();
		}

		const queryResult: SimpleChange = changes.queryResult;
		if (!queryResult.isFirstChange() && changes.queryResult) {
			this.reloadCloud();
		}
	}

	ngOnInit() {
		this.wordCloudElement = this.wordCloudContainer;
		this.wordCloudElement = this.wordCloudElement.nativeElement;
		this.reloadCloud();


	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.reloadCloud();
	}

	reloadCloud() {
		if (typeof this.queryResult == 'undefined') return;

		const data = this.queryResult.getData();
		let wordsHash = {};

		if (this.options.column) {
			wordsHash = findWordFrequencies(data, this.options.column);
		}

		const wordList = [];
		each(wordsHash, (v, key) => {
			wordList.push({ text: key, size: 10 + Math.pow(v, 2) });
		});

		this.fill = d3.scale.category20();
		this.layout = cloud()
			.size([500, 500])
			.words(wordList)
			.padding(5)
			.rotate(() => Math.floor(Math.random() * 2) * 90)
			.font('Impact')
			.fontSize(d => d.size);

		this.layout.on('end', (data) => {
			this.draw(data)
		});

		this.layout.start();
	}

	draw(words) {
		d3.select(this.wordCloudElement.parentNode)
			.select('svg')
			.remove();

		d3.select(this.wordCloudElement.parentNode)
			.append('svg')
			.attr('width', this.layout.size()[0])
			.attr('height', this.layout.size()[1])
			.append('g')
			.attr('transform', `translate(${this.layout.size()[0] / 2},${this.layout.size()[1] / 2})`)
			.selectAll('text')
			.data(words)
			.enter()
			.append('text')
			.style('font-size', (d: any) => {
				return `${d.size}px`;
			})
			.style('font-family', 'Impact')
			.style('fill', (d, i) => {
				return this.fill(i)
			})
			.attr('text-anchor', 'middle')
			.attr('transform', (d: any) => {
				return `translate(${[d.x, d.y]})rotate(${d.rotate})`;
			})
			.text((d: any) => { return d.text });
	}

}

function findWordFrequencies(data, columnName) {
	const wordsHash = {};

	data.forEach((row) => {
		const wordsList = row[columnName].toString().split(' ');
		wordsList.forEach((d) => {
			if (d in wordsHash) {
				wordsHash[d] += 1;
			} else {
				wordsHash[d] = 1;
			}
		});
	});

	return wordsHash;
}