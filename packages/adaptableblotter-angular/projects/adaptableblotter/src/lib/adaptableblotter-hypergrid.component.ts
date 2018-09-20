import { Component, OnInit, Input, ElementRef, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { IAdaptableBlotterOptions } from 'adaptableblotter/types';
import Hypergrid from 'fin-hypergrid';


@Component({
  selector: 'adaptable-blotter-hypergrid',
  template: `<div id="adaptableBlotter-angular-hypergrid">
    <adaptable-blotter
      [adaptableBlotterOptions]="adaptableBlotterOptions"
      vendorGridName="Hypergrid"
      (adaptableBlotterMounted)="onAdaptableBlotterMount($event)"
      *ngIf="gridLoaded">
    </adaptable-blotter>
    <div id="hypergrid-container"></div>
  </div>`,
})
export class AdaptableblotterHyperGridComponent implements OnInit, OnChanges {
  private grid;
  gridLoaded = false;

  @Input() adaptableBlotterOptions: IAdaptableBlotterOptions;
  @Input() gridOptions?: any = {};
  @Input() data?: Array<any> = [];

  /**
   * Emits the mounted Hypergrid object for any specific settings.
   */
  @Output() gridMounted = new EventEmitter<any>();

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
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
   */
  ngOnChanges(changes: SimpleChanges) {
    if (!this.grid) { return; }
    const hgOptionsChange = changes.gridOptions;
    const dataChange = changes.data;
    if (dataChange && dataChange.previousValue !== dataChange.currentValue) {
      this.grid.setData(changes.data.currentValue);
    }
    if (hgOptionsChange && !hgOptionsChange.isFirstChange() &&
      (hgOptionsChange.previousValue !== hgOptionsChange.currentValue)) {
      // Init the grid again, options changed
      this.ngOnInit();
    }
  }

  onAdaptableBlotterMount(adaptableBlotter) {
   // ToDO
  }

}
