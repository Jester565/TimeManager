import { Widget, Filter } from 'src/app/redux/dashboards';
import { EventEmitter } from '@angular/core';

export interface WidgetInterface {
    dashboardID: string;
    widgetID: string;
    filter: Filter;
    widget: Widget;
    widgetChange: EventEmitter<Widget>;
}

export interface StaticWidgetInterface {
    Name: string;
    TypeID: string;
}