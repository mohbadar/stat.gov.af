import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class DatasourceService {

	callToServiceMethodSource = new Subject<any>();


	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/datasource';

	constructor(private http: HttpClient) { }

	getDatasourceList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}

	getDatasource(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	createDatasource(obj: Object): Observable<Object> {
		return this.http.post(`${this.baseUrl}`, obj);
	}

	updateDatasource(id: number, value: any): Observable<Object> {
		return this.http.put(`${this.baseUrl}/${id}`, value);
	}

	deleteDatasource(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
	}
}
