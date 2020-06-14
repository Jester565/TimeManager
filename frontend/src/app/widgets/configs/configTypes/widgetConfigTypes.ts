import { CounterWidgetConfigComponent } from './counter-widget-config/counter-widget-config.component'
import { LineChartWidgetConfigComponent } from './line-chart-widget-config/line-chart-widget-config.component';
import { NoneWidgetConfigComponent } from './none-widget-config/none-widget-config.component';
import { StaticWidgetConfigInterface } from './widget-config.interface';
import { ActivityListWidgetConfigComponent } from './activity-list-widget-config/activity-list-widget-config.component';
import { ClockerWidgetComponent } from '../../views/viewTypes/clocker-widget/clocker-widget.component';

export const widgetConfigComponents: StaticWidgetConfigInterface[] = [
    CounterWidgetConfigComponent,
    LineChartWidgetConfigComponent,
    ActivityListWidgetConfigComponent,
    ClockerWidgetComponent,
    NoneWidgetConfigComponent
]