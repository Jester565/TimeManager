import { Component, OnInit, Input } from '@angular/core';
import { staticImplements } from '../../../../common/static';
import { WidgetInterface, StaticWidgetInterface } from '../widget.interface';

@Component({
  selector: 'app-none-widget',
  templateUrl: './none-widget.component.html',
  styleUrls: ['./none-widget.component.css']
})
@staticImplements<StaticWidgetInterface>()
export class NoneWidgetComponent implements WidgetInterface, OnInit {
  static Name = "Unassigned";
  static TypeID = "none";
  @Input() dashboardID;
  @Input() widgetID;
  @Input() widget;
  constructor() { }

  ngOnInit(): void {
  }
}
