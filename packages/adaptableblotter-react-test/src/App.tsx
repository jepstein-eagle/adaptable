import * as React from "react";
import { GridOptions } from "ag-grid";
import { DataGenerator } from "./DataGenerator";
import { AdaptableBlotter, IAdaptableBlotterOptions } from "adaptableblotter-react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-balham.css";
import { ReactHarnessHelper } from "./ReactHarnessHelper";

export interface AppState extends React.ClassAttributes<App> {
  gridOptions: GridOptions;
  blotterOptions: IAdaptableBlotterOptions;
  rowData: any;
  columnDefs: any;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    let gridOptions: GridOptions = {
      enableSorting: true
    };
    this.state = {
      gridOptions: gridOptions,
      blotterOptions: {
        primaryKey: "tradeId",
        vendorGrid: gridOptions,
        userName: "Blotter Wrapper user",
        blotterId: "Adaptable Blotter Wrapper"
      },
      rowData:  new DataGenerator().getTrades(15000),
      columnDefs: new ReactHarnessHelper().getTradeSchema()
    };
  }

  render() {
    return (
      <div>
        <AdaptableBlotter
          AdaptableBlotterOptions={this.state.blotterOptions}
          VendorGridName={"agGrid"}
        />
        <div className="ag-theme-balham" style={{ height: "97vh", width: "100%" }}>
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            gridOptions={this.state.gridOptions}
          />
        </div>
      </div>
    );
  }
}
