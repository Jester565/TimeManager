import { Widget } from 'src/app/redux/dashboards';
import { EventEmitter } from '@angular/core';

export interface WidgetConfigInterface {
    dashboardID: string;
    widgetID: string;
    widget: Widget;
    widgetChange: EventEmitter<Widget>;
}

export interface StaticWidgetConfigInterface {
    Name: string;
    TypeID: string;
}