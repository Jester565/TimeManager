import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { FilterDirective } from '../filter.directive';
import { filterComponents } from '../filterTypes/filterTypes';
import { Filter } from '../../redux/dashboards';
import { FilterInterface, StaticFilterInterface } from '../filterTypes/filter.interface';
import { Range } from 'src/app/schedules/schedule';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filterType: StaticFilterInterface = null;
  filterTypes: StaticFilterInterface[] = [];
  static ExecuteFilter(filter): Range {
    for (let filterType of filterComponents) {
      if (filterType.TypeID == filter.type) {
        return filterType.ExecuteFilter(filter.config);
      }
    }
    console.log("No matching filter type, returning unfiltered");
    return {start: null, end: null};
  }
  @Input() filter: Filter;
  @ViewChild(FilterDirective, {static: true}) filterHost: FilterDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    for (let filterType of filterComponents) {
      this.filterTypes.push(filterType);
      if (filterType.TypeID == this.filter.type) {
        this.setFilterType(filterType);
      }
    }
  }

  setFilterType(filterType: StaticFilterInterface) {
    this.filter.type = filterType.TypeID;
    this.filterType = filterType;
    const componentFactory = 
      this.componentFactoryResolver.resolveComponentFactory(filterType as any);
    const viewContainerRef = this.filterHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<FilterInterface>componentRef.instance).filterConfig = this.filter.config;
  }
}
