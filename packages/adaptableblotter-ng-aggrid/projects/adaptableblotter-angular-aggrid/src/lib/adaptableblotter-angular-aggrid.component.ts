import { Component, OnInit, Input } from '@angular/core';

import AdaptableBlotter from '../adaptableblotter/App_Scripts/agGrid';
import {
  IAdaptableBlotter,
  IAdaptableBlotterOptions,
} from '../adaptableblotter/types';

import { GridOptions } from 'ag-grid-community/dist/lib/entities/gridOptions';

const getRandomInt = (max: number): number =>
  Math.floor(Math.random() * Math.floor(max));

@Component({
  selector: 'adaptableblotter-angular-aggrid',
  template: `
    <div [id]="blotterContainerId" [class]="wrapperClassName"></div>
    <div [id]="gridContainerId" style="position: relative; flex: 1">
      <div
        style="position: absolute; left: 0; right: 0; width: 100%; height:100%"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-flow: var(--ab_flex-direction, column);
        min-height: var(--ab_min-height, 100px);
      }
    `,
  ],
})
export class AdaptableBlotterAngularAggridComponent implements OnInit {
  @Input() blotterOptions: IAdaptableBlotterOptions;
  @Input() gridOptions: GridOptions;

  public blotterContainerId: string;

  public gridContainerId: string;
  public wrapperClassName: string = 'ab__ng-wrapper';

  private adaptableBlotter: IAdaptableBlotter;

  constructor() {
    const seedId = `${getRandomInt(1000)}-${Date.now()}`;

    this.blotterContainerId = `blotter-${seedId}`;
    this.gridContainerId = `grid-${seedId}`;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.adaptableBlotter = new AdaptableBlotter(
      {
        ...this.blotterOptions,
        containerOptions: {
          ...this.blotterOptions.containerOptions,
          adaptableBlotterContainer: this.blotterContainerId,
          vendorContainer: this.gridContainerId,
        },
        vendorGrid: this.gridOptions,
      },
      true
    );
  }
}
