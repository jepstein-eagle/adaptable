/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import 'ag-grid-enterprise';
var AdaptableblotterAgGridComponent = /** @class */ (function () {
    function AdaptableblotterAgGridComponent() {
        this.agTheme = 'balham';
        this.agDivStyle = { width: '100%', height: '90%', position: 'absolute', margin: '0px' };
    }
    /**
     * @return {?}
     */
    AdaptableblotterAgGridComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.agGridClass = "ag-theme-" + this.agTheme;
    };
    AdaptableblotterAgGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'adaptable-blotter-aggrid',
                    template: "<div id=\"adaptableBlotter-angular-aggrid\">\n    <div id=\"adaptableBlotter\">\n      <adaptable-blotter\n        [adaptableBlotterOptions]=\"adaptableBlotterOptions\"\n        vendorGridName=\"agGrid\">\n      </adaptable-blotter>\n    </div>\n    <div id=\"grid\">\n      <ag-grid-angular\n        [gridOptions]=\"gridOptions\"\n        [className]=\"agGridClass\"\n        [ngStyle]=\"agDivStyle\">\n      </ag-grid-angular>\n    </div>\n  </div>"
                }] }
    ];
    /** @nocollapse */
    AdaptableblotterAgGridComponent.ctorParameters = function () { return []; };
    AdaptableblotterAgGridComponent.propDecorators = {
        adaptableBlotterOptions: [{ type: Input }],
        gridOptions: [{ type: Input }],
        agTheme: [{ type: Input }],
        agDivStyle: [{ type: Input }]
    };
    return AdaptableblotterAgGridComponent;
}());
export { AdaptableblotterAgGridComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRhYmxlYmxvdHRlci1hZ2dyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYWRhcHRhYmxlYmxvdHRlci1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL2FkYXB0YWJsZWJsb3R0ZXItYWdncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHekQsT0FBTyxvQkFBb0IsQ0FBQzs7SUE0QjFCO3VCQUxxRyxRQUFROzBCQUNqRixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7S0FJaEY7Ozs7SUFFakIsa0RBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFZLElBQUksQ0FBQyxPQUFTLENBQUM7S0FDL0M7O2dCQTlCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsUUFBUSxFQUFFLG9jQWNIO2lCQUNSOzs7OzswQ0FFRSxLQUFLOzhCQUNMLEtBQUs7MEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzswQ0EzQlI7O1NBdUJhLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJQWRhcHRhYmxlQmxvdHRlck9wdGlvbnMgfSBmcm9tICdhZGFwdGFibGVibG90dGVyL3R5cGVzJztcclxuaW1wb3J0IHsgR3JpZE9wdGlvbnMgfSBmcm9tICdhZy1ncmlkJztcclxuaW1wb3J0ICdhZy1ncmlkLWVudGVycHJpc2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhZGFwdGFibGUtYmxvdHRlci1hZ2dyaWQnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBpZD1cImFkYXB0YWJsZUJsb3R0ZXItYW5ndWxhci1hZ2dyaWRcIj5cclxuICAgIDxkaXYgaWQ9XCJhZGFwdGFibGVCbG90dGVyXCI+XHJcbiAgICAgIDxhZGFwdGFibGUtYmxvdHRlclxyXG4gICAgICAgIFthZGFwdGFibGVCbG90dGVyT3B0aW9uc109XCJhZGFwdGFibGVCbG90dGVyT3B0aW9uc1wiXHJcbiAgICAgICAgdmVuZG9yR3JpZE5hbWU9XCJhZ0dyaWRcIj5cclxuICAgICAgPC9hZGFwdGFibGUtYmxvdHRlcj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBpZD1cImdyaWRcIj5cclxuICAgICAgPGFnLWdyaWQtYW5ndWxhclxyXG4gICAgICAgIFtncmlkT3B0aW9uc109XCJncmlkT3B0aW9uc1wiXHJcbiAgICAgICAgW2NsYXNzTmFtZV09XCJhZ0dyaWRDbGFzc1wiXHJcbiAgICAgICAgW25nU3R5bGVdPVwiYWdEaXZTdHlsZVwiPlxyXG4gICAgICA8L2FnLWdyaWQtYW5ndWxhcj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PmAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZGFwdGFibGVibG90dGVyQWdHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBhZGFwdGFibGVCbG90dGVyT3B0aW9uczogSUFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zO1xyXG4gIEBJbnB1dCgpIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9ucztcclxuICBASW5wdXQoKSBhZ1RoZW1lPzogJ2JhbGhhbScgfCAnYmFsaGFtLWRhcmsnIHwgJ21hdGVyaWFsJyB8ICdmcmVzaCcgfCAnZGFyaycgfCAnYmx1ZScgfCAnYm9vdHN0cmFwJyA9ICdiYWxoYW0nO1xyXG4gIEBJbnB1dCgpIGFnRGl2U3R5bGU/OiBhbnkgPSB7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzkwJScsIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBtYXJnaW46ICcwcHgnIH07XHJcblxyXG4gIGFnR3JpZENsYXNzOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5hZ0dyaWRDbGFzcyA9IGBhZy10aGVtZS0ke3RoaXMuYWdUaGVtZX1gO1xyXG4gIH1cclxuXHJcbn1cclxuIl19