import { StaticWidgetInterface } from './widget.interface';
import { CounterWidgetComponent } from './counter-widget/counter-widget.component';
import { LineChartWidgetComponent } from './line-chart-widget/line-chart-widget.component';
import { NoneWidgetComponent } from './none-widget/none-widget.component';
import { ActivityListWidgetComponent } from './activity-list-widget/activity-list-widget.component';

export const widgetComponents: StaticWidgetInterface[] = [
    CounterWidgetComponent,
    LineChartWidgetComponent,
    NoneWidgetComponent,
    ActivityListWidgetComponent
]