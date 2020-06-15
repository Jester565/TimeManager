import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WidgetConfigInterface, StaticWidgetConfigInterface } from '../widget-config.interface';
import { staticImplements } from 'src/app/common/static';
import { Widget } from 'src/app/redux/dashboards';

@Component({
  selector: 'app-clocker-widget-config',
  templateUrl: './clocker-widget-config.component.html',
  styleUrls: ['./clocker-widget-config.component.css']
})
@staticImplements<StaticWidgetConfigInterface>()
export class ClockerWidgetConfigComponent implements WidgetConfigInterface, OnInit {
  static Name = "Clock In & Out";
  static TypeID = "clocker";
  @Input() dashboardID;
  @Input() widgetID;
  @Input() widget;
  @Output() widgetChange = new EventEmitter<Widget>();
  
  constructor() { }

  ngOnInit(): void {
  }
}
