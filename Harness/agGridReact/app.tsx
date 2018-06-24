
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AgGridReactWrapper } from '../../App_Scripts/Vendors/agGrid/AgGridReactWrapper';
import { ReactHarnessHelper } from './ReactHarnessHelper';
import { DataGenerator } from '../DataGenerator';
import { GridOptions } from "ag-grid";
import "ag-grid-enterprise";
import { IAdaptableBlotterOptions } from '../../App_Scripts/Core/Api/Interface/IAdaptableBlotterOptions';

export interface AppState extends React.ClassAttributes<App> {
  gridOptions: GridOptions,
  blotterOptions: IAdaptableBlotterOptions
}

export default class App extends React.Component<{}, AppState> {
  constructor() {
    super();
    let gridOptions: GridOptions = this.createGridOptions();
    let adaptableBlotterOptions: IAdaptableBlotterOptions = this.createAdaptableBlotterOptions(gridOptions);
    this.state = {
      gridOptions: gridOptions,
      blotterOptions: adaptableBlotterOptions
    }
  }

  createGridOptions(): GridOptions {
    return {
      columnDefs: new ReactHarnessHelper().getTradeSchema(),
      rowData: new DataGenerator().getTrades(),
      enableSorting: true,
      enableRangeSelection: true,
      enableFilter: true,
      enableColResize: true,
      suppressColumnVirtualisation: false,
    }
  }

  createAdaptableBlotterOptions(gridOptions: GridOptions): IAdaptableBlotterOptions {
    return {
      primaryKey: "tradeId",
      vendorGrid: gridOptions,
      userName: "demo user",
      blotterId: "Trades Blotter",
      enableAuditLog: false,
      enableRemoteConfigServer: false,
      includeVendorStateInLayouts: true,
    }
  }

  render() {
    return (
      <div id="react-app">
        <AgGridReactWrapper
          AdaptableBlotterOptions={this.state.blotterOptions}
          GridOptions={this.state.gridOptions}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));