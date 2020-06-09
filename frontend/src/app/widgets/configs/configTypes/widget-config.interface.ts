import { Widget } from 'src/app/redux/dashboards';

export interface WidgetConfigInterface {
    dashboardID: string;
    widgetID: string;
    widget: Widget;
}

export interface StaticWidgetConfigInterface {
    Name: string;
    TypeID: string;
}