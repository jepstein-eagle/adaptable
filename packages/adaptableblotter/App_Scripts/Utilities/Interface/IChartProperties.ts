import { ChartType, CrosshairDisplayMode,
  AxisLabelsLocation, HorizontalAlignment, LabelVisibility, ToolTipType,
  AxisAngle, AxisScale, CalloutsType } from '../ChartEnums';

export interface ICalloutProperties {
  Type: string;
  Interval?: number;
}

export interface IChartProperties {
  // General
  ChartType?: ChartType;
//  ChartSize?: ChartSize;
  SeriesThickness?: number; // and bind it to

  MarkerType?: string; // using a string because chart expects a string or an array of MarkerType enums

  CalloutsType?: string; // using string because we need add non-numeric properties from data source in getCalloutTypeOptions()
  CalloutsInterval: number; // this controls how many callouts
  // Annotations:
  EnableFinalValueAnnotations?: boolean;
  CrosshairDisplayMode?: CrosshairDisplayMode;
  CrosshairSnapToData?: boolean;
  CrosshairAnnotationEnabled?: boolean;
  ToolTipType: ToolTipType;
  // Y Axis
  YAxisLabelLocation?: AxisLabelsLocation;
  YAxisLabelVisibility?: LabelVisibility;
  YAxisLabelScale?: AxisScale;
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
