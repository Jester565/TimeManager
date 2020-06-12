import { Widget, Filter } from 'src/app/redux/dashboards';

export interface WidgetInterface {
    dashboardID: string;
    widgetID: string;
    filter: Filter;
    widget: Widget;
}

export interface StaticWidgetInterface {
    Name: string;
    TypeID: string;
}