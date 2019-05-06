import * as React from 'react'
import { AdaptableBlotterApp } from '../../adaptableblotter/App_Scripts/View/AdaptableBlotterView';
import { BlotterFactoryAgGrid } from "../../adaptableblotter/App_Scripts/agGrid/BlotterFactoryAgGrid";
import { IAdaptableBlotter, IAdaptableBlotterOptions } from '../../adaptableblotter/types'

// This is the main React Wrapper
// It simply takes an IAdaptableBlotterOptions object and instantiates the appropriate instance of the Adaptable Blotter
export interface AdaptableBlotterProps extends React.ClassAttributes<AdaptableBlotter> {
  AdaptableBlotterOptions: IAdaptableBlotterOptions
  VendorGridName: 'agGrid' | 'Hypergrid'
}

export interface AdaptableBlotterState extends React.ClassAttributes<AdaptableBlotter> {
  AdaptableBlotter: IAdaptableBlotter
}

export default class AdaptableBlotter extends React.Component<
  AdaptableBlotterProps,
  AdaptableBlotterState
  > {
  componentWillMount() {
    const { AdaptableBlotterOptions, VendorGridName } = this.props;
    AdaptableBlotterOptions.containerOptions.adaptableBlotterContainer =
      AdaptableBlotterOptions.containerOptions.adaptableBlotterContainer || `adaptableBlotter-${Math.random() * 10000 | 0}`;

    this.setState({
      AdaptableBlotter: BlotterFactoryAgGrid.CreateAdaptableBlotter(AdaptableBlotterOptions, false)
    })
  }

  render() {
    return (
      <div id="adaptableBlotter">
        <AdaptableBlotterApp AdaptableBlotter={this.state.AdaptableBlotter} />
      </div>
    )
  }
}
