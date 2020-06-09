import { Component, OnInit, Input } from '@angular/core';
import { WidgetConfigInterface, StaticWidgetConfigInterface } from '../widget-config.interface';
import { staticImplements } from '../../../../common/static';

@Component({
  selector: 'app-none-widget-config',
  templateUrl: './none-widget-config.component.html',
  styleUrls: ['./none-widget-config.component.css']
})
@staticImplements<StaticWidgetConfigInterface>()
export class NoneWidgetConfigComponent implements WidgetConfigInterface, OnInit {
  static Name = "Unassigned";
  static TypeID = "none";
  @Input() dashboardID;
  @Input() widgetID;
  @Input() widget;
  constructor() { }

  ngOnInit(): void {
  }

}
