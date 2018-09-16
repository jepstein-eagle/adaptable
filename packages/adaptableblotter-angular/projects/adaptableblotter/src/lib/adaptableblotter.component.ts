import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';

import * as ReactDOM from 'adaptableblotter/node_modules/react-dom';
import { BlotterFactory, AdaptableBlotterApp } from 'adaptableblotter/factory';
import { IAdaptableBlotter, IAdaptableBlotterOptions } from 'adaptableblotter/types';

@Component({
  selector: 'adaptable-blotter',
  template: `<div [id]="adaptableBlotterOptions.adaptableBlotterContainer">Loading...</div>`,
  styles: []
})
export class AdaptableBlotterComponent implements OnInit {
  @Input() adaptableBlotterOptions: IAdaptableBlotterOptions;
  @Input() vendorGridName: 'agGrid' | 'Hypergrid' | 'Kendo' | 'AdaptableGrid';

  @Output() adaptableBlotterMounted = new EventEmitter<any>();

  private adaptableBlotter: IAdaptableBlotter;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.adaptableBlotterOptions.adaptableBlotterContainer =
      this.adaptableBlotterOptions.adaptableBlotterContainer || `adaptableBlotter-${Math.random() * 10000 | 0}`;
    this.adaptableBlotter = BlotterFactory.CreateAdaptableBlotter(
      this.adaptableBlotterOptions,
      this.vendorGridName
    );
    this.adaptableBlotterMounted.emit(this.adaptableBlotter);
    ReactDOM.render(
      AdaptableBlotterApp({ AdaptableBlotter: this.adaptableBlotter }),
      this.elRef.nativeElement.firstChild,
    );
  }

}
