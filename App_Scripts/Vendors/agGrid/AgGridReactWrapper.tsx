import * as React from "react";
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";
import { AgGridReact } from 'ag-grid-react';
import { GridOptions } from "ag-grid";
import { AdaptableBlotterReact } from "../../View/AdaptableBlotterReact";
import { IAdaptableBlotterOptions } from "../../Core/Api/Interface/IAdaptableBlotterOptions";
import { AdaptableBlotter } from "./AdaptableBlotter";

export interface AgGridReactWrapperProps extends React.ClassAttributes<AgGridReactWrapper> {
  AdaptableBlotterOptions: IAdaptableBlotterOptions
  GridOptions: GridOptions
}

export interface AgGridReactWrapperState extends React.ClassAttributes<AgGridReactWrapper> {
  AdaptableBlotter: IAdaptableBlotter
  GridOptions: GridOptions
}

export class AgGridReactWrapper extends React.Component<AgGridReactWrapperProps, AgGridReactWrapperState> {
  componentWillMount() {
    this.state = {
      AdaptableBlotter: new AdaptableBlotter(this.props.AdaptableBlotterOptions),
      GridOptions: this.props.GridOptions
    };
  }


  render() {
    return (
      <div id="adaptableBlotter-react">
        <div id="adaptableBlotter">
          <AdaptableBlotterReact AdaptableBlotter={this.state.AdaptableBlotter} />
        </div>
        <div id="grid" className="ag-theme-balham" style={{ width: '100%', height: '90%', position: 'absolute' }} >
          <AgGridReact gridOptions={this.state.GridOptions}
          />
        </div>
      </div>
    )
  }
}

