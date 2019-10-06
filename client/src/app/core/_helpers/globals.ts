import { Injectable } from '@angular/core';
import { Principal } from 'app/models/principal';
import { AuthPrincipal } from '../../admin/node/AuthPrinicipal';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class Globals {
    lang: string = 'en';
    dashboardList = [];
    options = {
        dark: false,
        boxed: false,
        collapsed: true,
        dir: 'ltr'
    };
    default_dashboard;

    principal: Principal = new Principal(null, [], [], [], null, null);

    public isDashboardListUpdated: BehaviorSubject<boolean> = new BehaviorSubject(false);
}