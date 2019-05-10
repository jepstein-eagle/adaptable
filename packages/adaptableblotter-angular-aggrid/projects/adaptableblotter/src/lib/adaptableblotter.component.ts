declare var require: any;

import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';

import { AdaptableBlotterApp, AdaptableBlotter } from 'adaptableblotter/aggrid';
import { IAdaptableBlotter, IAdaptableBlotterOptions } from 'adaptableblotter/types';

let ReactDOM;
try {
  ReactDOM = require('react-dom');
} catch (ignored) {
  ReactDOM = require('adaptableblotter/react-dom').ReactDOM;
}

@Component({
  selector: 'adaptable-blotter',
  template: `
    <div [id]="adaptableBlotterOptions.containerOptions.adaptableBlotterContainer">Loading...</div>
  `,
  styles: [],
})
export class AdaptableBlotterComponent implements OnInit {
  @Input() adaptableBlotterOptions: IAdaptableBlotterOptions;

  @Output() adaptableBlotterMounted = new EventEmitter<any>();

  private adaptableBlotter: IAdaptableBlotter;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.adaptableBlotterOptions.containerOptions.adaptableBlotterContainer =
      this.adaptableBlotterOptions.containerOptions.adaptableBlotterContainer ||
      `adaptableBlotter-${(Math.random() * 10000) | 0}`;
    const waitForContainer = setInterval(() => {
      try {
        document.getElementById(
          this.adaptableBlotterOptions.containerOptions.adaptableBlotterContainer
        );
        // Element is mounted
        this.adaptableBlotter = new AdaptableBlotter(this.adaptableBlotterOptions, false);
        this.adaptableBlotterMounted.emit(this.adaptableBlotter);
        ReactDOM.render(
          AdaptableBlotterApp({ AdaptableBlotter: this.adaptableBlotter }),
          this.elRef.nativeElement.firstChild
        );
        clearInterval(waitForContainer);
      } catch (e) {}
    }, 100);
  }
}
