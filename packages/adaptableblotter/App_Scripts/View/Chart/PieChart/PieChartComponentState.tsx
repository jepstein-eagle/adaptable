import {
  IPieChartProperties,
  IPieChartDataItem,
} from '../../../PredefinedConfig/IUserState Interfaces/ChartState';
import { SliceSortOption } from '../../../PredefinedConfig/Common Objects/ChartEnums';

export interface PieChartComponentState {
  DataSource: IPieChartDataItem[];

  IsChartSettingsVisible: boolean;
  ChartProperties: IPieChartProperties;
  IsGeneralMinimised: boolean;
  SliceBrushes: string[];
  SliceSortOption: SliceSortOption;
}
