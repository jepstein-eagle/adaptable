"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChartEnums_1 = require("../ChartEnums");
exports.DefaultChartProperties = {
    // General
    ChartType: ChartEnums_1.ChartType.Column,
    ChartSize: ChartEnums_1.ChartSize.Small,
    ChartCrosshairsMode: ChartEnums_1.ChartCrosshairsMode.None,
    EnableFinalValueAnnotations: false,
    SpanCrossHairsToData: false,
    EnableCrosshairsAnnotations: false,
    ToolTipType: ChartEnums_1.ToolTipType.Default,
    // Y Axis
    YAxisLabelLocation: ChartEnums_1.AxisLabelsLocation.OutsideLeft,
    YAxisLabelVisibility: ChartEnums_1.LabelVisibility.Visible,
    YAxisTitle: "",
    YAxisLabelColor: "",
    YAxisTitleColor: "",
    YAxisMinimumValue: undefined,
    // X Axis
    XAxisLabelVisibility: ChartEnums_1.LabelVisibility.Visible,
    XAxisLabelColor: "",
    XAxisTitle: "",
    XAxisTitleColor: "",
    XAxisGap: 0.5,
    XAxisAngle: ChartEnums_1.AxisAngle.Horizontal,
    // Misc
    EnableTransitions: false,
    TransitionInDuration: undefined,
    TitleAlignment: ChartEnums_1.HorizontalAlignment.Center,
    SubTitleAlignment: ChartEnums_1.HorizontalAlignment.Center,
    EnableSeriesHighlighting: false,
    EnableCategoryHighlighting: false,
    EnableItemHighlighting: false
};
