import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const PERMISSIONS_BASE_URL = "/node-api/permissions";
@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private httpClient: HttpClient) { }

  public loadAllPermissions(): Observable<any> {
    return this.httpClient.get(`${PERMISSIONS_BASE_URL}/all`);
  }

  


}
