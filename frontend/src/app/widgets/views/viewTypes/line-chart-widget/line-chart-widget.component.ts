import { Component, OnInit, Input } from '@angular/core';
import { staticImplements } from '../../../../common/static';
import { WidgetInterface, StaticWidgetInterface } from '../widget.interface';
import { ActivityRateService } from 'src/app/activity-rate.service';
import { Chart } from '@antv/g2';

@Component({
  selector: 'app-line-chart-widget',
  templateUrl: './line-chart-widget.component.html',
  styleUrls: ['./line-chart-widget.component.css']
})
@staticImplements<StaticWidgetInterface>()
export class LineChartWidgetComponent implements WidgetInterface, OnInit {
  static Name = "Line Chart";
  static TypeID = "line-chart";
  private chart: Chart;
  @Input() dashboardID;
  @Input() widgetID;
  @Input() filter;
  @Input() widget;
  constructor(private activityRateService: ActivityRateService) {
    
  }

  ngOnInit(): void {
    const chart = new Chart({
      container: 'c1',
      autoFit: true,
      height: 500,
    });
    
    chart.scale({
      activityTime: {
        nice: true,
      },
    });
    
    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });
    
    chart.axis('activityTime', {
      label: {
        formatter: (val: any) => {
          let mins = val / 60;
          if (mins >= 60) {
            return `${Math.floor(mins / 60)}h ${Math.floor(mins)}m`;
          } else {
            return `${Math.floor(mins)}m`
          }
        },
      },
    });
    
    chart
      .line()
      .position('time*activityTime')
      .color('activity');
    this.activityRateService.subActivityRates(1591747200, 1591920000).subscribe((data) => {
      if (data != null) {
        console.log("Activity rate sub result: ", data);
        chart.data(data);
        chart.render();
      }
    })
  }
}
