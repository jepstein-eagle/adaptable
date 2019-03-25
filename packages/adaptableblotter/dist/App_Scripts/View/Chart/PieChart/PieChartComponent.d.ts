import * as React from "react";
import { IPieChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
interface PieChartComponentProps {
    cssClassName: string;
    CurrentChartDefinition: IPieChartDefinition;
    ChartData: any;
}
interface PieChartComponentState {
    cssClassName: string;
}
export declare class PieChartComponent extends React.Component<PieChartComponentProps, PieChartComponentState> {
    constructor(props: PieChartComponentProps);
    componentWillReceiveProps(nextProps: PieChartComponentProps, nextContext: any): void;
    render(): JSX.Element;
    private updateChartProperties;
}
export {};
