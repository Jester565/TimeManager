import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-range-directive]'
})
export class RangeDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }
}
