import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { staticImplements } from 'src/app/common/static';
import { StaticWidgetConfigInterface, WidgetConfigInterface } from '../widget-config.interface';

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
  
  constructor() { }

  ngOnInit(): void {
  }

}
