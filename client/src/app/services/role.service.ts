import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {Role} from "../models/role";
 
@Injectable({
	providedIn: 'root'
})
export class RoleService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/roles';
	private permissionUrl = '/api/permissions';

	constructor(private http: HttpClient) { }

	getPermissionsList(): Observable<any> {
		return this.http.get(`${this.permissionUrl}`);
	}

	getRolesList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
 
	getRole(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/${id}`);
	}

	createRole(obj: Object): Observable<Object> {

		return this.http.post(`${this.baseUrl}`, obj);
	}

	updateRole(id: number, value: Role): Observable<Object> {
	 console.log("in the update method the role is:"+JSON.stringify(value));
		return this.http.put(`${this.baseUrl}/${id}`, value);
	}

	deleteRole(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
	}

}
