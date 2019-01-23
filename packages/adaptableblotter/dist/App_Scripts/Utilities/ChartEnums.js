"use strict";
// Chart Enums
Object.defineProperty(exports, "__esModule", { value: true });
var ChartVisibility;
(function (ChartVisibility) {
    ChartVisibility["Maximised"] = "Maximised";
    ChartVisibility["Minimised"] = "Minimised";
    ChartVisibility["Hidden"] = "Hidden";
})(ChartVisibility = exports.ChartVisibility || (exports.ChartVisibility = {}));
var ChartType;
(function (ChartType) {
    ChartType["Column"] = "Column";
    ChartType["Area"] = "Area";
    ChartType["Line"] = "Line";
    ChartType["Point"] = "Point";
    ChartType["Spline"] = "Spline";
    ChartType["SplineArea"] = "SplineArea";
    ChartType["StepArea"] = "StepArea";
    ChartType["StepLine"] = "StepLine";
    ChartType["Waterfall"] = "Waterfall";
})(ChartType = exports.ChartType || (exports.ChartType = {}));
var ChartCrosshairsMode;
(function (ChartCrosshairsMode) {
    ChartCrosshairsMode["None"] = "None";
    ChartCrosshairsMode["Horizontal"] = "Horizontal";
    ChartCrosshairsMode["Vertical"] = "Vertical";
    ChartCrosshairsMode["Both"] = "Both";
})(ChartCrosshairsMode = exports.ChartCrosshairsMode || (exports.ChartCrosshairsMode = {}));
var ChartSize;
(function (ChartSize) {
    ChartSize["XSmall"] = "XSmall";
    ChartSize["Small"] = "Small";
    ChartSize["Medium"] = "Medium";
    ChartSize["Large"] = "Large";
    ChartSize["XLarge"] = "XLarge";
})(ChartSize = exports.ChartSize || (exports.ChartSize = {}));
var AxisLabelsLocation;
(function (AxisLabelsLocation) {
    AxisLabelsLocation["OutsideTop"] = "OutsideTop";
    AxisLabelsLocation["OutsideBottom"] = "OutsideBottom";
    AxisLabelsLocation["OutsideLeft"] = "OutsideLeft";
    AxisLabelsLocation["OutsideRight"] = "OutsideRight";
    AxisLabelsLocation["InsideTop"] = "InsideTop";
    AxisLabelsLocation["InsideBottom"] = "InsideBottom";
    AxisLabelsLocation["InsideLeft"] = "InsideLeft";
    AxisLabelsLocation["InsideRight"] = "InsideRight";
})(AxisLabelsLocation = exports.AxisLabelsLocation || (exports.AxisLabelsLocation = {}));
var HorizontalAlignment;
(function (HorizontalAlignment) {
    HorizontalAlignment["Left"] = "Left";
    HorizontalAlignment["Center"] = "Center";
    HorizontalAlignment["Right"] = "Right";
})(HorizontalAlignment = exports.HorizontalAlignment || (exports.HorizontalAlignment = {}));
var AxisTotal;
(function (AxisTotal) {
    AxisTotal["Sum"] = "Sum";
    AxisTotal["Average"] = "Average";
})(AxisTotal = exports.AxisTotal || (exports.AxisTotal = {}));
var LabelVisibility;
(function (LabelVisibility) {
    LabelVisibility["Visible"] = "visible";
    LabelVisibility["Collapsed"] = "collapsed";
})(LabelVisibility = exports.LabelVisibility || (exports.LabelVisibility = {}));
var ToolTipType;
(function (ToolTipType) {
    ToolTipType["Default"] = "Default";
    ToolTipType["Item"] = "Item";
    ToolTipType["Category"] = "Category";
    ToolTipType["None"] = "None";
})(ToolTipType = exports.ToolTipType || (exports.ToolTipType = {}));
var AxisAngle;
(function (AxisAngle) {
    AxisAngle["Horizontal"] = "Horizontal";
    AxisAngle["Diagonal"] = "Diagonal";
    AxisAngle["Vertical"] = "Vertical";
})(AxisAngle = exports.AxisAngle || (exports.AxisAngle = {}));
