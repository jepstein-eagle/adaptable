import {
  PieChartDefinition,
  PieChartProperties,
  ChartData,
  PieChartDataItem,
} from '../../../PredefinedConfig/ChartState';
import { PieChartComponentState } from './PieChartComponentState';
import { SliceSortOption } from '../../../PredefinedConfig/Common/ChartEnums';
import { DefaultPieChartProperties } from '../../../Utilities/Defaults/DefaultPieChartProperties';

/* Trying to make Charting a bit more 'manageable by putting some of the functionality in ChartDisplayPopup into this Helper Class
 */

export function getBrushesEven(): string[] {
  return ['#7446B9', '#9FB328', '#F96232', '#2E9CA6', '#DC3F76', '#FF9800', '#3F51B5', '#439C47'];
}

export function getBrushesOdd(): string[] {
  return [
    '#7446B9',
    '#9FB328',
    '#F96232',
    '#2E9CA6',
    '#DC3F76',
    '#FF9800',
    '#3F51B5',
    '#439C47',
    '#795548',
  ];
}

export function setChartDisplayPopupState(
  chartDefinition: PieChartDefinition,
  dataSource: ChartData
): PieChartComponentState {
  let pieChartProperties: PieChartProperties = Object.assign(
    {},
    DefaultPieChartProperties,
    chartDefinition.ChartProperties
  );

  let data: PieChartDataItem[] = dataSource != null ? dataSource.Data : [];
  return {
    DataSource: data,
    ChartProperties: pieChartProperties,
    IsChartSettingsVisible: true,
    IsGeneralMinimised: false,
    SliceSortOption: SliceSortOption.ValueDescending,
    SliceBrushes: data.length % 2 == 0 ? getBrushesOdd() : getBrushesEven(),
  };
}

export function setDefaultChartDisplayPopupState(): PieChartComponentState {
  let defaultState = {
    IsChartSettingsVisible: true,
    IsGeneralMinimised: false,
    SliceSortOption: SliceSortOption.ValueDescending,
  } as PieChartComponentState;
  return defaultState;
}

export function sortDataSource(
  sliceSortOption: SliceSortOption,
  oldData: PieChartDataItem[]
): PieChartDataItem[] {
  if (oldData == null || oldData.length == 0) {
    return [];
  }
  let newData: PieChartDataItem[] = [...oldData];
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

export function sortByNameAscending(a: PieChartDataItem, b: PieChartDataItem): number {
  let nameA = a.Name.toLowerCase();
  let nameB = b.Name.toLowerCase();
  if (nameA > nameB) {
    return 1;
  }
  if (nameA < nameB) {
    return -1;
  }
  return 0;
}

export function sortByNameDescending(a: PieChartDataItem, b: PieChartDataItem): number {
  let nameA = a.Name.toLowerCase();
  let nameB = b.Name.toLowerCase();
  if (nameA > nameB) {
    return -1;
  }
  if (nameA < nameB) {
    return 1;
  }
  return 0;
}

export function sortByValueAscending(a: PieChartDataItem, b: PieChartDataItem): number {
  if (a.Value > b.Value) {
    return 1;
  }
  if (a.Value < b.Value) {
    return -1;
  }
  return 0;
}

export function sortByValueDescending(a: PieChartDataItem, b: PieChartDataItem): number {
  if (a.Value > b.Value) {
    return -1;
  }
  if (a.Value < b.Value) {
    return 1;
  }
  return 0;
}

export const PieChartUIHelper = {
  getBrushesEven,
  getBrushesOdd,
  setChartDisplayPopupState,
  setDefaultChartDisplayPopupState,
  sortDataSource,
  sortByNameAscending,
  sortByNameDescending,
  sortByValueAscending,
  sortByValueDescending,
};
export default PieChartUIHelper;
