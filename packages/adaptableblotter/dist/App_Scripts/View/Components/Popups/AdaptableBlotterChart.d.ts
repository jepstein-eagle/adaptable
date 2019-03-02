import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import * as React from "react";
import { AccessLevel } from '../../../Utilities/Enums';
export interface IAdaptableBlotterChartProps extends React.ClassAttributes<AdaptableBlotterChart> {
    showChart: boolean;
    onClose?: Function;
    AdaptableBlotter: IAdaptableBlotter;
    showModal: boolean;
}
export interface AdaptableBlotterChartState {
    chartContainer: HTMLElement;
    accessLevel: AccessLevel;
    isValidUserChartContainer: boolean;
}
export declare class AdaptableBlotterChart extends React.Component<IAdaptableBlotterChartProps, AdaptableBlotterChartState> {
    constructor(props: IAdaptableBlotterChartProps);
    render(): JSX.Element;
}
