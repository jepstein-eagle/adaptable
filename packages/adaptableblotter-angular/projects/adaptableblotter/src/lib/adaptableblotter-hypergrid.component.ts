import { Component, OnInit, Input, ElementRef, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { IAdaptableBlotterOptions } from 'adaptableblotter/types';
import Hypergrid from 'fin-hypergrid';

const lightTheme = {
  font: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
  color: '#003f59',
  backgroundColor: '#ffffff',
  altbackground: '#e6f2f8',
  foregroundSelectionColor: '#ffffff',
  backgroundSelectionColor: 'rgba(13, 106, 146, 0.5)',

  columnHeaderFont: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
  columnHeaderColor: '#00435e',
  columnHeaderBackgroundColor: '#d9ecf5',
  columnHeaderForegroundSelectionColor: 'rgb(25, 25, 25)',
  columnHeaderBackgroundSelectionColor: 'rgb(255, 220, 97)',

  rowHeaderFont: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
  rowHeaderColor: '#00435e',
  rowHeaderBackgroundColor: '#d9ecf5',
  rowHeaderForegroundSelectionColor: 'rgb(25, 25, 25)',
  rowHeaderBackgroundSelectionColor: 'rgb(255, 220, 97)',

  backgroundColor2: 'rgb(201, 201, 201)',
  lineColor: '#bbdceb',
  voffset: 0,
  scrollbarHoverOver: 'visible',
  scrollbarHoverOff: 'visible',
  scrollingEnabled: true,

  fixedRowAlign: 'center',
  fixedColAlign: 'center',
  cellPadding: 15,
  gridLinesH: false,
  gridLinesV: true,

  defaultRowHeight: 30,
  defaultFixedRowHeight: 15,
  showRowNumbers: false,
  editorActivationKeys: ['alt', 'esc'],
  columnAutosizing: true,
  readOnly: false
};

const darkTheme = {
  font: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
  color: '#ffffff',
  backgroundColor: '#403E3E',
  altbackground: '#302E2E',
  foregroundSelectionColor: '#ffffff',
  backgroundSelectionColor: '#546465',

  columnHeaderFont: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
  columnHeaderColor: '#ffffff',
  columnHeaderBackgroundColor: '#626262',
  columnHeaderForegroundSelectionColor: '#ffffff',
  columnHeaderBackgroundSelectionColor: '#546465',

  rowHeaderFont: '14px Helvetica Neue, Helvetica, Arial, sans-serif',
  rowHeaderColor: '#ffffff',
  rowHeaderBackgroundColor: '#07071E',
  rowHeaderForegroundSelectionColor: '#ffffff',
  rowHeaderBackgroundSelectionColor: '#3D77FE',

  backgroundColor2: 'rgb(201, 201, 201)',
  lineColor: 'rgb(199, 199, 199)',
  voffset: 0,
  scrollbarHoverOver: 'visible',
  scrollbarHoverOff: 'visible',
  scrollingEnabled: true,

  fixedRowAlign: 'center',
  fixedColAlign: 'center',
  cellPadding: 15,
  gridLinesH: false,
  gridLinesV: false,

  defaultRowHeight: 30,
  defaultFixedRowHeight: 15,
  showRowNumbers: false,
  editorActivationKeys: ['alt', 'esc'],
  columnAutosizing: true,
  readOnly: false
};

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
  private themeName = '';
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
    adaptableBlotter.AdaptableBlotterStore.TheStore.subscribe(() =>
      this.onThemeChange(adaptableBlotter));
  }

  onThemeChange(blotter) {
    const currentTheme = blotter.AdaptableBlotterStore.TheStore.getState().Theme.CurrentTheme;
    if (this.themeName !== currentTheme) {
        this.themeName = currentTheme;
        if (this.themeName === 'Dark Theme') {
            this.grid.addProperties(darkTheme);
        } else {
            this.grid.addProperties(lightTheme);
        }
    }
  }
}
