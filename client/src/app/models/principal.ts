export class Principal {
    public authenticated: boolean;
    public authorities: Authority[] = [];
    public credentials: any;
    public environments: any = [];
    public selectedEnv: String;
    public selectedLang: String;
 
    constructor(authenticated: boolean, authorities: any[], credentials: any, environments: any[], selectedEnv: String, selectedLang: String) {
        this.authenticated = authenticated;
        authorities.map(
            authority => this.authorities.push(new Authority(authority)))
        this.credentials = credentials;
        this.environments = environments;
        this.selectedEnv = selectedEnv;
        this.selectedLang = selectedLang;
    }
 
    isAdmin() {
        return this.authorities.some(
          (auth: Authority) => auth.authority.indexOf('ADMIN') > -1)
    }

	hasAuthority(requestAuthArray: Array<string>) {
        // requestAuthArray.every(reqAuth =>{
        //     if(!this.authorities.includes(new Authority(reqAuth))){
        //         return false;
        //     }
        // })
        // return true;
		return requestAuthArray.every((a) => {
			return this.authorities.some((auth: Authority) => auth.authority.indexOf(a) > -1)
		});
	}
}
 
export class Authority {
    public authority: String;
 
    constructor(authority: String) {
        this.authority = authority;
    }
}


// https://www.baeldung.com/spring-cloud-angular