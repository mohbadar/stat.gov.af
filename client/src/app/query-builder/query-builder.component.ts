import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx';
declare var $: any;

@Component({
	selector: 'app-query-builder',
	templateUrl: './query-builder.component.html',
	styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnInit, AfterViewInit {
	data = [];
	dataSheets = [];
	wSheetName: string;
	workBookName: string;
	columnDataTypes = [];
	columnDataType = '';
	selectedColumnIndex = 0;
	selectedColumnName = '';
	columnNames = [];
	action = 'Actions';
	applyMultiple = false;
	originalData;
	filterValue;
	filterAction;
	dTable;
	dtOptions = {
		'pagingType': 'full_numbers',
		'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
		'scrollX': true,
		responsive: true,
		// language: this.datatables.selectedJsonFile
	};
	constructor(private cdref: ChangeDetectorRef) { }

	ngOnInit() {
	}

	ngAfterViewInit() {

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
			console.log('workbook sheets: ', wb.SheetNames);
			this.dataSheets = wb.SheetNames;

			/* grab first sheet */
			this.wSheetName = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[this.wSheetName];

			console.log('ws: ', ws);


			/* save data */
			this.data = <Array<XLSX.AOA2SheetOpts>>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
			console.log('data is: ', this.data);
			// Get column names
			this.data[0].forEach(element => {
				const obj = {
					showColumn: true,
					name: element
				};
				this.columnNames.push(obj);
			});

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

			console.log('temp data: ', tempData);

			this.data = tempData;
			this.cdref.detectChanges();
			if (!$.fn.DataTable.isDataTable('#datatables')) {
				this.dTable = $('#datatables').DataTable(this.dtOptions);
				this.initializeTable();
			}

			// Save the original data before processing this data
			this.originalData = this.data;

			console.log('Updated data: ', this.data);


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
			$('#datatables tfoot th').each(function () {
				const title = $(this).text();
				$(this).html('<input type="text" class="table-search" placeholder="Search ' + title + '" />');
			});

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
		}, );
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

		console.log('Data Types: ', this.columnDataTypes);
	}

	showFilters(dataType, index) {
		this.columnDataType = dataType;
		this.selectedColumnIndex = index;
		this.action = 'Actions';
		this.selectedColumnName = this.columnNames[index].name;
		console.log('Column Data Type: ', this.columnDataType);
	}

	// Update the dataType of a column when users decides to do so
	updateDataType(newDataType) {
		console.log('dataTypes prior to change: ', this.columnDataTypes);

		this.columnDataTypes[this.selectedColumnIndex] = newDataType;
		console.log('dataTypes after the change: ', this.columnDataTypes);
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

		console.log('filter action: ', filterAction);

	}

	numberFilterHandler(filterAction) {
		switch (filterAction) {
			// the equal filter
			case 'flEq':
				this.equalFilterN();
				this.dTable.draw();
				const dData = this.dTable.rows({filter: 'applied'}).data();

				console.log('This table has data: ', dData.length);
				
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

		console.log('final data: ', this.data);

		if (this.columnDataType === 'number') {
			this.numberFilterHandler(this.filterAction)
		}
	}

	resetData() {

		this.data = this.data.map(dt => {
			dt.showRow = true;
			return dt;
		});
	}

	toggleColumn(column, cIndex) {
		this.columnDataType = '';
		$(column).closest('li').toggleClass('unselected');
		const checkBox = $(column).closest('li').find('input');
		if (!$(column).hasClass('c-box')) {
			$(column).closest('li').find('input').prop('checked', !checkBox.prop('checked'));
		}

		// this.columnNames[cIndex].showColumn = !this.columnNames[cIndex].showColumn;
		const dColumn = this.dTable.column(cIndex);
		console.log(dColumn);
		dColumn.visible(!dColumn.visible());
	}

	setFilteValue(vl) {
		console.log(vl);

		this.filterValue = vl;
	}

	/*******************************************************************
	 * Following methods are used to filter data
	 * the format is filteType+'Filter'+Type(N = 'number', S = 'String')
	 *******************************************************************/


	equalFilterN() {
		console.log('filtered value: ', this.filterValue);
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
				console.log('filter data: ', that.filterValue);
				if (that.filterValue !== '') {
					if (id == that.filterValue) {
						console.log('I will return');
						return true;
					}
					return false;
				} else {
					return true;
				}
			}
		);
	}


}
