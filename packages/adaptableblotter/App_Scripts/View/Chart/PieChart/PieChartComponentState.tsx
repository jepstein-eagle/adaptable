import {
  PieChartProperties,
  PieChartDataItem,
} from '../../../PredefinedConfig/RunTimeState/ChartState';
import { SliceSortOption } from '../../../PredefinedConfig/Common/ChartEnums';

export interface PieChartComponentState {
  DataSource: PieChartDataItem[];

  IsChartSettingsVisible: boolean;
  ChartProperties: PieChartProperties;
  IsGeneralMinimised: boolean;
  SliceBrushes: string[];
  SliceSortOption: SliceSortOption;
}
