import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-widget-directive]'
})
export class WidgetDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
