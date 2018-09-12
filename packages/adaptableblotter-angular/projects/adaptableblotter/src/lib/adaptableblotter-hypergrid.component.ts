import { Component, OnInit, Input, ElementRef, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { IAdaptableBlotterOptions } from 'adaptableblotter/types';
import Hypergrid from 'fin-hypergrid';

@Component({
  selector: 'adaptable-blotter-hypergrid',
  template: `<div id="adaptableBlotter">
    <adaptable-blotter
      [adaptableBlotterOptions]="adaptableBlotterOptions"
      vendorGridName="Hypergrid">
    </adaptable-blotter>
    <div class="hypergrid-container"></div>
  </div>`,
})
export class AdaptableblotterHyperGridComponent implements OnInit, OnChanges {
  private grid;

  @Input() adaptableBlotterOptions: IAdaptableBlotterOptions;
  @Input() hyperGridOptions?: any = {};
  @Input() data?: Array<any> = [];

  /**
   * Emits the mounted Hypergrid object for any specific settings.
   */
  @Output() gridMounted = new EventEmitter<any>();

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    const container = this.elRef.nativeElement.firstChild.lastChild;
    this.grid = new Hypergrid(container, this.hyperGridOptions);
    if (!this.hyperGridOptions.data) {
      this.grid.setData(this.data);
    }
    this.gridMounted.emit(this.grid);
  }

  /**
   * Update the grid on input changes.
   * Need our own update logic since hypergrid doesn't have an Angular wrapper.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (!this.grid) { return; }
    const hgOptionsChange = changes.hyperGridOptions;
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

}
