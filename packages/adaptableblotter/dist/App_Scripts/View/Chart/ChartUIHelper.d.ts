/// <reference types="react" />
import { ChartDisplayPopupState } from "./ChartDisplayPopupState";
import { IChartDefinition } from "../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { ChartType, AxisAngle } from "../../Utilities/ChartEnums";
import { IChartProperties } from "../../Utilities/Interface/IChartProperties";
import { IColumn } from "../../Utilities/Interface/IColumn";
export declare module ChartUIHelper {
    function setChartDisplayPopupState(chartDefinition: IChartDefinition, columns: IColumn[]): ChartDisplayPopupState;
    function createDefaultYAxisTitle(chartDefinition: IChartDefinition, columns: IColumn[]): string;
    function createDefaultXAxisTitle(chartDefinition: IChartDefinition, columns: IColumn[]): string;
    function setDefaultChartDisplayPopupState(): ChartDisplayPopupState;
    function getChartTypeOptions(): JSX.Element[];
    function getToolTipOptions(): JSX.Element[];
    function getCrossHairModeOptions(): JSX.Element[];
    function getChartSizeOptions(): JSX.Element[];
    function getAlignmentOptions(): JSX.Element[];
    function getMarkerTypeOptions(): JSX.Element[];
    function getMarkerFromProps(chartProps: IChartProperties): string;
    function getMarkerFor(charType: ChartType, markerType: string): string;
    function getYAxisLabelsLocations(): JSX.Element[];
    function getXAxisLabelsLocations(): JSX.Element[];
    function getAxisAngleOptions(): JSX.Element[];
    function getAxisLabelScales(): JSX.Element[];
    function getCalloutTypeOptions(): JSX.Element[];
    function setChartHeight(chartProperties: IChartProperties): string;
    function setChartWidth(chartProperties: IChartProperties, isChartSettingsVisible: boolean): string;
    function setPanelWidth(chartProperties: IChartProperties): string;
    function setChartColumnSize(chartProperties: IChartProperties): number;
    function setLegendColumnSize(chartProperties: IChartProperties): number;
    function getAngleFromEnum(axisAngle: AxisAngle): number;
    function getDataProperties(chartData: any): string[];
    function getNumericProperties(chartData: any): string[];
    function getCalloutsData(chartData: any, chartProps: IChartProperties): any[];
    function getCalloutsDataRanges(chartData: any, numericProps: string[]): any[];
    function getCalloutsDataChanges(chartData: any, numericProps: string[], showPercentages: boolean): any[];
    function getCalloutsDataPoints(chartData: any, numericProps: string[]): any[];
}
