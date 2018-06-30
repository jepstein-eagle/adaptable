
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DataGenerator } from '../DataGenerator';
import { GridOptions } from "ag-grid";
import "ag-grid-enterprise";
import { IAdaptableBlotterOptions } from '../../App_Scripts/Core/Api/Interface/IAdaptableBlotterOptions';
import { AdaptableBlotterReact } from '../../App_Scripts/View/AdaptableBlotterReact';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { ReactHarnessHelper } from '../agGridReact/ReactHarnessHelper';
import { VendorGridName } from '../../App_Scripts/Core/Enums';


export interface AppState extends React.ClassAttributes<App> {
  gridOptions: GridOptions,
  blotterOptions: IAdaptableBlotterOptions,
  trades: ITrade[],
  columnDefs: any
}

export default class App extends React.Component<{}, AppState> {
  constructor() {
    super();
    let gridOptions: GridOptions = this.createGridOptions();
    this.state = {
      gridOptions: gridOptions,
      blotterOptions: this.createAdaptableBlotterOptions(gridOptions),
      trades: new DataGenerator().getTrades(),
      columnDefs: new ReactHarnessHelper().getTradeSchema()
    }
  }

  // Create the GridOptions object that ag-Grid needs
  createGridOptions(): GridOptions {
    return {
      enableFilter: true, 
      enableRangeSelection: false,
    }
  }

  createAdaptableBlotterOptions(gridOptions: GridOptions): IAdaptableBlotterOptions {
    return {
      primaryKey: "tradeId",
      vendorGrid: gridOptions,
      userName: "demo user",
      blotterId: "Trades Blotter",
    }
  }

  /* Alternate way of adding columns...
       <AgGridColumn field="tradeId" width={150} children={null} />
            <AgGridColumn field="notional" width={150} children={null} />
            <AgGridColumn field="country" width={150} children={null} />

          */

  render() {
    return (
      <div id="adaptableBlotter-react">
        <AdaptableBlotterReact AdaptableBlotterOptions={this.state.blotterOptions} VendorGridName={VendorGridName.agGrid} />
        {/* div for the underlying grid
        Tthe id of this <div> must be the same value as the 'vendorContainer' property in IAdaptableBlotterOptions - the default is 'grid' */}
        <div id="grid" className={"ag-theme-fresh"} style={{ width: '90%', height: '90%', position: 'absolute', margin: '20px' }} >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.trades}
            gridOptions={this.state.gridOptions
            }>

          </AgGridReact>
        </div>

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));