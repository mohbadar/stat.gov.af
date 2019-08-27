import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Permission } from '../models/permission';
 
@Injectable({
	providedIn: 'root'
})
export class PermissionService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/permissions';


	constructor(private http: HttpClient) { }


	getPermissionsList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getPermission(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}
}