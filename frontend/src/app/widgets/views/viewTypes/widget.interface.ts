import { Widget } from 'src/app/redux/dashboards';

export interface WidgetInterface {
    dashboardID: string;
    widgetID: string;
    widget: Widget;
}

export interface StaticWidgetInterface {
    Name: string;
    TypeID: string;
}