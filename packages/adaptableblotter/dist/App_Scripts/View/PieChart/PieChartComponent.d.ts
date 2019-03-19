import * as React from "react";
import { IgrPieChart } from 'igniteui-react-charts/ES2015/igr-pie-chart';
import { PieChartOthersCategoryType } from "../../Utilities/Enums";
import { IgrItemLegend } from 'igniteui-react-charts/ES2015/igr-item-legend';
import { IgrDoughnutChart } from 'igniteui-react-charts/ES2015/igr-doughnut-chart';
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
    ShowAsDoughnut: boolean;
    IsPieChartSettingsVisible: boolean;
}
export declare class PieChartComponent extends React.Component<PieChartProps, PieChartState> {
    doughnutChart: IgrDoughnutChart;
    pieChart: IgrPieChart;
    doughnutlegend: IgrItemLegend;
    pieChartlegend: IgrItemLegend;
    constructor(props: PieChartProps);
    render(): JSX.Element;
    onShowPieChartSettings(): void;
    onHidePieChartSettings(): void;
    onDoughnutChartRef(doughnutChart: IgrDoughnutChart): void;
    onPieChartRef(pieChart: IgrPieChart): void;
    onDoughnutLegendRef(legend: IgrItemLegend): void;
    onPieChartLegendRef(legend: IgrItemLegend): void;
    private getPieChartOthersCategoryTypeOptions;
    private onOthersCategoryThresholdChanged;
    private onShowDoughnutChanged;
    private onRowVisibilityChanged;
    private onOthersCategoryTypeChanged;
    onSliceClick(s: any, e: SliceClickEventArgs): void;
}
