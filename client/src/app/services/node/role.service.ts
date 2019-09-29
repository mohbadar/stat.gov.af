import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const ROLE_BASE_URL = "/node-api/roles";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  loadAllRoles(): Observable<any> {
    return this.httpClient.get(`${ROLE_BASE_URL}/all`);
  }

  loadRole(id:string): Observable<any>
  {
    return this.httpClient.get(`${ROLE_BASE_URL}/one/${id}`);
  }

  create(data): Observable<any> 
  {
    return this.httpClient.post(`${ROLE_BASE_URL}/create`, data);
  }

  delete(id:string): Observable<any> {
    return this.httpClient.delete(`${ROLE_BASE_URL}/remove/${id}`);
  }


  update(data) :Observable<any> {
    return this.httpClient.put(`${ROLE_BASE_URL}/create`, data);
  }


}
