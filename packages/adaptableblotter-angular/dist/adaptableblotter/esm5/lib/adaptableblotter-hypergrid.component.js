/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import Hypergrid from 'fin-hypergrid';
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
export { AdaptableblotterHyperGridComponent };
if (false) {
    /** @type {?} */
    AdaptableblotterHyperGridComponent.prototype.grid;
    /** @type {?} */
    AdaptableblotterHyperGridComponent.prototype.gridLoaded;
    /** @type {?} */
    AdaptableblotterHyperGridComponent.prototype.adaptableBlotterOptions;
    /** @type {?} */
    AdaptableblotterHyperGridComponent.prototype.gridOptions;
    /** @type {?} */
    AdaptableblotterHyperGridComponent.prototype.data;
    /**
     * Emits the mounted Hypergrid object for any specific settings.
     * @type {?}
     */
    AdaptableblotterHyperGridComponent.prototype.gridMounted;
    /** @type {?} */
    AdaptableblotterHyperGridComponent.prototype.elRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRhYmxlYmxvdHRlci1oeXBlcmdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYWRhcHRhYmxlYmxvdHRlci1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL2FkYXB0YWJsZWJsb3R0ZXItaHlwZXJncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsVUFBVSxFQUE0QixNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJILE9BQU8sU0FBUyxNQUFNLGVBQWUsQ0FBQzs7SUE4QnBDLDRDQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZOzBCQVh4QixLQUFLOzJCQUdXLEVBQUU7b0JBQ0YsRUFBRTs7OzsyQkFLUCxJQUFJLFlBQVksRUFBTztLQUVMOzs7O0lBRTFDLHFEQUFROzs7SUFBUjs7UUFDRSxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3BELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFFakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3JFO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsd0RBQVc7Ozs7OztJQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFBRSxPQUFPO1NBQUU7O1FBQzNCLElBQU0sZUFBZSxHQUFHLE9BQU8sZ0JBQWE7O1FBQzVDLElBQU0sVUFBVSxHQUFHLE9BQU8sU0FBTTtRQUNoQyxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsYUFBYSxLQUFLLFVBQVUsQ0FBQyxZQUFZLEVBQUU7WUFDdEUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxTQUFNLFlBQVksQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsSUFBSSxlQUFlLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFO1lBQ3JELENBQUMsZUFBZSxDQUFDLGFBQWEsS0FBSyxlQUFlLENBQUMsWUFBWSxDQUFDLEVBQUU7O1lBRWxFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQjtLQUNGOzs7OztJQUVELG9FQUF1Qjs7OztJQUF2QixVQUF3QixnQkFBZ0I7O0tBRXZDOztnQkE5REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLFFBQVEsRUFBRSx1WUFVSDtpQkFDUjs7OztnQkFsQmtDLFVBQVU7OzswQ0F1QjFDLEtBQUs7OEJBQ0wsS0FBSzt1QkFDTCxLQUFLOzhCQUtMLE1BQU07OzZDQTlCVDs7U0FtQmEsa0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFbGVtZW50UmVmLCBTaW1wbGVDaGFuZ2VzLCBPbkNoYW5nZXMsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElBZGFwdGFibGVCbG90dGVyT3B0aW9ucyB9IGZyb20gJ2FkYXB0YWJsZWJsb3R0ZXIvdHlwZXMnO1xyXG5pbXBvcnQgSHlwZXJncmlkIGZyb20gJ2Zpbi1oeXBlcmdyaWQnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYWRhcHRhYmxlLWJsb3R0ZXItaHlwZXJncmlkJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgaWQ9XCJhZGFwdGFibGVCbG90dGVyLWFuZ3VsYXItaHlwZXJncmlkXCI+XHJcbiAgPGRpdiBpZD1cImFkYXB0YWJsZUJsb3R0ZXJcIj5cclxuICAgIDxhZGFwdGFibGUtYmxvdHRlclxyXG4gICAgICBbYWRhcHRhYmxlQmxvdHRlck9wdGlvbnNdPVwiYWRhcHRhYmxlQmxvdHRlck9wdGlvbnNcIlxyXG4gICAgICB2ZW5kb3JHcmlkTmFtZT1cIkh5cGVyZ3JpZFwiXHJcbiAgICAgIChhZGFwdGFibGVCbG90dGVyTW91bnRlZCk9XCJvbkFkYXB0YWJsZUJsb3R0ZXJNb3VudCgkZXZlbnQpXCJcclxuICAgICAgKm5nSWY9XCJncmlkTG9hZGVkXCI+XHJcbiAgICA8L2FkYXB0YWJsZS1ibG90dGVyPlxyXG4gIDwvZGl2PlxyXG4gICAgPGRpdiBpZD1cImh5cGVyZ3JpZC1jb250YWluZXJcIj48L2Rpdj5cclxuICA8L2Rpdj5gLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWRhcHRhYmxlYmxvdHRlckh5cGVyR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBwcml2YXRlIGdyaWQ7XHJcbiAgZ3JpZExvYWRlZCA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBhZGFwdGFibGVCbG90dGVyT3B0aW9uczogSUFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zO1xyXG4gIEBJbnB1dCgpIGdyaWRPcHRpb25zPzogYW55ID0ge307XHJcbiAgQElucHV0KCkgZGF0YT86IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdHMgdGhlIG1vdW50ZWQgSHlwZXJncmlkIG9iamVjdCBmb3IgYW55IHNwZWNpZmljIHNldHRpbmdzLlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBncmlkTW91bnRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuZmlyc3RDaGlsZC5sYXN0Q2hpbGQ7XHJcbiAgICB0aGlzLmdyaWQgPSBuZXcgSHlwZXJncmlkKGNvbnRhaW5lciwgdGhpcy5ncmlkT3B0aW9ucyk7XHJcbiAgICBpZiAoIXRoaXMuZ3JpZE9wdGlvbnMuZGF0YSkge1xyXG4gICAgICB0aGlzLmdyaWQuc2V0RGF0YSh0aGlzLmRhdGEpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hZGFwdGFibGVCbG90dGVyT3B0aW9ucy52ZW5kb3JHcmlkID0gdGhpcy5ncmlkO1xyXG4gICAgdGhpcy5ncmlkTG9hZGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuZ3JpZE1vdW50ZWQuZW1pdCh0aGlzLmdyaWQpO1xyXG4gICAgLy8gVE9ETzogRml4IHNvIGl0IHdvcmtzIHByb3Blcmx5IC0gaXRzIGEgdGVtcG9yYXlyIHdheSB0byBtYXJyeSB1cCB0aGUgMiBjb21wb25lbnRzXHJcbiAgICB0aGlzLmdyaWRPcHRpb25zLnNldHVwZ3JpZCh0aGlzLmFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zLnZlbmRvckdyaWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBncmlkIG9uIGlucHV0IGNoYW5nZXMuXHJcbiAgICogTmVlZCBvdXIgb3duIHVwZGF0ZSBsb2dpYyBzaW5jZSBoeXBlcmdyaWQgZG9lc24ndCBoYXZlIGFuIEFuZ3VsYXIgd3JhcHBlci5cclxuICAgKi9cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoIXRoaXMuZ3JpZCkgeyByZXR1cm47IH1cclxuICAgIGNvbnN0IGhnT3B0aW9uc0NoYW5nZSA9IGNoYW5nZXMuZ3JpZE9wdGlvbnM7XHJcbiAgICBjb25zdCBkYXRhQ2hhbmdlID0gY2hhbmdlcy5kYXRhO1xyXG4gICAgaWYgKGRhdGFDaGFuZ2UgJiYgZGF0YUNoYW5nZS5wcmV2aW91c1ZhbHVlICE9PSBkYXRhQ2hhbmdlLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICB0aGlzLmdyaWQuc2V0RGF0YShjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlKTtcclxuICAgIH1cclxuICAgIGlmIChoZ09wdGlvbnNDaGFuZ2UgJiYgIWhnT3B0aW9uc0NoYW5nZS5pc0ZpcnN0Q2hhbmdlKCkgJiZcclxuICAgICAgKGhnT3B0aW9uc0NoYW5nZS5wcmV2aW91c1ZhbHVlICE9PSBoZ09wdGlvbnNDaGFuZ2UuY3VycmVudFZhbHVlKSkge1xyXG4gICAgICAvLyBJbml0IHRoZSBncmlkIGFnYWluLCBvcHRpb25zIGNoYW5nZWRcclxuICAgICAgdGhpcy5uZ09uSW5pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25BZGFwdGFibGVCbG90dGVyTW91bnQoYWRhcHRhYmxlQmxvdHRlcikge1xyXG4gICAvLyBUb0RPXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=