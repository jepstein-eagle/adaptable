import * as React from "react";
import { AgGridReact } from 'ag-grid-react';
import { GridOptions } from "ag-grid";
import AdaptableBlotter from "./AdaptableBlotter";
import * as adaptableblotter from "adaptableblotter";

export interface AdaptableBlotterAgGridProps extends React.ClassAttributes<AdaptableBlotterAgGrid> {
  AdaptableBlotterOptions: adaptableblotter.IAdaptableBlotterOptions
  GridOptions: GridOptions
  agTheme? :'balham'|'balham-dark'|'material'| 'fresh'| 'dark'| 'blue'|'bootstrap'
  agDivStyle?: any
}

export interface AdaptableBlotterAgGridState extends React.ClassAttributes<AdaptableBlotterAgGrid> {
  AdaptableBlotterOptions: adaptableblotter.IAdaptableBlotterOptions
  GridOptions: GridOptions
}

export default class AdaptableBlotterAgGrid extends React.Component<AdaptableBlotterAgGridProps, AdaptableBlotterAgGridState> {
  componentWillMount() {
    this.state = {
      AdaptableBlotterOptions: this.props.AdaptableBlotterOptions,
      GridOptions: this.props.GridOptions
    };
  }

  render() {
    let theme: string = this.props.agTheme? "ag-theme-" + this.props.agTheme: "ag-theme-balham"
    let style : any = this.props.agDivStyle? this.props.agDivStyle: { width: '100%', height: '90%', position: 'absolute' , margin: '0px'}
    return (
      <div id="adaptableBlotter-react">
        <AdaptableBlotter AdaptableBlotterOptions={this.state.AdaptableBlotterOptions} VendorGridName="agGrid" />
        <div id="grid" className={theme} style={style} >
          <AgGridReact gridOptions={this.state.GridOptions} />
        </div>
      </div>
    )
  }
}

