import { IPieChartDefinition, IPieChartDataItem } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { PieChartComponentState } from "./PieChartComponentState";
import { SliceSortOption } from "../../../Utilities/ChartEnums";
export declare module PieChartUIHelper {
    function getbrushesEven(): string[];
    function getbrushesOdd(): string[];
    function setChartDisplayPopupState(chartDefinition: IPieChartDefinition, dataSource: IPieChartDataItem[]): PieChartComponentState;
    function setDefaultChartDisplayPopupState(): PieChartComponentState;
    function sortDataSource(sliceSortOption: SliceSortOption, oldData: IPieChartDataItem[]): IPieChartDataItem[];
    function sortByNameAscending(a: IPieChartDataItem, b: IPieChartDataItem): number;
    function sortByNameDescending(a: IPieChartDataItem, b: IPieChartDataItem): number;
    function sortByValueAscending(a: IPieChartDataItem, b: IPieChartDataItem): number;
    function sortByValueDescending(a: IPieChartDataItem, b: IPieChartDataItem): number;
}
