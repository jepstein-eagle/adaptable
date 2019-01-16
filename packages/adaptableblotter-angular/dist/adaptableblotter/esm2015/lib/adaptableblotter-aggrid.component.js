/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import 'ag-grid-enterprise';
export class AdaptableblotterAgGridComponent {
    constructor() {
        this.agTheme = 'balham';
        this.agDivStyle = { width: '100%', height: '90%', position: 'absolute', margin: '0px' };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.agGridClass = `ag-theme-${this.agTheme}`;
    }
}
AdaptableblotterAgGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'adaptable-blotter-aggrid',
                template: `<div id="adaptableBlotter-angular-aggrid">
    <div id="adaptableBlotter">
      <adaptable-blotter
        [adaptableBlotterOptions]="adaptableBlotterOptions"
        vendorGridName="agGrid">
      </adaptable-blotter>
    </div>
    <div id="grid">
      <ag-grid-angular
        [gridOptions]="gridOptions"
        [className]="agGridClass"
        [ngStyle]="agDivStyle">
      </ag-grid-angular>
    </div>
  </div>`
            }] }
];
/** @nocollapse */
AdaptableblotterAgGridComponent.ctorParameters = () => [];
AdaptableblotterAgGridComponent.propDecorators = {
    adaptableBlotterOptions: [{ type: Input }],
    gridOptions: [{ type: Input }],
    agTheme: [{ type: Input }],
    agDivStyle: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AdaptableblotterAgGridComponent.prototype.adaptableBlotterOptions;
    /** @type {?} */
    AdaptableblotterAgGridComponent.prototype.gridOptions;
    /** @type {?} */
    AdaptableblotterAgGridComponent.prototype.agTheme;
    /** @type {?} */
    AdaptableblotterAgGridComponent.prototype.agDivStyle;
    /** @type {?} */
    AdaptableblotterAgGridComponent.prototype.agGridClass;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRhYmxlYmxvdHRlci1hZ2dyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYWRhcHRhYmxlYmxvdHRlci1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL2FkYXB0YWJsZWJsb3R0ZXItYWdncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHekQsT0FBTyxvQkFBb0IsQ0FBQztBQW9CNUIsTUFBTTtJQVFKO3VCQUxxRyxRQUFROzBCQUNqRixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7S0FJaEY7Ozs7SUFFakIsUUFBUTtRQUNOLElBQUksQ0FBQyxXQUFXLEdBQUcsWUFBWSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDL0M7OztZQTlCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztTQWNIO2FBQ1I7Ozs7O3NDQUVFLEtBQUs7MEJBQ0wsS0FBSztzQkFDTCxLQUFLO3lCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSUFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zIH0gZnJvbSAnYWRhcHRhYmxlYmxvdHRlci90eXBlcyc7XHJcbmltcG9ydCB7IEdyaWRPcHRpb25zIH0gZnJvbSAnYWctZ3JpZCc7XHJcbmltcG9ydCAnYWctZ3JpZC1lbnRlcnByaXNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYWRhcHRhYmxlLWJsb3R0ZXItYWdncmlkJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgaWQ9XCJhZGFwdGFibGVCbG90dGVyLWFuZ3VsYXItYWdncmlkXCI+XHJcbiAgICA8ZGl2IGlkPVwiYWRhcHRhYmxlQmxvdHRlclwiPlxyXG4gICAgICA8YWRhcHRhYmxlLWJsb3R0ZXJcclxuICAgICAgICBbYWRhcHRhYmxlQmxvdHRlck9wdGlvbnNdPVwiYWRhcHRhYmxlQmxvdHRlck9wdGlvbnNcIlxyXG4gICAgICAgIHZlbmRvckdyaWROYW1lPVwiYWdHcmlkXCI+XHJcbiAgICAgIDwvYWRhcHRhYmxlLWJsb3R0ZXI+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgaWQ9XCJncmlkXCI+XHJcbiAgICAgIDxhZy1ncmlkLWFuZ3VsYXJcclxuICAgICAgICBbZ3JpZE9wdGlvbnNdPVwiZ3JpZE9wdGlvbnNcIlxyXG4gICAgICAgIFtjbGFzc05hbWVdPVwiYWdHcmlkQ2xhc3NcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cImFnRGl2U3R5bGVcIj5cclxuICAgICAgPC9hZy1ncmlkLWFuZ3VsYXI+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5gLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWRhcHRhYmxlYmxvdHRlckFnR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgYWRhcHRhYmxlQmxvdHRlck9wdGlvbnM6IElBZGFwdGFibGVCbG90dGVyT3B0aW9ucztcclxuICBASW5wdXQoKSBncmlkT3B0aW9uczogR3JpZE9wdGlvbnM7XHJcbiAgQElucHV0KCkgYWdUaGVtZT86ICdiYWxoYW0nIHwgJ2JhbGhhbS1kYXJrJyB8ICdtYXRlcmlhbCcgfCAnZnJlc2gnIHwgJ2RhcmsnIHwgJ2JsdWUnIHwgJ2Jvb3RzdHJhcCcgPSAnYmFsaGFtJztcclxuICBASW5wdXQoKSBhZ0RpdlN0eWxlPzogYW55ID0geyB3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICc5MCUnLCBwb3NpdGlvbjogJ2Fic29sdXRlJywgbWFyZ2luOiAnMHB4JyB9O1xyXG5cclxuICBhZ0dyaWRDbGFzczogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYWdHcmlkQ2xhc3MgPSBgYWctdGhlbWUtJHt0aGlzLmFnVGhlbWV9YDtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==