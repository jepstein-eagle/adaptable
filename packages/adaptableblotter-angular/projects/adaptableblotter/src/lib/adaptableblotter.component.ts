declare var require: any;

import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';

import { BlotterFactory, AdaptableBlotterApp } from 'adaptableblotter/factory';
import { IAdaptableBlotter, IAdaptableBlotterOptions } from 'adaptableblotter/types';
// import ReactDOM from 'react-dom';

let ReactDOM;
try {
  ReactDOM = require('react-dom');
} catch (ignored) {
  ReactDOM = require('adaptableblotter/node_modules/react-dom');
}

@Component({
  selector: 'adaptable-blotter',
  template: `<div [id]="adaptableBlotterOptions.containerOptions.adaptableBlotterContainer">Loading...</div>`,
  styles: []
})
export class AdaptableBlotterComponent implements OnInit {
  @Input() adaptableBlotterOptions: IAdaptableBlotterOptions;
  @Input() vendorGridName: 'agGrid' | 'Hypergrid';

  @Output() adaptableBlotterMounted = new EventEmitter<any>();

  private adaptableBlotter: IAdaptableBlotter;

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    this.adaptableBlotterOptions.containerOptions.adaptableBlotterContainer =
      this.adaptableBlotterOptions.containerOptions.adaptableBlotterContainer || `adaptableBlotter-${Math.random() * 10000 | 0}`;
    const waitForContainer = setInterval(() => {
      try {
        document.getElementById(this.adaptableBlotterOptions.containerOptions.adaptableBlotterContainer);
        // Element is mounted
        this.adaptableBlotter = BlotterFactory.CreateAdaptableBlotter(
          this.adaptableBlotterOptions,
          this.vendorGridName
        );
        this.adaptableBlotterMounted.emit(this.adaptableBlotter);
        ReactDOM.render(
          AdaptableBlotterApp({ AdaptableBlotter: this.adaptableBlotter }),
          this.elRef.nativeElement.firstChild,
        );
        clearInterval(waitForContainer);
      } catch (e) {
      }
    }, 100);
  }

}
