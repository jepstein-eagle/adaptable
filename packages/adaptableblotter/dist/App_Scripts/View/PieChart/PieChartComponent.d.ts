import * as React from "react";
export interface PieChartComponentProps extends React.ClassAttributes<PieChartComponent> {
    PieData: any;
    LabelMember: string;
    ValueMember: string;
    Width: number;
    Height: number;
}
export interface PieChartComponentState {
}
export declare class PieChartComponent extends React.Component<PieChartComponentProps, PieChartComponentState> {
    constructor(props: PieChartComponentProps);
    render(): JSX.Element;
}
