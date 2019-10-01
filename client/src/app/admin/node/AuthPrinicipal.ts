export class AuthPrincipal {
    public authenticated: boolean;
    public authorities: Authority[] = [];
    public credentials: any;
    public  token: any;

    constructor(authenticated: boolean, authorities: any[], token: any) {
        this.authenticated = authenticated;
        authorities.map(
            authority => this.authorities.push(new Authority(authority)))
        this.token = token;
    }

    hasAuthority(requestAuthArray: Array<string>) {
        console.log("Name", requestAuthArray);
        
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
