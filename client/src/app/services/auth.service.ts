import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Principal } from '../models/principal';
import { Globals } from '../core/_helpers/globals';

export interface UserDetails {
	id: number;
	name: string;
	username: string;
	exp: number;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	token;
	principal: Principal = new Principal(false, [], [], [], null, null);
	userName;

	redirectUrl = "/";

	private baseUrl = '/api';
	private nodeApi = '/node-api';
	private tokenName = 'stat_aut_token';

	constructor(private http: HttpClient, private router: Router, private globals: Globals) { }

	removeToken() {
		this.token = '';
		window.localStorage.removeItem(this.tokenName);
	}

	reloadCurrentPage() {
		window.location.reload();
	}

	routeToCustomPage(page: string) {
		this.router.navigateByUrl(page);
	}

	routeToLoginPage(clearAuthToken?: boolean) {
		if (clearAuthToken) {
			this.token = null;
			localStorage.removeItem(this.tokenName);
		}
		// this.router.navigateByUrl('/login');
		window.location.href = '/login';
	}

	routeToHomePage(clearAuthToken?: boolean) {
		if (clearAuthToken) {
			this.token = null;
			localStorage.removeItem(this.tokenName);
		}
		this.router.navigateByUrl('/');
	}

	routeToLandingPage() {
		// TODO: this path have to be taken from login user profile.
		this.router.navigateByUrl('/');
	}

	routeToPreferencePage() {
		// TODO: this path have to be taken from login user profile.
		this.router.navigateByUrl('/preferences');
	}

	public saveToken(token: string) {
		localStorage.setItem(this.tokenName, token);
		this.token = token;
	}

	public getToken(): string {
		if (!this.token) {
			this.token = localStorage.getItem(this.tokenName);
		}
		return this.token;
	}

	public isLoggedIn(): boolean {
		const user = this.getUserDetails();
		if (user) {
			return user.exp > Date.now() / 1000;
		} else {
			return false;
		}
	}

	public getUserDetails(): UserDetails {
		const token = this.getToken();
		let payload;
		if (token && token != "undefined") {
			payload = token.split('.')[1];
			payload = window.atob(payload);
			return JSON.parse(payload);
		} else {
			return null;
		}
	}

	public authenticate(): Observable<any> {
		return this.http.get('/api/user');
	}

	public login(data: any) {
		this.token = null;
		localStorage.removeItem(this.tokenName);
		return this.http.post(`${this.nodeApi}/auth/login`, data);
	}

	public createUser(userDetails) {
		return this.http.post(`${this.nodeApi}/auth/signup`, userDetails);
	}

	public logout() {
		this.token = null;
		localStorage.removeItem('auth_token');
		localStorage.removeItem('authPrincipal')
		localStorage.removeItem(this.tokenName);
		// return this.http.post('/api/logout', '');
		return true;
	}

	getProfile(): Observable<Object> {
		return this.http.get(`${this.baseUrl}/profile`);
	}

	updateAvatar(obj: Object): Observable<any> {
		return this.http.patch(`${this.baseUrl}/avatar`, obj);
	}

	updateConfig(obj: Object): Observable<any> {
		return this.http.put(`${this.baseUrl}/config`, obj);
	}

	getConfig(): Observable<any> {
		return this.http.get(`${this.baseUrl}/config`);
	}

	getProfilePicture(): Observable<any> {
		return this.http.get(`${this.baseUrl}/user/profile-picture`);
	}

	getImage(url: string): Observable<any> {
		return this.http.get(`${this.baseUrl}/${url}`);
	}

	// public isAuthenticated(): Observable<any> {
	//     return this.http.get(`${this.baseUrl}`, { headers: { Authorization: `Bearer ${this.getToken()}`}});
	// }

	public isAdmin() {
		if(JSON.parse(localStorage.getItem('authPrincipal')))
		{
			return true;
		}
		return false;
	}
}
