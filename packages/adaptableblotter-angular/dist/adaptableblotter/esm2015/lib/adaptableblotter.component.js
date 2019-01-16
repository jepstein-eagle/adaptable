/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import * as ReactDOM from 'adaptableblotter/node_modules/react-dom';
import { BlotterFactory, AdaptableBlotterApp } from 'adaptableblotter/factory';
export class AdaptableBlotterComponent {
    /**
     * @param {?} elRef
     */
    constructor(elRef) {
        this.elRef = elRef;
        this.adaptableBlotterMounted = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.adaptableBlotterOptions.adaptableBlotterContainer =
            this.adaptableBlotterOptions.adaptableBlotterContainer || `adaptableBlotter-${Math.random() * 10000 | 0}`;
        /** @type {?} */
        const waitForContainer = setInterval(() => {
            try {
                document.getElementById(this.adaptableBlotterOptions.adaptableBlotterContainer);
                // Element is mounted
                this.adaptableBlotter = BlotterFactory.CreateAdaptableBlotter(this.adaptableBlotterOptions, this.vendorGridName);
                this.adaptableBlotterMounted.emit(this.adaptableBlotter);
                ReactDOM.render(AdaptableBlotterApp({ AdaptableBlotter: this.adaptableBlotter }), this.elRef.nativeElement.firstChild);
                clearInterval(waitForContainer);
            }
            catch (e) {
            }
        }, 100);
    }
}
AdaptableBlotterComponent.decorators = [
    { type: Component, args: [{
                selector: 'adaptable-blotter',
                template: `<div [id]="adaptableBlotterOptions.adaptableBlotterContainer">Loading...</div>`
            }] }
];
/** @nocollapse */
AdaptableBlotterComponent.ctorParameters = () => [
    { type: ElementRef }
];
AdaptableBlotterComponent.propDecorators = {
    adaptableBlotterOptions: [{ type: Input }],
    vendorGridName: [{ type: Input }],
    adaptableBlotterMounted: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    AdaptableBlotterComponent.prototype.adaptableBlotterOptions;
    /** @type {?} */
    AdaptableBlotterComponent.prototype.vendorGridName;
    /** @type {?} */
    AdaptableBlotterComponent.prototype.adaptableBlotterMounted;
    /** @type {?} */
    AdaptableBlotterComponent.prototype.adaptableBlotter;
    /** @type {?} */
    AdaptableBlotterComponent.prototype.elRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRhYmxlYmxvdHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hZGFwdGFibGVibG90dGVyLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvYWRhcHRhYmxlYmxvdHRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNGLE9BQU8sS0FBSyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBUS9FLE1BQU07Ozs7SUFRSixZQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO3VDQUpELElBQUksWUFBWSxFQUFPO0tBSWxCOzs7O0lBRXpDLFFBQVE7UUFDTixJQUFJLENBQUMsdUJBQXVCLENBQUMseUJBQXlCO1lBQ3BELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyx5QkFBeUIsSUFBSSxvQkFBb0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQzs7UUFDNUcsTUFBTSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ3hDLElBQUk7Z0JBQ0YsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMseUJBQXlCLENBQUMsQ0FBQzs7Z0JBRWhGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsc0JBQXNCLENBQzNELElBQUksQ0FBQyx1QkFBdUIsRUFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FDcEIsQ0FBQztnQkFDRixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUN6RCxRQUFRLENBQUMsTUFBTSxDQUNiLG1CQUFtQixDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFDaEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUNwQyxDQUFDO2dCQUNGLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ2pDO1lBQUMsT0FBTyxDQUFDLEVBQUU7YUFDWDtTQUNGLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDVDs7O1lBbkNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUUsZ0ZBQWdGO2FBRTNGOzs7O1lBVmtDLFVBQVU7OztzQ0FZMUMsS0FBSzs2QkFDTCxLQUFLO3NDQUVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tICdhZGFwdGFibGVibG90dGVyL25vZGVfbW9kdWxlcy9yZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBCbG90dGVyRmFjdG9yeSwgQWRhcHRhYmxlQmxvdHRlckFwcCB9IGZyb20gJ2FkYXB0YWJsZWJsb3R0ZXIvZmFjdG9yeSc7XHJcbmltcG9ydCB7IElBZGFwdGFibGVCbG90dGVyLCBJQWRhcHRhYmxlQmxvdHRlck9wdGlvbnMgfSBmcm9tICdhZGFwdGFibGVibG90dGVyL3R5cGVzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYWRhcHRhYmxlLWJsb3R0ZXInLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBbaWRdPVwiYWRhcHRhYmxlQmxvdHRlck9wdGlvbnMuYWRhcHRhYmxlQmxvdHRlckNvbnRhaW5lclwiPkxvYWRpbmcuLi48L2Rpdj5gLFxyXG4gIHN0eWxlczogW11cclxufSlcclxuZXhwb3J0IGNsYXNzIEFkYXB0YWJsZUJsb3R0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zOiBJQWRhcHRhYmxlQmxvdHRlck9wdGlvbnM7XHJcbiAgQElucHV0KCkgdmVuZG9yR3JpZE5hbWU6ICdhZ0dyaWQnIHwgJ0h5cGVyZ3JpZCcgfCAnS2VuZG8nIHwgJ0FkYXB0YWJsZUdyaWQnO1xyXG5cclxuICBAT3V0cHV0KCkgYWRhcHRhYmxlQmxvdHRlck1vdW50ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgcHJpdmF0ZSBhZGFwdGFibGVCbG90dGVyOiBJQWRhcHRhYmxlQmxvdHRlcjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZikge31cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zLmFkYXB0YWJsZUJsb3R0ZXJDb250YWluZXIgPVxyXG4gICAgICB0aGlzLmFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zLmFkYXB0YWJsZUJsb3R0ZXJDb250YWluZXIgfHwgYGFkYXB0YWJsZUJsb3R0ZXItJHtNYXRoLnJhbmRvbSgpICogMTAwMDAgfCAwfWA7XHJcbiAgICBjb25zdCB3YWl0Rm9yQ29udGFpbmVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuYWRhcHRhYmxlQmxvdHRlck9wdGlvbnMuYWRhcHRhYmxlQmxvdHRlckNvbnRhaW5lcik7XHJcbiAgICAgICAgLy8gRWxlbWVudCBpcyBtb3VudGVkXHJcbiAgICAgICAgdGhpcy5hZGFwdGFibGVCbG90dGVyID0gQmxvdHRlckZhY3RvcnkuQ3JlYXRlQWRhcHRhYmxlQmxvdHRlcihcclxuICAgICAgICAgIHRoaXMuYWRhcHRhYmxlQmxvdHRlck9wdGlvbnMsXHJcbiAgICAgICAgICB0aGlzLnZlbmRvckdyaWROYW1lXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmFkYXB0YWJsZUJsb3R0ZXJNb3VudGVkLmVtaXQodGhpcy5hZGFwdGFibGVCbG90dGVyKTtcclxuICAgICAgICBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICAgICAgICBBZGFwdGFibGVCbG90dGVyQXBwKHsgQWRhcHRhYmxlQmxvdHRlcjogdGhpcy5hZGFwdGFibGVCbG90dGVyIH0pLFxyXG4gICAgICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQsXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjbGVhckludGVydmFsKHdhaXRGb3JDb250YWluZXIpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIH1cclxuICAgIH0sIDEwMCk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=