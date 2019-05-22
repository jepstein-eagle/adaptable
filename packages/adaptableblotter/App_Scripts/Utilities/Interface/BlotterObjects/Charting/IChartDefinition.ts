import { Expression } from '../../../Expression';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
import {
  CategoryChartType,
  CrosshairDisplayMode,
  ToolTipType,
  AxisLabelsLocation,
  LabelVisibility,
  AxisScale,
  AxisAngle,
  HorizontalAlignment,
  ChartType,
  PieChartLabelPosition,
  SliceLabelOption,
  OthersCategoryType,
} from '../../../ChartEnums';

/**
 * Our Chart Definitions which will get added to and updated as we add new charts
 * But the basic idea is that each chart will have a base chart defintion that just includes a name, description, type and chart properties
 * These chart properties are specialised for each chart type: they are all nullable types because we use defaults in the DefaultXXXProperties that we assign
 */

export interface IChartDefinition extends IAdaptableBlotterObject {
  Name: string;
  Description: string;
  ChartProperties: IChartProperties;
  ChartType: ChartType;
  VisibleRowsOnly: boolean;
}

export interface IChartProperties extends IAdaptableBlotterObject {
  // empty inteface that is overriden for each individual chart type
}

export interface IPieChartDefinition extends IChartDefinition {
  PrimaryColumnId: string;
  SecondaryColumnId?: string;
  SecondaryColumnOperation: 'Sum' | 'Count';
}

export interface ICategoryChartDefinition extends IChartDefinition {
  YAxisColumnIds: string[];
  YAxisTotal: 'Sum' | 'Average';
  XAxisColumnId: string;
  XAxisExpression?: Expression;
}

export interface IPieChartProperties extends IChartProperties {
  OthersCategoryThreshold?: number;
  OthersCategoryType?: OthersCategoryType;
  PieChartLabelPosition?: PieChartLabelPosition;
  SliceLabelsMapping?: SliceLabelOption;
  SliceValuesMapping?: SliceLabelOption;
  SliceLegendMapping?: SliceLabelOption;
  ShowAsDoughnut?: boolean;
}

export interface ICategoryChartProperties extends IChartProperties {
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
