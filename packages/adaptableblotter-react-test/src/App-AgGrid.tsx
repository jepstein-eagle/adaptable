import * as React from "react";
import { AdaptableBlotterAgGrid, IAdaptableBlotterOptions } from "adaptableblotter-react";
import { ReactHarnessHelper } from "./ReactHarnessHelper";
import { DataGenerator } from "./DataGenerator";
import { GridOptions } from "ag-grid";
import "ag-grid/dist/styles/ag-theme-blue.css";
import 'adaptableblotter-react/dist/styles/adaptableblotter-style.css';

export interface AppState extends React.ClassAttributes<App> {
  gridOptions: GridOptions;
  blotterOptions: IAdaptableBlotterOptions;
}

// Just like with the non-React version you need to create 2 objects:
// a. GridOptions - required by ag-Grid and contains all the data, column definitions and properties that ag-Grid needs
// b. AdaptableBlotterOptions - required by the Adaptable Blotter and contains the set of properties that the Blotter needs
// NOTE: One of the MANDATORY properties in AdaptableBlotterOptions is the GridOptions object
export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    // Create the 2 objects and put them in state
    let gridOptions: GridOptions = this.createGridOptions();
    let adaptableBlotterOptions: IAdaptableBlotterOptions = this.createAdaptableBlotterOptions(
      gridOptions
    );
    this.state = {
      gridOptions: gridOptions,
      blotterOptions: adaptableBlotterOptions
    };
  }

  // Create the GridOptions object that ag-Grid needs
  createGridOptions(): GridOptions {
    return {
      columnDefs: new ReactHarnessHelper().getTradeSchema(),
      rowData: new DataGenerator().getTrades(15000),
      enableSorting: true,
      enableRangeSelection: true,
      enableFilter: true,
      enableColResize: true,
      suppressColumnVirtualisation: false
    };
  }

  // Create the AdaptableBlotterOptions object that the Adaptable Blotter needs
  createAdaptableBlotterOptions(gridOptions: GridOptions): IAdaptableBlotterOptions {
    return {
      primaryKey: "tradeId",
      vendorGrid: gridOptions,
      userName: "AgGrid Wrapper user",
      blotterId: "AgGrid Wrapper"
    };
  }

  // Render an AgGridReactWrapper passing in our state as props
  // The wrapper will take care of instantantiating the underlying objects and creating the necessary divs
  // However there are 2 optional props which let you specify:
  // (a): the ag-grid class to use - if none is supplied then it will default to 'Balham'
  // (b): the style for the div containing the ag-Grid - if none is supplied it will take full width
  render() {
    return (
      <div id="adaptableblotter-aggrid-react-demo-app">
        <AdaptableBlotterAgGrid
          AdaptableBlotterOptions={this.state.blotterOptions}
          GridOptions={this.state.gridOptions}
          agTheme={"blue"}
        />
      </div>
    );
  }
}
