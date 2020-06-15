import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { WidgetConfigInterface, StaticWidgetConfigInterface } from '../widget-config.interface';
import { staticImplements } from 'src/app/common/static';
import { Widget } from 'src/app/redux/dashboards';

@Component({
  selector: 'app-activity-list-widget-config',
  templateUrl: './activity-list-widget-config.component.html',
  styleUrls: ['./activity-list-widget-config.component.css']
})
@staticImplements<StaticWidgetConfigInterface>()
export class ActivityListWidgetConfigComponent implements OnInit, WidgetConfigInterface {
  static Name = "Activity List";
  static TypeID = "activity-list";
  @Input() dashboardID;
  @Input() widgetID;
  @Input() widget;
  @Output() widgetChange = new EventEmitter<Widget>();

  constructor() { }

  ngOnInit(): void {
  }

}
