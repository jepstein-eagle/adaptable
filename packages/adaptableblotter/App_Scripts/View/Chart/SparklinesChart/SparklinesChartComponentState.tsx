import { SparklinesChartProperties } from '../../../PredefinedConfig/RunTimeState/ChartState';

// dont normally do this but Component was getting so bid and unwieldy...

export interface SparklinesChartComponentState {
  // Global
  IsChartSettingsVisible: boolean;
  ChartProperties: SparklinesChartProperties;
}
