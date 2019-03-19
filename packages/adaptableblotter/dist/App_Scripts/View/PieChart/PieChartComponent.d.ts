import * as React from "react";
import { PieChartOthersCategoryType } from "../../Utilities/Enums";
import { IgrPieChartBase, IIgrPieChartBaseProps } from "igniteui-react-charts/ES2015/igr-pie-chart-base";
import { SliceClickEventArgs } from "igniteui-react-charts/ES2015/igr-slice-click-event-args";
export interface PieChartProps extends React.ClassAttributes<PieChartComponent> {
    PieData: any;
    LabelMember: string;
    ValueMember: string;
    Width: number;
    Height: number;
    showVisibleClick: () => void;
    showAllClick: () => void;
    ShowVisibleRows: boolean;
}
export interface PieChartState {
    ShowVisibleRowsOnly: boolean;
    PieChartOthersCategoryType: PieChartOthersCategoryType;
    OthersCategoryThreshold: number;
    CurrentColumnCount: number;
    CurrentColumnValue: string;
}
export declare class PieChartComponent extends React.Component<PieChartProps, PieChartState> {
    private chart;
    constructor(props: PieChartProps);
    render(): JSX.Element;
    private getPieChartOthersCategoryTypeOptions;
    private onOthersCategoryThresholdChanged;
    private onRowVisibilityChanged;
    private onOthersCategoryTypeChanged;
    onSliceClick(s: IgrPieChartBase<IIgrPieChartBaseProps>, e: SliceClickEventArgs): void;
}
