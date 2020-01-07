import {
  PieChartProperties,
  PieChartDataItem,
} from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import { SliceSortOption } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/ChartEnums';

export interface PieChartComponentState {
  DataSource: PieChartDataItem[];

  IsChartSettingsVisible: boolean;
  ChartProperties: PieChartProperties;
  IsGeneralMinimised: boolean;
  SliceBrushes: string[];
  SliceSortOption: SliceSortOption;
}
