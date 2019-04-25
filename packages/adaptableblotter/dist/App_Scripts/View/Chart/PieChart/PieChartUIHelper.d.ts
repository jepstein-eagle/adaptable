import { IPieChartDefinition } from "../../../Utilities/Interface/BlotterObjects/Charting/IChartDefinition";
import { IChartData } from "../../../Utilities/Interface/BlotterObjects/Charting/IChartData";
import { IPieChartDataItem } from "../../../Utilities/Interface/BlotterObjects/Charting/IPieChartDataItem";
import { PieChartComponentState } from "./PieChartComponentState";
import { SliceSortOption } from "../../../Utilities/ChartEnums";
export declare module PieChartUIHelper {
    function getBrushesEven(): string[];
    function getBrushesOdd(): string[];
    function setChartDisplayPopupState(chartDefinition: IPieChartDefinition, dataSource: IChartData): PieChartComponentState;
    function setDefaultChartDisplayPopupState(): PieChartComponentState;
    function sortDataSource(sliceSortOption: SliceSortOption, oldData: IPieChartDataItem[]): IPieChartDataItem[];
    function sortByNameAscending(a: IPieChartDataItem, b: IPieChartDataItem): number;
    function sortByNameDescending(a: IPieChartDataItem, b: IPieChartDataItem): number;
    function sortByValueAscending(a: IPieChartDataItem, b: IPieChartDataItem): number;
    function sortByValueDescending(a: IPieChartDataItem, b: IPieChartDataItem): number;
}
