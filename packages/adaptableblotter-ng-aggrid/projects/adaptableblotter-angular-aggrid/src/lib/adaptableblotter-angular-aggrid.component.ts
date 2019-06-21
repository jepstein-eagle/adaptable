import { Component, OnInit, Input } from '@angular/core';

import { AdaptableBlotterOptions } from '../adaptableblotter/types';

import { GridOptions } from 'ag-grid-community';
import blotterFactory from './createBlotter';

const getRandomInt = (max: number): number =>
  Math.floor(Math.random() * Math.floor(max));

@Component({
  entryComponents: [],
  selector: 'adaptableblotter-angular-aggrid',
  template: `
    <div [id]="blotterContainerId" [class]="wrapperClassName"></div>
    <div [id]="gridContainerId" style="position: relative; flex: 1">
      <div
        style="position: absolute; left: 0; right: 0; width: 100%; height:100%"
      >
        <ag-grid-override
          [gridContainerId]="gridContainerId"
          [blotterFactory]="blotterFactory"
          [gridOptions]="gridOptions"
        ></ag-grid-override>
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
export class AdaptableBlotterAngularAgGridComponent implements OnInit {
  @Input() blotterOptions: AdaptableBlotterOptions;
  @Input() gridOptions: GridOptions;

  public blotterContainerId: string;
  public gridContainerId: string;

  public wrapperClassName: string = 'ab__ng-wrapper';

  private blotterFactory: any;

  constructor() {
    const seedId = `${getRandomInt(1000)}-${Date.now()}`;

    this.blotterContainerId = `blotter-${seedId}`;
    this.gridContainerId = `grid-${seedId}`;
  }

  ngOnInit() {
    this.blotterFactory = blotterFactory({
      blotterOptions: this.blotterOptions,
      blotterContainerId: this.blotterContainerId,
      gridContainerId: this.gridContainerId,
    });
  }
}
