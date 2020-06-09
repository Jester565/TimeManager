import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Dashboard, Widget, updateWidget } from '../redux/dashboards';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/root';
import _ from 'lodash';
import { GridsterConfig, GridsterItem, DisplayGrid, GridType, CompactType }  from 'angular-gridster2';
import { ThrowStmt } from '@angular/compiler';

interface DisplayWidget {
  id: string,
  widget: Widget,
  item: GridsterItem
}

@Component({
  selector: 'app-dashboard-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.css']
})
export class DashboardBodyComponent implements OnInit {
  options: GridsterConfig;
  widgets: DisplayWidget[] = [];
  items: GridsterItem[] = [];

  private _dashboard: Dashboard = null;
  get dashboard(): Dashboard {
    return this._dashboard;
  }

  @Input('dashboard')
  set dashboard(val: Dashboard) {
    this._dashboard = val;
    let changeOccured = false;
    for (let widgetID in val.widgets) {
      let widget = val.widgets[widgetID];
      let convertedPos = { 
        rows: widget.position.height,
        cols: widget.position.width,
        x: widget.position.left,
        y: widget.position.top
      };
      let displayWidget: DisplayWidget = _.find(this.widgets, { id: widgetID });
      if (displayWidget != null) {
        if (!_.isMatch(displayWidget.item, convertedPos)) {
          console.log("Change detected");
          Object.apply(displayWidget.item, convertedPos);
          changeOccured = true;
        }
      } else {
        this.widgets.push({
          id: widgetID,
          widget,
          item: convertedPos
        });
        changeOccured = true;
      }
    }
    if (changeOccured) {
      this.items = _.map(this.widgets, 'item');
    }
  }

  constructor(private ngRedux: NgRedux<AppState>, private cdrf: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.options = {
      itemChangeCallback: (item: GridsterItem, itemComponent) => {
        let itemI = _.indexOf(this.items, item);
        let displayWidget = this.widgets[itemI];
        let widget = displayWidget.widget;
        let convertedPos = { 
          height: item.rows,
          width: item.cols,
          left: item.x,
          top: item.y
        };
        
        if (!_.isEqual(widget.position, convertedPos)) {
          let newWidget = _.cloneDeep(widget);
          newWidget.position = convertedPos;
          this.ngRedux.dispatch(updateWidget(this.dashboard.id, displayWidget.id, newWidget));
        }
      },
      gridType: GridType.ScrollVertical,
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.Always,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };
  }
}
