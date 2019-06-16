import {
  PieChartLabelPosition,
  SliceLabelOption,
  SliceSortOption,
  OthersCategoryType,
} from '../../PredefinedConfig/Common Objects/ChartEnums';
import { IPieChartProperties } from '../../PredefinedConfig/IUserState Interfaces/ChartState';

export const DefaultPieChartProperties: IPieChartProperties = {
  OthersCategoryThreshold: 2,
  OthersCategoryType: OthersCategoryType.Percent,
  PieChartLabelPosition: PieChartLabelPosition.BestFit,
  SliceValuesMapping: SliceLabelOption.Value,
  SliceLabelsMapping: SliceLabelOption.Name,
  SliceLegendMapping: SliceLabelOption.ValueAndName,
  ShowAsDoughnut: true,
};
