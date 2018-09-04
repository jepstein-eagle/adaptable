import * as React from "react";
import { AdaptableBlotterAgGrid } from "adaptableblotter-react";
import "ag-grid/dist/styles/ag-theme-blue.css";

// Just like with the non-React version you need to create 2 objects:
// a. GridOptions - required by ag-Grid and contains all the data, column definitions and properties that ag-Grid needs
// b. AdaptableBlotterOptions - required by the Adaptable Blotter and contains the set of properties that the Blotter needs
// NOTE: One of the MANDATORY properties in AdaptableBlotterOptions is the GridOptions object
export default class App extends React.Component {
  constructor(props) {
    super(props);
    // Create the 2 objects and put them in state
    let gridOptions= this.createGridOptions();
    let adaptableBlotterOptions = this.createAdaptableBlotterOptions(
      gridOptions
    );
    this.state = {
      gridOptions: gridOptions,
      blotterOptions: adaptableBlotterOptions
    };
  }

  // Create the GridOptions object that ag-Grid needs
  createGridOptions() {
    return {
      rowData: [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 }
      ],

      columnDefs: [
        { headerName: "Make", field: "make" },
        { headerName: "Model", field: "model" },
        { headerName: "Price", field: "price" }
      ],
      enableSorting: true,
      enableRangeSelection: true,
      enableFilter: true,
      enableColResize: true,
      suppressColumnVirtualisation: false
    };
  }

  // Create the AdaptableBlotterOptions object that the Adaptable Blotter needs
  createAdaptableBlotterOptions(gridOptions) {
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
