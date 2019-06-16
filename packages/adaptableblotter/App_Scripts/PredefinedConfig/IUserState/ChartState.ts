import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import {
  ChartType,
  OthersCategoryType,
  PieChartLabelPosition,
  SliceLabelOption,
  CategoryChartType,
  CrosshairDisplayMode,
  ToolTipType,
  AxisLabelsLocation,
  LabelVisibility,
  AxisScale,
  AxisAngle,
  HorizontalAlignment,
} from '../Common/ChartEnums';
import { Expression } from '../Common/Expression/Expression';
export interface ChartState extends IUserState {
  ChartDefinitions?: ChartDefinition[];
  CurrentChartName?: string;
  RefreshRate?: number;
}

/**
 * Our Chart Definitions which will get added to and updated as we add new charts
 * But the basic idea is that each chart will have a base chart defintion that just includes a name, description, type and chart properties
 * These chart properties are specialised for each chart type: they are all nullable types because we use defaults in the DefaultXXXProperties that we assign
 */

export interface ChartDefinition extends IAdaptableBlotterObject {
  Name: string;
  Description: string;
  ChartProperties: ChartProperties;
  ChartType: ChartType;
  VisibleRowsOnly: boolean;
}

export interface ChartProperties extends IAdaptableBlotterObject {
  // empty inteface that is overriden for each individual chart type
}

export interface PieChartDefinition extends ChartDefinition {
  PrimaryColumnId: string;
  SecondaryColumnId?: string;
  SecondaryColumnOperation: 'Sum' | 'Count';
}

export interface CategoryChartDefinition extends ChartDefinition {
  YAxisColumnIds: string[];
  YAxisTotal: 'Sum' | 'Average';
  XAxisColumnId: string;
  XAxisExpression?: Expression;
}

export interface PieChartProperties extends ChartProperties {
  OthersCategoryThreshold?: number;
  OthersCategoryType?: OthersCategoryType;
  PieChartLabelPosition?: PieChartLabelPosition;
  SliceLabelsMapping?: SliceLabelOption;
  SliceValuesMapping?: SliceLabelOption;
  SliceLegendMapping?: SliceLabelOption;
  ShowAsDoughnut?: boolean;
}

export interface CategoryChartProperties extends ChartProperties {
  // General
  CategoryChartType?: CategoryChartType;
  SeriesThickness?: number; // and bind it to

  MarkerType?: string; // using a string because chart expects a string or an array of MarkerType enums

  CalloutsType?: string; // using string because we need add non-numeric properties from data source in getCalloutTypeOptions()
  CalloutsInterval?: number; // this controls how many callouts
  // Annotations:
  EnableFinalValueAnnotations?: boolean;
  CrosshairDisplayMode?: CrosshairDisplayMode;
  CrosshairSnapToData?: boolean;
  CrosshairAnnotationEnabled?: boolean;
  ToolTipType?: ToolTipType;
  // Y Axis
  YAxisLabelLocation?: AxisLabelsLocation;
  YAxisLabelVisibility?: LabelVisibility;
  YAxisLabelScale?: AxisScale;
  YAxisIntervalCustom?: boolean;
  YAxisIntervalValue?: number;
  YAxisTitle?: string;
  YAxisLabelColor?: string;
  YAxisTitleColor?: string;
  YAxisMinimumValue?: number;
  YAxisMaximumValue?: number;
  YAxisIsLogarithmic?: boolean;
  YAxisInverted?: boolean;
  // x Axis
  XAxisLabelLocation?: AxisLabelsLocation;
  XAxisLabelVisibility?: LabelVisibility;
  XAxisLabelColor?: string;
  XAxisIntervalCustom?: boolean;
  XAxisIntervalValue?: number;
  XAxisTitle?: string;
  XAxisTitleColor?: string;
  XAxisGap?: number;
  XAxisOverlap: number;
  XAxisAngle?: AxisAngle;
  XAxisInverted?: boolean;
  // Misc
  EnableTransitions?: boolean;
  TransitionInDuration?: number;
  TitleAlignment?: HorizontalAlignment;
  SubTitleAlignment?: HorizontalAlignment;
  EnableSeriesHighlighting?: boolean;
  EnableCategoryHighlighting?: boolean;
  EnableItemHighlighting?: boolean;
}

export interface PieChartDataItem {
  Name: string;
  Value: any; // ?? number?
  Ratio: number;
  ValueAndName?: string;
  RatioAndName?: string;
  ErrorMessage?: string;
}

export interface ChartData {
  Data: any;
  ErrorMessage: string;
}
