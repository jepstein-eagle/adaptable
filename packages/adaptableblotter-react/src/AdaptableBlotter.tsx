import * as React from 'react'
import {
  BlotterFactory,
  AdaptableBlotterApp,
} from 'adaptableblotter';
import {
  IAdaptableBlotter,
  IAdaptableBlotterOptions,
} from 'adaptableblotter/types';

// This is the main React Wrapper
// It simply takes an IAdaptableBlotterOptions object and instantiates the appropriate instance of the Adaptable Blotter
export interface AdaptableBlotterProps extends React.ClassAttributes<AdaptableBlotter> {
  AdaptableBlotterOptions: IAdaptableBlotterOptions
  VendorGridName: 'agGrid' | 'Hypergrid' | 'Kendo' | 'AdaptableGrid'
}

export interface AdaptableBlotterState extends React.ClassAttributes<AdaptableBlotter> {
  AdaptableBlotter: IAdaptableBlotter
}

export default class AdaptableBlotter extends React.Component<AdaptableBlotterProps, AdaptableBlotterState> {
  componentWillMount() {
    this.setState({
      AdaptableBlotter: BlotterFactory.CreateAdaptableBlotter(
        this.props.AdaptableBlotterOptions,
        this.props.VendorGridName
      )
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
