import { IAdaptableBlotter } from '../../../Api/Interface/IAdaptableBlotter';
import * as React from "react";
export interface IAdaptableBlotterChartProps extends React.ClassAttributes<AdaptableBlotterChart> {
    showChart: boolean;
    onClose?: Function;
    AdaptableBlotter: IAdaptableBlotter;
    showModal: boolean;
}
export declare class AdaptableBlotterChart extends React.Component<IAdaptableBlotterChartProps, {}> {
    render(): JSX.Element;
}
