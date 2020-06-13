import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { staticImplements } from '../../../../common/static';
import { WidgetInterface, StaticWidgetInterface } from '../widget.interface';
import { ActivityRateService } from 'src/app/activity-rate.service';
import { Chart } from '@antv/g2';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { FilterComponent } from 'src/app/filters/filter/filter.component';

@Component({
  selector: 'app-line-chart-widget',
  templateUrl: './line-chart-widget.component.html',
  styleUrls: ['./line-chart-widget.component.css']
})
@staticImplements<StaticWidgetInterface>()
export class LineChartWidgetComponent implements WidgetInterface, AfterViewInit {
  static Name = "Line Chart";
  static TypeID = "line-chart";
  public elmID = uuidv4();
  private chart: Chart;
  private rateSubscription: Subscription = null;
  private _filter: any = null;
  @Input() dashboardID;
  @Input() widgetID;
  
  get filter() {
    return this._filter;
  }
  @Input('filter')
  set filter(val) {
    if (this._filter == null || !_.isEqual(this._filter, val)) {
      this._filter = val;
      if (this.chart != null) {
        this.subToData();
      }
    }
  }
  @Input() widget;

  private _initChart() {
    this.chart = new Chart({
      container: this.elmID,
      height: 500,
      padding: 100
    })
    
    this.chart.scale({
      time: {
        type: 'timeCat',
        mask: "MM-DD-YYYY hh:mm A"
      },
      activityTime: {
        nice: true,
      }
    });
    
    this.chart.tooltip({
      showCrosshairs: true,
      shared: true
    });

    let formatActivityTime = (activityTime) => {
      let mins = activityTime;
      if (Math.abs(mins) >= 60) {
        return `${(mins < 0)? '-': ''}${Math.floor(Math.abs(mins) / 60)}h ${Math.floor(Math.abs(mins)) % 60}m`;
      } else {
        return `${Math.floor(mins)}m`
      }
    }

    this.chart.axis('activityTime', {
      label: {
        formatter: (val: any) => {
          return formatActivityTime(val);
        },
      },
    });
    
    this.chart
      .line()
      .position('time*activityTime')
      .color('activity');
  }

  constructor(private activityRateService: ActivityRateService) {
    
  }

  ngAfterViewInit() {
    this._initChart();
    if (this.filter != null) {
      this.subToData();
    }
  }

  subToData() {
    if (this.rateSubscription != null) {
      this.rateSubscription.unsubscribe();
    }
    let range = FilterComponent.ExecuteFilter(this.filter);
    console.log("RANGE: ", range);
    this.rateSubscription = this.activityRateService.subActivityRates(range.start, range.end).subscribe((data) => {
      if (data != null) {
        data = _.map(data, (point) => {
          return {
            ...point,
            time: moment.unix(point.time).utc(false).local(true).utc(false).valueOf(),
            activityTime: Math.trunc(point.activityTime / 60.0)
          }
        })
        console.log("Activity rate sub result: ", data);
        this.chart.data(data);
        this.chart.render();
      }
    })
  }

  onResized(event) {
    this.chart.forceFit();
  }
}
