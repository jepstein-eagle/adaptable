import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { ComponentUtil, Grid } from 'ag-grid-community';

import {
  AgGridAngular,
  AngularFrameworkOverrides,
  AngularFrameworkComponentWrapper,
  AgGridColumn,
} from 'ag-grid-angular';
import AdaptableBlotter from '../adaptableblotter/App_Scripts/agGrid';
import { IBlotterApi } from '../adaptableblotter/types';

@Component({
  selector: 'ag-grid-override',
  template: '',
  providers: [AngularFrameworkOverrides, AngularFrameworkComponentWrapper],
  // tell angular we don't want view encapsulation, we don't want a shadow root
  // encapsulation: ViewEncapsulation.None
})
export class AgGridOverrideComponent extends AgGridAngular {
  @Input() blotterFactory: (...args: any) => AdaptableBlotter;
  @Input() gridContainerId: string;
  @Input() onBlotterReady?: (api: IBlotterApi) => void;

  ngAfterViewInit(): void {
    (this as any).checkForDeprecatedEvents();

    this.gridOptions = ComponentUtil.copyAttributesToGridOptions(
      this.gridOptions,
      this,
      true
    );

    (this as any).gridParams = {
      globalEventListener: (this as any).globalEventListener.bind(this),
      frameworkOverrides: (this as any).angularFrameworkOverrides,
      seedBeanInstances: {
        frameworkComponentWrapper: (this as any).frameworkComponentWrapper,
      },
    };

    if (this.columns && this.columns.length > 0) {
      this.gridOptions.columnDefs = this.columns.map((column: AgGridColumn) => {
        return column.toColDef();
      });
    }

    const blotter = this.blotterFactory(
      this.gridOptions,
      (this as any).gridParams
    );

    this.api = blotter.gridOptions.api;
    this.columnApi = blotter.gridOptions.columnApi;
    // new Grid(
    //   (this as any)._nativeElement,
    //   this.gridOptions,
    //   (this as any).gridParams
    // );

    if (blotter.gridOptions.api) {
      this.api = blotter.gridOptions.api;
    }

    if (blotter.gridOptions.columnApi) {
      this.columnApi = blotter.gridOptions.columnApi;
    }

    (this as any)._initialised = true;

    // sometimes, especially in large client apps gridReady can fire before ngAfterViewInit
    // this ties these together so that gridReady will always fire after agGridAngular's ngAfterViewInit
    // the actual containing component's ngAfterViewInit will fire just after agGridAngular's
    (this as any)._fullyReady.resolveNow(null, (resolve: any) => resolve);

    if (this.onBlotterReady) {
      this.onBlotterReady(blotter.api);
    }
  }
}
