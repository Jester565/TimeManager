import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { Chart } from '@antv/g2';
import { staticImplements } from 'src/app/common/static';
import { StaticWidgetInterface, WidgetInterface } from '../widget.interface';
import { Widget } from 'src/app/redux/dashboards';
import { title } from 'process';
import { interval } from 'rxjs';

@Component({
  selector: 'app-timer-widget',
  templateUrl: './timer-widget.component.html',
  styleUrls: ['./timer-widget.component.css']
})
@staticImplements<StaticWidgetInterface>()
export class TimerWidgetComponent implements WidgetInterface, OnInit, AfterContentInit {
  private chart: Chart;
  static Name = "Timer";
  static TypeID = "timer";
  @Input() dashboardID;
  @Input() widgetID;
  @Input() filter;
  @Input() widget;
  @Output() widgetChange = new EventEmitter<Widget>();
  
  private _createChart() {
    const data = [
      { title: 'Working', value: 40 },
      { title: 'Rest', value: 60 }
    ];

    const chart = new Chart({
      container: 'c1',
      autoFit: true,
      padding: 40,
      height: 500
    });
    chart.data(data);
    chart.legend(false);
    chart.tooltip({
      showMarkers: false,
      showContent: false
    });
    chart.coordinate();
    chart.coordinate('theta', {
      radius: 0.8,
      innerRadius: 0.5
    });
    chart.interval()
    .adjust('stack')
    .position('value')
    .color('title', ['#e91e63', '#404040'])
    .style({
      opacity: 1,
    });
    chart.annotation().text({
      position: [ '50%', '50%' ],
      content: (data[0] as any).title,
      style: {
        fontSize: 20,
        color: '#fff',
        fill: '#fff',
        stroke: '#fff',
        fontWeight: 3,
        textBaseline: 'bottom',
        textAlign: 'center'
      },
      offsetY: -12,
    });

    chart.annotation().text({
      position: ['50%', '50%'],
      content: (data[0] as any).value,
      style: {
        fontSize: 30,
        fontWeight: 5,
        color: '#fff',
        fill: '#fff',
        stroke: '#fff',
        textAlign: 'center'
      },
      offsetY: 10,
    });
    chart.interaction('element-active');
    
    chart.render();
    this.chart = chart;
    
    /*
    chart.facet('rect', {
      fields: ['title'],
      padding: 20,
      showTitle: false,
      eachView: (view, facet) => {
        const data = facet.data;
        data.push({ value: 100 - (data[0] as any).value });
        view.data(data);
        view.coordinate();
        view
        .interval()
        .adjust('stack')
        .position('value')
        .color('title', ['#404040', '#ffffff'])
        .style({
          opacity: 1,
        });
        view.annotation().text({
          position: [ '50%', '50%' ],
          content: (data[0] as any).title,
          style: {
            fontSize: 12,
            fill: '#8c8c8c',
            fontWeight: 300,
            textBaseline: 'bottom',
            textAlign: 'center'
          },
          offsetY: -12,
        });

        view.annotation().text({
          position: ['50%', '50%'],
          content: (data[0] as any).value,
          style: {
            fontSize: 18,
            fill: '#000',
            fontWeight: 500,
            textAlign: 'center'
          },
          offsetY: 10,
        });

        view.interaction('element-active');
      },
    });
    */
  }

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterContentInit(): void {
    this._createChart();
    const source = interval(1000);
    const text = 'Your Text Here';
    let i = 0;
    source.subscribe(val => {
      console.log(i);
      this.chart.data([
        { title: 'Working', value: i },
        { title: 'Rest', value: 100 - i }])
      this.chart.render(true);
      i++;
    });
  }
}
