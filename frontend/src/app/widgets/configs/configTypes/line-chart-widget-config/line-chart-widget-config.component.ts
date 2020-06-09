import { Component, OnInit, Input } from '@angular/core';
import { WidgetConfigInterface, StaticWidgetConfigInterface } from '../widget-config.interface';
import { staticImplements } from '../../../../common/static';

@Component({
  selector: 'app-line-chart-widget-config',
  templateUrl: './line-chart-widget-config.component.html',
  styleUrls: ['./line-chart-widget-config.component.css']
})
@staticImplements<StaticWidgetConfigInterface>()
export class LineChartWidgetConfigComponent implements WidgetConfigInterface, OnInit {
  static Name = "Line Chart";
  static TypeID = "line-chart";
  @Input() dashboardID;
  @Input() widgetID;
  @Input() widget;
  constructor() { }

  ngOnInit(): void {
  }

}
