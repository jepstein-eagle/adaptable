import {
  IChartDefinition,
  IChartProperties,
  ICategoryChartProperties,
} from '../../../Utilities/Interface/BlotterObjects/Charting/IChartDefinition';

// dont normally do this but Component was getting so bid and unwieldy...

export interface CategoryChartComponentState {
  // Global
  IsChartSettingsVisible: boolean;
  ChartProperties: ICategoryChartProperties;
  // General
  IsGeneralMinimised: boolean;
  // Y Axis
  SetYAxisMinimumValue: boolean;
  SetYAxisMaximumValue: boolean;
  SetYAxisLabelColor: boolean;
  SetYAxisTitleColor: boolean;
  IsYAxisMinimised: boolean;
  UseDefaultYAxisTitle: boolean;
  // X Axis
  IsXAxisMinimised: boolean;
  SetXAxisLabelColor: boolean;
  SetXAxisTitleColor: boolean;
  UseDefaultXAxisTitle: boolean;
  // Highlights
  IsHighlightsMinimised: boolean;
  // Misc
  IsMiscMinimised: boolean;
  TitleMargin: number;
  SubTitleMargin: number;
}
