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

const getAgGridThemeClassName = (agGridTheme: string) => {
  if (typeof agGridTheme !== 'string') {
    agGridTheme = 'balham';
  }
  const themeClassName =
    agGridTheme.indexOf('ag-theme') === 0
      ? agGridTheme
      : `ag-theme-${agGridTheme}`;

  return themeClassName;
};

@Component({
  entryComponents: [],
  selector: 'adaptable-angular-aggrid',
  template: `
    <div [id]="adaptableContainerId" [class]="wrapperClassName"></div>
    <div class="ab__ng-wrapper-aggrid">
      <div
        [id]="gridContainerId"
        style="position: relative; flex: 1"
        [class]="getAgGridContainerClassName()"
      >
        <ag-grid-override
          data-grid-container-id="true"
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
  @Input() agGridTheme: 'balham' | 'alpine' = 'balham';
  @Input() agGridContainerClassName: string;
  @Input() onAdaptableReady?: (adaptableReadyInfo: {
    adaptableApi: AdaptableApi;
    vendorGrid: GridOptions;
  }) => void;

  public adaptableContainerId: string;
  public gridContainerId: string;

  public wrapperClassName = 'ab__ng-wrapper';

  public adaptableFactory: any;

  constructor() {
    const seedId = `${getRandomInt(1000)}-${Date.now()}`;

    this.adaptableContainerId = `adaptable-${seedId}`;
    this.gridContainerId = `grid-${seedId}`;
  }

  getAgGridContainerClassName(): string {
    return `${getAgGridThemeClassName(this.agGridTheme || '') || ''} ${this
      .agGridContainerClassName || ''}`;
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
