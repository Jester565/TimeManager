import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ComponentRef } from '@angular/core';
import { Widget, updateWidget } from '../../../redux/dashboards';
import { StaticWidgetConfigInterface, WidgetConfigInterface } from '../configTypes/widget-config.interface';
import { WidgetConfigDirective } from '../widget-config.directive';
import { widgetConfigComponents } from '../configTypes/widgetConfigTypes';
import { StaticWidgetInterface } from '../../views/viewTypes/widget.interface';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/redux/root';
import _ from 'lodash';

@Component({
  selector: 'app-widget-config',
  templateUrl: './widget-config.component.html',
  styleUrls: ['./widget-config.component.css']
})
export class WidgetConfigComponent implements OnInit {
  private widgetConfigTypeRef: ComponentRef<any> = null;
  private _dashboardID: string = null;
  get dashboardID(): string {
    return this._dashboardID;
  }
  
  @Input('dashboardID')
  set dashboardID(val: string) {
    this._dashboardID = val;
    if (this.widgetConfigTypeRef) {
      (<WidgetConfigInterface>this.widgetConfigTypeRef.instance).dashboardID = this.dashboardID;
    }
  }

  private _widgetID: string = null;
  get widgetID(): string {
    return this._widgetID;
  }

  @Input('widgetID')
  set widgetID(val: string) {
    this._widgetID = val;
    if (this.widgetConfigTypeRef) {
      (<WidgetConfigInterface>this.widgetConfigTypeRef.instance).widgetID = this.widgetID;
    }
  }

  private _widget: Widget = null;
  get widget(): Widget {
    return this._widget;
  }

  @Input('widget')
  set widget(val: Widget) {
    this._widget = val;
    for (let widgetConfigType of widgetConfigComponents) {
      if (widgetConfigType.TypeID == this.widget.type) {
        this.applyWidgetConfigType(widgetConfigType);
      }
    }
    if (this.widgetConfigTypeRef) {
      (<WidgetConfigInterface>this.widgetConfigTypeRef.instance).widget = this.widget;
    }
  }

  widgetConfigType: StaticWidgetConfigInterface = null;
  widgetConfigTypes: StaticWidgetConfigInterface[] = [];
  @ViewChild(WidgetConfigDirective, {static: true}) widgetConfigHost: WidgetConfigDirective;
  constructor(private ngRedux: NgRedux<AppState>, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    for (let widgetConfigType of widgetConfigComponents) {
      this.widgetConfigTypes.push(widgetConfigType);
    }
  }

  setWidgetConfigType(widgetConfigType: StaticWidgetConfigInterface) {
    this.applyWidgetConfigType(widgetConfigType);
    let newWidget = _.cloneDeep(this.widget);
    newWidget.type = widgetConfigType.TypeID;
    this.ngRedux.dispatch(updateWidget(this.dashboardID, this.widgetID, newWidget));
  }

  applyWidgetConfigType(widgetConfigType: StaticWidgetConfigInterface) {
    this.widgetConfigType = widgetConfigType;
    const componentFactory = 
      this.componentFactoryResolver.resolveComponentFactory(widgetConfigType as any);
    const viewContainerRef = this.widgetConfigHost.viewContainerRef;
    viewContainerRef.clear();
    this.widgetConfigTypeRef = viewContainerRef.createComponent(componentFactory);
    (<WidgetConfigInterface>this.widgetConfigTypeRef.instance).dashboardID = this.dashboardID;
    (<WidgetConfigInterface>this.widgetConfigTypeRef.instance).widgetID = this.widgetID;
    (<WidgetConfigInterface>this.widgetConfigTypeRef.instance).widget = this.widget;
  }

  onWidgetChange(widget) {
    if (widget != null) {
      this.ngRedux.dispatch(updateWidget(this.dashboardID, this.widgetID, widget));
    }
  }

  onLeft(left) {
    if (left != null && left.length > 0) {
      let newWidget = _.cloneDeep(this.widget);
      newWidget.position.left = parseInt(left);
      this.ngRedux.dispatch(updateWidget(this.dashboardID, this.widgetID, newWidget));
    }
  }

  onTop(top) {
    if (top != null && top.length > 0) {
      let newWidget = _.cloneDeep(this.widget);
      newWidget.position.top = parseInt(top);
      this.ngRedux.dispatch(updateWidget(this.dashboardID, this.widgetID, newWidget));
    }
  }

  onWidth(width) {
    if (width != null && width.length > 0) {
      let newWidget = _.cloneDeep(this.widget);
      newWidget.position.width = parseInt(width);
      this.ngRedux.dispatch(updateWidget(this.dashboardID, this.widgetID, newWidget));
    }
  }

  onHeight(height) {
    if (height != null && height.length > 0) {
      let newWidget = _.cloneDeep(this.widget);
      newWidget.position.height = parseInt(height);
      this.ngRedux.dispatch(updateWidget(this.dashboardID, this.widgetID, newWidget));
    }
  }
}
