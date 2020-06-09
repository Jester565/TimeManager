import { Component, OnInit, Input } from '@angular/core';
import { Widget } from '../../../redux/dashboards';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../../redux/root';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  @Input() dashboardID: string;
  @Input() widgetID: string;
  @Input() widget: Widget;
  constructor(private ngRedux: NgRedux<AppState>) { }

  ngOnInit(): void {
  }
}
