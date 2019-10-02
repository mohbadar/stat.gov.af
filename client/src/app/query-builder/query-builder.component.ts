import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { DatasourceQueryService } from 'app/services/datasource.query.service';
import { DatatablesService } from '../services/datatables.service';
import { DatasourceQuery } from '../models/datasource.query';
import { stringify } from '@angular/compiler/src/util';
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { empty } from 'rxjs';
import { AuthService } from 'app/services/auth.service';
import * as jquery from 'jquery';
declare var $: any;

@Component({
	selector: 'app-query-builder',
	templateUrl: './query-builder.component.html',
	styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnInit, AfterViewInit {
	// these variable will be feed to visualization component
	visualizationColumns = [];
	visualizationRows = [];
	customParams = [];
	customParamsDataset = [];
	data = [];
	dataSheets = [];
	wSheetName: string;
	workBookName: string;
	columnDataTypes = [];
	columnDataType = '';
	selectedColumnIndex = 0;
	selectedColumnName = '';
	columnNames = [];
	action = this.translate.instant('ACTIONS');
	applyMultiple = false;
	originalData;
	filterValue;
	filterAction;
	dTable;
	resourceId: string;
	dataTablesObservable;
	dTableFlag = false;
	showFilter = false;
	isLoading: boolean;
	isDatasetSelected: boolean = false;
	// true: show the visualization, false: show tabular data
	isVisualize: boolean = false;
	// datatables options
	dtOptions;
	operators = {
		'==': function (a, b) { return a == b },
		'<': function (a, b) { return a < b },
		'>': function (a, b) { return a > b },
		'<=': function (a, b) { return a <= b },
		'>=': function (a, b) { return a >= b },
		'!=': function (a, b) { return a != b },
	};
	methodNames = {
		'Cn': function (string, substring) { return string.includes(substring) },
		'CnS': function (string, substring) { return string.startsWith(substring) },
		'CnE': function (string, substring) { return string.endsWith(substring) },
		'NCn': function (string, substring) { return !(string.includes(substring)) }
	}
	constructor(private cdref: ChangeDetectorRef, public datasouceQueryService: DatasourceQueryService,
		public authService: AuthService, private translate: TranslateService,
		private datatables: DatatablesService) { }

	ngOnInit() {
		// document.getElementById("selectDataset").style.display = 'none';
		// document.getElementById("inputFile").style.display = 'none';
		// document.getElementById("btnAtach").style.display = 'none';
		this.customParams.push('title');
		this.customParams.push('uuid');
		this.customParamsDataset.push('title');
		this.customParamsDataset.push('nid');
		this.getDatasets(this.customParamsDataset);

		$(".single-select2").select2({
			placeholder: "Select a Dataset..."
		}).change(event => {
			this.isDatasetSelected = true;
			const dataset = $(event.currentTarget).select2("val");
			this.getResources(this.customParams, dataset);

		});
		$(".single-select2-2").select2({
			placeholder: "Select a resource..."
		}).change(event => {
			const resource = $(event.currentTarget).select2("data");
			this.changed(resource);
		});
		this.dtOptions = {
			'pagingType': 'full_numbers',
			'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
			'scrollX': true,
			dom: 'Bfrtip',
			// Configure the buttons
			buttons: [
				{
					extend: 'excel',
					text: 'Export',
					className: '',
					filename: "Stat.gov.af",
					exportOptions: {
						modifier: {
							page: 'all'
						}
					}
				}
			],
			language: this.datatables.selectedJsonFile
		};
		this.changeLanguage();
	}

	ngAfterViewInit() {

	}

	getDatasets(customParams) {
		this.datasouceQueryService.getDatasets(customParams, 'dataset', 4000).subscribe((selectData) => {
			selectData.forEach((element) => {
				const newOption = new Option(element.title, element.nid);
				$('.single-select2').append(newOption);
			});
		});
	}
	getResources(customParams, dataset) {
		const resourceIds = [];
		if (this.isDatasetSelected) {
			this.datasouceQueryService.getResourcesList(dataset).subscribe((resourceList) => {
				resourceList.field_resources.und.forEach((element) => {
					resourceIds.push(element.target_id)
				});
				this.datasouceQueryService.getResources(customParams, 'resource', resourceIds).subscribe((selectData) => {
					$('.single-select2-2').html('').select2({data: [{id: '', text: ''}]});
					selectData.forEach((element) => {
						const newOption = new Option(element.title, element.uuid);
						$('.single-select2-2').append(newOption);
					});
				});
			});
		}
	}


	onFileChange(evt: any) {
		if ($.fn.DataTable.isDataTable('#datatables')) {
			this.dTable.destroy();
			this.dTable = null;
		}
		this.data = [];
		this.columnNames = [];
		this.selectedColumnIndex = 0;
		this.selectedColumnName = '';
		this.columnDataType = '';
		this.columnDataTypes = [];
		this.filterAction = '';
		this.filterValue = '';


		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) {
			throw new Error('Cannot use multiple files');
		}

		this.workBookName = target.files[0].name;

		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr: string = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

			// workbook sheets
			// console.log('workbook sheets: ', wb.SheetNames);
			this.dataSheets = wb.SheetNames;

			/* grab first sheet */
			this.wSheetName = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[this.wSheetName];

			// console.log('ws: ', ws);


			/* save data */
			this.data = <Array<XLSX.AOA2SheetOpts>>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
			// console.log('data is: ', this.data);
			// Get column names
			this.data[0].forEach(element => {
				const obj = {
					showColumn: true,
					name: element
				};
				this.columnNames.push(obj);
			});
			// console.log("columnNames",this.columnNames)

			// After taking out the columns remove the first element of the data
			this.data.splice(0, 1);
			this.prepareDataforDataTable();

			// Parse data for better handling
			const tempData = [];

			this.data.forEach(element => {
				const obj = {
					showRow: true,
					rowData: element
				}
				tempData.push(obj);
			});

			// console.log('temp data: ', tempData);

			this.data = tempData;
			this.cdref.detectChanges();
			if (!$.fn.DataTable.isDataTable('#datatables')) {
				$('#datatables tfoot th').each(function () {
					const title = $(this).text();
					$(this).html('<input type="text" id="' + title + '" class="table-search" placeholder="Search ' + title + '"/>');
				});

				this.dTable = $('#datatables').DataTable(this.dtOptions);
				this.initializeTable();
			}

			// Save the original data before processing this data
			this.originalData = this.data;

			// console.log('Updated data: ', this.data);


			this.checkColumnDataType();

		};
		reader.readAsBinaryString(target.files[0]);
	}

	prepareDataforDataTable() {
		this.data.forEach(dt => {
			if (dt.length < this.columnNames.length) {

				while (dt.length !== this.columnNames.length) {
					dt.push('');
				}
			}
		});
	}

	initializeTable() {
		setTimeout(() => {
			// Apply the search
			this.dTable.columns().every(function () {
				const that = this;
				$('.table-search', this.footer()).on('keyup change clear', function () {
					if (that.search() !== this.value) {
						that
							.search(this.value)
							.draw();
					}
				});
			});
		});
	}

	checkColumnDataType() {
		let isInteger;
		let isUndefined;
		for (let i = 0; i < this.columnNames.length; i++) {
			isInteger = true;
			isUndefined = true;
			for (let j = 0; j < this.data.length; j++) {
				if (this.data[j].rowData[i] !== undefined) {
					isUndefined = false;
					if (!(/^[0-9]\d*(\.\d+)?$/).test(this.data[j].rowData[i])) {
						isInteger = false;
						break;
					}
				}

			}
			if (!isUndefined) {
				isInteger ? this.columnDataTypes.push('number') : this.columnDataTypes.push('string');
			} else {
				this.columnDataTypes.push('undefined');
			}
		}

		// console.log('Data Types: ', this.columnDataTypes);
	}

	showFilters(dataType, index) {
		this.showFilter = true;
		this.columnDataType = dataType;
		this.selectedColumnIndex = index;
		this.action = this.translate.instant('ACTIONS');
		this.selectedColumnName = this.columnNames[index].name;
		// console.log('Column Data Type: ', this.columnDataType);
	}

	// Update the dataType of a column when users decides to do so
	updateDataType(newDataType) {
		// console.log('dataTypes prior to change: ', this.columnDataTypes);

		this.columnDataTypes[this.selectedColumnIndex] = newDataType;
		// console.log('dataTypes after the change: ', this.columnDataTypes);
		this.columnDataType = newDataType;
	}

	/**
	 *
	 * @param filterAction What type of filter to apply
	 * @param actionName Name of the filter action
	 * @param isMultipleApplicable are multiple filters applicable for this filter
	 */
	setAction(filterAction, actionName, isMultipleApplicable) {
		// reset the multiple filter
		$('#multiple-filter').prop('checked', false);
		this.applyMultiple = isMultipleApplicable;
		this.action = actionName;
		this.filterAction = filterAction;
	}

	numberFilterHandler(filterAction) {
		switch (filterAction) {
			// the equal filter
			case 'flEq':
				this.filterN('==');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			case 'flLt':
				this.filterN('<');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			case 'flGr':
				this.filterN('>');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			case 'flLtEq':
				this.filterN('<=');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			case 'flGrEq':
				this.filterN('>=');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			case 'flNEq':
				this.filterN('!=');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			// case 'flRng':
			// 	this.FilterN('..');
			// 	this.dTable.draw();
			// 	dData = this.dTable.rows({ filter: 'applied' }).data();
			// 	break;
			// case 'flNRng':
			// 	this.FilterN('!..');
			// 	this.dTable.draw();
			// 	dData = this.dTable.rows({ filter: 'applied' }).data();
			// 	break;
		}
	}
	stringFilterHandler(filterAction) {
		switch (filterAction) {
			// the equal filter
			case 'flCn':
				this.stringFilterN('Cn');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			case 'flCnS':
				this.stringFilterN('CnS');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			case 'flCnE':
				this.stringFilterN('CnE');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			case 'flNCn':
				this.stringFilterN('NCn');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
		}
	}


	testData() {
		const indeces = [3, 4, 5, 6];
		// code to fitler certain rows
		// this.data = this.data.filter(dt => indeces.includes(this.data.indexOf(dt)));


		// code to filter certain columns
		// const columnIndex = 3;
		// this.data = this.data.map(element => {
		// 	console.log('element: ', element);
		// 	console.log('element index: ', element.rowData.indexOf(element.rowData[columnIndex]));
		// 	element.rowData = element.rowData.filter(vl => element.rowData.indexOf(vl) !== columnIndex);
		// 	return element;
		// });
		// this.data.splice(3, 1);

		// console.log('final data: ', this.data);

		if (this.columnDataType === 'number') {
			this.numberFilterHandler(this.filterAction);
		}
		if (this.columnDataType === 'string') {
			this.stringFilterHandler(this.filterAction);
		}
	}

	resetData() {
		this.data = this.data.map(dt => {
			dt.showRow = true;
			return dt;
		});
		this.columnNames.forEach(element => {
			element.showColumn = true;
			return element;
		});
		$('customFilter').val('');
		$('input.table-search').val('');
		let D_T = $("#datatables").DataTable();
		$('.c-box').each(function () {
			this.checked = true;
			$('.column-name').removeClass("unselected");
		});
		$.fn.dataTableExt.afnFiltering.length = 0;
		$("#datatables").dataTable().fnDraw();
		D_T.
			search('').
			columns().search('').visible(true, true).order('asc').
			draw();

	}

	toggleColumn(column, cIndex) {
		// console.log("column", column);
		// console.log("cIndex", cIndex);
		this.columnDataType = '';
		$(column).closest('li').toggleClass('unselected');
		const checkBox = $(column).closest('li').find('input');
		if (!$(column).hasClass('c-box')) {
			$(column).closest('li').find('input').prop('checked', !checkBox.prop('checked'));
		}
		this.columnNames[cIndex].showColumn = !this.columnNames[cIndex].showColumn;

		const dColumn = this.dTable.column(cIndex);
		dColumn.visible(!dColumn.visible());
	}

	setFilterValue(vl) {
		this.filterValue = vl;
	}
	closeCustomFilter() {
		this.showFilter = false;
	}

	/*******************************************************************
	 * Following methods are used to filter data
	 * the format is filteType+'Filter'+Type(N = 'number', S = 'String')
	 *******************************************************************/


	filterN(operator) {
		// console.log('filtered value: ', this.filterValue);
		const that = this;
		// return this.data.map(dt => {
		// 	if (dt.rowData[this.selectedColumnIndex] !== Number(this.filterValue)) {
		// 		dt.showRow = false;
		// 	}
		// 	return dt;
		// })
		$.fn.dataTable.ext.search.push(
			function (settings, data, dataIndex) {
				const id = Number(data[that.selectedColumnIndex]) || 0;
				// console.log('filter data: ', that.filterValue);
				if (that.filterValue !== '') {
					if (that.operators[operator](id, that.filterValue)) {
						return true;
					}
					return false;
				} else {
					return true;
				}
			}
		);
	}
	stringFilterN(methodName) {
		const that = this;
		$.fn.dataTable.ext.search.push(
			function (settings, data, dataIndex) {
				const string = data[that.selectedColumnIndex];
				if (that.filterValue !== '') {
					if (that.methodNames[methodName](string, that.filterValue)) {
						return true;
					}
					return false;
				} else {
					return true;
				}
			}
		);
	}

	generateChart() {
		// console.log("generate chart");
		this.visualizationColumns = [];
		const filteredDataLength = this.dTable.rows({ filter: 'applied' }).nodes().length;
		const filteredData = this.dTable.rows({ filter: 'applied' }).data();
		this.columnNames.forEach((element) => {
			if (element.showColumn) {
				this.visualizationColumns.push(element.name);
			}
		});
		for (let i = 0; i < filteredDataLength; i++) {
			this.visualizationRows.push(filteredData[i]);
		}
		this.isVisualize = true;

	}

	hideVisualization() {
		this.isVisualize = false;
	}

	saveChanges() {
		const filteredDataLength = this.dTable.rows({ filter: 'applied' }).nodes().length;
		let filteredData = this.dTable.rows({ filter: 'applied' }).data();
		let fData = [];
		for (let i = 0; i < filteredDataLength; i++) {
			fData.push(filteredData[i]);
		}
		// console.log("final Data", fData);
		const publicSearch = $('.dataTables_filter input').val()
		const filteredColumns = []
		const searchColumns = [];
		this.columnNames.forEach((element) => {
			if (element.showColumn) {
				filteredColumns.push(element.name);
			}
		});
		const lengthColumnName = filteredColumns.length;
		// console.log(filteredColumns);

		$('.table-search').each(function (index) {
			if (index >= lengthColumnName) {
				if ($(this).val()) {
					const searchColumn = {
						columnName: $(this).attr('id'),
						value: $(this).val()
					};
					searchColumns.push(searchColumn);
				}
			}
		});
		const configData = {
			publicSearch: publicSearch,
			filteredColumns: filteredColumns,
			searchColumns: searchColumns
		}
		if (this.data) {
			const query = new DatasourceQuery;
			query.name = this.workBookName;
			query.config = JSON.stringify(configData);
			query.data = JSON.stringify(fData);
			query.uuid = JSON.stringify(this.resourceId);
			console.log("Sended Data: => ", query);
			this.datasouceQueryService.createQuery(query).subscribe((res) => {
				console.log("response: ", res);
				const msg = 'New record successfully created';
				this.isLoading = false;
				this.showNotification('top', 'center', msg, 'success', 'pe-7s-check');
			}, (err) => {
				const msg = 'There was an error storing data'
				this.showNotification('top', 'center', msg, 'danger', 'pe-7s-attention');
			});
		}
	}

	visualizeChange() {
		console.log("Visualize this data", this.data);
	}

	showNotification(from, align, msg, type, icon) {
		// $.notify({
		// 	icon: icon,
		// 	message: msg

		// }, {
		// 		type: type,
		// 		timer: 4000,
		// 		placement: {
		// 			from: from,
		// 			align: align
		// 		}
		// 	});
	}
	public changed(resource: any): void {
		console.log(resource)
		if ($.fn.DataTable.isDataTable('#datatables')) {
			this.dTable.destroy();
			this.dTable = null;
		}
		this.data = [];
		this.columnNames = [];
		this.selectedColumnIndex = 0;
		this.selectedColumnName = '';
		this.columnDataType = '';
		this.columnDataTypes = [];
		this.filterAction = '';
		this.filterValue = '';
		this.dTableFlag = false;
		this.workBookName = resource[0].text;
		this.dtOptions.buttons[0].filename = this.workBookName;
		this.dtOptions.buttons[0].text = this.translate.instant('EXCEL_EXPORT');

		this.datasouceQueryService.getResourceData(resource[0].element.value).subscribe((resourceData) => {
			// console.log("resourceData", resourceData);
			this.dTableFlag = true;

			this.resourceId = resourceData.result.resource_id;
			resourceData.result.fields.forEach((element) => {
				const obj = {
					showColumn: true,
					name: element.id
				};
				this.columnNames.push(obj);
			});
			resourceData.result.records.forEach((element) => {
				let val = [];
				for (let prop in element) {
					let isNum = /^\d*\.?\d+$/.test(element[prop]);
					if (isNum) {
						element[prop] = Number(element[prop]);
					}
					val.push(element[prop])
				}
				this.data.push(val);
			});
			if (this.data[0][0] == null) {

				this.data[0][0] = undefined;
			}
			// console.log(this.data);
			// console.log("columnNames",this.columnNames)

			// After taking out the columns remove the first element of the data
			// this.data.splice(0, 1);
			this.prepareDataforDataTable();

			// Parse data for better handling
			const tempData = [];

			this.data.forEach(element => {
				const obj = {
					showRow: true,
					rowData: element
				}
				tempData.push(obj);
			});

			// console.log('temp data: ', tempData);

			this.data = tempData;
			this.cdref.detectChanges();
			if (!$.fn.DataTable.isDataTable('#datatables')) {
				$('#datatables tfoot th').each(function () {
					const title = $(this).text();
					$(this).html('<input type="text" id="' + title + '" class="table-search" placeholder="Search ' + title + '" />');
				});
				this.dTable = $('#datatables').DataTable(this.dtOptions);
				this.initializeTable();
			}

			// Save the original data before processing this data
			this.originalData = this.data;

			// console.log('Updated data: ', this.data);


			this.checkColumnDataType();
		});
	}

	// handleChange(event) {
	// 	let target = event.target.value;
	// 	if (target == "dataset") {
	// 		document.getElementById("inputFile").style.display = 'none';
	// 		document.getElementById("btnAtach").style.display = 'none';
	// 		document.getElementById("selectDataset").style.display = 'inline';
	// 	}
	// 	if (target == "file") {
	// 		document.getElementById("selectDataset").style.display = 'none';
	// 		document.getElementById("inputFile").style.display = 'inline';
	// 		document.getElementById("btnAtach").style.display = 'inline';
	// 	}

	// }
	changeLanguage() {
		this.dataTablesObservable = this.datatables.callToServiceMethodSource.subscribe(data => {
			this.dtOptions.buttons[0].text = this.translate.instant('EXCEL_EXPORT');
			this.dtOptions['oLanguage'] = data.default;
			if (this.dTableFlag) {
				// Initialize datatable if not initialized before
				if (!$.fn.DataTable.isDataTable('#datatables')) {
					this.dTable = $('#datatables').DataTable(this.dtOptions);
				} else {
					console.log('dtOptions: ', this.dtOptions);
					this.dTable.destroy();
					this.dTable = null;
					this.dTable = $('#datatables').DataTable(this.dtOptions);
				}
			}
		});
	}
	ngOnDestroy() {
		if (this.dataTablesObservable) {
			this.dataTablesObservable.unsubscribe();
		}
	}


}
