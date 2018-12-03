declare var require: any;

import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';

import { BlotterFactory, AdaptableBlotterApp } from 'adaptableblotter/factory';
import { IAdaptableBlotter, IAdaptableBlotterOptions } from 'adaptableblotter/types';

const ReactDOM = require('react-dom') || require('adaptableblotter/node_modules/react-dom');

@Component({
  selector: 'adaptable-blotter',
  template: `<div [id]="adaptableBlotterOptions.adaptableBlotterContainer">Loading...</div>`,
  styles: []
})
export class AdaptableBlotterComponent implements OnInit {
  @Input() adaptableBlotterOptions: IAdaptableBlotterOptions;
  @Input() vendorGridName: 'agGrid' | 'Hypergrid' ;

  @Output() adaptableBlotterMounted = new EventEmitter<any>();

  private adaptableBlotter: IAdaptableBlotter;

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.adaptableBlotterOptions.adaptableBlotterContainer =
      this.adaptableBlotterOptions.adaptableBlotterContainer || `adaptableBlotter-${Math.random() * 10000 | 0}`;
    const waitForContainer = setInterval(() => {
      try {
        document.getElementById(this.adaptableBlotterOptions.adaptableBlotterContainer);
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
