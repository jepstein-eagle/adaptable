import * as React from "react";
import * as ReactDOM from "react-dom";
import { IAdaptableBlotterOptionsAgGrid } from "./IAdaptableBlotterOptionsAgGrid";
import { AdaptableBlotter } from "./AdaptableBlotter";
import { AdaptableBlotterApp } from "../../View/AdaptableBlotterView";
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";

export interface AdaptableBlotterReactProps extends React.ClassAttributes<AdaptableBlotterAgGridReact> {
  BlotterOptions: IAdaptableBlotterOptionsAgGrid
}

export interface AdaptableBlotterReactState extends React.ClassAttributes<AdaptableBlotterAgGridReact> {
  AdaptableBlotter: IAdaptableBlotter
}

export class AdaptableBlotterAgGridReact extends React.Component<AdaptableBlotterReactProps, AdaptableBlotterReactState> {
  constructor() {
    super();
    this.state = {
      AdaptableBlotter: null
    }
  }

  componentWillUpdate(nextProps: AdaptableBlotterReactProps) {
    if (!this.props.BlotterOptions.gridOptions.api &&
      nextProps.BlotterOptions.gridOptions.api && nextProps.BlotterOptions.gridOptions.columnApi) {
      let ab: AdaptableBlotter = new AdaptableBlotter(nextProps.BlotterOptions);
      this.setState({ AdaptableBlotter: ab });
    }
  }

  render() {
    return this.state.AdaptableBlotter ?
      <AdaptableBlotterApp AdaptableBlotter={this.state.AdaptableBlotter} /> : null;
  }
}

