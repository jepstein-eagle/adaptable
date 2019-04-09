import { IPieChartDefinition, IPieChartProperties, IPieChartDataItem, IChartData } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { PieChartComponentState } from "./PieChartComponentState";
import { SliceSortOption } from "../../../Utilities/ChartEnums";

/* Trying to make Charting a bit more 'manageable by putting some of the functionality in ChartDisplayPopup into this Helper Class
*/
export module PieChartUIHelper {

  export function getBrushesEven(): string[] {
    return ["#7446B9", "#9FB328", "#F96232", "#2E9CA6", "#DC3F76", "#FF9800", "#3F51B5", "#439C47"];
  }

  export function getBrushesOdd(): string[] {
    return ["#7446B9", "#9FB328", "#F96232", "#2E9CA6", "#DC3F76", "#FF9800", "#3F51B5", "#439C47", "#795548"];
  }

  export function setChartDisplayPopupState(chartDefinition: IPieChartDefinition, dataSource: IChartData): PieChartComponentState {
    let pieChartProperties: IPieChartProperties = chartDefinition.ChartProperties as IPieChartProperties
    let data: IPieChartDataItem[] = (dataSource != null) ? dataSource.Data : []
    return {
      DataSource: data,
      ChartProperties: pieChartProperties,
      IsChartSettingsVisible: true,
      IsGeneralMinimised: false,
      SliceSortOption: SliceSortOption.ValueDescending,
      SliceBrushes: data.length % 2 == 0 ? getBrushesOdd() : getBrushesEven(),
    }
  }

  export function setDefaultChartDisplayPopupState(): PieChartComponentState {
    let defaultState = {
      IsChartSettingsVisible: true,
      IsGeneralMinimised: false,
      SliceSortOption: SliceSortOption.ValueDescending,

    } as PieChartComponentState;
    return defaultState;
  }

  export function sortDataSource(sliceSortOption: SliceSortOption, oldData: IPieChartDataItem[]): IPieChartDataItem[] {
    if (oldData == null || oldData.length == 0) {
      return [];
    }
    let newData: IPieChartDataItem[] = [...oldData];
    switch (sliceSortOption) {
      case SliceSortOption.ValueAscending:
        newData.sort(sortByValueAscending);
        break;
      case SliceSortOption.ValueDescending:
        newData.sort(sortByValueDescending);
        break;
      case SliceSortOption.NameAscending:
        newData.sort(sortByNameAscending);
        break;
      case SliceSortOption.NameDescending:
        newData.sort(sortByNameDescending);
        break;
    }
    return newData;
  }

  export function sortByNameAscending(a: IPieChartDataItem, b: IPieChartDataItem): number {
    let nameA = a.Name.toLowerCase();
    let nameB = b.Name.toLowerCase();
    if (nameA > nameB) { return 1; }
    if (nameA < nameB) { return -1; }
    return 0;
  }

  export function sortByNameDescending(a: IPieChartDataItem, b: IPieChartDataItem): number {
    let nameA = a.Name.toLowerCase();
    let nameB = b.Name.toLowerCase();
    if (nameA > nameB) { return -1; }
    if (nameA < nameB) { return 1; }
    return 0;
  }

  export function sortByValueAscending(a: IPieChartDataItem, b: IPieChartDataItem): number {
    if (a.Value > b.Value) { return 1; }
    if (a.Value < b.Value) { return -1; }
    return 0;
  }

  export function sortByValueDescending(a: IPieChartDataItem, b: IPieChartDataItem): number {
    if (a.Value > b.Value) { return -1; }
    if (a.Value < b.Value) { return 1; }
    return 0;
  }

}
