import * as React from 'react';
import { IAdaptableBlotter, IAdaptableBlotterOptions } from 'adaptableblotter';
export interface AdaptableBlotterProps extends React.ClassAttributes<AdaptableBlotter> {
    AdaptableBlotterOptions: IAdaptableBlotterOptions;
    VendorGridName: 'agGrid' | 'Hypergrid' | 'Kendo' | 'AdaptableGrid';
}
export interface AdaptableBlotterState extends React.ClassAttributes<AdaptableBlotter> {
    AdaptableBlotter: IAdaptableBlotter;
}
export default class AdaptableBlotter extends React.Component<AdaptableBlotterProps, AdaptableBlotterState> {
    componentWillMount(): void;
    render(): JSX.Element;
}
