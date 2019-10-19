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
import { filter } from 'rxjs/operators';
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
	aiDisplay;
	dataSheets = [];
	wSheetName: string;
	workBookName: string;
	columnDataTypes = [];
	columnDataType = '';
	selectedColumnIndex = 0;
	selectedColumnName = '';
	columnNames = [];
	action = 'ACTIONS';
	applyMultiple = false;
	originalData;
	filterValue;
	filterAction;
	dTable;
	myData;
	resourceId: string;
	dataTablesObservable;
	dTableFlag = false;
	showFilter = false;
	isLoading: boolean;
	isDatasetSelected: boolean = false;
	// true: show the visualization, false: show tabular data
	isVisualize: boolean = false;
	// true: check all checkboxes, false: uncheck all checkboxes
	isAllCheck: boolean = false;
	// true: show tag filter false:remove filter
	visibleTag: boolean = true;
	// datatables options
	resetTableFlag = false;
	customFilters = [];
	dtOptions;
	operators = {
		'flEq': function (a, b) { return a == b },
		'flLt': function (a, b) { return a < b },
		'flGr': function (a, b) { return a > b },
		'flLtEq': function (a, b) { return a <= b },
		'flGrEq': function (a, b) { return a >= b },
		'flNEq': function (a, b) { return a != b }
	};
	methodNames = {
		'flCn': function (string, substring) { return string.includes(substring) },
		'flCnS': function (string, substring) { return string.startsWith(substring) },
		'flCnE': function (string, substring) { return string.endsWith(substring) },
		'flNCn': function (string, substring) { return !(string.includes(substring)) }
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

		this.filterN('flEq');


		$(".single-select2").select2({
			placeholder: "Select a Dataset...",
		}).change(event => {
			this.isDatasetSelected = true;
			const dataset = $(event.currentTarget).select2("val");
			this.getResources(this.customParams, dataset);

		});
		$("#single-select2").select2({
			placeholder: "Select a resource...",
			allowClear: true
		}).change(event => {
			const resource = $(event.currentTarget).select2("data");
			this.changed(resource);
		});

		this.getDatasets(this.customParamsDataset);



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
					$('#single-select2').empty().append($('<option>').text('Select a resource').attr('value', ''));
					selectData.forEach((element) => {
						const newOption = new Option(element.title, element.uuid);
						$('#single-select2').append(newOption);
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


			//this.checkColumnDataType();

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
					console.log('column: ', that.index());
					if (that.search() !== this.value) {
						that
							.search(this.value)
							.draw();
					}
				});
			});
		});
	}

	checkColumnDataType(fields) {
		// let isInteger;
		// let isUndefined;
		// for (let i = 0; i < this.columnNames.length; i++) {
		// 	isInteger = true;
		// 	isUndefined = true;
		// 	for (let j = 0; j < this.data.length; j++) {
		// 		if (this.data[j].rowData[i] !== undefined) {
		// 			isUndefined = false;
		// 			if (!(/^[0-9]\d*(\.\d+)?$/).test(this.data[j].rowData[i])) {
		// 				isInteger = false;
		// 				break;
		// 			}
		// 		}
		// 	}
		// 	if (!isUndefined) {
		// 		isInteger ? this.columnDataTypes.push('number') : this.columnDataTypes.push('string');
		// 	} else {
		// 		this.columnDataTypes.push('undefined');
		// 	}
		// }
		fields.forEach((element) => {
			if (element.type === 'text') {
				this.columnDataTypes.push('string')
			} else if (element.type === 'int' || element.type === 'float') {
				this.columnDataTypes.push('number')
			} else {
				this.columnDataTypes.push('undefined')
			}
		});
	}

	showFilters(dataType, index) {
		console.log('Index: ', index);

		$('#customFilter').val("");
		this.filterAction = '';
		this.showFilter = true;
		this.columnDataType = dataType;
		this.selectedColumnIndex = index;
		this.action = 'ACTIONS';
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
				this.filterN('flEq');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			case 'flLt':
				this.filterN('flLt');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			case 'flGr':
				this.filterN('flGr');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			case 'flLtEq':
				this.filterN('flLtEq');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			case 'flGrEq':
				this.filterN('flGrEq');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			case 'flNEq':
				this.filterN('flNEq');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
		}
	}
	stringFilterHandler(filterAction) {
		switch (filterAction) {
			// the equal filter
			case 'flCn':
				// this.stringFilterN('flCn');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			case 'flCnS':
				this.filterN('flCnS');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			case 'flCnE':
				this.filterN('flCnE');
				this.dTable.draw();
				this.dTable.rows({ filter: 'applied' }).data();
				break;
			case 'flNCn':
				this.filterN('flNCn');
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
		const cFilter = {
			columnName: this.selectedColumnName,
			datatype: this.columnDataType,
			value: this.filterValue,
			action: this.filterAction,
			columnIndex: this.selectedColumnIndex
		}
		this.customFilters.push(cFilter);
		this.applyFilters();

	}

	applyFilters() {

		console.log('settings of table: ', this.dTable.settings().data());

		this.customFilters.forEach(cFilter => {
			this.filterAction = cFilter.action;
			this.filterValue = cFilter.value;
			this.columnDataType = cFilter.datatype;
			this.selectedColumnName = cFilter.columnName;
			this.selectedColumnIndex = cFilter.columnIndex;
			this.myData = this.dTable.rows({ filter: 'applied' }).data();
			this.dTable.draw();
			this.dTable.columns(this.selectedColumnIndex).draw();
			// this.dTable.columns().draw();
		});
	}

	removeFilter(columnName, filterValue) {
		$('#customFilter').val("");
		const index = this.customFilters.findIndex(x => x.columnName === columnName && x.value === filterValue);
		if (index > -1) {
			this.customFilters.splice(index, 1);
		}
		if (this.customFilters.length) {
			this.applyFilters();
		} else {
			this.filterAction = '';
			this.filterValue = '';
			this.columnDataType = '';
			this.selectedColumnName = '';
			this.selectedColumnIndex = null;
			this.myData = this.dTable.rows().data();
			this.dTable.draw();
		}
	}

	resetData() {
		$('#customFilter').val("");
		$('input.table-search').val('');
		$('.c-box').prop("checked", true);
		$('toggle-all').prop("checked", true);
		$('.column-name').removeClass("unselected");
		this.dTable.
			search('').
			columns().search('').visible(true, true).order('asc').
			draw();
		$.fn.dataTable.ext.search = [];
		this.dTable.draw();
		this.customFilters = [];
		this.closeCustomFilter();

	}

	toggleColumn(column, cIndex) {
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

	togglecheckboxes(checkbox, cn) {
		let cbarray = document.getElementsByName(cn);
		cbarray.forEach((element, i) => {
			this.toggleColumn(element, i);
		});
		if ($('#toggle-all').prop("checked")) {
			$('.c-box').prop("checked", false);
		} else {
			$('.c-box').prop("checked", true);
		}
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
		console.log('Filter Application: ', operator);

		// console.log('data table data: ', $.fn.dataTable.ext.search);

		$.fn.dataTable.ext.search.push(
			function (settings, data, dataIndex) {
				console.log('settings: ', settings['aiDisplay'].length);
				if (that.columnDataType === 'number') {
					console.log(data[that.selectedColumnIndex]);
					const id = parseFloat(data[that.selectedColumnIndex]) || 0;
					if (that.filterValue !== '') {
						if (that.operators[that.filterAction](id, that.filterValue)) {
							return true;
						}
						return false;
					} else {
						return true;
					}
				} else {
					const stringt = data[that.selectedColumnIndex];
					if (that.filterValue !== '') {
						if (that.methodNames[that.filterAction](stringt, that.filterValue)) {
							return true;

						}
						return false;
					} else {
						return true;
					}
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
		$.notify({
			icon: icon,
			message: msg

		}, {
			type: type,
			timer: 4000,
			placement: {
				from: from,
				align: align
			}
		});
	}
	public changed(resource: any): void {
		if (resource[0].element.value != '') {
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


				this.checkColumnDataType(resourceData.result.fields);
			});
		}
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
