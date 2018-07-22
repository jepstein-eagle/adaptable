import * as React from "react";
import { IAdaptableBlotter } from "../Core/Interface/IAdaptableBlotter";
import { AdaptableBlotterApp } from "./AdaptableBlotterView";
import { IAdaptableBlotterOptions } from "../Core/Api/Interface/IAdaptableBlotterOptions";
import { BlotterFactory } from "../Core/BlotterFactory";
import { VendorGridName } from "../Core/Enums";

// This is the main React Wrapper
// It simply takes an IAdaptableBlotterOptions object and instantiates the appropriate instance of the Adaptable Blotter
export interface AdaptableBlotterReactProps extends React.ClassAttributes<AdaptableBlotterReact> {
  AdaptableBlotterOptions: IAdaptableBlotterOptions
  VendorGridName: 'agGrid' | 'Hypergrid' | 'Kendo' | 'AdaptableGrid';
}

export interface AdaptableBlotterReactState extends React.ClassAttributes<AdaptableBlotterReact> {
  AdaptableBlotter: IAdaptableBlotter
}

export class AdaptableBlotterReact extends React.Component<AdaptableBlotterReactProps, AdaptableBlotterReactState> {
  componentWillMount() {
    this.state = {
      AdaptableBlotter: BlotterFactory.CreateAdaptableBlotter(this.props.AdaptableBlotterOptions, this.props.VendorGridName as VendorGridName),
    };
  }

  render() {
    return (
      <div id="adaptableBlotter">
        <AdaptableBlotterApp AdaptableBlotter={this.state.AdaptableBlotter} />
      </div>
    );
  }
}