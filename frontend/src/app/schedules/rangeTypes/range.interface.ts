import { EventEmitter } from '@angular/core';

export interface RangeInterface {
    data: any;
    dataChange: EventEmitter<any>;
}

export interface StaticRangeInterface {
    GetDefaultData(): any;
}