/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef } from '@angular/core';
import * as ReactDOM from 'adaptableblotter/node_modules/react-dom';
import { BlotterFactory, AdaptableBlotterApp } from 'adaptableblotter/factory';
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
        ReactDOM.render(AdaptableBlotterApp({ AdaptableBlotter: this.adaptableBlotter }), this.elRef.nativeElement.firstChild.firstChild);
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
export { AdaptableBlotterComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRhYmxlYmxvdHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hZGFwdGFibGVibG90dGVyLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvYWRhcHRhYmxlYmxvdHRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyRSxPQUFPLEtBQUssUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxjQUFjLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7SUFjN0UsbUNBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7S0FBSTs7OztJQUV6Qyw0Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLHNCQUFzQixDQUMzRCxJQUFJLENBQUMsdUJBQXVCLEVBQzVCLElBQUksQ0FBQyxjQUFjLENBQ3BCLENBQUM7UUFDRixRQUFRLENBQUMsTUFBTSxDQUNiLG1CQUFtQixDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFDaEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FDL0MsQ0FBQztLQUNIOztnQkF0QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSwwREFBd0Q7b0JBQ2xFLE1BQU0sRUFBRSxFQUFFO2lCQUNYOzs7O2dCQVZrQyxVQUFVOzs7MENBWTFDLEtBQUs7aUNBQ0wsS0FBSzs7b0NBYlI7O1NBV2EseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gJ2FkYXB0YWJsZWJsb3R0ZXIvbm9kZV9tb2R1bGVzL3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBCbG90dGVyRmFjdG9yeSwgQWRhcHRhYmxlQmxvdHRlckFwcCB9IGZyb20gJ2FkYXB0YWJsZWJsb3R0ZXIvZmFjdG9yeSc7XG5pbXBvcnQgeyBJQWRhcHRhYmxlQmxvdHRlciwgSUFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zIH0gZnJvbSAnYWRhcHRhYmxlYmxvdHRlci90eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FkYXB0YWJsZS1ibG90dGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGlkPVwiYWRhcHRhYmxlQmxvdHRlclwiPjxkaXY+TG9hZGluZy4uLjwvZGl2PjwvZGl2PmAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgQWRhcHRhYmxlQmxvdHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zOiBJQWRhcHRhYmxlQmxvdHRlck9wdGlvbnM7XG4gIEBJbnB1dCgpIHZlbmRvckdyaWROYW1lOiAnYWdHcmlkJyB8ICdIeXBlcmdyaWQnIHwgJ0tlbmRvJyB8ICdBZGFwdGFibGVHcmlkJztcblxuICBwcml2YXRlIGFkYXB0YWJsZUJsb3R0ZXI6IElBZGFwdGFibGVCbG90dGVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hZGFwdGFibGVCbG90dGVyID0gQmxvdHRlckZhY3RvcnkuQ3JlYXRlQWRhcHRhYmxlQmxvdHRlcihcbiAgICAgIHRoaXMuYWRhcHRhYmxlQmxvdHRlck9wdGlvbnMsXG4gICAgICB0aGlzLnZlbmRvckdyaWROYW1lXG4gICAgKTtcbiAgICBSZWFjdERPTS5yZW5kZXIoXG4gICAgICBBZGFwdGFibGVCbG90dGVyQXBwKHsgQWRhcHRhYmxlQmxvdHRlcjogdGhpcy5hZGFwdGFibGVCbG90dGVyIH0pLFxuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQuZmlyc3RDaGlsZCxcbiAgICApO1xuICB9XG5cbn1cbiJdfQ==