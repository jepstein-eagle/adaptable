import * as React from "react";
import { AgGridReact } from 'ag-grid-react';
import { GridOptions } from "ag-grid";
import { AdaptableBlotterReact } from "../../View/AdaptableBlotterReact";
import { IAdaptableBlotterOptions } from "../../Core/Api/Interface/IAdaptableBlotterOptions";

export interface AgGridReactWrapperProps extends React.ClassAttributes<AgGridReactWrapper> {
  AdaptableBlotterOptions: IAdaptableBlotterOptions
  GridOptions: GridOptions
  agTheme? :'balham'|'balham-dark'|'material'| 'fresh'| 'dark'| 'blue'|'bootstrap'
  agDivStyle?: any
}

export interface AgGridReactWrapperState extends React.ClassAttributes<AgGridReactWrapper> {
  AdaptableBlotterOptions: IAdaptableBlotterOptions
  GridOptions: GridOptions
}

export class AgGridReactWrapper extends React.Component<AgGridReactWrapperProps, AgGridReactWrapperState> {
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
        <AdaptableBlotterReact AdaptableBlotterOptions={this.state.AdaptableBlotterOptions} />
        <div id="grid" className={theme} style={style} >
          <AgGridReact gridOptions={this.state.GridOptions} />
        </div>
      </div>
    )
  }
}

