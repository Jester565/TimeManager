import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { staticImplements } from '../../../../common/static';
import { WidgetInterface, StaticWidgetInterface } from '../widget.interface';
import { Widget } from 'src/app/redux/dashboards';

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
  @Input() filter;
  @Input() widget;
  @Output() widgetChange = new EventEmitter<Widget>();
  constructor() { }

  ngOnInit(): void {
  }
}
