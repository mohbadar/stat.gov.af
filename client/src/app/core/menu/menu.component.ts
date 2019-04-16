import _ from 'lodash';
import {
  Component,
  NgZone,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { MenuService, Menu, ChildrenItems } from './menu.service';
import { DashboardService } from '../helpers/dashboard.service';

import { TranslateService } from '@ngx-translate/core';
import { Globals } from './../helpers/globals';

@Component({
  selector: 'app-menu',
  template: `
    <mat-nav-list appAccordion class="navigation">
      <div *ngFor="let menuitem of menuService.getAll()">
        <mat-list-item appAccordionLink group="{{menuitem.state}}" *ngIf="menuitem.type !== 'divider' || menuitem.type !== 'title'">
          <a appAccordionToggle class="relative" [routerLink]="['/', menuitem.state]" *ngIf="menuitem.type === 'link'">
            <mat-icon>{{ menuitem.icon }}</mat-icon>
            <span>{{ menuitem.name | translate }}</span>
            <span fxFlex></span>
            <span class="menu-badge mat-{{ badge.type }}" *ngFor="let badge of menuitem.badge">{{ badge.value }}</span>
          </a>
          <a appAccordionToggle class="relative" href="{{ menuitem.state }}" *ngIf="menuitem.type === 'extLink'">
            <mat-icon>{{ menuitem.icon }}</mat-icon>
            <span>{{ menuitem.name | translate }}</span>
            <span fxFlex></span>
            <span class="menu-badge mat-{{ badge.type }}" *ngFor="let badge of menuitem.badge">{{ badge.value }}</span>
          </a>
          <a appAccordionToggle class="relative" href="{{ menuitem.state }}" target="_blank" *ngIf="menuitem.type === 'extTabLink'">
            <mat-icon>{{ menuitem.icon }}</mat-icon>
            <span>{{ menuitem.name | translate }}</span>
            <span fxFlex></span>
            <span class="menu-badge mat-{{ badge.type }}" *ngFor="let badge of menuitem.badge">{{ badge.value }}</span>
          </a>
          <a appAccordionToggle class="relative" href="javascript:;" *ngIf="menuitem.type === 'sub'">
            <mat-icon class="mat-icon material-icons" [svgIcon]="menuitem.icon">{{ menuitem.icon }}</mat-icon>
            <span>{{ menuitem.name | translate }}</span>
            <span fxFlex></span>
            <span class="menu-badge mat-{{ badge.type }}" *ngFor="let badge of menuitem.badge">{{ badge.value }}</span>
            <mat-icon class="menu-caret">arrow_drop_down</mat-icon>
          </a>
          <mat-nav-list class="sub-menu" *ngIf="menuitem.type === 'sub'">
            <mat-list-item *ngFor="let childitem of menuitem.children" routerLinkActive="open">
              <a [routerLink]="['/', menuitem.state, childitem.state ]" class="relative">{{ childitem.name | translate }}</a>
            </mat-list-item>
          </mat-nav-list>
        </mat-list-item>
        <mat-divider *ngIf="menuitem.type === 'divider'" class="my-1"></mat-divider>
        <h5 mat-subheader *ngIf="menuitem.type === 'title'">{{ menuitem.name | translate }}</h5>
      </div>
    </mat-nav-list>`,
  providers: [MenuService, DashboardService]
})
export class MenuComponent {
  currentLang = 'en';

  constructor(
    public menuService: MenuService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public translate: TranslateService,
    public dashboardService: DashboardService,
    public globals: Globals
  ) {
    iconRegistry.addSvgIcon(
      'graduate-cap',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/graduate-cap.svg')
    );

    iconRegistry.addSvgIcon(
      'open-book',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/open-book.svg')
    );

    iconRegistry.addSvgIcon(
      'medical-kit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/medical-kit.svg')
    );

    iconRegistry.addSvgIcon(
      'healthy-lifestyle',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/healthy-lifestyle.svg')
    );

    iconRegistry.addSvgIcon(
      'graduation-hat-and-diploma',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/graduation-hat-and-diploma.svg')
    );
    
    iconRegistry.addSvgIcon(
      'seeding',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/seeding.svg')
    );

    dashboardService.getAll().subscribe((data) => {
      if(data) {
        var menuItem = {
          state: 'dashboard',
          name: 'DASHBOARDS',
          type: 'sub',
          icon: 'multiline_chart',
          children: [
          ]
		};
		
		let uniqueTags = this.getUniqueTags(data['results']);

		uniqueTags.forEach(tag => {
			var menuItem = {
				state: "dashboard",
				name: tag.toUpperCase(),
				type: 'sub',
        icon: this.getMenuItemIcon(tag),
				children: [
				]
			};

			data['results'].forEach(item => {
				if(item.is_default) {
					this.globals.default_dashboard = item.slug;
				}

				if(item.tags.indexOf(tag) != -1) {
					menuItem.children.push({state: item.slug, name: this.parseTitleAsObject(item.name)});
				}
			});

			this.menuService.add(menuItem);
		});

        // data['results'].forEach(item => {

        //   menuItem.children.push({state: item.slug, name: item.name});
        //   if(item.is_default) {
        //     this.globals.default_dashboard = item.slug;
        //   }
        // });

        // this.menuService.removeMenuItemAt(3);
        // this.menuService.addMenuItemAt(menuItem, 3);
      }
    });
  }

  parseTitleAsObject(title) {
		try {
			let titleObj = JSON.parse(title);
			if(titleObj instanceof Object) {
				return titleObj[this.globals.lang];
			}
			return title;
		} catch(e) {
			return title;
		}
	}

	getUniqueTags(dashboards) {
		let tags = [];
		dashboards.forEach(item => {
			Array.prototype.push.apply(tags, item.tags);
		});
		tags = _.uniq(tags);
		tags.sort();
		return tags;
	}

  addMenuItem(): void {
    this.menuService.add({
      state: 'menu',
      name: 'MENU',
      type: 'sub',
      icon: 'trending_flat',
      children: [
        { state: 'menu', name: 'MENU' },
        { state: 'timeline', name: 'MENU' }
      ]
    });
  }

	getMenuItemIcon(tag) {
    let icon = tag;
    if (tag.toLowerCase().indexOf('living condition') != -1)
      return 'healthy-lifestyle';
    if (tag.toLowerCase().indexOf('hemis') != -1)
      return 'graduation-hat-and-diploma';
    if (tag.toLowerCase().indexOf('yearbook') != -1)
      return 'open-book';
    if (tag.toLowerCase().indexOf('health') != -1)
      return 'medical-kit';
    if (tag.toLowerCase().indexOf('agriculture') != -1)
			return 'seeding';
    if (tag.toLowerCase().indexOf('assessment') != -1)
      return 'assessment';
    if (tag.toLowerCase().indexOf('accessibility') != -1)
      return 'accessability';
    if (tag.toLowerCase().indexOf('directions') != -1)
      return 'directions_run';
    if (tag.toLowerCase().indexOf('people') != -1)
      return 'people';
    if (tag.toLowerCase().indexOf('wc') != -1)
      return 'wc';

    if (tag.toLowerCase().indexOf('kankor') != -1)
      return 'school';
		if (tag.toLowerCase().indexOf('health') != -1)
			return 'favorite';
		if (tag.toLowerCase().indexOf('statistics') != -1)
			return 'blur_on';
		if (tag.toLowerCase().indexOf('sheet') != -1)
			return 'library_books';
		
		if (tag.toLowerCase().indexOf('medical') != -1)
			return 'add_box';
		if (tag.toLowerCase().indexOf('hotel') != -1)
			return 'hotel';
		if (tag.toLowerCase().indexOf('traffic') != -1)
			return 'traffic';
		if (tag.toLowerCase().indexOf('knowledge') != -1)
      return 'book';
    if (tag.toLowerCase().indexOf('office') != -1)
      return 'work';
    if (tag.toLowerCase().indexOf('media') != -1)
      return 'radio';
    if (tag.toLowerCase().indexOf('history') != -1)
      return 'history';
    if (tag.toLowerCase().indexOf('industry') != -1)
      return 'markunread_mailbox';
      
    return icon.charAt(0);
	}
}
