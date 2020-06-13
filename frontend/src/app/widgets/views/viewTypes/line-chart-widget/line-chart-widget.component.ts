import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { staticImplements } from '../../../../common/static';
import { WidgetInterface, StaticWidgetInterface } from '../widget.interface';
import { ActivityRateService } from 'src/app/activity-rate.service';
import { Chart } from '@antv/g2';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import moment from 'moment';
import { TooltipCrosshairsText, TooltipCrosshairsTextCallback } from '@antv/g2/lib/interface';

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
  @Input() dashboardID;
  @Input() widgetID;
  @Input() filter;
  @Input() widget;
  constructor(private activityRateService: ActivityRateService) {
    
  }

  ngAfterViewInit(): void {
    this.chart = new Chart({
      container: this.elmID,
      height: 500,
      padding: 70
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
      if (mins >= 60) {
        return `${Math.floor(mins / 60)}h ${Math.floor(mins) % 60}m`;
      } else {
        return `${Math.floor(mins)}m`
      }
    }
    
    this.chart

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
    this.activityRateService.subActivityRates(1591747200, 1591920000).subscribe((data) => {
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
