"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("../Enums");
const ChartEnums_1 = require("../ChartEnums");
exports.DefaultPieChartProperties = {
    OthersCategoryThreshold: 2,
    OthersCategoryType: Enums_1.PieChartOthersCategoryType.Percent,
    PieChartLabelPosition: ChartEnums_1.PieChartLabelPosition.OutsideEnd,
    SliceValuesMapping: ChartEnums_1.SliceLabelOption.Value,
    SliceLabelsMapping: ChartEnums_1.SliceLabelOption.Name,
    SliceLegendMapping: ChartEnums_1.SliceLabelOption.ValueAndName,
    ShowAsDoughnut: true
};
