import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state?: string;
  name?: string;
  type: string;
  icon?: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    type: 'title',
    name: 'MAIN'
  },
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'explore'
  },
  {
    type: 'divider'
  },
  // {
  //   state: 'dashbaord',
  //   name: 'DASHBOARDS',
  //   type: 'sub',
  //   icon: 'multiline_chart',
  //   children: [
  //   ]
  // },
  // {
  //   type: 'divider'
  // }
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu) {
    MENUITEMS.push(menu);
  }

  addMenuItemAt(menu, location) {
    // MENUITEMS.push(menu);
    MENUITEMS.splice(location, 0, menu);
  }

  removeMenuItemAt(location) {
    MENUITEMS.splice(location, 1);
  }
}
