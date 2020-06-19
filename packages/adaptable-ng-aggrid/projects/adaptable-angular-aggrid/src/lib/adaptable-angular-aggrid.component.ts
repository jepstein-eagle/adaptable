import {
  Component,
  Input,
  AfterViewInit,
  EventEmitter,
  Output,
  HostBinding,
  OnDestroy,
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
  template: '',
})
export class AdaptableAngularAgGridComponent
  implements AfterViewInit, OnDestroy {
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
  private adaptableApi: AdaptableApi;

  constructor() {
    const seedId = `${getRandomInt(1000)}-${Date.now()}`;

    this.adaptableContainerId = `adaptable-${seedId}`;
  }

  ngAfterViewInit() {
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
      // IF YOU UPDATE THIS, make sure you also update the React wrapper impl
      const layoutElements = (this.gridOptions.api as any).gridOptionsWrapper
        ? (this.gridOptions.api as any).gridOptionsWrapper.layoutElements || []
        : [];

      let vendorContainer;

      for (let i = 0, len = layoutElements.length; i < len; i++) {
        const element = layoutElements[i];

        if (element && element.matches('.ag-root-wrapper')) {
          const gridContainer = element.closest('[class*="ag-theme"]');

          if (gridContainer) {
            vendorContainer = gridContainer;
            break;
          }
        }
      }

      if (!vendorContainer) {
        console.error(
          `Could not find the agGrid vendor container. This will probably break some AdapTable functionality.`
        );
      }

      this.adaptableOptions.vendorGrid = this.gridOptions;

      this.adaptableOptions.containerOptions =
        this.adaptableOptions.containerOptions || {};
      this.adaptableOptions.containerOptions.adaptableContainer = this.adaptableContainerId;
      this.adaptableOptions.containerOptions.vendorContainer = vendorContainer;

      const adaptableApi = Adaptable.init(this.adaptableOptions);

      adaptableApi.eventApi.on(
        'AdaptableReady',
        (adaptabReadyInfo: {
          adaptableApi: AdaptableApi;
          vendorGrid: GridOptions;
        }) => {
          this.adaptableReady.emit(adaptabReadyInfo);
        }
      );

      this.adaptableApi = adaptableApi;
    });
  }

  ngOnDestroy() {
    if (!this.adaptableApi) {
      return;
    }
    this.adaptableApi.destroy({
      unmount: true,
      destroyApi: false,
    });
    this.adaptableApi = null;
  }
}
