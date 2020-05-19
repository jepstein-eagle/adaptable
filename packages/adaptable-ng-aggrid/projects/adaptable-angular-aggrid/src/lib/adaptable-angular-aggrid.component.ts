import {
  Component,
  Input,
  AfterViewInit,
  EventEmitter,
  Output,
  HostBinding,
} from '@angular/core';

import { GridOptions } from '@ag-grid-community/all-modules';

import {
  AdaptableOptions,
  AdaptableApi,
} from '@adaptabletools/adaptable/types';

import Adaptable from '@adaptabletools/adaptable/src/agGrid';

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

@Component({
  entryComponents: [],
  selector: 'adaptable-angular-aggrid',
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
export class AdaptableAngularAgGridComponent implements AfterViewInit {
  @HostBinding('id') get id() {
    return this.adaptableContainerId;
  }

  @Input() adaptableOptions: AdaptableOptions;
  @Input() gridOptions: GridOptions;

  @Output() adaptableReady = new EventEmitter<{
    adaptableApi: AdaptableApi;
    vendorGrid: GridOptions;
  }>();

  public adaptableContainerId: string;
  public gridContainerId: string;

  constructor() {
    const seedId = `${getRandomInt(1000)}-${Date.now()}`;

    this.adaptableContainerId = `adaptable-${seedId}`;
    this.gridContainerId = `grid-${seedId}`;
  }

  ngAfterViewInit() {
    this.adaptableOptions.vendorGrid = this.gridOptions;

    this.adaptableOptions.containerOptions =
      this.adaptableOptions.containerOptions || {};
    this.adaptableOptions.containerOptions.adaptableContainer = this.adaptableContainerId;

    const getContainer = () => {
      return document.getElementById(
        this.adaptableOptions.containerOptions.adaptableContainer
      );
    };

    const startTime = Date.now();

    const poolForAggrid = (callback: () => void) => {
      const api = this.gridOptions.api;

      if (Date.now() - startTime > 1000) {
        console.warn(
          `Could not find any agGrid instance rendered.
Please make sure you pass "gridOptions" to AdapTable, so it can connect to the correct agGrid instance.`
        );
        return;
      }

      if (!api) {
        requestAnimationFrame(() => {
          poolForAggrid(callback);
        });
      } else {
        callback();
      }
    };

    poolForAggrid(() => {
      const api = Adaptable.init(this.adaptableOptions);
      api.eventApi.on(
        'AdaptableReady',
        (adaptabReadyInfo: {
          adaptableApi: AdaptableApi;
          vendorGrid: GridOptions;
        }) => {
          this.adaptableReady.emit(adaptabReadyInfo);
        }
      );
    });
  }
}
