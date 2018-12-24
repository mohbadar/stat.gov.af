import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QueryService {

    constructor(private httpClient:HttpClient) {    }

    getQueryResult(queryId) {
        return this.httpClient.get(environment.apiUrl + 'query_results/' + queryId);
    }
}
