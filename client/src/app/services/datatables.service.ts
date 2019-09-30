import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import * as enJson from '../../assets/dataTable_i18n/en.json';
import * as drJson from '../../assets/dataTable_i18n/dr.json';
import * as psJson from '../../assets/dataTable_i18n/ps.json';

@Injectable({
	providedIn: 'root'
})
export class DatatablesService {

	callToServiceMethodSource = new Subject<any>();

	private baseUrl = '/api/datasource';
	private enJson = enJson;
	private drJson = drJson;
	private psJson = psJson;
	public selectedJsonFile;

	constructor(private http: HttpClient) { }

	callServiceCmpMethod(langType) {
		console.log('data source method called');
		this.translateDataTables(langType);
		console.log('Data fetched: ', this.selectedJsonFile);

		this.callToServiceMethodSource.next(this.selectedJsonFile);
	}

	translateDataTables(langType) {
		// fetching the right translation of dataTables
		switch (langType) {
			case 'en':
				this.selectedJsonFile = this.enJson;
				break;
			case 'dr':
				this.selectedJsonFile = this.drJson;
				break;
			case 'ps':
				this.selectedJsonFile = this.psJson;
				break;
			default:
				this.selectedJsonFile = this.enJson;
				break;
		}

	}
}
