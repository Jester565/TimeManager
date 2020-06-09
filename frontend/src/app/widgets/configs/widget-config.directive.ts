import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-widget-config-directive]'
})
export class WidgetConfigDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }
}
