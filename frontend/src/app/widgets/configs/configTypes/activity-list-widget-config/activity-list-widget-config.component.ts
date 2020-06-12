import { Component, OnInit, Input } from '@angular/core';
import { WidgetConfigInterface, StaticWidgetConfigInterface } from '../widget-config.interface';
import { staticImplements } from 'src/app/common/static';

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

  constructor() { }

  ngOnInit(): void {
  }

}
