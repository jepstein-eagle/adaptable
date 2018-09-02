import { Component, OnInit, Input, ElementRef } from '@angular/core';

import * as ReactDOM from 'adaptableblotter/node_modules/react-dom';
import { BlotterFactory, AdaptableBlotterApp } from 'adaptableblotter/factory';
import { IAdaptableBlotter, IAdaptableBlotterOptions } from 'adaptableblotter/types';

@Component({
  selector: 'adaptable-blotter',
  template: `<div id="adaptableBlotter"><div>Loading...</div></div>`,
  styles: []
})
export class AdaptableBlotterComponent implements OnInit {
  @Input() adaptableBlotterOptions: IAdaptableBlotterOptions;
  @Input() vendorGridName: 'agGrid' | 'Hypergrid' | 'Kendo' | 'AdaptableGrid';

  private adaptableBlotter: IAdaptableBlotter;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.adaptableBlotter = BlotterFactory.CreateAdaptableBlotter(
      this.adaptableBlotterOptions,
      this.vendorGridName
    );
    ReactDOM.render(
      AdaptableBlotterApp({ AdaptableBlotter: this.adaptableBlotter }),
      this.elRef.nativeElement.firstChild.firstChild,
    );
  }

}
