import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AdaptableBlotterReact } from '../../App_Scripts/Vendors/agGrid/AdaptableBlotterAgGridReact';
import { IAdaptableBlotterOptionsAgGrid } from "../../App_Scripts/Vendors/agGrid/IAdaptableBlotterOptionsAgGrid";
import { AdaptableBlotterAgGridReactHarness } from './indexharnessaggrid';
import { AgGridReact } from 'ag-grid-react';
import { DataGenerator } from '../DataGenerator';
import { GridOptions } from "ag-grid";

export interface AppState extends React.ClassAttributes<App> {
  gridOptions: GridOptions
}

export default class App extends React.Component<{}, AppState> {
  constructor() {
    super();

    let dataGen = new DataGenerator();
    let trades = dataGen.getTrades();

    this.state = {
      gridOptions: {
        columnDefs: new AdaptableBlotterAgGridReactHarness().getTradeSchema(),
        rowData: trades,
        enableSorting: true,
        enableRangeSelection: true,
        enableFilter: true,
        enableColResize: true,
        suppressColumnVirtualisation: false,
        columnTypes: {
          "abColDefNumber": {},
          "abColDefString": {},
          "abColDefBoolean": {},
          "abColDefDate": {},
          "abColDefObject": {},
        }
      }
    }
  }

  adaptableBlotterOptionsAgGrid(): IAdaptableBlotterOptionsAgGrid {
    return {
      primaryKey: "tradeId",
      userName: "demo user",
      blotterId: "Trades Blotter",
      enableAuditLog: false,
      enableRemoteConfigServer: false,
      serverSearchOption: "None",
      iPushPullConfig: {
          api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
          api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
      },
      agGridContainerName: "grid",
      includeVendorStateInLayouts: true,
      gridOptions: this.state.gridOptions,
      maxColumnValueItemsDisplayed: 0,
      columnValuesOnlyInQueries: false
    }
  }

  onGridReady(grid: GridOptions) {
    this.setState({
      gridOptions: {
        ...this.state.gridOptions,
        api: grid.api,
        columnApi: grid.columnApi
      }
    });
}

  render() {
    return (
      <div id="react-app">
        <div id="grid" className="ag-theme-balham" style={{ width: '100%', height: '100%', position: 'absolute' }} >
          <AgGridReact
            onGridReady={(g)=>this.onGridReady(g)}
            {...this.state.gridOptions}
          />
        </div>
        <div id="adaptableBlotter">
          <AdaptableBlotterReact BlotterOptions={this.adaptableBlotterOptionsAgGrid()} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));