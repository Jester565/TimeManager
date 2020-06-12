import { Component, OnInit, Input } from '@angular/core';
import { staticImplements } from '../../../../common/static';
import { WidgetInterface, StaticWidgetInterface } from '../widget.interface';

@Component({
  selector: 'app-line-chart-widget',
  templateUrl: './line-chart-widget.component.html',
  styleUrls: ['./line-chart-widget.component.css']
})
@staticImplements<StaticWidgetInterface>()
export class LineChartWidgetComponent implements WidgetInterface, OnInit {
  static Name = "Line Chart";
  static TypeID = "line-chart";
  @Input() dashboardID;
  @Input() widgetID;
  @Input() filter;
  @Input() widget;
  constructor() { }

  ngOnInit(): void {
  }

}
