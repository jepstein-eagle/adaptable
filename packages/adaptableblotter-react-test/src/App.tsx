import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GridOptions } from "ag-grid";
import "ag-grid-enterprise";
import { IAdaptableBlotterOptions } from 'adaptableblotter/types';
import { AdaptableBlotter } from 'adaptableblotter-react';
import { AgGridReact } from 'ag-grid-react';
//import 'ag-grid/dist/styles/ag-grid.css';
//import 'ag-grid/dist/styles/ag-theme-balham.css';

import './agGridHarnessStyleSheet.css';

export interface AppState extends React.ClassAttributes<App> {
  gridOptions: GridOptions,
  blotterOptions: IAdaptableBlotterOptions,
  rowData: any,
  columnDefs: any
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    let gridOptions: GridOptions = {
      enableSorting: true
    }
    this.state = {
      gridOptions: gridOptions,
      blotterOptions: {
        primaryKey: "make",
        vendorGrid: gridOptions,
        userName: 'UtibeAbasi',
        blotterId: "demo blotter",
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
      ],
    }
  }

  render() {
    return (
      <div>
        <AdaptableBlotter AdaptableBlotterOptions={this.state.blotterOptions} VendorGridName={"agGrid"} />
        <div className='ag-theme-balham' style={{ height: '97vh', width: '100%' }}>
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            gridOptions={this.state.gridOptions} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));