import { Component, Input, ElementRef, NgModule } from '@angular/core';
import { render } from 'adaptableblotter/node_modules/react-dom';
import { BlotterFactory, AdaptableBlotterApp } from 'adaptableblotter/factory';

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
        this.adaptableBlotter = BlotterFactory.CreateAdaptableBlotter(this.adaptableBlotterOptions, this.vendorGridName);
        render(AdaptableBlotterApp({ AdaptableBlotter: this.adaptableBlotter }), this.elRef.nativeElement.firstChild.firstChild);
    };
    AdaptableBlotterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'adaptable-blotter',
                    template: "<div id=\"adaptableBlotter\"><div>Loading...</div></div>",
                    styles: []
                },] },
    ];
    /** @nocollapse */
    AdaptableBlotterComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    AdaptableBlotterComponent.propDecorators = {
        adaptableBlotterOptions: [{ type: Input }],
        vendorGridName: [{ type: Input }]
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
        { type: Component, args: [{
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
        { type: NgModule, args: [{
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

export { AdaptableBlotterModule, AdaptableBlotterComponent, AdaptableblotterAgGridComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRhYmxlYmxvdHRlci1hbmd1bGFyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hZGFwdGFibGVibG90dGVyLWFuZ3VsYXIvbGliL2FkYXB0YWJsZWJsb3R0ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9hZGFwdGFibGVibG90dGVyLWFuZ3VsYXIvbGliL2FkYXB0YWJsZWJsb3R0ZXItYWdncmlkLmNvbXBvbmVudC50cyIsIm5nOi8vYWRhcHRhYmxlYmxvdHRlci1hbmd1bGFyL2xpYi9hZGFwdGFibGVibG90dGVyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSAnYWRhcHRhYmxlYmxvdHRlci9ub2RlX21vZHVsZXMvcmVhY3QtZG9tJztcbmltcG9ydCB7IEJsb3R0ZXJGYWN0b3J5LCBBZGFwdGFibGVCbG90dGVyQXBwIH0gZnJvbSAnYWRhcHRhYmxlYmxvdHRlci9mYWN0b3J5JztcbmltcG9ydCB7IElBZGFwdGFibGVCbG90dGVyLCBJQWRhcHRhYmxlQmxvdHRlck9wdGlvbnMgfSBmcm9tICdhZGFwdGFibGVibG90dGVyL3R5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWRhcHRhYmxlLWJsb3R0ZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgaWQ9XCJhZGFwdGFibGVCbG90dGVyXCI+PGRpdj5Mb2FkaW5nLi4uPC9kaXY+PC9kaXY+YCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBZGFwdGFibGVCbG90dGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgYWRhcHRhYmxlQmxvdHRlck9wdGlvbnM6IElBZGFwdGFibGVCbG90dGVyT3B0aW9ucztcbiAgQElucHV0KCkgdmVuZG9yR3JpZE5hbWU6ICdhZ0dyaWQnIHwgJ0h5cGVyZ3JpZCcgfCAnS2VuZG8nIHwgJ0FkYXB0YWJsZUdyaWQnO1xuXG4gIHByaXZhdGUgYWRhcHRhYmxlQmxvdHRlcjogSUFkYXB0YWJsZUJsb3R0ZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0YWJsZUJsb3R0ZXIgPSBCbG90dGVyRmFjdG9yeS5DcmVhdGVBZGFwdGFibGVCbG90dGVyKFxuICAgICAgdGhpcy5hZGFwdGFibGVCbG90dGVyT3B0aW9ucyxcbiAgICAgIHRoaXMudmVuZG9yR3JpZE5hbWVcbiAgICApO1xuICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgIEFkYXB0YWJsZUJsb3R0ZXJBcHAoeyBBZGFwdGFibGVCbG90dGVyOiB0aGlzLmFkYXB0YWJsZUJsb3R0ZXIgfSksXG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuZmlyc3RDaGlsZC5maXJzdENoaWxkLFxuICAgICk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWRhcHRhYmxlLWJsb3R0ZXItYWdncmlkJyxcbiAgdGVtcGxhdGU6IGBgLFxufSlcbmV4cG9ydCBjbGFzcyBBZGFwdGFibGVibG90dGVyQWdHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBZGFwdGFibGVCbG90dGVyQ29tcG9uZW50IH0gZnJvbSAnLi9hZGFwdGFibGVibG90dGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBZGFwdGFibGVibG90dGVyQWdHcmlkQ29tcG9uZW50IH0gZnJvbSAnLi9hZGFwdGFibGVibG90dGVyLWFnZ3JpZC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbQWRhcHRhYmxlQmxvdHRlckNvbXBvbmVudCwgQWRhcHRhYmxlYmxvdHRlckFnR3JpZENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtBZGFwdGFibGVCbG90dGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBZGFwdGFibGVCbG90dGVyTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIlJlYWN0RE9NLnJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtJQWlCRSxtQ0FBb0IsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTtLQUFJOzs7O0lBRXpDLDRDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsc0JBQXNCLENBQzNELElBQUksQ0FBQyx1QkFBdUIsRUFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FDcEIsQ0FBQztRQUNGQSxNQUFlLENBQ2IsbUJBQW1CLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUNoRSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUMvQyxDQUFDO0tBQ0g7O2dCQXRCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLDBEQUF3RDtvQkFDbEUsTUFBTSxFQUFFLEVBQUU7aUJBQ1g7Ozs7Z0JBVmtDLFVBQVU7OzswQ0FZMUMsS0FBSztpQ0FDTCxLQUFLOztvQ0FiUjs7Ozs7OztBQ0FBO0lBUUU7S0FBaUI7Ozs7SUFFakIsa0RBQVE7OztJQUFSO0tBQ0M7O2dCQVRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUUsRUFBRTtpQkFDYjs7OzswQ0FMRDs7Ozs7OztBQ0FBOzs7O2dCQUlDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsRUFBRTtvQkFDWCxZQUFZLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSwrQkFBK0IsQ0FBQztvQkFDMUUsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7aUJBQ3JDOztpQ0FSRDs7Ozs7Ozs7Ozs7Ozs7OzsifQ==