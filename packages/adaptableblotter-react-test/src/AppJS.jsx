import * as React from "react";
import { AdaptableBlotter } from "adaptableblotter-react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-balham.css";
import 'adaptableblotter-react/dist/styles/adaptableblotter-style.css';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    let gridOptions = {
      enableSorting: true,
      enableRangeSelection: true,
      enableFilter: true,
      enableColResize: true
    };
    this.state = {
      gridOptions: gridOptions,
      blotterOptions: {
        primaryKey: "make",
        vendorGrid: gridOptions,
        userName: "Blotter Wrapper user",
        blotterId: "Adaptable Blotter Wrapper"
      },
      rowData: [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 }
      ],

      columnDefs: [
        { headerName: "Make", field: "make" },
        { headerName: "Model", field: "model" },
        { headerName: "Price", field: "price" }
      ]
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
