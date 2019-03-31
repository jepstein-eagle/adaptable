"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChartEnums_1 = require("../ChartEnums");
exports.DefaultPieChartProperties = {
    OthersCategoryThreshold: 2,
    OthersCategoryType: ChartEnums_1.PieChartOthersCategoryType.Percent,
    PieChartLabelPosition: ChartEnums_1.PieChartLabelPosition.BestFit,
    SliceValuesMapping: ChartEnums_1.SliceLabelOption.Value,
    SliceLabelsMapping: ChartEnums_1.SliceLabelOption.Name,
    SliceLegendMapping: ChartEnums_1.SliceLabelOption.ValueAndName,
    ShowAsDoughnut: true
};
