import * as React from "react";
import { IgrItemLegend } from 'igniteui-react-charts/ES2015/igr-item-legend';
import { IgrDoughnutChart } from 'igniteui-react-charts/ES2015/igr-doughnut-chart';
import { IgrPieChart } from 'igniteui-react-charts/ES2015/igr-pie-chart';
import { SliceClickEventArgs } from "igniteui-react-charts/ES2015/igr-slice-click-event-args";
import { IChartProperties, IPieChartDefinition, IChartData } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { PieChartComponentState } from "./PieChartComponentState";
interface PieChartComponentProps {
    cssClassName: string;
    CurrentChartDefinition: IPieChartDefinition;
    ChartData: IChartData;
    onUpdateChartProperties: (chartTitle: string, chartProperties: IChartProperties) => void;
}
export declare class PieChartComponent extends React.Component<PieChartComponentProps, PieChartComponentState> {
    doughnutChart: IgrDoughnutChart;
    doughnutLegend: IgrItemLegend;
    pieChart: IgrPieChart;
    pieChartLegend: IgrItemLegend;
    constructor(props: PieChartComponentProps);
    componentWillReceiveProps(nextProps: PieChartComponentProps, nextContext: any): void;
    render(): JSX.Element;
    onDoughnutChartRef(doughnutChart: IgrDoughnutChart): void;
    onPieChartRef(pieChart: IgrPieChart): void;
    onDoughnutLegendRef(legend: IgrItemLegend): void;
    onPieChartLegendRef(legend: IgrItemLegend): void;
    onShowGeneralProperties(): void;
    onHidePropertiesGroup(): void;
    onShowChartSettings(): void;
    onHideChartSettings(): void;
    onSetPropertyDefaults(): void;
    private updateChartProperties;
    private onPieOrDoughnutViewChanged;
    private onOthersCategoryThresholdChanged;
    private onThresholdAsPercentChanged;
    private onSliceLabelsPositionChanged;
    onSliceLabelsMappingChanged(event: React.FormEvent<any>): void;
    onSliceSortByColumnChanged(event: React.FormEvent<any>): void;
    onSliceClick(e: SliceClickEventArgs): void;
    getOptionsForLabelsPosition(): JSX.Element[];
    getOptionsForSliceLabelsMapping(): JSX.Element[];
    getOptionsForSliceSortOrders(): JSX.Element[];
}
export {};
