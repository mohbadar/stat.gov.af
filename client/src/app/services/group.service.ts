import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Group} from "../models/group";
 
@Injectable({
	providedIn: 'root'
})
export class GroupService {

	private baseUrl = '/api/groups';

	constructor(private http: HttpClient) { }

	getGroupsList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getGroup(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	createGroup(obj: Object): Observable<Object> {

		return this.http.post(`${this.baseUrl}`, obj);
	}

	updateGroup(id: number, value: Group): Observable<Object> {
		return this.http.put(`${this.baseUrl}/${id}`, value);
	}

	deleteGroup(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
	}
}
