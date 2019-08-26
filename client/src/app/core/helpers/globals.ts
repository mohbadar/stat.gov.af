import { Injectable } from '@angular/core';

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
}