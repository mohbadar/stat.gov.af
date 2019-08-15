import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {

	constructor(translate: TranslateService) {
		translate.addLangs(['en', 'ps', 'dr']);
		translate.setDefaultLang('en');

		const browserLang: string = translate.getBrowserLang();
		translate.use(browserLang.match(/en|ps|dr/) ? browserLang : 'en');
	}
}



