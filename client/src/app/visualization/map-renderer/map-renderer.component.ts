import { ChangeDetectionStrategy, Component, OnInit, Input, SimpleChange, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { QueryResult } from '../../models/query-result';
import _ from 'lodash';
import d3 from 'd3';
// import L from 'leaflet';

// import { circle, geoJSON, icon, latLng, Layer, marker, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import 'leaflet.markercluster';

@Component({
	selector: 'map-renderer',
	//   templateUrl: './map-renderer.component.html',
	//   styleUrls: ['./map-renderer.component.scss']
	template: '<div id="map" leaflet [leafletOptions]="mapOptions" [leafletLayers]="detailLayers" [leafletFitBounds]="fitBounds" class="map-visualization-container" #mapContainer></div>',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapRendererComponent implements OnInit {
	@Input('options') options: any;
	@Input('query-result') queryResult: QueryResult;

	@ViewChild('mapContainer', { static: false }) mapContainer: ElementRef;
	mapElement;

	map;
	layers = [];
	mapControls;
	colorScale;

	// Open Street Map definitions
	LAYER_OSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Open Street Map'
	});

	// L.Icon.Default.mergeOptions({
	// 	  iconUrl: 'assets/marker-icon.png',
	// 	  iconRetinaUrl: 'assets/marker-icon-2x.png',
	// 	  shadowUrl: 'assets/marker-shadow.png',
	// 	});
	// delete L.Icon.Default.prototype._getIconUrl;

	mapOptions;
	fitBounds: any = null;
	detailLayers = [];


	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		// const options: SimpleChange = changes.options;
		// if (!options.isFirstChange() && changes.options) {
		// 	this.render();
		// }

		// const queryResult: SimpleChange = changes.queryResult;
		// if (!queryResult.isFirstChange() && changes.queryResult) {
		// 	this.render();
		// }
	}

	ngOnInit() {
		this.mapElement = this.mapContainer;
		this.mapElement = this.mapElement.nativeElement;
		this.colorScale = d3.scale.category10();

		this.mapOptions = {
			layers: [this.LAYER_OSM],
			zoom: 10,
			center: L.latLng(34.502328, 69.156090)
		};

		this.render();

		// this.layers = [
		// 	L.circle([ 46.95, -122 ], { radius: 5000 }),
		// 	L.polygon([[ 46.8, -121.85 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]]),
		// 	L.marker([ 46.879966, -121.726909 ])
		// ];

		// this.map = L.map(this.mapElement, {
		// 	scrollWheelZoom: false,
		// 	fullscreenControl: true,
		// });

		// this.mapControls = L.control.layers().addTo(this.map);

		// this.layers = {};
		// this.tileLayer = L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		// 	maxZoom: 18,
		// 	attribution: 'Open Street Map',
		// }).addTo(this.map);

		// this.map.on('focus', () => { this.map.on('moveend', this.getBounds); });
		// this.map.on('blur', () => { this.map.off('moveend', this.getBounds); });

		// console.log(this.mapControls);

		// this.render();









		// Values to bind to Leaflet Directive
		// this.mapOptions = {
		// 	layers: [this.LAYER_OSM],
		// 	zoom: 10,
		// 	center: latLng(46.879966, -121.726909)
		//   };




		// this.colorScale = d3.scale.category10();

		// this.map = L.map(this.mapElement.children[0], {
		// 	scrollWheelZoom: false,
		// 	fullscreenControl: true,
		// });
		// this.mapControls = L.control.layers().addTo(this.map);
		// this.layers = {};
		// this.tileLayer = L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		// 	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
		// }).addTo(this.map);

		// this.map.on('focus', () => { this.map.on('moveend', this.getBounds); });
		// this.map.on('blur', () => { this.map.off('moveend', this.getBounds); });

		// this.createMarker = (lat, lon) => L.marker([lat, lon]);

		// $scope.handleResize = () => {
		// 	resize();
		// };
	}

	createMarker(lat, lon) {
		return L.marker([lat, lon]);
	}

	getBounds() {
		this.options.bounds = this.map.getBounds();
	}

	setBounds() {
		const b = this.options.bounds;

		if (b) {
			// this.map.fitBounds([[b._southWest.lat, b._southWest.lng], [b._northEast.lat, b._northEast.lng]]);
			this.fitBounds = [[b._southWest.lat, b._southWest.lng], [b._northEast.lat, b._northEast.lng]];
		} else if (this.layers) {
			const allMarkers = _.flatten(_.map(_.values(this.layers), l => l.getLayers()));
			// eslint-disable-next-line new-cap
			const group = L.featureGroup(allMarkers);
			this.fitBounds = group.getBounds();
		}
	}

	heatpoint(lat, lon, color) {
		const style = {
			fillColor: color,
			fillOpacity: 0.9,
			stroke: false,
		};

		// return L.circleMarker([lat, lon], style);
		return L.circleMarker([lat, lon], style);
	}

	createDescription(latCol, lonCol, row) {
		const lat = row[latCol];
		const lon = row[lonCol];

		let description = '<ul style="list-style-type: none;padding-left: 0">';
		description += `<li><strong>${lat}, ${lon}</strong>`;

		_.each(row, (v, k) => {
			if (!(k === latCol || k === lonCol)) {
				description += `<li>${k}: ${v}</li>`;
			}
		});

		return description;
	}

	removeLayer(layer) {
		if (layer) {
			this.mapControls.removeLayer(layer);
			this.map.removeLayer(layer);
		}
	}

	resize() {
		if (!this.map) return;
		this.map.invalidateSize(false);
		this.setBounds();
	}

	addLayer(name, points) {
		const latCol = this.options.latColName || 'lat';
		const lonCol = this.options.lonColName || 'lon';
		const classify = this.options.classify;

		let markers;
		if (this.options.clusterMarkers) {
			const color = this.options.groups[name].color;
			const options: any = {};

			if (classify) {
				options.iconCreateFunction = (cluster) => {
					const childCount = cluster.getChildCount();

					let c = ' marker-cluster-';
					if (childCount < 10) {
						c += 'small';
					} else if (childCount < 100) {
						c += 'medium';
					} else {
						c += 'large';
					}

					c = '';

					const style = `color: white; background-color: ${color};`;
					return L.divIcon({ html: `<div style="${style}"><span>${childCount}</span></div>`, className: `marker-cluster${c}`, iconSize: new L.Point(40, 40) });
				};
			}

			markers = L.markerClusterGroup(options);
		} else {
			markers = L.layerGroup();
		}

		// create markers
		_.each(points, (row) => {
			let marker;

			const lat = row[latCol];
			const lon = row[lonCol];

			if (lat === null || lon === null) return;

			if (classify && classify !== 'none') {
				const groupColor = this.options.groups[name].color;
				marker = this.heatpoint(lat, lon, groupColor);
			} else {
				marker = this.createMarker(lat, lon);
			}

			marker.bindPopup(this.createDescription(latCol, lonCol, row));
			markers.addLayer(marker);
			this.detailLayers.push(marker);
		});

		// markers.addTo(this.map);

		this.layers[name] = markers;
		// this.mapControls.addOverlay(markers, name);
	}

	render() {
		const queryData = this.queryResult.getData();
		const classify = this.options.classify;

		this.options.mapTileUrl = this.options.mapTileUrl || '//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

		// this.tileLayer.setUrl(this.options.mapTileUrl);
		this.LAYER_OSM.setUrl(this.options.mapTileUrl);

		if (this.options.clusterMarkers === undefined) {
			this.options.clusterMarkers = true;
		}

		if (queryData) {
			let pointGroups;
			if (classify && classify !== 'none') {
				pointGroups = _.groupBy(queryData, classify);
			} else {
				pointGroups = { All: queryData };
			}

			const groupNames = _.keys(pointGroups);
			const options = _.map(groupNames, (group) => {
				if (this.options.groups && this.options.groups[group]) {
					return this.options.groups[group];
				}
				return { color: this.colorScale(group) };
			});

			this.options.groups = _.zipObject(groupNames, options);

			_.each(this.layers, (v) => {
				this.removeLayer(v);
			});

			_.each(pointGroups, (v, k) => {
				this.addLayer(k, v);
			});

			this.setBounds();
		}
	}



}