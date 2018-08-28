import * as React from "react";
import { GridOptions } from "ag-grid";
import * as adaptableblotter from "adaptableblotter";
export interface AdaptableBlotterAgGridProps extends React.ClassAttributes<AdaptableBlotterAgGrid> {
    AdaptableBlotterOptions: adaptableblotter.IAdaptableBlotterOptions;
    GridOptions: GridOptions;
    agTheme?: 'balham' | 'balham-dark' | 'material' | 'fresh' | 'dark' | 'blue' | 'bootstrap';
    agDivStyle?: any;
}
export interface AdaptableBlotterAgGridState extends React.ClassAttributes<AdaptableBlotterAgGrid> {
    AdaptableBlotterOptions: adaptableblotter.IAdaptableBlotterOptions;
    GridOptions: GridOptions;
}
export default class AdaptableBlotterAgGrid extends React.Component<AdaptableBlotterAgGridProps, AdaptableBlotterAgGridState> {
    componentWillMount(): void;
    render(): JSX.Element;
}
