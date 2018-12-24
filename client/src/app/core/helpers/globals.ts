import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    lang: string = 'en';
    options = {
        dark: false,
        boxed: false,
        collapsed: true,
        dir: 'ltr'
    };
    default_dashboard;
}