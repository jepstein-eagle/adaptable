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

  async ngAfterViewInit() {
    this.adaptableOptions.vendorGrid = this.gridOptions;

    this.adaptableOptions.containerOptions =
      this.adaptableOptions.containerOptions || {};
    this.adaptableOptions.containerOptions.adaptableContainer = this.adaptableContainerId;

    const adaptableApi = await Adaptable.initInternal(this.adaptableOptions, {
      waitForAgGrid: true,
    });

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
