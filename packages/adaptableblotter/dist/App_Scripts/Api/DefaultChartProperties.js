"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChartEnums_1 = require("../Utilities/ChartEnums");
exports.DefaultChartProperties = {
    // General
    ChartType: ChartEnums_1.ChartType.Column,
    ChartCrosshairsMode: ChartEnums_1.ChartCrosshairsMode.None,
    EnableFinalValueAnnotations: false,
    SpanCrossHairsToData: false,
    EnableCrosshairsAnnotations: false,
    // Y Axis
    YAxisLabelLocation: ChartEnums_1.AxisLabelsLocation.OutsideLeft,
    YAxisLabelVisibility: ChartEnums_1.LabelVisibility.Visible,
    YAxisLabelColor: "",
    YAxisTitleColor: "",
    YAxisMinimumValue: undefined,
    // X Axis
    XAxisLabelVisibility: ChartEnums_1.LabelVisibility.Visible,
    XAxisLabelColor: "",
    XAxisTitle: "",
    XAxisTitleColor: "",
    // Misc
    EnableTransitions: false,
    TransitionInDuration: undefined,
    TitleAlignment: ChartEnums_1.HorizontalAlignment.Center,
    SubTitleAlignment: ChartEnums_1.HorizontalAlignment.Center,
};
