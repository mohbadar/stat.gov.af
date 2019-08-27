import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { share } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private baseUrl = '/api/users';
    constructor(private http: HttpClient) { }

    getUsersList(): Observable<any> {
        return this.http.get<Array<any>>(`${this.baseUrl}`);
    }

    getUser(id: number): Observable<Object> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    createUser(obj: Object): Observable<Object> {
        return this.http.post(`${this.baseUrl}`, obj);
    }

    updateUser(id: number, value: any): Observable<Object> {
        console.log('at the updated method of the service the value of the user is:', JSON.stringify(value));
        return this.http.put(`${this.baseUrl}/${id}`, value);
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }

    updateUserInfo(id: number, data: any) {
        return this.http.put(`${this.baseUrl}/profile/${id}`, data);
    }
    updatePreferences(data){
        console.log('sending: ', data);
        
        return this.http.put(`${this.baseUrl}/preferences`, data)
    }
 
}
