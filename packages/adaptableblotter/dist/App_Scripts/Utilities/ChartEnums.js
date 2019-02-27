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
var CrosshairDisplayMode;
(function (CrosshairDisplayMode) {
    CrosshairDisplayMode["None"] = "None";
    CrosshairDisplayMode["Horizontal"] = "Horizontal";
    CrosshairDisplayMode["Vertical"] = "Vertical";
    CrosshairDisplayMode["Both"] = "Both";
})(CrosshairDisplayMode = exports.CrosshairDisplayMode || (exports.CrosshairDisplayMode = {}));
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
    // these enums are used only when using crossingAxis and crossingValue properties:
    AxisLabelsLocation["InsideTop"] = "InsideTop";
    AxisLabelsLocation["InsideBottom"] = "InsideBottom";
    AxisLabelsLocation["InsideLeft"] = "InsideLeft";
    AxisLabelsLocation["InsideRight"] = "InsideRight";
})(AxisLabelsLocation = exports.AxisLabelsLocation || (exports.AxisLabelsLocation = {}));
var AxisScale;
(function (AxisScale) {
    AxisScale["Linear"] = "Linear";
    AxisScale["Log"] = "Log";
})(AxisScale = exports.AxisScale || (exports.AxisScale = {}));
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
var MarkerType;
(function (MarkerType) {
    // Unset = 'Unset',  // commented out because Default is more descriptive enum
    MarkerType["Default"] = "Default";
    MarkerType["Automatic"] = "Automatic";
    MarkerType["Circle"] = "Circle";
    MarkerType["Triangle"] = "Triangle";
    MarkerType["Pyramid"] = "Pyramid";
    MarkerType["Square"] = "Square";
    MarkerType["Diamond"] = "Diamond";
    MarkerType["Pentagon"] = "Pentagon";
    MarkerType["Hexagon"] = "Hexagon";
    MarkerType["Tetragram"] = "Tetragram";
    MarkerType["Pentagram"] = "Pentagram";
    MarkerType["Hexagram"] = "Hexagram";
    MarkerType["None"] = "None";
})(MarkerType = exports.MarkerType || (exports.MarkerType = {}));
var CalloutsType;
(function (CalloutsType) {
    CalloutsType["None"] = "None";
    CalloutsType["DataRanges"] = "Data Ranges";
    CalloutsType["DataPoints"] = "Data Points";
    CalloutsType["DataChangesInValues"] = "Data Changes";
    CalloutsType["DataChangesInPercentage"] = "Data Changes (%)";
    // note populate getCalloutTypeOptions() with names of non-numeric data columns
    // to add more callout types
})(CalloutsType = exports.CalloutsType || (exports.CalloutsType = {}));
