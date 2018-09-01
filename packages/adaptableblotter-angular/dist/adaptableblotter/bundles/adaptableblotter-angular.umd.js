(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('adaptableblotter/node_modules/react-dom'), require('adaptableblotter/factory')) :
    typeof define === 'function' && define.amd ? define('adaptableblotter-angular', ['exports', '@angular/core', 'adaptableblotter/node_modules/react-dom', 'adaptableblotter/factory'], factory) :
    (factory((global['adaptableblotter-angular'] = {}),global.ng.core,null,null));
}(this, (function (exports,core,ReactDOM,factory) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AdaptableBlotterComponent = /** @class */ (function () {
        function AdaptableBlotterComponent(elRef) {
            this.elRef = elRef;
        }
        /**
         * @return {?}
         */
        AdaptableBlotterComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.adaptableBlotter = factory.BlotterFactory.CreateAdaptableBlotter(this.adaptableBlotterOptions, this.vendorGridName);
                ReactDOM.render(factory.AdaptableBlotterApp({ AdaptableBlotter: this.adaptableBlotter }), this.elRef.nativeElement.firstChild.firstChild);
            };
        AdaptableBlotterComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'adaptable-blotter',
                        template: "<div id=\"adaptableBlotter\"><div>Loading...</div></div>",
                        styles: []
                    },] },
        ];
        /** @nocollapse */
        AdaptableBlotterComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef }
            ];
        };
        AdaptableBlotterComponent.propDecorators = {
            adaptableBlotterOptions: [{ type: core.Input }],
            vendorGridName: [{ type: core.Input }]
        };
        return AdaptableBlotterComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AdaptableblotterAgGridComponent = /** @class */ (function () {
        function AdaptableblotterAgGridComponent() {
        }
        /**
         * @return {?}
         */
        AdaptableblotterAgGridComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        AdaptableblotterAgGridComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'adaptable-blotter-aggrid',
                        template: "",
                    },] },
        ];
        /** @nocollapse */
        AdaptableblotterAgGridComponent.ctorParameters = function () { return []; };
        return AdaptableblotterAgGridComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AdaptableBlotterModule = /** @class */ (function () {
        function AdaptableBlotterModule() {
        }
        AdaptableBlotterModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [],
                        declarations: [AdaptableBlotterComponent, AdaptableblotterAgGridComponent],
                        exports: [AdaptableBlotterComponent]
                    },] },
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

    exports.AdaptableBlotterModule = AdaptableBlotterModule;
    exports.AdaptableBlotterComponent = AdaptableBlotterComponent;
    exports.AdaptableblotterAgGridComponent = AdaptableblotterAgGridComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRhYmxlYmxvdHRlci1hbmd1bGFyLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYWRhcHRhYmxlYmxvdHRlci1hbmd1bGFyL2xpYi9hZGFwdGFibGVibG90dGVyLmNvbXBvbmVudC50cyIsIm5nOi8vYWRhcHRhYmxlYmxvdHRlci1hbmd1bGFyL2xpYi9hZGFwdGFibGVibG90dGVyLWFnZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL2FkYXB0YWJsZWJsb3R0ZXItYW5ndWxhci9saWIvYWRhcHRhYmxlYmxvdHRlci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gJ2FkYXB0YWJsZWJsb3R0ZXIvbm9kZV9tb2R1bGVzL3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBCbG90dGVyRmFjdG9yeSwgQWRhcHRhYmxlQmxvdHRlckFwcCB9IGZyb20gJ2FkYXB0YWJsZWJsb3R0ZXIvZmFjdG9yeSc7XG5pbXBvcnQgeyBJQWRhcHRhYmxlQmxvdHRlciwgSUFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zIH0gZnJvbSAnYWRhcHRhYmxlYmxvdHRlci90eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FkYXB0YWJsZS1ibG90dGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGlkPVwiYWRhcHRhYmxlQmxvdHRlclwiPjxkaXY+TG9hZGluZy4uLjwvZGl2PjwvZGl2PmAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgQWRhcHRhYmxlQmxvdHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zOiBJQWRhcHRhYmxlQmxvdHRlck9wdGlvbnM7XG4gIEBJbnB1dCgpIHZlbmRvckdyaWROYW1lOiAnYWdHcmlkJyB8ICdIeXBlcmdyaWQnIHwgJ0tlbmRvJyB8ICdBZGFwdGFibGVHcmlkJztcblxuICBwcml2YXRlIGFkYXB0YWJsZUJsb3R0ZXI6IElBZGFwdGFibGVCbG90dGVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hZGFwdGFibGVCbG90dGVyID0gQmxvdHRlckZhY3RvcnkuQ3JlYXRlQWRhcHRhYmxlQmxvdHRlcihcbiAgICAgIHRoaXMuYWRhcHRhYmxlQmxvdHRlck9wdGlvbnMsXG4gICAgICB0aGlzLnZlbmRvckdyaWROYW1lXG4gICAgKTtcbiAgICBSZWFjdERPTS5yZW5kZXIoXG4gICAgICBBZGFwdGFibGVCbG90dGVyQXBwKHsgQWRhcHRhYmxlQmxvdHRlcjogdGhpcy5hZGFwdGFibGVCbG90dGVyIH0pLFxuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQuZmlyc3RDaGlsZCxcbiAgICApO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FkYXB0YWJsZS1ibG90dGVyLWFnZ3JpZCcsXG4gIHRlbXBsYXRlOiBgYCxcbn0pXG5leHBvcnQgY2xhc3MgQWRhcHRhYmxlYmxvdHRlckFnR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWRhcHRhYmxlQmxvdHRlckNvbXBvbmVudCB9IGZyb20gJy4vYWRhcHRhYmxlYmxvdHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWRhcHRhYmxlYmxvdHRlckFnR3JpZENvbXBvbmVudCB9IGZyb20gJy4vYWRhcHRhYmxlYmxvdHRlci1hZ2dyaWQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIGRlY2xhcmF0aW9uczogW0FkYXB0YWJsZUJsb3R0ZXJDb21wb25lbnQsIEFkYXB0YWJsZWJsb3R0ZXJBZ0dyaWRDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQWRhcHRhYmxlQmxvdHRlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgQWRhcHRhYmxlQmxvdHRlck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJCbG90dGVyRmFjdG9yeSIsIlJlYWN0RE9NLnJlbmRlciIsIkFkYXB0YWJsZUJsb3R0ZXJBcHAiLCJDb21wb25lbnQiLCJFbGVtZW50UmVmIiwiSW5wdXQiLCJOZ01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBaUJFLG1DQUFvQixLQUFpQjtZQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO1NBQUk7Ozs7UUFFekMsNENBQVE7OztZQUFSO2dCQUNFLElBQUksQ0FBQyxnQkFBZ0IsR0FBR0Esc0JBQWMsQ0FBQyxzQkFBc0IsQ0FDM0QsSUFBSSxDQUFDLHVCQUF1QixFQUM1QixJQUFJLENBQUMsY0FBYyxDQUNwQixDQUFDO2dCQUNGQyxlQUFlLENBQ2JDLDJCQUFtQixDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFDaEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FDL0MsQ0FBQzthQUNIOztvQkF0QkZDLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsbUJBQW1CO3dCQUM3QixRQUFRLEVBQUUsMERBQXdEO3dCQUNsRSxNQUFNLEVBQUUsRUFBRTtxQkFDWDs7Ozs7d0JBVmtDQyxlQUFVOzs7OzhDQVkxQ0MsVUFBSztxQ0FDTEEsVUFBSzs7d0NBYlI7Ozs7Ozs7QUNBQTtRQVFFO1NBQWlCOzs7O1FBRWpCLGtEQUFROzs7WUFBUjthQUNDOztvQkFURkYsY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSwwQkFBMEI7d0JBQ3BDLFFBQVEsRUFBRSxFQUFFO3FCQUNiOzs7OzhDQUxEOzs7Ozs7O0FDQUE7Ozs7b0JBSUNHLGFBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUUsRUFBRTt3QkFDWCxZQUFZLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSwrQkFBK0IsQ0FBQzt3QkFDMUUsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7cUJBQ3JDOztxQ0FSRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=