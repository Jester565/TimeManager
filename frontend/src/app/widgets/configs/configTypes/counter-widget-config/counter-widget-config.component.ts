import { Component, OnInit, Input } from '@angular/core';
import { WidgetConfigInterface, StaticWidgetConfigInterface } from '../widget-config.interface';
import { staticImplements } from '../../../../common/static';

@Component({
  selector: 'app-counter-widget-config',
  templateUrl: './counter-widget-config.component.html',
  styleUrls: ['./counter-widget-config.component.css']
})
@staticImplements<StaticWidgetConfigInterface>()
export class CounterWidgetConfigComponent implements WidgetConfigInterface, OnInit {
  static Name = "Counter";
  static TypeID = "counter";
  @Input() dashboardID;
  @Input() widgetID;
  @Input() widget;
  constructor() { }

  ngOnInit(): void {
  }

}
