import { OnInit } from '@angular/core';
import { IAdaptableBlotterOptions } from 'adaptableblotter/types';
import { GridOptions } from 'ag-grid-community';
import 'ag-grid-enterprise';
export declare class AdaptableblotterAgGridComponent implements OnInit {
    adaptableBlotterOptions: IAdaptableBlotterOptions;
    gridOptions: GridOptions;
    agTheme?: 'balham' | 'balham-dark' | 'material' | 'fresh' | 'dark' | 'blue' | 'bootstrap';
    agDivStyle?: any;
    agGridClass: string;
    constructor();
    ngOnInit(): void;
}
