import { Component, OnInit, Input } from '@angular/core';
import { WidgetConfigInterface, StaticWidgetConfigInterface } from '../widget-config.interface';
import { staticImplements } from 'src/app/common/static';

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
  constructor() { }

  ngOnInit(): void {
  }
}
