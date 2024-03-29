import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DatasourceDashboardService {

	constructor(private httpClient: HttpClient) { }

	private baseUrl = "/api/dashboards";
	private nodeApi = '/node-api/dashboards';

	load(): Observable<any> {
		return this.httpClient.get(`${this.nodeApi}/all`);
	}

	loadById(id: string): Observable<any> {
		return this.httpClient.get(`${this.nodeApi}/one/${id}`);
	}

	delete(id: string) {
		return this.httpClient.delete(`${this.nodeApi}/remove/${id}`);
	}

	create(data): Observable<any> {
		return this.httpClient.post(`${this.nodeApi}/create`, data);
	}
}
