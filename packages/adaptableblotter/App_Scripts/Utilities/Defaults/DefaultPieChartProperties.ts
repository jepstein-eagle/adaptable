import {
  PieChartLabelPosition,
  SliceLabelOption,
  SliceSortOption,
  OthersCategoryType,
} from '../../PredefinedConfig/Common/ChartEnums';
import { PieChartProperties } from '../../PredefinedConfig/IUserState/ChartState';

export const DefaultPieChartProperties: PieChartProperties = {
  OthersCategoryThreshold: 2,
  OthersCategoryType: OthersCategoryType.Percent,
  PieChartLabelPosition: PieChartLabelPosition.BestFit,
  SliceValuesMapping: SliceLabelOption.Value,
  SliceLabelsMapping: SliceLabelOption.Name,
  SliceLegendMapping: SliceLabelOption.ValueAndName,
  ShowAsDoughnut: true,
};
