import {
  ChartType, CrosshairDisplayMode, ToolTipType,
  AxisLabelsLocation, LabelVisibility, HorizontalAlignment, AxisAngle, AxisScale
} from '../ChartEnums';
import { ICategoryChartProperties } from '../Interface/BlotterObjects/IChartDefinition';

export const DefaultCategoryChartProperties: ICategoryChartProperties = {
  // General
  ChartType: ChartType.Column, // changed to line because it work better with a lot of data points
  // jw: changed back to column as I *think* that is what our users want but genuinely unsure...
  SeriesThickness: 1,
  // added special Default enum to resolve marker type based on chart type. Do not use enums for this property
  MarkerType: "Default",

  // Callouts:
  CalloutsType: "None", // using CalloutsType.None enum as a string
  CalloutsInterval: 1,  // this really should default to round(chartData.length / 8) for best performance

  // Annotations:
  EnableFinalValueAnnotations: false,
  CrosshairDisplayMode: CrosshairDisplayMode.None,
  CrosshairSnapToData: false,
  CrosshairAnnotationEnabled: false,
  ToolTipType: ToolTipType.Item,
  EnableSeriesHighlighting: false,
  EnableCategoryHighlighting: false,
  EnableItemHighlighting: false,

  // Y Axis props:
  // changed YAxisLabelLocation to right because it works better with final values annotation
  YAxisLabelLocation: AxisLabelsLocation.OutsideRight,
  YAxisLabelVisibility: LabelVisibility.Visible,
  YAxisLabelColor: "",
  YAxisTitle: "",
  YAxisTitleColor: "",
  YAxisMinimumValue: undefined, // auto-calculated based on data range
  YAxisMaximumValue: undefined, // auto-calculated based on data range
  // TODO we should implement "Auto" scale that changes between
  // Log and Linear depending on range of data values on y-Axis
  YAxisLabelScale: AxisScale.Linear,
  YAxisIsLogarithmic: false,
  YAxisInverted: false,
  // X Axis props:
  XAxisLabelLocation: AxisLabelsLocation.OutsideBottom,
  XAxisLabelVisibility: LabelVisibility.Visible,
  XAxisLabelColor: "",
  XAxisTitle: "",
  XAxisTitleColor: "",
  XAxisGap: 0.5,
  XAxisOverlap: 1.0,
  XAxisAngle: AxisAngle.Horizontal,
  XAxisInverted: false,
  // Misc
  EnableTransitions: false,
  TransitionInDuration: undefined,
  TitleAlignment: HorizontalAlignment.Center,
  SubTitleAlignment: HorizontalAlignment.Center,

}

