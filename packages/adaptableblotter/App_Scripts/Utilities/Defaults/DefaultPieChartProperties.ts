import { IPieChartProperties } from '../Interface/BlotterObjects/Charting/IChartDefinition';
import {
  PieChartLabelPosition,
  SliceLabelOption,
  SliceSortOption,
  OthersCategoryType,
} from '../ChartEnums';

export const DefaultPieChartProperties: IPieChartProperties = {
  OthersCategoryThreshold: 2,
  OthersCategoryType: OthersCategoryType.Percent,
  PieChartLabelPosition: PieChartLabelPosition.BestFit,
  SliceValuesMapping: SliceLabelOption.Value,
  SliceLabelsMapping: SliceLabelOption.Name,
  SliceLegendMapping: SliceLabelOption.ValueAndName,
  ShowAsDoughnut: true,
};
