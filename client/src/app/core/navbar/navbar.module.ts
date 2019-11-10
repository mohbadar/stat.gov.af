import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { HttpClient } from '@angular/common/http';
// ngx-translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, '.././assets/i18n/', '.json');
}

@NgModule({
	imports: [
		RouterModule,
		CommonModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		}),
	],
	declarations: [NavbarComponent],
	exports: [NavbarComponent]
})

export class NavbarModule { }
