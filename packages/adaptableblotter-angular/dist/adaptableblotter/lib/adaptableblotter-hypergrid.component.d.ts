import { OnInit, ElementRef, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { IAdaptableBlotterOptions } from 'adaptableblotter/types';
export declare class AdaptableblotterHyperGridComponent implements OnInit, OnChanges {
    private elRef;
    private grid;
    gridLoaded: boolean;
    adaptableBlotterOptions: IAdaptableBlotterOptions;
    gridOptions?: any;
    data?: Array<any>;
    /**
     * Emits the mounted Hypergrid object for any specific settings.
     */
    gridMounted: EventEmitter<any>;
    constructor(elRef: ElementRef);
    ngOnInit(): void;
    /**
     * Update the grid on input changes.
     * Need our own update logic since hypergrid doesn't have an Angular wrapper.
     */
    ngOnChanges(changes: SimpleChanges): void;
    onAdaptableBlotterMount(adaptableBlotter: any): void;
}
