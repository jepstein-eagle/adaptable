"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChartEnums_1 = require("../ChartEnums");
exports.DefaultCategoryChartProperties = {
    // General
    CategoryChartType: ChartEnums_1.CategoryChartType.Line,
    // jw: changed back to column as I *think* that is what our users want but genuinely unsure...
    SeriesThickness: 1,
    // added special Default enum to resolve marker type based on chart type. Do not use enums for this property
    MarkerType: "Default",
    // Callouts:
    CalloutsType: "None",
    CalloutsInterval: 1,
    // Annotations:
    EnableFinalValueAnnotations: false,
    CrosshairDisplayMode: ChartEnums_1.CrosshairDisplayMode.None,
    CrosshairSnapToData: false,
    CrosshairAnnotationEnabled: false,
    ToolTipType: ChartEnums_1.ToolTipType.Item,
    EnableSeriesHighlighting: false,
    EnableCategoryHighlighting: false,
    EnableItemHighlighting: false,
    // Y Axis props:
    // changed YAxisLabelLocation to right because it works better with final values annotation
    YAxisLabelLocation: ChartEnums_1.AxisLabelsLocation.OutsideRight,
    YAxisLabelVisibility: ChartEnums_1.LabelVisibility.Visible,
    YAxisLabelColor: "",
    YAxisIntervalCustom: false,
    YAxisIntervalValue: undefined,
    YAxisTitle: "",
    YAxisTitleColor: "",
    YAxisMinimumValue: undefined,
    YAxisMaximumValue: undefined,
    // TODO we should implement "Auto" scale that changes between
    // Log and Linear depending on range of data values on y-Axis
    YAxisLabelScale: ChartEnums_1.AxisScale.Linear,
    YAxisIsLogarithmic: false,
    YAxisInverted: false,
    // X Axis props:
    XAxisLabelLocation: ChartEnums_1.AxisLabelsLocation.OutsideBottom,
    XAxisLabelVisibility: ChartEnums_1.LabelVisibility.Visible,
    XAxisLabelColor: "",
    XAxisIntervalCustom: false,
    XAxisIntervalValue: undefined,
    XAxisTitle: "",
    XAxisTitleColor: "",
    XAxisGap: 0.5,
    XAxisOverlap: 1.0,
    XAxisAngle: ChartEnums_1.AxisAngle.Horizontal,
    XAxisInverted: false,
    // Misc
    EnableTransitions: false,
    TransitionInDuration: undefined,
    TitleAlignment: ChartEnums_1.HorizontalAlignment.Center,
    SubTitleAlignment: ChartEnums_1.HorizontalAlignment.Center,
};
