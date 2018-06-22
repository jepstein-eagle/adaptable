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
  componentWillMount() {
    this.state = {
      AdaptableBlotter: new AdaptableBlotter(this.props.BlotterOptions)
    };
  }

  render() {
    return <AdaptableBlotterApp AdaptableBlotter={this.state.AdaptableBlotter} />;
  }
}

