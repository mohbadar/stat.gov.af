
import { APP_BASE_HREF } from '@angular/common';

import { SidebarModule } from './core/sidebar/sidebar.module';
import { FixedPluginModule } from './core/fixedplugin/fixedplugin.module';
import { FooterModule } from './core/footer/footer.module';
import { NavbarModule } from './core/navbar/navbar.module';
import { PagesnavbarModule } from './core/pagesnavbar/pagesnavbar.module';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
// ngx-translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// ngx-loading-bar
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// ngx-perfect-scrollbar
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// google maps
import { AgmCoreModule } from '@agm/core';

import { ReactiveFormsModule } from '@angular/forms';

import {
	PublicLayoutComponent,
	AuthLayoutComponent,
	DefaultLayoutComponent
} from './core';

import { VisualizeComponent } from './visualize/visualize.component';

// Template core components
import {
	DashboardComponent,
	WidgetComponent,
	VisualizationRendererComponent,
	BoxplotRendererComponent,
	ChartRendererComponent,
	ChoroplethRendererComponent,
	CohortRendererComponent,
	CounterRendererComponent,
	FunnelRendererComponent,
	MapRendererComponent,
	PivotTableRendererComponent,
	SankeyRendererComponent,
	SunburstSequenceRendererComponent,
	GridRendererComponent,
	WordCloudRendererComponent,

	PlotlyChartComponent,
	CustomPlotlyChartComponent,

	Globals
} from './';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

import { DynamicTableComponent } from './visualization/grid-renderer/dynamic-table/dynamic-table.component';
import { DefaultCellComponent } from './visualization/grid-renderer/dynamic-table/default-cell/default-cell.component';
import { JsonCellComponent } from './visualization/grid-renderer/dynamic-table/json-cell/json-cell.component';
import { DynamicTableRowComponent } from './visualization/grid-renderer/dynamic-table-row.component';

import { GridStackModule } from 'ng4-gridstack';
import { CookieService } from 'ngx-cookie-service';

import { ShareModule } from '@ngx-share/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { WidgetPageComponent } from './widget-page/widget-page.component';
import { SafeHtmlPipe } from './_pipes/safe-html.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// import { DashboardListComponent } from './dashboard/dashboard-list/dashboard-list.component';

export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	wheelSpeed: 2,
	wheelPropagation: true
};

@NgModule({
	declarations: [
		AppComponent,
		PublicLayoutComponent,
		AuthLayoutComponent,
		DashboardComponent,
		WidgetComponent,
		VisualizationRendererComponent,
		BoxplotRendererComponent,
		ChartRendererComponent,
		ChoroplethRendererComponent,
		CohortRendererComponent,
		CounterRendererComponent,
		FunnelRendererComponent,
		MapRendererComponent,
		PivotTableRendererComponent,
		SankeyRendererComponent,
		SunburstSequenceRendererComponent,
		GridRendererComponent,
		WordCloudRendererComponent,
		PlotlyChartComponent,
		CustomPlotlyChartComponent,
		DynamicTableComponent,
		DefaultCellComponent,
		JsonCellComponent,
		DynamicTableRowComponent,
		WidgetPageComponent,
		DefaultLayoutComponent,
		SafeHtmlPipe,
		VisualizeComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(AppRoutes),
		LeafletModule.forRoot(),
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		}),
		BrowserAnimationsModule,
		RouterModule.forRoot(AppRoutes, {
			useHash: false
		}),
		PagesnavbarModule,
		SidebarModule,
		NavbarModule,
		ToastrModule.forRoot(),
		FooterModule,
		FixedPluginModule,
		LoadingBarRouterModule,
		LoadingBarHttpClientModule,
		GridStackModule,
		LoadingBarModule.forRoot(),
		AgmCoreModule.forRoot({
			apiKey: 'YOURAPIKEY'
		}),
		PerfectScrollbarModule,
		PlotlyModule,
		NgxDatatableModule,
		ShareModule,
		FontAwesomeModule,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],
	entryComponents: [
	],
	providers: [
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},
		Globals,
		CookieService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
