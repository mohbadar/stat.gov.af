import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatasourceWidgetService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = "/api/dashboards";
  private nodeApi = '/node-api/widgets';

  loadWidgets(): Observable<any>
  {
    return this.httpClient.get(`${this.nodeApi}`);
  }

  loadWidgetById(id:string): Observable<any>
  {
    return this.httpClient.get(`${this.nodeApi}/${id}`);
  }

  deleteWidget(id:string)
  {
      return this.httpClient.delete(`${this.nodeApi}/${id}`);
  }

  createWiget(data): Observable<any>{
    return this.httpClient.post(`${this.nodeApi}`, data);
  }
}
