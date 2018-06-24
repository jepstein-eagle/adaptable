import * as React from "react";
import { IAdaptableBlotter } from "../Core/Interface/IAdaptableBlotter";
import { AdaptableBlotterApp } from "./AdaptableBlotterView";


export interface AdaptableBlotterReactProps extends React.ClassAttributes<AdaptableBlotterReact> {
  AdaptableBlotter: IAdaptableBlotter
}

export interface AdaptableBlotterReactState extends React.ClassAttributes<AdaptableBlotterReact> {
  AdaptableBlotter: IAdaptableBlotter
}

export class AdaptableBlotterReact extends React.Component<AdaptableBlotterReactProps, AdaptableBlotterReactState> {
  componentWillMount() {
    this.state = {
      AdaptableBlotter: this.props.AdaptableBlotter
    };
  }


  render() {
    return <AdaptableBlotterApp AdaptableBlotter={this.state.AdaptableBlotter} />;
  }
}

