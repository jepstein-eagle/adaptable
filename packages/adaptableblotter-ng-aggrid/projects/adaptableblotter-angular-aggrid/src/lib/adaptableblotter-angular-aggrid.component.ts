import { Component, OnInit, Input } from '@angular/core';

import { AdaptableOptions } from '../adaptableblotter/types';

import { GridOptions } from 'ag-grid-community';
import { createBlotter as blotterFactory } from './createBlotter';
import { AdaptableApi } from '../adaptableblotter/types';

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

@Component({
  entryComponents: [],
  selector: 'adaptableblotter-angular-aggrid',
  template: `
    <div [id]="blotterContainerId" [class]="wrapperClassName"></div>
    <div class="ab__ng-wrapper-aggrid">
      <div
        [id]="gridContainerId"
        style="position: relative; flex: 1"
        [class]="agGridContainerClassName"
      >
        <ag-grid-override
          [gridContainerId]="gridContainerId"
          [blotterFactory]="blotterFactory"
          [gridOptions]="gridOptions"
          [onBlotterReady]="onBlotterReady"
        ></ag-grid-override>
      </div>
    </div>
  `,
  styles: [
    `
      .ab__ng-wrapper-aggrid {
        flex: 1;
        display: flex;
        flex-flow: column;
      }
      :host {
        display: flex;
        flex-flow: var(--ab_flex-direction, column);
        min-height: var(--ab_min-height, 100px);
      }
    `,
  ],
})
export class AdaptableBlotterAngularAgGridComponent implements OnInit {
  @Input() blotterOptions: AdaptableOptions;
  @Input() gridOptions: GridOptions;
  @Input() agGridContainerClassName: string;
  @Input() onBlotterReady?: (api: AdaptableApi) => void;

  public blotterContainerId: string;
  public gridContainerId: string;

  public wrapperClassName = 'ab__ng-wrapper';

  public blotterFactory: any;

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
