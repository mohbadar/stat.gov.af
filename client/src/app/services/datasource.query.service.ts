import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatasourceQueryService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = "/api/queries";
  private nodeApi = '/node-api/queries';

  loadQueries(): Observable<any>
  {
    return this.httpClient.get(`${this.nodeApi}/all`);
  }

  loadQueryById(id:string): Observable<any>
  {
    return this.httpClient.get(`${this.nodeApi}/one/${id}`);
  }

  deleteQuery(id:string)
  {
      return this.httpClient.delete(`${this.nodeApi}/remove/${id}`);
  }

  createQuery(data): Observable<any>{
    return this.httpClient.post(`${this.nodeApi}/create`, data);
  }

}
