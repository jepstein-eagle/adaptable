/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import Hypergrid from 'fin-hypergrid';
export class AdaptableblotterHyperGridComponent {
    /**
     * @param {?} elRef
     */
    constructor(elRef) {
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
    ngOnInit() {
        /** @type {?} */
        const container = this.elRef.nativeElement.firstChild.lastChild;
        this.grid = new Hypergrid(container, this.gridOptions);
        if (!this.gridOptions.data) {
            this.grid.setData(this.data);
        }
        this.adaptableBlotterOptions.vendorGrid = this.grid;
        this.gridLoaded = true;
        this.gridMounted.emit(this.grid);
        // TODO: Fix so it works properly - its a temporayr way to marry up the 2 components
        this.gridOptions.setupgrid(this.adaptableBlotterOptions.vendorGrid);
    }
    /**
     * Update the grid on input changes.
     * Need our own update logic since hypergrid doesn't have an Angular wrapper.
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.grid) {
            return;
        }
        /** @type {?} */
        const hgOptionsChange = changes["gridOptions"];
        /** @type {?} */
        const dataChange = changes["data"];
        if (dataChange && dataChange.previousValue !== dataChange.currentValue) {
            this.grid.setData(changes["data"].currentValue);
        }
        if (hgOptionsChange && !hgOptionsChange.isFirstChange() &&
            (hgOptionsChange.previousValue !== hgOptionsChange.currentValue)) {
            // Init the grid again, options changed
            this.ngOnInit();
        }
    }
    /**
     * @param {?} adaptableBlotter
     * @return {?}
     */
    onAdaptableBlotterMount(adaptableBlotter) {
        // ToDO
    }
}
AdaptableblotterHyperGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'adaptable-blotter-hypergrid',
                template: `<div id="adaptableBlotter-angular-hypergrid">
  <div id="adaptableBlotter">
    <adaptable-blotter
      [adaptableBlotterOptions]="adaptableBlotterOptions"
      vendorGridName="Hypergrid"
      (adaptableBlotterMounted)="onAdaptableBlotterMount($event)"
      *ngIf="gridLoaded">
    </adaptable-blotter>
  </div>
    <div id="hypergrid-container"></div>
  </div>`
            }] }
];
/** @nocollapse */
AdaptableblotterHyperGridComponent.ctorParameters = () => [
    { type: ElementRef }
];
AdaptableblotterHyperGridComponent.propDecorators = {
    adaptableBlotterOptions: [{ type: Input }],
    gridOptions: [{ type: Input }],
    data: [{ type: Input }],
    gridMounted: [{ type: Output }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRhYmxlYmxvdHRlci1oeXBlcmdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYWRhcHRhYmxlYmxvdHRlci1hbmd1bGFyLyIsInNvdXJjZXMiOlsibGliL2FkYXB0YWJsZWJsb3R0ZXItaHlwZXJncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsVUFBVSxFQUE0QixNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJILE9BQU8sU0FBUyxNQUFNLGVBQWUsQ0FBQztBQWlCdEMsTUFBTTs7OztJQWFKLFlBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7MEJBWHhCLEtBQUs7MkJBR1csRUFBRTtvQkFDRixFQUFFOzs7OzJCQUtQLElBQUksWUFBWSxFQUFPO0tBRUw7Ozs7SUFFMUMsUUFBUTs7UUFDTixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3BELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFFakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3JFOzs7Ozs7O0lBTUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQUUsT0FBTztTQUFFOztRQUMzQixNQUFNLGVBQWUsR0FBRyxPQUFPLGdCQUFhOztRQUM1QyxNQUFNLFVBQVUsR0FBRyxPQUFPLFNBQU07UUFDaEMsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLGFBQWEsS0FBSyxVQUFVLENBQUMsWUFBWSxFQUFFO1lBQ3RFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sU0FBTSxZQUFZLENBQUMsQ0FBQztTQUM5QztRQUNELElBQUksZUFBZSxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRTtZQUNyRCxDQUFDLGVBQWUsQ0FBQyxhQUFhLEtBQUssZUFBZSxDQUFDLFlBQVksQ0FBQyxFQUFFOztZQUVsRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7S0FDRjs7Ozs7SUFFRCx1QkFBdUIsQ0FBQyxnQkFBZ0I7O0tBRXZDOzs7WUE5REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLFFBQVEsRUFBRTs7Ozs7Ozs7OztTQVVIO2FBQ1I7Ozs7WUFsQmtDLFVBQVU7OztzQ0F1QjFDLEtBQUs7MEJBQ0wsS0FBSzttQkFDTCxLQUFLOzBCQUtMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYsIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlcywgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSUFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zIH0gZnJvbSAnYWRhcHRhYmxlYmxvdHRlci90eXBlcyc7XHJcbmltcG9ydCBIeXBlcmdyaWQgZnJvbSAnZmluLWh5cGVyZ3JpZCc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhZGFwdGFibGUtYmxvdHRlci1oeXBlcmdyaWQnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBpZD1cImFkYXB0YWJsZUJsb3R0ZXItYW5ndWxhci1oeXBlcmdyaWRcIj5cclxuICA8ZGl2IGlkPVwiYWRhcHRhYmxlQmxvdHRlclwiPlxyXG4gICAgPGFkYXB0YWJsZS1ibG90dGVyXHJcbiAgICAgIFthZGFwdGFibGVCbG90dGVyT3B0aW9uc109XCJhZGFwdGFibGVCbG90dGVyT3B0aW9uc1wiXHJcbiAgICAgIHZlbmRvckdyaWROYW1lPVwiSHlwZXJncmlkXCJcclxuICAgICAgKGFkYXB0YWJsZUJsb3R0ZXJNb3VudGVkKT1cIm9uQWRhcHRhYmxlQmxvdHRlck1vdW50KCRldmVudClcIlxyXG4gICAgICAqbmdJZj1cImdyaWRMb2FkZWRcIj5cclxuICAgIDwvYWRhcHRhYmxlLWJsb3R0ZXI+XHJcbiAgPC9kaXY+XHJcbiAgICA8ZGl2IGlkPVwiaHlwZXJncmlkLWNvbnRhaW5lclwiPjwvZGl2PlxyXG4gIDwvZGl2PmAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZGFwdGFibGVibG90dGVySHlwZXJHcmlkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIHByaXZhdGUgZ3JpZDtcclxuICBncmlkTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gIEBJbnB1dCgpIGFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zOiBJQWRhcHRhYmxlQmxvdHRlck9wdGlvbnM7XHJcbiAgQElucHV0KCkgZ3JpZE9wdGlvbnM/OiBhbnkgPSB7fTtcclxuICBASW5wdXQoKSBkYXRhPzogQXJyYXk8YW55PiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyB0aGUgbW91bnRlZCBIeXBlcmdyaWQgb2JqZWN0IGZvciBhbnkgc3BlY2lmaWMgc2V0dGluZ3MuXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIGdyaWRNb3VudGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5maXJzdENoaWxkLmxhc3RDaGlsZDtcclxuICAgIHRoaXMuZ3JpZCA9IG5ldyBIeXBlcmdyaWQoY29udGFpbmVyLCB0aGlzLmdyaWRPcHRpb25zKTtcclxuICAgIGlmICghdGhpcy5ncmlkT3B0aW9ucy5kYXRhKSB7XHJcbiAgICAgIHRoaXMuZ3JpZC5zZXREYXRhKHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFkYXB0YWJsZUJsb3R0ZXJPcHRpb25zLnZlbmRvckdyaWQgPSB0aGlzLmdyaWQ7XHJcbiAgICB0aGlzLmdyaWRMb2FkZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5ncmlkTW91bnRlZC5lbWl0KHRoaXMuZ3JpZCk7XHJcbiAgICAvLyBUT0RPOiBGaXggc28gaXQgd29ya3MgcHJvcGVybHkgLSBpdHMgYSB0ZW1wb3JheXIgd2F5IHRvIG1hcnJ5IHVwIHRoZSAyIGNvbXBvbmVudHNcclxuICAgIHRoaXMuZ3JpZE9wdGlvbnMuc2V0dXBncmlkKHRoaXMuYWRhcHRhYmxlQmxvdHRlck9wdGlvbnMudmVuZG9yR3JpZCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIGdyaWQgb24gaW5wdXQgY2hhbmdlcy5cclxuICAgKiBOZWVkIG91ciBvd24gdXBkYXRlIGxvZ2ljIHNpbmNlIGh5cGVyZ3JpZCBkb2Vzbid0IGhhdmUgYW4gQW5ndWxhciB3cmFwcGVyLlxyXG4gICAqL1xyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmICghdGhpcy5ncmlkKSB7IHJldHVybjsgfVxyXG4gICAgY29uc3QgaGdPcHRpb25zQ2hhbmdlID0gY2hhbmdlcy5ncmlkT3B0aW9ucztcclxuICAgIGNvbnN0IGRhdGFDaGFuZ2UgPSBjaGFuZ2VzLmRhdGE7XHJcbiAgICBpZiAoZGF0YUNoYW5nZSAmJiBkYXRhQ2hhbmdlLnByZXZpb3VzVmFsdWUgIT09IGRhdGFDaGFuZ2UuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuZ3JpZC5zZXREYXRhKGNoYW5nZXMuZGF0YS5jdXJyZW50VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGhnT3B0aW9uc0NoYW5nZSAmJiAhaGdPcHRpb25zQ2hhbmdlLmlzRmlyc3RDaGFuZ2UoKSAmJlxyXG4gICAgICAoaGdPcHRpb25zQ2hhbmdlLnByZXZpb3VzVmFsdWUgIT09IGhnT3B0aW9uc0NoYW5nZS5jdXJyZW50VmFsdWUpKSB7XHJcbiAgICAgIC8vIEluaXQgdGhlIGdyaWQgYWdhaW4sIG9wdGlvbnMgY2hhbmdlZFxyXG4gICAgICB0aGlzLm5nT25Jbml0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkFkYXB0YWJsZUJsb3R0ZXJNb3VudChhZGFwdGFibGVCbG90dGVyKSB7XHJcbiAgIC8vIFRvRE9cclxuICB9XHJcblxyXG59XHJcbiJdfQ==