import * as React from 'react'
import { BlotterFactory, AdaptableBlotterApp } from 'adaptableblotter/factory'
import { IAdaptableBlotter, IAdaptableBlotterOptions } from 'adaptableblotter/types'

// This is the main React Wrapper
// It simply takes an IAdaptableBlotterOptions object and instantiates the appropriate instance of the Adaptable Blotter
export interface AdaptableBlotterReactProps extends React.ClassAttributes<AdaptableBlotterReact> {
  AdaptableBlotterOptions: IAdaptableBlotterOptions
  VendorGridName: 'agGrid' | 'Hypergrid'
}

export interface AdaptableBlotterReactState extends React.ClassAttributes<AdaptableBlotterReact> {
  AdaptableBlotter: IAdaptableBlotter
}

export default class AdaptableBlotterReact extends React.Component<
AdaptableBlotterReactProps,
AdaptableBlotterReactState
  > {
  componentWillMount() {
    const { AdaptableBlotterOptions, VendorGridName } = this.props;
    AdaptableBlotterOptions.containerOptions.adaptableBlotterContainer =
      AdaptableBlotterOptions.containerOptions.adaptableBlotterContainer || `adaptableBlotter-${Math.random() * 10000 | 0}`;
    this.setState({
      AdaptableBlotter: BlotterFactory.CreateAdaptableBlotter(AdaptableBlotterOptions, VendorGridName)
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
