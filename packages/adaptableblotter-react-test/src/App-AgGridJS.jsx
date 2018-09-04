import * as React from "react";
import { AdaptableBlotterAgGrid } from "adaptableblotter-react";
import "ag-grid/dist/styles/ag-theme-blue.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
     let gridOptions= this.createGridOptions();
    let adaptableBlotterOptions = this.createAdaptableBlotterOptions(
      gridOptions
    );
    this.state = {
      gridOptions: gridOptions,
      blotterOptions: adaptableBlotterOptions
    };
  }

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

   createAdaptableBlotterOptions(gridOptions) {
    return {
      primaryKey: "tradeId",
      vendorGrid: gridOptions,
      userName: "AgGrid Wrapper user",
      blotterId: "AgGrid Wrapper"
    };
  }

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
