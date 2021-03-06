import { Component, OnInit, Input, ComponentRef, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { Widget, setConfigWidgetID, removeWidget, Filter, updateWidget } from '../../../redux/dashboards';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../../redux/root';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmCancelDialog } from '../../../app-common/app-common.module';
import { WidgetInterface, StaticWidgetInterface } from '../viewTypes/widget.interface';
import { WidgetDirective } from '../widget.directive';
import { widgetComponents } from '../viewTypes/widgetTypes';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ThrowStmt } from '@angular/compiler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width: '45px',
        opacity: 1
      })),
      state('closed', style({
        width: '0px',
        opacity: 0.5
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
  ],
})
export class WidgetComponent implements OnInit, OnDestroy {
  private widgetTypeRef: ComponentRef<any> = null;
  private _widgetSubscription: Subscription = null;

  @Input() editting: boolean = false;

  private _dashboardID: string = null;
  get dashboardID(): string {
    return this._dashboardID;
  }
  
  @Input('dashboardID')
  set dashboardID(val: string) {
    this._dashboardID = val;
    if (this.widgetTypeRef) {
      (<WidgetInterface>this.widgetTypeRef.instance).dashboardID = this.dashboardID;
    }
  }

  private _widgetID: string = null;
  get widgetID(): string {
    return this._widgetID;
  }

  @Input('widgetID')
  set widgetID(val: string) {
    this._widgetID = val;
    if (this.widgetTypeRef) {
      (<WidgetInterface>this.widgetTypeRef.instance).widgetID = this.widgetID;
    }
  }

  private _filter: Filter = null;
  get filter(): Filter {
    return this._filter;
  }

  @Input('filter')
  set filter(val: Filter) {
    this._filter = val;
    if (this.widgetTypeRef) {
      (<WidgetInterface>this.widgetTypeRef.instance).filter = this.filter;
    }
  }

  private _widget: Widget = null;
  get widget(): Widget {
    return this._widget;
  }

  @Input('widget')
  set widget(val: Widget) {
    this._widget = val;
    for (let widgetType of widgetComponents) {
      if (widgetType.TypeID == this.widget.type) {
        this.applyWidgetType(widgetType);
      }
    }
    if (this.widgetTypeRef) {
      (<WidgetInterface>this.widgetTypeRef.instance).widget = this.widget;
    }
  }

  widgetType: StaticWidgetInterface = null;

  @ViewChild(WidgetDirective, {static: true}) widgetHost: WidgetDirective;
  constructor(private ngRedux: NgRedux<AppState>,
    private componentFactoryResolver: ComponentFactoryResolver,
    public dialog: MatDialog) { }
  ngOnDestroy(): void {
    if (this._widgetSubscription) {
      this._widgetSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    
  }

  applyWidgetType(widgetType: StaticWidgetInterface) {
    if (this.widgetType != widgetType) {
      this.widgetType = widgetType;
      const componentFactory = 
        this.componentFactoryResolver.resolveComponentFactory(widgetType as any);
      const viewContainerRef = this.widgetHost.viewContainerRef;
      viewContainerRef.clear();
      this.widgetTypeRef = viewContainerRef.createComponent(componentFactory);
      (<WidgetInterface>this.widgetTypeRef.instance).dashboardID = this.dashboardID;
      (<WidgetInterface>this.widgetTypeRef.instance).widgetID = this.widgetID;
      (<WidgetInterface>this.widgetTypeRef.instance).widget = this.widget;
      (<WidgetInterface>this.widgetTypeRef.instance).filter = this.filter;
      this._widgetSubscription = (<WidgetInterface>this.widgetTypeRef.instance).widgetChange.subscribe(this.onWidgetChange.bind(this));
    }
  }

  onWidgetChange(widget) {
    if (widget != null) {
      this.ngRedux.dispatch(updateWidget(this.dashboardID, this.widgetID, widget));
    }
  }

  onEdit() {
    this.ngRedux.dispatch(setConfigWidgetID(this.dashboardID, this.widgetID));
  }

  onRemove() {
    const dialogRef = this.dialog.open
    (ConfirmCancelDialog, {
      width: '600px',
      data: {
        title: `Delete ${this.widgetType.Name} Widget?`,
        content: ""
      }
    })
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.ngRedux.dispatch(removeWidget(this.dashboardID, this.widgetID));
      }
    })
  }
}
