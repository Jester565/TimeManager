import { Component, OnInit, Input, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { staticImplements } from 'src/app/common/static';
import { StaticWidgetConfigInterface, WidgetConfigInterface } from '../widget-config.interface';
import { Widget } from 'src/app/redux/dashboards';

@Component({
  selector: 'app-timer-widget-config',
  templateUrl: './timer-widget-config.component.html',
  styleUrls: ['./timer-widget-config.component.css']
})
@staticImplements<StaticWidgetConfigInterface>()
export class TimerWidgetConfigComponent implements  WidgetConfigInterface, OnInit {
  static Name = "Timer";
  static TypeID = "timer";
  @Input() dashboardID;
  @Input() widgetID;
  @Input() widget;
  @Output() widgetChange = new EventEmitter<Widget>();
  
  constructor() { }

  ngOnInit(): void {
  }

}
