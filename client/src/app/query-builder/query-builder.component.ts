import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-query-builder',
	templateUrl: './query-builder.component.html',
	styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnInit {
	data;
	dataSheets = [];
	wSheetName: string;
	workBookName: string;
	columDataTypes = [];
	constructor() { }

	ngOnInit() {
	}

	onFileChange(evt: any) {
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
			this.data = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
			console.log('data is: ', this.data);
			this.checkColumnDataType();

		};
		reader.readAsBinaryString(target.files[0]);
	}

	checkColumnDataType() {
		let isInteger;
		let isUndefined;
		for (let i = 0; i < this.data[0].length; i++) {
			isInteger = true;
			isUndefined = true;
			for (let j = 1; j < this.data.length; j++) {
				console.log('Item: ', this.data[j][i]);
				if (this.data[j][i] !== undefined) {
					isUndefined = false;
					if (!(/^[0-9]\d*(\.\d+)?$/).test(this.data[j][i])) {
						isInteger = false;
						break;
					}
				}

			}
			if (!isUndefined) {
				isInteger ? this.columDataTypes.push('number') : this.columDataTypes.push('string');
			} else {
				this.columDataTypes.push('undefined');
			}
			// isInteger = true;
			// for (let j = 1; j < 11; j++) {
			// 	if (!(/[+-]?([0-9]*[.])?[0-9]+/g).test(this.data[j][i])) {
			// 		isInteger = false;
			// 		break;
			// 	}
			// }
			// isInteger ? this.columDataTypes.push('number') : this.columDataTypes.push('string');
		}

		console.log('Data Types: ', this.columDataTypes);
	}

}
