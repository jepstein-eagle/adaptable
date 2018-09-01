/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef } from '@angular/core';
import * as ReactDOM from 'adaptableblotter/node_modules/react-dom';
import { BlotterFactory, AdaptableBlotterApp } from 'adaptableblotter/factory';
export class AdaptableBlotterComponent {
    /**
     * @param {?} elRef
     */
    constructor(elRef) {
        this.elRef = elRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.adaptableBlotter = BlotterFactory.CreateAdaptableBlotter(this.adaptableBlotterOptions, this.vendorGridName);
        ReactDOM.render(AdaptableBlotterApp({ AdaptableBlotter: this.adaptableBlotter }), this.elRef.nativeElement.firstChild.firstChild);
    }
}
AdaptableBlotterComponent.decorators = [
    { type: Component, args: [{
                selector: 'adaptable-blotter',
                template: `<div id="adaptableBlotter"><div>Loading...</div></div>`,
                styles: []
            },] },
];
/** @nocollapse */
AdaptableBlotterComponent.ctorParameters = () => [
    { type: ElementRef }
];
AdaptableBlotterComponent.propDecorators = {
    adaptableBlotterOptions: [{ type: Input }],
    vendorGridName: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AdaptableBlotterComponent.prototype.adaptableBlotterOptions;
    /** @type {?} */
    AdaptableBlotterComponent.prototype.vendorGridName;
    /** @type {?} */
    AdaptableBlotterComponent.prototype.adaptableBlotter;
    /** @type {?} */
    AdaptableBlotterComponent.prototype.elRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRhYmxlYmxvdHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hZGFwdGFibGVibG90dGVyLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvYWRhcHRhYmxlYmxvdHRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRSxPQUFPLEtBQUssUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxjQUFjLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVEvRSxNQUFNOzs7O0lBTUosWUFBb0IsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTtLQUFJOzs7O0lBRXpDLFFBQVE7UUFDTixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLHNCQUFzQixDQUMzRCxJQUFJLENBQUMsdUJBQXVCLEVBQzVCLElBQUksQ0FBQyxjQUFjLENBQ3BCLENBQUM7UUFDRixRQUFRLENBQUMsTUFBTSxDQUNiLG1CQUFtQixDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFDaEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FDL0MsQ0FBQztLQUNIOzs7WUF0QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLFFBQVEsRUFBRSx3REFBd0Q7Z0JBQ2xFLE1BQU0sRUFBRSxFQUFFO2FBQ1g7Ozs7WUFWa0MsVUFBVTs7O3NDQVkxQyxLQUFLOzZCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSAnYWRhcHRhYmxlYmxvdHRlci9ub2RlX21vZHVsZXMvcmVhY3QtZG9tJztcbmltcG9ydCB7IEJsb3R0ZXJGYWN0b3J5LCBBZGFwdGFibGVCbG90dGVyQXBwIH0gZnJvbSAnYWRhcHRhYmxlYmxvdHRlci9mYWN0b3J5JztcbmltcG9ydCB7IElBZGFwdGFibGVCbG90dGVyLCBJQWRhcHRhYmxlQmxvdHRlck9wdGlvbnMgfSBmcm9tICdhZGFwdGFibGVibG90dGVyL3R5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWRhcHRhYmxlLWJsb3R0ZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgaWQ9XCJhZGFwdGFibGVCbG90dGVyXCI+PGRpdj5Mb2FkaW5nLi4uPC9kaXY+PC9kaXY+YCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBZGFwdGFibGVCbG90dGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgYWRhcHRhYmxlQmxvdHRlck9wdGlvbnM6IElBZGFwdGFibGVCbG90dGVyT3B0aW9ucztcbiAgQElucHV0KCkgdmVuZG9yR3JpZE5hbWU6ICdhZ0dyaWQnIHwgJ0h5cGVyZ3JpZCcgfCAnS2VuZG8nIHwgJ0FkYXB0YWJsZUdyaWQnO1xuXG4gIHByaXZhdGUgYWRhcHRhYmxlQmxvdHRlcjogSUFkYXB0YWJsZUJsb3R0ZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0YWJsZUJsb3R0ZXIgPSBCbG90dGVyRmFjdG9yeS5DcmVhdGVBZGFwdGFibGVCbG90dGVyKFxuICAgICAgdGhpcy5hZGFwdGFibGVCbG90dGVyT3B0aW9ucyxcbiAgICAgIHRoaXMudmVuZG9yR3JpZE5hbWVcbiAgICApO1xuICAgIFJlYWN0RE9NLnJlbmRlcihcbiAgICAgIEFkYXB0YWJsZUJsb3R0ZXJBcHAoeyBBZGFwdGFibGVCbG90dGVyOiB0aGlzLmFkYXB0YWJsZUJsb3R0ZXIgfSksXG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuZmlyc3RDaGlsZC5maXJzdENoaWxkLFxuICAgICk7XG4gIH1cblxufVxuIl19