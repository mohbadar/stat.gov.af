import { Widget } from './widget';

export const dashboardGridOptions = {
    columns: 6, // grid columns count
    rowHeight: 50, // grid row height (incl. bottom padding)
    margins: 15, // widget margins
    mobileBreakPoint: 800,
    // defaults for widgets
    defaultSizeX: 3,
    defaultSizeY: 3,
    minSizeX: 1,
    maxSizeX: 6,
    minSizeY: 1,
    maxSizeY: 1000,
  };
  
export class Dashboard {
    id: number;
    name: string;
    tags: any;
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    widgets: Widget[];
}
