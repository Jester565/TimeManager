import { Component, OnInit, Input } from '@angular/core';
import { Widget } from '../../../redux/dashboards';

@Component({
  selector: 'app-widget-config',
  templateUrl: './widget-config.component.html',
  styleUrls: ['./widget-config.component.css']
})
export class WidgetConfigComponent implements OnInit {
  @Input() dashboardID: string;
  @Input() widgetID: string;
  @Input() widget: Widget;

  constructor() { }

  ngOnInit(): void {
  }

}
