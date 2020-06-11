import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { StaticRangeInterface, RangeInterface } from '../rangeTypes/range.interface';
import { RangeDirective } from '../range.directive';

@Component({
  selector: 'app-range-wrapper',
  templateUrl: './range-wrapper.component.html',
  styleUrls: ['./range-wrapper.component.css']
})
export class RangeWrapperComponent implements OnInit {
  private _data: any;

  @Output()
  dataChange = new EventEmitter<any>();

  @Input()
  get data(){
    return this._data;
  }

  set data(val) {
    this._data = val;
    if (this._component) {
      this._component.data = this._data;
    }
    this.dataChange.emit(this._data);
  }

  private _component: RangeInterface;
  
  @Input() rangeType: StaticRangeInterface;
  @ViewChild(RangeDirective, {static: true}) rangeHost: RangeDirective;
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    const componentFactory = 
      this.componentFactoryResolver.resolveComponentFactory(this.rangeType as any);
    const viewContainerRef = this.rangeHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    this._component = (<RangeInterface>componentRef.instance);
    this._component.data = this.data;
    this._component.dataChange.subscribe((event) => {
      this.dataChange.emit(event);
    });
  }
}
