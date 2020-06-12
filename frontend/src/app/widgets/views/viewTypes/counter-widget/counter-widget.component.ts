import { Component, OnInit, Input } from '@angular/core';
import { staticImplements } from '../../../../common/static';
import { WidgetInterface, StaticWidgetInterface } from '../widget.interface';

@Component({
  selector: 'app-counter-widget',
  templateUrl: './counter-widget.component.html',
  styleUrls: ['./counter-widget.component.css']
})
@staticImplements<StaticWidgetInterface>()
export class CounterWidgetComponent implements WidgetInterface, OnInit {
  static Name = "Counter";
  static TypeID = "counter";
  @Input() dashboardID;
  @Input() widgetID;
  @Input() filter;
  @Input() widget;
  constructor() { }

  ngOnInit(): void {
  }

}
