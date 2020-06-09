import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-filter-directive]'
})
export class FilterDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }
}
