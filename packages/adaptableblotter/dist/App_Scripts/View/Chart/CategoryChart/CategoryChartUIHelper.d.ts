/// <reference types="react" />
import { ICategoryChartDefinition, ICategoryChartProperties } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { AxisAngle } from "../../../Utilities/ChartEnums";
import { IColumn } from "../../../Utilities/Interface/IColumn";
import { CategoryChartComponentState } from "./CategoryChartComponentState";
export declare module CategoryChartUIHelper {
    function setChartDisplayPopupState(chartDefinition: ICategoryChartDefinition, columns: IColumn[]): CategoryChartComponentState;
    function createDefaultYAxisTitle(chartDefinition: ICategoryChartDefinition, columns: IColumn[]): string;
    function createDefaultXAxisTitle(chartDefinition: ICategoryChartDefinition, columns: IColumn[]): string;
    function setDefaultChartDisplayPopupState(): CategoryChartComponentState;
    function getChartTypeOptions(): JSX.Element[];
    function getToolTipOptions(): JSX.Element[];
    function getCrossHairModeOptions(): JSX.Element[];
    function getAlignmentOptions(): JSX.Element[];
    function getMarkerTypeOptions(): JSX.Element[];
    function getMarkerFromProps(chartProps: ICategoryChartProperties): string;
    function getYAxisLabelsLocations(): JSX.Element[];
    function getXAxisLabelsLocations(): JSX.Element[];
    function getAxisAngleOptions(): JSX.Element[];
    function getAxisLabelScales(): JSX.Element[];
    function getCalloutTypeOptions(): JSX.Element[];
    function getAngleFromEnum(axisAngle: AxisAngle): number;
    function getDataProperties(chartData: any): string[];
    function getNumericProperties(chartData: any): string[];
    function getCalloutsData(chartData: any, chartProps: ICategoryChartProperties): any[];
    function getCalloutsDataRanges(chartData: any, numericProps: string[]): any[];
    function getCalloutsDataChanges(chartData: any, numericProps: string[], showPercentages: boolean): any[];
    function getCalloutsDataPoints(chartData: any, numericProps: string[]): any[];
}
