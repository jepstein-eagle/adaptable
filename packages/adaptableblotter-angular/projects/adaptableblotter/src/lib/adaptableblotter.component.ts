import { Component, OnInit, Input } from '@angular/core';

import { BlotterFactory, AdaptableBlotterApp } from 'adaptableblotter/factory';
import { IAdaptableBlotter, IAdaptableBlotterOptions } from 'adaptableblotter/types';

@Component({
  selector: 'adaptable-blotter',
  template: `<p>adaptableblotter works!</p>`,
  styles: []
})
export class AdaptableBlotterComponent implements OnInit {
  @Input() AdaptableBlotterOptions: IAdaptableBlotterOptions;
  @Input() VendorGridName: 'agGrid' | 'Hypergrid' | 'Kendo' | 'AdaptableGrid';

  private AdaptableBlotter: IAdaptableBlotter;

  constructor() {}

  ngOnInit() {
    this.AdaptableBlotter = BlotterFactory.CreateAdaptableBlotter(
      this.AdaptableBlotterOptions,
      this.VendorGridName
    );
  }

}
