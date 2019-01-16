import { Component, Input, ElementRef, Output, EventEmitter, NgModule } from '@angular/core';
import { render } from 'adaptableblotter/node_modules/react-dom';
import { BlotterFactory, AdaptableBlotterApp } from 'adaptableblotter/factory';
import 'ag-grid-enterprise';
import Hypergrid from 'fin-hypergrid';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AdaptableBlotterComponent = /** @class */ (function () {
    function AdaptableBlotterComponent(elRef) {
        this.elRef = elRef;
        this.adaptableBlotterMounted = new EventEmitter();
    }
    /**
     * @return {?}
     */
    AdaptableBlotterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.adaptableBlotterOptions.adaptableBlotterContainer =
            this.adaptableBlotterOptions.adaptableBlotterContainer || "adaptableBlotter-" + (Math.random() * 10000 | 0);
        /** @type {?} */
        var waitForContainer = setInterval(function () {
            try {
                document.getElementById(_this.adaptableBlotterOptions.adaptableBlotterContainer);
                // Element is mounted
                // Element is mounted
                _this.adaptableBlotter = BlotterFactory.CreateAdaptableBlotter(_this.adaptableBlotterOptions, _this.vendorGridName);
                _this.adaptableBlotterMounted.emit(_this.adaptableBlotter);
                render(AdaptableBlotterApp({ AdaptableBlotter: _this.adaptableBlotter }), _this.elRef.nativeElement.firstChild);
                clearInterval(waitForContainer);
            }
            catch (e) {
            }
        }, 100);
    };
    AdaptableBlotterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'adaptable-blotter',
                    template: "<div [id]=\"adaptableBlotterOptions.adaptableBlotterContainer\">Loading...</div>"
                }] }
    ];
    /** @nocollapse */
    AdaptableBlotterComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    AdaptableBlotterComponent.propDecorators = {
        adaptableBlotterOptions: [{ type: Input }],
        vendorGridName: [{ type: Input }],
        adaptableBlotterMounted: [{ type: Output }]
    };
    return AdaptableBlotterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AdaptableblotterHyperGridComponent = /** @class */ (function () {
    function AdaptableblotterHyperGridComponent(elRef) {
        this.elRef = elRef;
        this.gridLoaded = false;
        this.gridOptions = {};
        this.data = [];
        /**
         * Emits the mounted Hypergrid object for any specific settings.
         */
        this.gridMounted = new EventEmitter();
    }
    /**
     * @return {?}
     */
    AdaptableblotterHyperGridComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var container = this.elRef.nativeElement.firstChild.lastChild;
        this.grid = new Hypergrid(container, this.gridOptions);
        if (!this.gridOptions.data) {
            this.grid.setData(this.data);
        }
        this.adaptableBlotterOptions.vendorGrid = this.grid;
        this.gridLoaded = true;
        this.gridMounted.emit(this.grid);
        // TODO: Fix so it works properly - its a temporayr way to marry up the 2 components
        this.gridOptions.setupgrid(this.adaptableBlotterOptions.vendorGrid);
    };
    /**
     * Update the grid on input changes.
     * Need our own update logic since hypergrid doesn't have an Angular wrapper.
     */
    /**
     * Update the grid on input changes.
     * Need our own update logic since hypergrid doesn't have an Angular wrapper.
     * @param {?} changes
     * @return {?}
     */
    AdaptableblotterHyperGridComponent.prototype.ngOnChanges = /**
     * Update the grid on input changes.
     * Need our own update logic since hypergrid doesn't have an Angular wrapper.
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this.grid) {
            return;
        }
        /** @type {?} */
        var hgOptionsChange = changes["gridOptions"];
        /** @type {?} */
        var dataChange = changes["data"];
        if (dataChange && dataChange.previousValue !== dataChange.currentValue) {
            this.grid.setData(changes["data"].currentValue);
        }
        if (hgOptionsChange && !hgOptionsChange.isFirstChange() &&
            (hgOptionsChange.previousValue !== hgOptionsChange.currentValue)) {
            // Init the grid again, options changed
            this.ngOnInit();
        }
    };
    /**
     * @param {?} adaptableBlotter
     * @return {?}
     */
    AdaptableblotterHyperGridComponent.prototype.onAdaptableBlotterMount = /**
     * @param {?} adaptableBlotter
     * @return {?}
     */
    function (adaptableBlotter) {
        // ToDO
    };
    AdaptableblotterHyperGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'adaptable-blotter-hypergrid',
                    template: "<div id=\"adaptableBlotter-angular-hypergrid\">\n  <div id=\"adaptableBlotter\">\n    <adaptable-blotter\n      [adaptableBlotterOptions]=\"adaptableBlotterOptions\"\n      vendorGridName=\"Hypergrid\"\n      (adaptableBlotterMounted)=\"onAdaptableBlotterMount($event)\"\n      *ngIf=\"gridLoaded\">\n    </adaptable-blotter>\n  </div>\n    <div id=\"hypergrid-container\"></div>\n  </div>"
                }] }
    ];
    /** @nocollapse */
    AdaptableblotterHyperGridComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    AdaptableblotterHyperGridComponent.propDecorators = {
        adaptableBlotterOptions: [{ type: Input }],
        gridOptions: [{ type: Input }],
        data: [{ type: Input }],
        gridMounted: [{ type: Output }]
    };
    return AdaptableblotterHyperGridComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AdaptableBlotterModule = /** @class */ (function () {
    function AdaptableBlotterModule() {
    }
    AdaptableBlotterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        AgGridModule.withComponents([])
                    ],
                    declarations: [
                        AdaptableBlotterComponent,
                        AdaptableblotterAgGridComponent,
                        AdaptableblotterHyperGridComponent,
                    ],
                    exports: [
                        AdaptableBlotterComponent,
                        AdaptableblotterAgGridComponent,
                        AdaptableblotterHyperGridComponent,
                    ]
                },] }
    ];
    return AdaptableBlotterModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
// Export the parameter types

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { AdaptableBlotterModule, AdaptableBlotterComponent, AdaptableblotterAgGridComponent, AdaptableblotterHyperGridComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRhYmxlYmxvdHRlci1hbmd1bGFyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hZGFwdGFibGVibG90dGVyLWFuZ3VsYXIvbGliL2FkYXB0YWJsZWJsb3R0ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9hZGFwdGFibGVibG90dGVyLWFuZ3VsYXIvbGliL2FkYXB0YWJsZWJsb3R0ZXItYWdncmlkLmNvbXBvbmVudC50cyIsIm5nOi8vYWRhcHRhYmxlYmxvdHRlci1hbmd1bGFyL2xpYi9hZGFwdGFibGVibG90dGVyLWh5cGVyZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL2FkYXB0YWJsZWJsb3R0ZXItYW5ndWxhci9saWIvYWRhcHRhYmxlYmxvdHRlci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFbGVtZW50UmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSAnYWRhcHRhYmxlYmxvdHRlci9ub2RlX21vZHVsZXMvcmVhY3QtZG9tJztcclxuaW1wb3J0IHsgQmxvdHRlckZhY3RvcnksIEFkYXB0YWJsZUJsb3R0ZXJBcHAgfSBmcm9tICdhZGFwdGFibGVibG90dGVyL2ZhY3RvcnknO1xyXG5pbXBvcnQgeyBJQWRhcHRhYmxlQmxvdHRlciwgSUFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zIH0gZnJvbSAnYWRhcHRhYmxlYmxvdHRlci90eXBlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FkYXB0YWJsZS1ibG90dGVyJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgW2lkXT1cImFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zLmFkYXB0YWJsZUJsb3R0ZXJDb250YWluZXJcIj5Mb2FkaW5nLi4uPC9kaXY+YCxcclxuICBzdHlsZXM6IFtdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZGFwdGFibGVCbG90dGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBhZGFwdGFibGVCbG90dGVyT3B0aW9uczogSUFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zO1xyXG4gIEBJbnB1dCgpIHZlbmRvckdyaWROYW1lOiAnYWdHcmlkJyB8ICdIeXBlcmdyaWQnIHwgJ0tlbmRvJyB8ICdBZGFwdGFibGVHcmlkJztcclxuXHJcbiAgQE91dHB1dCgpIGFkYXB0YWJsZUJsb3R0ZXJNb3VudGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIHByaXZhdGUgYWRhcHRhYmxlQmxvdHRlcjogSUFkYXB0YWJsZUJsb3R0ZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYpIHt9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5hZGFwdGFibGVCbG90dGVyT3B0aW9ucy5hZGFwdGFibGVCbG90dGVyQ29udGFpbmVyID1cclxuICAgICAgdGhpcy5hZGFwdGFibGVCbG90dGVyT3B0aW9ucy5hZGFwdGFibGVCbG90dGVyQ29udGFpbmVyIHx8IGBhZGFwdGFibGVCbG90dGVyLSR7TWF0aC5yYW5kb20oKSAqIDEwMDAwIHwgMH1gO1xyXG4gICAgY29uc3Qgd2FpdEZvckNvbnRhaW5lciA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zLmFkYXB0YWJsZUJsb3R0ZXJDb250YWluZXIpO1xyXG4gICAgICAgIC8vIEVsZW1lbnQgaXMgbW91bnRlZFxyXG4gICAgICAgIHRoaXMuYWRhcHRhYmxlQmxvdHRlciA9IEJsb3R0ZXJGYWN0b3J5LkNyZWF0ZUFkYXB0YWJsZUJsb3R0ZXIoXHJcbiAgICAgICAgICB0aGlzLmFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zLFxyXG4gICAgICAgICAgdGhpcy52ZW5kb3JHcmlkTmFtZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5hZGFwdGFibGVCbG90dGVyTW91bnRlZC5lbWl0KHRoaXMuYWRhcHRhYmxlQmxvdHRlcik7XHJcbiAgICAgICAgUmVhY3RET00ucmVuZGVyKFxyXG4gICAgICAgICAgQWRhcHRhYmxlQmxvdHRlckFwcCh7IEFkYXB0YWJsZUJsb3R0ZXI6IHRoaXMuYWRhcHRhYmxlQmxvdHRlciB9KSxcclxuICAgICAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5maXJzdENoaWxkLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh3YWl0Rm9yQ29udGFpbmVyKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICB9XHJcbiAgICB9LCAxMDApO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElBZGFwdGFibGVCbG90dGVyT3B0aW9ucyB9IGZyb20gJ2FkYXB0YWJsZWJsb3R0ZXIvdHlwZXMnO1xyXG5pbXBvcnQgeyBHcmlkT3B0aW9ucyB9IGZyb20gJ2FnLWdyaWQnO1xyXG5pbXBvcnQgJ2FnLWdyaWQtZW50ZXJwcmlzZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FkYXB0YWJsZS1ibG90dGVyLWFnZ3JpZCcsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGlkPVwiYWRhcHRhYmxlQmxvdHRlci1hbmd1bGFyLWFnZ3JpZFwiPlxyXG4gICAgPGRpdiBpZD1cImFkYXB0YWJsZUJsb3R0ZXJcIj5cclxuICAgICAgPGFkYXB0YWJsZS1ibG90dGVyXHJcbiAgICAgICAgW2FkYXB0YWJsZUJsb3R0ZXJPcHRpb25zXT1cImFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zXCJcclxuICAgICAgICB2ZW5kb3JHcmlkTmFtZT1cImFnR3JpZFwiPlxyXG4gICAgICA8L2FkYXB0YWJsZS1ibG90dGVyPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGlkPVwiZ3JpZFwiPlxyXG4gICAgICA8YWctZ3JpZC1hbmd1bGFyXHJcbiAgICAgICAgW2dyaWRPcHRpb25zXT1cImdyaWRPcHRpb25zXCJcclxuICAgICAgICBbY2xhc3NOYW1lXT1cImFnR3JpZENsYXNzXCJcclxuICAgICAgICBbbmdTdHlsZV09XCJhZ0RpdlN0eWxlXCI+XHJcbiAgICAgIDwvYWctZ3JpZC1hbmd1bGFyPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+YCxcclxufSlcclxuZXhwb3J0IGNsYXNzIEFkYXB0YWJsZWJsb3R0ZXJBZ0dyaWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zOiBJQWRhcHRhYmxlQmxvdHRlck9wdGlvbnM7XHJcbiAgQElucHV0KCkgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb25zO1xyXG4gIEBJbnB1dCgpIGFnVGhlbWU/OiAnYmFsaGFtJyB8ICdiYWxoYW0tZGFyaycgfCAnbWF0ZXJpYWwnIHwgJ2ZyZXNoJyB8ICdkYXJrJyB8ICdibHVlJyB8ICdib290c3RyYXAnID0gJ2JhbGhhbSc7XHJcbiAgQElucHV0KCkgYWdEaXZTdHlsZT86IGFueSA9IHsgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnOTAlJywgcG9zaXRpb246ICdhYnNvbHV0ZScsIG1hcmdpbjogJzBweCcgfTtcclxuXHJcbiAgYWdHcmlkQ2xhc3M6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmFnR3JpZENsYXNzID0gYGFnLXRoZW1lLSR7dGhpcy5hZ1RoZW1lfWA7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYsIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlcywgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSUFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zIH0gZnJvbSAnYWRhcHRhYmxlYmxvdHRlci90eXBlcyc7XHJcbmltcG9ydCBIeXBlcmdyaWQgZnJvbSAnZmluLWh5cGVyZ3JpZCc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhZGFwdGFibGUtYmxvdHRlci1oeXBlcmdyaWQnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBpZD1cImFkYXB0YWJsZUJsb3R0ZXItYW5ndWxhci1oeXBlcmdyaWRcIj5cclxuICA8ZGl2IGlkPVwiYWRhcHRhYmxlQmxvdHRlclwiPlxyXG4gICAgPGFkYXB0YWJsZS1ibG90dGVyXHJcbiAgICAgIFthZGFwdGFibGVCbG90dGVyT3B0aW9uc109XCJhZGFwdGFibGVCbG90dGVyT3B0aW9uc1wiXHJcbiAgICAgIHZlbmRvckdyaWROYW1lPVwiSHlwZXJncmlkXCJcclxuICAgICAgKGFkYXB0YWJsZUJsb3R0ZXJNb3VudGVkKT1cIm9uQWRhcHRhYmxlQmxvdHRlck1vdW50KCRldmVudClcIlxyXG4gICAgICAqbmdJZj1cImdyaWRMb2FkZWRcIj5cclxuICAgIDwvYWRhcHRhYmxlLWJsb3R0ZXI+XHJcbiAgPC9kaXY+XHJcbiAgICA8ZGl2IGlkPVwiaHlwZXJncmlkLWNvbnRhaW5lclwiPjwvZGl2PlxyXG4gIDwvZGl2PmAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZGFwdGFibGVibG90dGVySHlwZXJHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIHByaXZhdGUgZ3JpZDtcclxuICBncmlkTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zOiBJQWRhcHRhYmxlQmxvdHRlck9wdGlvbnM7XHJcbiAgQElucHV0KCkgZ3JpZE9wdGlvbnM/OiBhbnkgPSB7fTtcclxuICBASW5wdXQoKSBkYXRhPzogQXJyYXk8YW55PiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyB0aGUgbW91bnRlZCBIeXBlcmdyaWQgb2JqZWN0IGZvciBhbnkgc3BlY2lmaWMgc2V0dGluZ3MuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGdyaWRNb3VudGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5maXJzdENoaWxkLmxhc3RDaGlsZDtcclxuICAgIHRoaXMuZ3JpZCA9IG5ldyBIeXBlcmdyaWQoY29udGFpbmVyLCB0aGlzLmdyaWRPcHRpb25zKTtcclxuICAgIGlmICghdGhpcy5ncmlkT3B0aW9ucy5kYXRhKSB7XHJcbiAgICAgIHRoaXMuZ3JpZC5zZXREYXRhKHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zLnZlbmRvckdyaWQgPSB0aGlzLmdyaWQ7XHJcbiAgICB0aGlzLmdyaWRMb2FkZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5ncmlkTW91bnRlZC5lbWl0KHRoaXMuZ3JpZCk7XHJcbiAgICAvLyBUT0RPOiBGaXggc28gaXQgd29ya3MgcHJvcGVybHkgLSBpdHMgYSB0ZW1wb3JheXIgd2F5IHRvIG1hcnJ5IHVwIHRoZSAyIGNvbXBvbmVudHNcclxuICAgIHRoaXMuZ3JpZE9wdGlvbnMuc2V0dXBncmlkKHRoaXMuYWRhcHRhYmxlQmxvdHRlck9wdGlvbnMudmVuZG9yR3JpZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIGdyaWQgb24gaW5wdXQgY2hhbmdlcy5cclxuICAgKiBOZWVkIG91ciBvd24gdXBkYXRlIGxvZ2ljIHNpbmNlIGh5cGVyZ3JpZCBkb2Vzbid0IGhhdmUgYW4gQW5ndWxhciB3cmFwcGVyLlxyXG4gICAqL1xyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmICghdGhpcy5ncmlkKSB7IHJldHVybjsgfVxyXG4gICAgY29uc3QgaGdPcHRpb25zQ2hhbmdlID0gY2hhbmdlcy5ncmlkT3B0aW9ucztcclxuICAgIGNvbnN0IGRhdGFDaGFuZ2UgPSBjaGFuZ2VzLmRhdGE7XHJcbiAgICBpZiAoZGF0YUNoYW5nZSAmJiBkYXRhQ2hhbmdlLnByZXZpb3VzVmFsdWUgIT09IGRhdGFDaGFuZ2UuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuZ3JpZC5zZXREYXRhKGNoYW5nZXMuZGF0YS5jdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGhnT3B0aW9uc0NoYW5nZSAmJiAhaGdPcHRpb25zQ2hhbmdlLmlzRmlyc3RDaGFuZ2UoKSAmJlxyXG4gICAgICAoaGdPcHRpb25zQ2hhbmdlLnByZXZpb3VzVmFsdWUgIT09IGhnT3B0aW9uc0NoYW5nZS5jdXJyZW50VmFsdWUpKSB7XHJcbiAgICAgIC8vIEluaXQgdGhlIGdyaWQgYWdhaW4sIG9wdGlvbnMgY2hhbmdlZFxyXG4gICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkFkYXB0YWJsZUJsb3R0ZXJNb3VudChhZGFwdGFibGVCbG90dGVyKSB7XHJcbiAgIC8vIFRvRE9cclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEFkYXB0YWJsZUJsb3R0ZXJDb21wb25lbnQgfSBmcm9tICcuL2FkYXB0YWJsZWJsb3R0ZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQWRhcHRhYmxlYmxvdHRlckFnR3JpZENvbXBvbmVudCB9IGZyb20gJy4vYWRhcHRhYmxlYmxvdHRlci1hZ2dyaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQWRhcHRhYmxlYmxvdHRlckh5cGVyR3JpZENvbXBvbmVudCB9IGZyb20gJy4vYWRhcHRhYmxlYmxvdHRlci1oeXBlcmdyaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQWdHcmlkTW9kdWxlIH0gZnJvbSAnYWctZ3JpZC1hbmd1bGFyJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgQWdHcmlkTW9kdWxlLndpdGhDb21wb25lbnRzKFtdKVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBBZGFwdGFibGVCbG90dGVyQ29tcG9uZW50LFxyXG4gICAgQWRhcHRhYmxlYmxvdHRlckFnR3JpZENvbXBvbmVudCxcclxuICAgIEFkYXB0YWJsZWJsb3R0ZXJIeXBlckdyaWRDb21wb25lbnQsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBBZGFwdGFibGVCbG90dGVyQ29tcG9uZW50LFxyXG4gICAgQWRhcHRhYmxlYmxvdHRlckFnR3JpZENvbXBvbmVudCxcclxuICAgIEFkYXB0YWJsZWJsb3R0ZXJIeXBlckdyaWRDb21wb25lbnQsXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWRhcHRhYmxlQmxvdHRlck1vZHVsZSB7IH1cclxuIl0sIm5hbWVzIjpbIlJlYWN0RE9NLnJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7SUFtQkUsbUNBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7dUNBSkQsSUFBSSxZQUFZLEVBQU87S0FJbEI7Ozs7SUFFekMsNENBQVE7OztJQUFSO1FBQUEsaUJBb0JDO1FBbkJDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyx5QkFBeUI7WUFDcEQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLHlCQUF5QixJQUFJLHVCQUFvQixJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBRSxDQUFDOztRQUM1RyxJQUFNLGdCQUFnQixHQUFH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