import { Injectable } from '@angular/core';
import { HttpClient, HttpXhrBackend } from "@angular/common/http";
import { environment } from '../../../environments/environment';

const staticHttpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
const statucBaseUrl = 'api/public';

@Injectable({ providedIn: 'root' })
export class QueryService {

    constructor(private httpClient:HttpClient) {    }

    static getQueryResult(queryId) {
        return staticHttpClient.get(`${statucBaseUrl}/query_results/` + queryId);
    }
}
