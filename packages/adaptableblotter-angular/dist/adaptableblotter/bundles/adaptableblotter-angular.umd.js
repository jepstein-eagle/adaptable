(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('adaptableblotter/node_modules/react-dom'), require('adaptableblotter/factory'), require('ag-grid-enterprise'), require('fin-hypergrid'), require('@angular/common'), require('ag-grid-angular')) :
    typeof define === 'function' && define.amd ? define('adaptableblotter-angular', ['exports', '@angular/core', 'adaptableblotter/node_modules/react-dom', 'adaptableblotter/factory', 'ag-grid-enterprise', 'fin-hypergrid', '@angular/common', 'ag-grid-angular'], factory) :
    (factory((global['adaptableblotter-angular'] = {}),global.ng.core,global.ReactDOM,global.factory,null,global.Hypergrid,global.ng.common,global.agGridAngular));
}(this, (function (exports,core,ReactDOM,factory,agGridEnterprise,Hypergrid,common,agGridAngular) { 'use strict';

    Hypergrid = Hypergrid && Hypergrid.hasOwnProperty('default') ? Hypergrid['default'] : Hypergrid;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AdaptableBlotterComponent = /** @class */ (function () {
        function AdaptableBlotterComponent(elRef) {
            this.elRef = elRef;
            this.adaptableBlotterMounted = new core.EventEmitter();
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
                        _this.adaptableBlotter = factory.BlotterFactory.CreateAdaptableBlotter(_this.adaptableBlotterOptions, _this.vendorGridName);
                        _this.adaptableBlotterMounted.emit(_this.adaptableBlotter);
                        ReactDOM.render(factory.AdaptableBlotterApp({ AdaptableBlotter: _this.adaptableBlotter }), _this.elRef.nativeElement.firstChild);
                        clearInterval(waitForContainer);
                    }
                    catch (e) {
                    }
                }, 100);
            };
        AdaptableBlotterComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'adaptable-blotter',
                        template: "<div [id]=\"adaptableBlotterOptions.adaptableBlotterContainer\">Loading...</div>"
                    }] }
        ];
        /** @nocollapse */
        AdaptableBlotterComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef }
            ];
        };
        AdaptableBlotterComponent.propDecorators = {
            adaptableBlotterOptions: [{ type: core.Input }],
            vendorGridName: [{ type: core.Input }],
            adaptableBlotterMounted: [{ type: core.Output }]
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
            { type: core.Component, args: [{
                        selector: 'adaptable-blotter-aggrid',
                        template: "<div id=\"adaptableBlotter-angular-aggrid\">\n    <div id=\"adaptableBlotter\">\n      <adaptable-blotter\n        [adaptableBlotterOptions]=\"adaptableBlotterOptions\"\n        vendorGridName=\"agGrid\">\n      </adaptable-blotter>\n    </div>\n    <div id=\"grid\">\n      <ag-grid-angular\n        [gridOptions]=\"gridOptions\"\n        [className]=\"agGridClass\"\n        [ngStyle]=\"agDivStyle\">\n      </ag-grid-angular>\n    </div>\n  </div>"
                    }] }
        ];
        /** @nocollapse */
        AdaptableblotterAgGridComponent.ctorParameters = function () { return []; };
        AdaptableblotterAgGridComponent.propDecorators = {
            adaptableBlotterOptions: [{ type: core.Input }],
            gridOptions: [{ type: core.Input }],
            agTheme: [{ type: core.Input }],
            agDivStyle: [{ type: core.Input }]
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
            this.gridMounted = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'adaptable-blotter-hypergrid',
                        template: "<div id=\"adaptableBlotter-angular-hypergrid\">\n  <div id=\"adaptableBlotter\">\n    <adaptable-blotter\n      [adaptableBlotterOptions]=\"adaptableBlotterOptions\"\n      vendorGridName=\"Hypergrid\"\n      (adaptableBlotterMounted)=\"onAdaptableBlotterMount($event)\"\n      *ngIf=\"gridLoaded\">\n    </adaptable-blotter>\n  </div>\n    <div id=\"hypergrid-container\"></div>\n  </div>"
                    }] }
        ];
        /** @nocollapse */
        AdaptableblotterHyperGridComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef }
            ];
        };
        AdaptableblotterHyperGridComponent.propDecorators = {
            adaptableBlotterOptions: [{ type: core.Input }],
            gridOptions: [{ type: core.Input }],
            data: [{ type: core.Input }],
            gridMounted: [{ type: core.Output }]
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
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            agGridAngular.AgGridModule.withComponents([])
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

    exports.AdaptableBlotterModule = AdaptableBlotterModule;
    exports.AdaptableBlotterComponent = AdaptableBlotterComponent;
    exports.AdaptableblotterAgGridComponent = AdaptableblotterAgGridComponent;
    exports.AdaptableblotterHyperGridComponent = AdaptableblotterHyperGridComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRhYmxlYmxvdHRlci1hbmd1bGFyLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYWRhcHRhYmxlYmxvdHRlci1hbmd1bGFyL2xpYi9hZGFwdGFibGVibG90dGVyLmNvbXBvbmVudC50cyIsIm5nOi8vYWRhcHRhYmxlYmxvdHRlci1hbmd1bGFyL2xpYi9hZGFwdGFibGVibG90dGVyLWFnZ3JpZC5jb21wb25lbnQudHMiLCJuZzovL2FkYXB0YWJsZWJsb3R0ZXItYW5ndWxhci9saWIvYWRhcHRhYmxlYmxvdHRlci1oeXBlcmdyaWQuY29tcG9uZW50LnRzIiwibmc6Ly9hZGFwdGFibGVibG90dGVyLWFuZ3VsYXIvbGliL2FkYXB0YWJsZWJsb3R0ZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRWxlbWVudFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gJ2FkYXB0YWJsZWJsb3R0ZXIvbm9kZV9tb2R1bGVzL3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IEJsb3R0ZXJGYWN0b3J5LCBBZGFwdGFibGVCbG90dGVyQXBwIH0gZnJvbSAnYWRhcHRhYmxlYmxvdHRlci9mYWN0b3J5JztcclxuaW1wb3J0IHsgSUFkYXB0YWJsZUJsb3R0ZXIsIElBZGFwdGFibGVCbG90dGVyT3B0aW9ucyB9IGZyb20gJ2FkYXB0YWJsZWJsb3R0ZXIvdHlwZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhZGFwdGFibGUtYmxvdHRlcicsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IFtpZF09XCJhZGFwdGFibGVCbG90dGVyT3B0aW9ucy5hZGFwdGFibGVCbG90dGVyQ29udGFpbmVyXCI+TG9hZGluZy4uLjwvZGl2PmAsXHJcbiAgc3R5bGVzOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWRhcHRhYmxlQmxvdHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgYWRhcHRhYmxlQmxvdHRlck9wdGlvbnM6IElBZGFwdGFibGVCbG90dGVyT3B0aW9ucztcclxuICBASW5wdXQoKSB2ZW5kb3JHcmlkTmFtZTogJ2FnR3JpZCcgfCAnSHlwZXJncmlkJyB8ICdLZW5kbycgfCAnQWRhcHRhYmxlR3JpZCc7XHJcblxyXG4gIEBPdXRwdXQoKSBhZGFwdGFibGVCbG90dGVyTW91bnRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBwcml2YXRlIGFkYXB0YWJsZUJsb3R0ZXI6IElBZGFwdGFibGVCbG90dGVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYWRhcHRhYmxlQmxvdHRlck9wdGlvbnMuYWRhcHRhYmxlQmxvdHRlckNvbnRhaW5lciA9XHJcbiAgICAgIHRoaXMuYWRhcHRhYmxlQmxvdHRlck9wdGlvbnMuYWRhcHRhYmxlQmxvdHRlckNvbnRhaW5lciB8fCBgYWRhcHRhYmxlQmxvdHRlci0ke01hdGgucmFuZG9tKCkgKiAxMDAwMCB8IDB9YDtcclxuICAgIGNvbnN0IHdhaXRGb3JDb250YWluZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5hZGFwdGFibGVCbG90dGVyT3B0aW9ucy5hZGFwdGFibGVCbG90dGVyQ29udGFpbmVyKTtcclxuICAgICAgICAvLyBFbGVtZW50IGlzIG1vdW50ZWRcclxuICAgICAgICB0aGlzLmFkYXB0YWJsZUJsb3R0ZXIgPSBCbG90dGVyRmFjdG9yeS5DcmVhdGVBZGFwdGFibGVCbG90dGVyKFxyXG4gICAgICAgICAgdGhpcy5hZGFwdGFibGVCbG90dGVyT3B0aW9ucyxcclxuICAgICAgICAgIHRoaXMudmVuZG9yR3JpZE5hbWVcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuYWRhcHRhYmxlQmxvdHRlck1vdW50ZWQuZW1pdCh0aGlzLmFkYXB0YWJsZUJsb3R0ZXIpO1xyXG4gICAgICAgIFJlYWN0RE9NLnJlbmRlcihcclxuICAgICAgICAgIEFkYXB0YWJsZUJsb3R0ZXJBcHAoeyBBZGFwdGFibGVCbG90dGVyOiB0aGlzLmFkYXB0YWJsZUJsb3R0ZXIgfSksXHJcbiAgICAgICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuZmlyc3RDaGlsZCxcclxuICAgICAgICApO1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwod2FpdEZvckNvbnRhaW5lcik7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgfVxyXG4gICAgfSwgMTAwKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJQWRhcHRhYmxlQmxvdHRlck9wdGlvbnMgfSBmcm9tICdhZGFwdGFibGVibG90dGVyL3R5cGVzJztcclxuaW1wb3J0IHsgR3JpZE9wdGlvbnMgfSBmcm9tICdhZy1ncmlkJztcclxuaW1wb3J0ICdhZy1ncmlkLWVudGVycHJpc2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhZGFwdGFibGUtYmxvdHRlci1hZ2dyaWQnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBpZD1cImFkYXB0YWJsZUJsb3R0ZXItYW5ndWxhci1hZ2dyaWRcIj5cclxuICAgIDxkaXYgaWQ9XCJhZGFwdGFibGVCbG90dGVyXCI+XHJcbiAgICAgIDxhZGFwdGFibGUtYmxvdHRlclxyXG4gICAgICAgIFthZGFwdGFibGVCbG90dGVyT3B0aW9uc109XCJhZGFwdGFibGVCbG90dGVyT3B0aW9uc1wiXHJcbiAgICAgICAgdmVuZG9yR3JpZE5hbWU9XCJhZ0dyaWRcIj5cclxuICAgICAgPC9hZGFwdGFibGUtYmxvdHRlcj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBpZD1cImdyaWRcIj5cclxuICAgICAgPGFnLWdyaWQtYW5ndWxhclxyXG4gICAgICAgIFtncmlkT3B0aW9uc109XCJncmlkT3B0aW9uc1wiXHJcbiAgICAgICAgW2NsYXNzTmFtZV09XCJhZ0dyaWRDbGFzc1wiXHJcbiAgICAgICAgW25nU3R5bGVdPVwiYWdEaXZTdHlsZVwiPlxyXG4gICAgICA8L2FnLWdyaWQtYW5ndWxhcj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PmAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZGFwdGFibGVibG90dGVyQWdHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBhZGFwdGFibGVCbG90dGVyT3B0aW9uczogSUFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zO1xyXG4gIEBJbnB1dCgpIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9ucztcclxuICBASW5wdXQoKSBhZ1RoZW1lPzogJ2JhbGhhbScgfCAnYmFsaGFtLWRhcmsnIHwgJ21hdGVyaWFsJyB8ICdmcmVzaCcgfCAnZGFyaycgfCAnYmx1ZScgfCAnYm9vdHN0cmFwJyA9ICdiYWxoYW0nO1xyXG4gIEBJbnB1dCgpIGFnRGl2U3R5bGU/OiBhbnkgPSB7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzkwJScsIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBtYXJnaW46ICcwcHgnIH07XHJcblxyXG4gIGFnR3JpZENsYXNzOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5hZ0dyaWRDbGFzcyA9IGBhZy10aGVtZS0ke3RoaXMuYWdUaGVtZX1gO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFbGVtZW50UmVmLCBTaW1wbGVDaGFuZ2VzLCBPbkNoYW5nZXMsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElBZGFwdGFibGVCbG90dGVyT3B0aW9ucyB9IGZyb20gJ2FkYXB0YWJsZWJsb3R0ZXIvdHlwZXMnO1xyXG5pbXBvcnQgSHlwZXJncmlkIGZyb20gJ2Zpbi1oeXBlcmdyaWQnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYWRhcHRhYmxlLWJsb3R0ZXItaHlwZXJncmlkJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgaWQ9XCJhZGFwdGFibGVCbG90dGVyLWFuZ3VsYXItaHlwZXJncmlkXCI+XHJcbiAgPGRpdiBpZD1cImFkYXB0YWJsZUJsb3R0ZXJcIj5cclxuICAgIDxhZGFwdGFibGUtYmxvdHRlclxyXG4gICAgICBbYWRhcHRhYmxlQmxvdHRlck9wdGlvbnNdPVwiYWRhcHRhYmxlQmxvdHRlck9wdGlvbnNcIlxyXG4gICAgICB2ZW5kb3JHcmlkTmFtZT1cIkh5cGVyZ3JpZFwiXHJcbiAgICAgIChhZGFwdGFibGVCbG90dGVyTW91bnRlZCk9XCJvbkFkYXB0YWJsZUJsb3R0ZXJNb3VudCgkZXZlbnQpXCJcclxuICAgICAgKm5nSWY9XCJncmlkTG9hZGVkXCI+XHJcbiAgICA8L2FkYXB0YWJsZS1ibG90dGVyPlxyXG4gIDwvZGl2PlxyXG4gICAgPGRpdiBpZD1cImh5cGVyZ3JpZC1jb250YWluZXJcIj48L2Rpdj5cclxuICA8L2Rpdj5gLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWRhcHRhYmxlYmxvdHRlckh5cGVyR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBwcml2YXRlIGdyaWQ7XHJcbiAgZ3JpZExvYWRlZCA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBhZGFwdGFibGVCbG90dGVyT3B0aW9uczogSUFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zO1xyXG4gIEBJbnB1dCgpIGdyaWRPcHRpb25zPzogYW55ID0ge307XHJcbiAgQElucHV0KCkgZGF0YT86IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdHMgdGhlIG1vdW50ZWQgSHlwZXJncmlkIG9iamVjdCBmb3IgYW55IHNwZWNpZmljIHNldHRpbmdzLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBncmlkTW91bnRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuZmlyc3RDaGlsZC5sYXN0Q2hpbGQ7XHJcbiAgICB0aGlzLmdyaWQgPSBuZXcgSHlwZXJncmlkKGNvbnRhaW5lciwgdGhpcy5ncmlkT3B0aW9ucyk7XHJcbiAgICBpZiAoIXRoaXMuZ3JpZE9wdGlvbnMuZGF0YSkge1xyXG4gICAgICB0aGlzLmdyaWQuc2V0RGF0YSh0aGlzLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hZGFwdGFibGVCbG90dGVyT3B0aW9ucy52ZW5kb3JHcmlkID0gdGhpcy5ncmlkO1xyXG4gICAgdGhpcy5ncmlkTG9hZGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuZ3JpZE1vdW50ZWQuZW1pdCh0aGlzLmdyaWQpO1xyXG4gICAgLy8gVE9ETzogRml4IHNvIGl0IHdvcmtzIHByb3Blcmx5IC0gaXRzIGEgdGVtcG9yYXlyIHdheSB0byBtYXJyeSB1cCB0aGUgMiBjb21wb25lbnRzXHJcbiAgICB0aGlzLmdyaWRPcHRpb25zLnNldHVwZ3JpZCh0aGlzLmFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zLnZlbmRvckdyaWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBncmlkIG9uIGlucHV0IGNoYW5nZXMuXHJcbiAgICogTmVlZCBvdXIgb3duIHVwZGF0ZSBsb2dpYyBzaW5jZSBoeXBlcmdyaWQgZG9lc24ndCBoYXZlIGFuIEFuZ3VsYXIgd3JhcHBlci5cclxuICAgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoIXRoaXMuZ3JpZCkgeyByZXR1cm47IH1cclxuICAgIGNvbnN0IGhnT3B0aW9uc0NoYW5nZSA9IGNoYW5nZXMuZ3JpZE9wdGlvbnM7XHJcbiAgICBjb25zdCBkYXRhQ2hhbmdlID0gY2hhbmdlcy5kYXRhO1xyXG4gICAgaWYgKGRhdGFDaGFuZ2UgJiYgZGF0YUNoYW5nZS5wcmV2aW91c1ZhbHVlICE9PSBkYXRhQ2hhbmdlLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICB0aGlzLmdyaWQuc2V0RGF0YShjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuICAgIGlmIChoZ09wdGlvbnNDaGFuZ2UgJiYgIWhnT3B0aW9uc0NoYW5nZS5pc0ZpcnN0Q2hhbmdlKCkgJiZcclxuICAgICAgKGhnT3B0aW9uc0NoYW5nZS5wcmV2aW91c1ZhbHVlICE9PSBoZ09wdGlvbnNDaGFuZ2UuY3VycmVudFZhbHVlKSkge1xyXG4gICAgICAvLyBJbml0IHRoZSBncmlkIGFnYWluLCBvcHRpb25zIGNoYW5nZWRcclxuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25BZGFwdGFibGVCbG90dGVyTW91bnQoYWRhcHRhYmxlQmxvdHRlcikge1xyXG4gICAvLyBUb0RPXHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBBZGFwdGFibGVCbG90dGVyQ29tcG9uZW50IH0gZnJvbSAnLi9hZGFwdGFibGVibG90dGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFkYXB0YWJsZWJsb3R0ZXJBZ0dyaWRDb21wb25lbnQgfSBmcm9tICcuL2FkYXB0YWJsZWJsb3R0ZXItYWdncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFkYXB0YWJsZWJsb3R0ZXJIeXBlckdyaWRDb21wb25lbnQgfSBmcm9tICcuL2FkYXB0YWJsZWJsb3R0ZXItaHlwZXJncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFnR3JpZE1vZHVsZSB9IGZyb20gJ2FnLWdyaWQtYW5ndWxhcic7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEFnR3JpZE1vZHVsZS53aXRoQ29tcG9uZW50cyhbXSlcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQWRhcHRhYmxlQmxvdHRlckNvbXBvbmVudCxcclxuICAgIEFkYXB0YWJsZWJsb3R0ZXJBZ0dyaWRDb21wb25lbnQsXHJcbiAgICBBZGFwdGFibGVibG90dGVySHlwZXJHcmlkQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgQWRhcHRhYmxlQmxvdHRlckNvbXBvbmVudCxcclxuICAgIEFkYXB0YWJsZWJsb3R0ZXJBZ0dyaWRDb21wb25lbnQsXHJcbiAgICBBZGFwdGFibGVibG90dGVySHlwZXJHcmlkQ29tcG9uZW50LFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFkYXB0YWJsZUJsb3R0ZXJNb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJCbG90dGVyRmFjdG9yeSIsIlJlYWN0RE9NLnJlbmRlciIsIkFkYXB0YWJsZUJsb3R0ZXJBcHAiLCJDb21wb25lbnQiLCJFbGVtZW50UmVmIiwiSW5wdXQiLCJPdXRwdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkFnR3JpZE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7UUFtQkUsbUNBQW9CLEtBQWlCO1lBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7MkNBSkQsSUFBSUEsaUJBQVksRUFBTztTQUlsQjs7OztRQUV6Qyw0Q0FBUTs7O1lBQVI7Z0JBQUEsaUJBb0JDO2dCQW5CQyxJQUFJ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