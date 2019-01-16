import { OnInit, ElementRef, EventEmitter } from '@angular/core';
import { IAdaptableBlotterOptions } from 'adaptableblotter/types';
export declare class AdaptableBlotterComponent implements OnInit {
    private elRef;
    adaptableBlotterOptions: IAdaptableBlotterOptions;
    vendorGridName: 'agGrid' | 'Hypergrid' | 'Kendo' | 'AdaptableGrid';
    adaptableBlotterMounted: EventEmitter<any>;
    private adaptableBlotter;
    constructor(elRef: ElementRef);
    ngOnInit(): void;
}
