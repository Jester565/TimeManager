import { CounterWidgetConfigComponent } from './counter-widget-config/counter-widget-config.component'
import { LineChartWidgetConfigComponent } from './line-chart-widget-config/line-chart-widget-config.component';
import { NoneWidgetConfigComponent } from './none-widget-config/none-widget-config.component';
import { StaticWidgetConfigInterface } from './widget-config.interface';
import { ActivityListWidgetConfigComponent } from './activity-list-widget-config/activity-list-widget-config.component';
import { ClockerWidgetConfigComponent } from './clocker-widget-config/clocker-widget-config.component';
import { TimerWidgetConfigComponent } from './timer-widget-config/timer-widget-config.component';

export const widgetConfigComponents: StaticWidgetConfigInterface[] = [
    CounterWidgetConfigComponent,
    LineChartWidgetConfigComponent,
    ActivityListWidgetConfigComponent,
    ClockerWidgetConfigComponent,
    TimerWidgetConfigComponent,
    NoneWidgetConfigComponent
]