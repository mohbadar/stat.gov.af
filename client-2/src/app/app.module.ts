import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// Angular Material
import {
	MatSidenavModule,
	MatMenuModule,
	MatCheckboxModule,
	MatIconModule,
	MatButtonModule,
	MatToolbarModule,
	MatTooltipModule,
	MatListModule,
	MatProgressBarModule,
	MatSelectModule,
	MatCardModule,
	MatInputModule,
	MatProgressSpinnerModule,
	MatChipsModule,
	MatGridListModule,
	MatBottomSheetModule
} from '@angular/material';
// Angular Flexlayout
import { FlexLayoutModule } from '@angular/flex-layout';
// ngx-translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// ngx-loading-bar
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
// ngx-perfect-scrollbar
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// google maps
import { AgmCoreModule } from '@agm/core';

// Template core components
import {
	MenuComponent,
	SidebarComponent,
	AdminLayoutComponent,
	AuthLayoutComponent,
	DefaultLayoutComponent,
	HeaderComponent,
	OptionsComponent,
	AccordionAnchorDirective,
	AccordionLinkDirective,
	AccordionDirective,
	DashboardComponent,
	WidgetComponent,
	IFrameBottomSheet,
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
} from './core';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

import { DynamicTableComponent } from './core/visualization/grid-renderer/dynamic-table/dynamic-table.component';
import { DefaultCellComponent } from './core/visualization/grid-renderer/dynamic-table/default-cell/default-cell.component';
import { JsonCellComponent } from './core/visualization/grid-renderer/dynamic-table/json-cell/json-cell.component';
import { DynamicTableRowComponent } from './core/visualization/grid-renderer/dynamic-table-row.component';

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
		SidebarComponent,
		MenuComponent,
		AdminLayoutComponent,
		AuthLayoutComponent,
		HeaderComponent,
		OptionsComponent,
		// DashboardListComponent,
		AccordionAnchorDirective,
		AccordionLinkDirective,
		AccordionDirective,
		DashboardComponent,
		WidgetComponent,
		IFrameBottomSheet,
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
		SafeHtmlPipe
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(AppRoutes),
		LeafletModule.forRoot(),
		FormsModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		}),
		MatSidenavModule,
		MatMenuModule,
		MatCheckboxModule,
		MatIconModule,
		MatButtonModule,
		MatToolbarModule,
		MatTooltipModule,
		MatListModule,
		MatSelectModule,
		MatProgressBarModule,
		MatCardModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatChipsModule,
		MatGridListModule,
		MatBottomSheetModule,
		FlexLayoutModule,
		LoadingBarRouterModule,
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
		IFrameBottomSheet
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
