import * as React from "react";
import * as ReactDOM from "react-dom";
import { IAdaptableBlotterOptionsAgGrid } from "./IAdaptableBlotterOptionsAgGrid";
import { AdaptableBlotter } from "./AdaptableBlotter";
import { AdaptableBlotterApp } from "../../View/AdaptableBlotterView";
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";

export interface AdaptableBlotterReactProps extends React.ClassAttributes<AdaptableBlotterReact> {
  BlotterOptions: IAdaptableBlotterOptionsAgGrid
}

export interface AdaptableBlotterReactState extends React.ClassAttributes<AdaptableBlotterReact> {
  AdaptableBlotter: IAdaptableBlotter
}

export class AdaptableBlotterReact extends React.Component<AdaptableBlotterReactProps, AdaptableBlotterReactState> {
  constructor(props: AdaptableBlotterReactProps) {
    super();
    this.state = {
      AdaptableBlotter: new AdaptableBlotter(props.BlotterOptions)
    }
  }
  render() {
    return <AdaptableBlotterApp {...this.state.AdaptableBlotter} />
  }
}

