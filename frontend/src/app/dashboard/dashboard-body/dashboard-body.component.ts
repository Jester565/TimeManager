import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Dashboard, Widget, updateWidget } from '../../redux/dashboards';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../redux/root';
import _ from 'lodash';
import { GridsterConfig, GridsterItem, DisplayGrid, GridType, CompactType }  from 'angular-gridster2';

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

  private updateDisplayWidgets = (widgets) => {
    let newDisplayWidgets = [];
    for (let widgetID in widgets) {
      let widget = widgets[widgetID];
      let convertedPos = { 
        rows: widget.position.height,
        cols: widget.position.width,
        x: widget.position.left,
        y: widget.position.top
      };
      let displayWidget: DisplayWidget = _.find(this.widgets, { id: widgetID });
      if (displayWidget != null) {
        if (!_.isMatch(displayWidget.item, convertedPos)) {
          Object.assign(displayWidget.item, convertedPos);
        }
        displayWidget.widget = widget;
        newDisplayWidgets.push(displayWidget);
      } else {
        newDisplayWidgets.push({
          id: widgetID,
          widget,
          item: convertedPos
        });
      }
    }
    this.widgets = newDisplayWidgets;
  }

  private updateEditting = (editting) => {
    //may be called before init
    if (this.options) {
      if (this.options.draggable.enabled != editting) {
        this.options.draggable.enabled = editting;
        this.options.resizable.enabled = editting;
        this.options.displayGrid = (editting)? DisplayGrid.Always: DisplayGrid.None;
        this.options.api.optionsChanged();
      }
    }
  }

  private _dashboard: Dashboard = null;
  get dashboard(): Dashboard {
    return this._dashboard;
  }

  @Input('dashboard')
  set dashboard(val: Dashboard) {
    this._dashboard = val;
    this.updateDisplayWidgets(val.widgets);
    this.updateEditting(val.editting);
  }

  constructor(private ngRedux: NgRedux<AppState>, private cdrf: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.options = {
      itemChangeCallback: (item: GridsterItem, itemComponent) => {
        let itemI = _.findIndex(this.widgets, {item});
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
      minCols: 5,
      maxCols: 100,
      minRows: 5,
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
        enabled: false,
      },
      resizable: {
        enabled: false,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };
  }
}
