import { Component, OnInit, Input } from '@angular/core';

import {
  AdaptableOptions,
  AdaptableApi,
} from '@adaptabletools/adaptable/types';

import { GridOptions, Module } from '@ag-grid-community/all-modules';
import { createAdaptable as adaptableFactory } from './createAdaptable';

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

@Component({
  entryComponents: [],
  selector: 'adaptable-angular-aggrid',
  template: `
    <div [id]="adaptableContainerId" [class]="wrapperClassName"></div>
    <div class="ab__ng-wrapper-aggrid">
      <div
        [id]="gridContainerId"
        style="position: relative; flex: 1"
        [class]="agGridContainerClassName"
      >
        <ag-grid-override
          [gridContainerId]="gridContainerId"
          [adaptableFactory]="adaptableFactory"
          [gridOptions]="gridOptions"
          [onAdaptableReady]="onAdaptableReady"
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
export class AdaptableAngularAgGridComponent implements OnInit {
  @Input() adaptableOptions: AdaptableOptions;
  @Input() gridOptions: GridOptions;
  @Input() modules?: Module[];
  @Input() agGridContainerClassName: string;
  @Input() onAdaptableReady?: (api: AdaptableApi) => void;

  public adaptableContainerId: string;
  public gridContainerId: string;

  public wrapperClassName = 'ab__ng-wrapper';

  public adaptableFactory: any;

  constructor() {
    const seedId = `${getRandomInt(1000)}-${Date.now()}`;

    this.adaptableContainerId = `adaptable-${seedId}`;
    this.gridContainerId = `grid-${seedId}`;
  }

  ngOnInit() {
    this.adaptableFactory = adaptableFactory({
      adaptableOptions: this.adaptableOptions,
      adaptableContainerId: this.adaptableContainerId,
      gridContainerId: this.gridContainerId,
      modules: this.modules,
    });
  }
}
