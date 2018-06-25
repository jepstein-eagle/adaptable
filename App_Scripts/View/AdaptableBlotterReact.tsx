import * as React from "react";
import { IAdaptableBlotter } from "../Core/Interface/IAdaptableBlotter";
import { AdaptableBlotterApp } from "./AdaptableBlotterView";
import { IAdaptableBlotterOptions } from "../Core/Api/Interface/IAdaptableBlotterOptions";
import { VendorGrid } from "../Core/Enums";
import { BlotterFactoryAgGrid } from "../Vendors/agGrid/BlotterFactoryAgGrid";
import { BlotterFactoryHypergrid } from "../Vendors/Hypergrid/BlotterFactoryHypergrid";
import { BlotterFactoryKendo } from "../Vendors/Kendo/BlotterFactoryKendo";

// This is the main React Wrapper
// It simply takes an IAdaptableBlotterOptions object and instantiates the appropriate instance of the Adaptable Blotter
export interface AdaptableBlotterReactProps extends React.ClassAttributes<AdaptableBlotterReact> {
  AdaptableBlotterOptions: IAdaptableBlotterOptions
}

export interface AdaptableBlotterReactState extends React.ClassAttributes<AdaptableBlotterReact> {
  AdaptableBlotter: IAdaptableBlotter
}

export class AdaptableBlotterReact extends React.Component<AdaptableBlotterReactProps, AdaptableBlotterReactState> {
  componentWillMount() {
    this.state = {
      AdaptableBlotter: this.getAdaptableBlotter(),
    };
  }

  render() {
    return <AdaptableBlotterApp AdaptableBlotter={this.state.AdaptableBlotter} />;
  }

  getAdaptableBlotter(): IAdaptableBlotter {
    let vendorGrid: VendorGrid = this.props.AdaptableBlotterOptions.vendorGridName as VendorGrid
    switch (vendorGrid) {
      case VendorGrid.agGrid:
        return BlotterFactoryAgGrid.CreateAdaptableBlotter(this.props.AdaptableBlotterOptions);
      case VendorGrid.Hypergrid:
        return BlotterFactoryHypergrid.CreateAdaptableBlotter(this.props.AdaptableBlotterOptions);
      case VendorGrid.Kendo:
        return BlotterFactoryKendo.CreateAdaptableBlotter(this.props.AdaptableBlotterOptions);
      case VendorGrid.AdaptableGrid:
        return BlotterFactoryHypergrid.CreateAdaptableBlotter(this.props.AdaptableBlotterOptions);
    }
  }
}

