import {
  IPieChartProperties,
  IPieChartDataItem,
} from '../../../PredefinedConfig/IUserState/ChartState';
import { SliceSortOption } from '../../../PredefinedConfig/Common/ChartEnums';

export interface PieChartComponentState {
  DataSource: IPieChartDataItem[];

  IsChartSettingsVisible: boolean;
  ChartProperties: IPieChartProperties;
  IsGeneralMinimised: boolean;
  SliceBrushes: string[];
  SliceSortOption: SliceSortOption;
}
