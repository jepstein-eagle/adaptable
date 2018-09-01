import { OnInit, ElementRef } from '@angular/core';
import { IAdaptableBlotterOptions } from 'adaptableblotter/types';
export declare class AdaptableBlotterComponent implements OnInit {
    private elRef;
    adaptableBlotterOptions: IAdaptableBlotterOptions;
    vendorGridName: 'agGrid' | 'Hypergrid' | 'Kendo' | 'AdaptableGrid';
    private adaptableBlotter;
    constructor(elRef: ElementRef);
    ngOnInit(): void;
}
