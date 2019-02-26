import { IChartProperties } from "../Interface/IChartProperties";
import { ChartType, ChartSize, CrosshairDisplayMode, ToolTipType,
  AxisLabelsLocation, LabelVisibility, HorizontalAlignment,
  AxisAngle, AxisScale } from '../ChartEnums';

export const DefaultChartProperties: IChartProperties = {
    // General
    ChartType: ChartType.Line,
    ChartSize: ChartSize.Small,
    // added special Default enum to resolve marker type based on chart type. Do not use enums for this property
    MarkerType: "Default",
    // annotations:
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

