import { Component, Input } from '@angular/core';

import { ComponentUtil } from '@ag-grid-community/all-modules';

import {
  AgGridAngular,
  AngularFrameworkOverrides,
  AngularFrameworkComponentWrapper,
  AgGridColumn,
} from '@ag-grid-community/angular';
import Adaptable from '@adaptabletools/adaptable/src/agGrid';
import { AdaptableApi } from '@adaptabletools/adaptable/types';

@Component({
  selector: 'ag-grid-override',
  template: '',
  providers: [AngularFrameworkOverrides, AngularFrameworkComponentWrapper],
  // tell angular we don't want view encapsulation, we don't want a shadow root
  // encapsulation: ViewEncapsulation.None
})
export class AgGridOverrideComponent extends AgGridAngular {
  @Input() adaptableFactory: (...args: any) => Adaptable;
  @Input() gridContainerId: string;
  @Input() onAdaptableReady?: (api: AdaptableApi) => void;

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
      providedBeanInstances: {
        frameworkComponentWrapper: (this as any).frameworkComponentWrapper,
      },
      modules: (this.modules || []) as any,
    };

    if (this.columns && this.columns.length > 0) {
      this.gridOptions.columnDefs = this.columns.map((column: AgGridColumn) => {
        return column.toColDef();
      });
    }

    const adaptable = this.adaptableFactory(
      this.gridOptions,
      (this as any).gridParams
    );

    // new Grid(
    //   (this as any)._nativeElement,
    //   this.gridOptions,
    //   (this as any).gridParams
    // );

    if (adaptable.gridOptions.api) {
      this.api = adaptable.gridOptions.api;
    }

    if (adaptable.gridOptions.columnApi) {
      this.columnApi = adaptable.gridOptions.columnApi;
    }

    (this as any)._initialised = true;

    // sometimes, especially in large client apps gridReady can fire before ngAfterViewInit
    // this ties these together so that gridReady will always fire after agGridAngular's ngAfterViewInit
    // the actual containing component's ngAfterViewInit will fire just after agGridAngular's
    (this as any)._fullyReady.resolveNow(null, (resolve: any) => resolve);

    if (this.onAdaptableReady) {
      adaptable.api.eventApi.on('AdaptableReady', () => {
        this.onAdaptableReady(adaptable.api);
      });
    }
  }
}
