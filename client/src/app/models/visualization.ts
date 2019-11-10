import { each } from 'lodash';

export class Visualization {
	static defaultConfig = {
		defaultOptions: {},
		skipTypes: false,
		editorTemplate: null,
	};


	static visualizations = {
		'BOXPLOT': {
			'defaultOptions': {
				'defaultRows': 8,
				'minRows': 5
			},
			'skipTypes': false,
			'editorTemplate': '<boxplot-editor><\/boxplot-editor>',
			'type': 'BOXPLOT',
			'name': 'Boxplot (Deprecated)',
			'renderTemplate': '<boxplot-renderer options=\'visualization.options\' query-result=\'queryResult\'><\/boxplot-renderer>'
		},
		'CHART': {
			'defaultOptions': {
				'globalSeriesType': 'column',
				'sortX': true,
				'legend': {
					'enabled': true
				},
				'yAxis': [
					{
						'type': 'linear'
					},
					{
						'type': 'linear',
						'opposite': true
					}
				],
				'xAxis': {
					'type': '-',
					'labels': {
						'enabled': true
					}
				},
				'error_y': {
					'type': 'data',
					'visible': true
				},
				'series': {
					'stacking': null,
					'error_y': {
						'type': 'data',
						'visible': true
					}
				},
				'seriesOptions': {},
				'valuesOptions': {},
				'columnMapping': {},
				'numberFormat': '0,0[.]00000',
				'percentFormat': '0[.]00%',
				'textFormat': '',
				'defaultColumns': 3,
				'defaultRows': 8,
				'minColumns': 1,
				'minRows': 5
			},
			'skipTypes': false,
			'editorTemplate': '<chart-editor options=\'visualization.options\' query-result=\'queryResult\'><\/chart-editor>',
			'type': 'CHART',
			'name': 'Chart',
			'renderTemplate': '<chart-renderer options=\'visualization.options\' query-result=\'queryResult\'><\/chart-renderer>'
		},
		'CHOROPLETH': {
			'defaultOptions': {
				'defaultColumns': 3,
				'defaultRows': 8,
				'minColumns': 2,
				'countryCodeColumn': '',
				'countryCodeType': 'iso_a3',
				'valueColumn': '',
				'clusteringMode': 'e',
				'steps': 5,
				'valueFormat': '0,0.00',
				'noValuePlaceholder': 'N/A',
				'colors': {
					'min': '#799CFF',
					'max': '#002FB4',
					'background': '#ffffff',
					'borders': '#ffffff',
					'noValue': '#dddddd'
				},
				'legend': {
					'visible': true,
					'position': 'bottom-left',
					'alignText': 'right'
				},
				'tooltip': {
					'enabled': true,
					'template': '<b>{{ @@name }}<\/b>: {{ @@value }}'
				},
				'popup': {
					'enabled': true,
					'template': 'Country: <b>{{ @@name_long }} ({{ @@iso_a2 }})<\/b>\n<br>\nValue: <b>{{ @@value }}<\/b>'
				}
			},
			'skipTypes': false,
			'editorTemplate': '<choropleth-editor options=\'visualization.options\' query-result=\'queryResult\'><\/choropleth-editor>',
			'type': 'CHOROPLETH',
			'name': 'Map (Choropleth)',
			'renderTemplate': '<choropleth-renderer options=\'visualization.options\' query-result=\'queryResult\'><\/choropleth-renderer>'
		},
		'COHORT': {
			'defaultOptions': {
				'timeInterval': 'daily',
				'mode': 'diagonal',
				'dateColumn': 'date',
				'stageColumn': 'day_number',
				'totalColumn': 'total',
				'valueColumn': 'value',
				'autoHeight': true,
				'defaultRows': 8
			},
			'skipTypes': false,
			'editorTemplate': '<cohort-editor><\/cohort-editor>',
			'type': 'COHORT',
			'name': 'Cohort',
			'renderTemplate': '<cohort-renderer options=\'visualization.options\' query-result=\'queryResult\'><\/cohort-renderer>'
		},
		'COUNTER': {
			'defaultOptions': {
				'counterColName': 'counter',
				'rowNumber': 1,
				'targetRowNumber': 1,
				'stringDecimal': 0,
				'stringDecChar': '.',
				'stringThouSep': ',',
				'defaultColumns': 2,
				'defaultRows': 5
			},
			'skipTypes': false,
			'editorTemplate': '<counter-editor><\/counter-editor>',
			'type': 'COUNTER',
			'name': 'Counter',
			'renderTemplate': '<counter-renderer options=\'visualization.options\' query-result=\'queryResult\'><\/counter-renderer>'
		},
		'FUNNEL': {
			'defaultOptions': {
				'stepCol': {
					'colName': '',
					'displayAs': 'Steps'
				},
				'valueCol': {
					'colName': '',
					'displayAs': 'Value'
				},
				'sortKeyCol': {
					'colName': ''
				},
				'autoSort': true,
				'defaultRows': 10
			},
			'skipTypes': false,
			'editorTemplate': '<funnel-editor><\/funnel-editor>',
			'type': 'FUNNEL',
			'name': 'Funnel',
			'renderTemplate': '<funnel-renderer options=\'visualization.options\' query-result=\'queryResult\'><\/funnel-renderer>'
		},
		'MAP': {
			'defaultOptions': {
				'defaultColumns': 3,
				'defaultRows': 8,
				'minColumns': 2,
				'classify': 'none',
				'clusterMarkers': true
			},
			'skipTypes': false,
			'editorTemplate': '<map-editor><\/map-editor>',
			'type': 'MAP',
			'name': 'Map (Markers)',
			'renderTemplate': '<map-renderer options=\'visualization.options\' query-result=\'queryResult\'><\/map-renderer>'
		},
		'PIVOT': {
			'defaultOptions': {
				'defaultRows': 10,
				'defaultColumns': 3,
				'minColumns': 2
			},
			'skipTypes': false,
			'editorTemplate': '<pivot-table-editor><\/pivot-table-editor>',
			'type': 'PIVOT',
			'name': 'Pivot Table',
			'renderTemplate': '<pivot-table-renderer visualization=\'visualization\' query-result=\'queryResult\'><\/pivot-table-renderer>'
		},
		'SANKEY': {
			'defaultOptions': {
				'defaultRows': 7
			},
			'skipTypes': false,
			'editorTemplate': '<sankey-editor><\/sankey-editor>',
			'type': 'SANKEY',
			'name': 'Sankey',
			'renderTemplate': '<sankey-renderer options=\'visualization.options\' query-result=\'queryResult\'><\/sankey-renderer>'
		},
		'SUNBURST_SEQUENCE': {
			'defaultOptions': {
				'defaultRows': 7
			},
			'skipTypes': false,
			'editorTemplate': '<sunburst-sequence-editor><\/sunburst-sequence-editor>',
			'type': 'SUNBURST_SEQUENCE',
			'name': 'Sunburst Sequence',
			'renderTemplate': '<sunburst-sequence-renderer options=\'visualization.options\' query-result=\'queryResult\'><\/sunburst-sequence-renderer>'
		},
		'TABLE': {
			'defaultOptions': {
				'itemsPerPage': 15,
				'autoHeight': true,
				'defaultRows': 14,
				'defaultColumns': 3,
				'minColumns': 2
			},
			'skipTypes': false,
			'editorTemplate': '<grid-editor><\/grid-editor>',
			'type': 'TABLE',
			'name': 'Table',
			'renderTemplate': '<grid-renderer options=\'visualization.options\' query-result=\'queryResult\'><\/grid-renderer>'
		},
		'WORD_CLOUD': {
			'defaultOptions': {
				'defaultRows': 8
			},
			'skipTypes': false,
			'editorTemplate': '<word-cloud-editor><\/word-cloud-editor>',
			'type': 'WORD_CLOUD',
			'name': 'Word Cloud',
			'renderTemplate': '<word-cloud-renderer options=\'visualization.options\' query-result=\'queryResult\'><\/word-cloud-renderer>'
		}
	};

	id;
	name;
	type;
	query: any;
	options: any;
	constructor(data) {
		// Copy properties
		each(data, (v, k) => {
			this[k] = v;
		});
	}
}
