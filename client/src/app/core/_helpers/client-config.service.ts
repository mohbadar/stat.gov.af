import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClientConfigService {
    SESSION_ITEM = 'session';
    session = { loaded: false, client_config: {}};

    constructor() {
        Object.assign(this, this.getLocalSessionData().client_config);
    }

    getLocalSessionData() {
        if (this.session.loaded) {
          return this.session;
        }
      
        const sessionData = window.sessionStorage.getItem(this.SESSION_ITEM);
        if (sessionData) {
          this.storeSession(JSON.parse(sessionData));
        }
      
        return this.session;
    }

    storeSession(sessionData) {
        Object.assign(this.session, sessionData, { loaded: true });
    }

}
