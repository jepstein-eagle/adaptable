"use strict";
// General enums for all charts
Object.defineProperty(exports, "__esModule", { value: true });
var ChartVisibility;
(function (ChartVisibility) {
    ChartVisibility["Maximised"] = "Maximised";
    ChartVisibility["Minimised"] = "Minimised";
    ChartVisibility["Hidden"] = "Hidden";
})(ChartVisibility = exports.ChartVisibility || (exports.ChartVisibility = {}));
var ChartType;
(function (ChartType) {
    ChartType["CategoryChart"] = "CategoryChart";
    ChartType["PieChart"] = "PieChart";
    ChartType["Data"] = "Data";
})(ChartType = exports.ChartType || (exports.ChartType = {}));
// Catategory Charts
var CategoryChartType;
(function (CategoryChartType) {
    CategoryChartType["Column"] = "Column";
    CategoryChartType["Area"] = "Area";
    CategoryChartType["Line"] = "Line";
    CategoryChartType["Point"] = "Point";
    CategoryChartType["Spline"] = "Spline";
    CategoryChartType["SplineArea"] = "SplineArea";
    CategoryChartType["StepArea"] = "StepArea";
    CategoryChartType["StepLine"] = "StepLine";
    CategoryChartType["Waterfall"] = "Waterfall";
})(CategoryChartType = exports.CategoryChartType || (exports.CategoryChartType = {}));
var CrosshairDisplayMode;
(function (CrosshairDisplayMode) {
    CrosshairDisplayMode["None"] = "None";
    CrosshairDisplayMode["Horizontal"] = "Horizontal";
    CrosshairDisplayMode["Vertical"] = "Vertical";
    CrosshairDisplayMode["Both"] = "Both";
})(CrosshairDisplayMode = exports.CrosshairDisplayMode || (exports.CrosshairDisplayMode = {}));
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
// Pie Charts
var PieChartLabelPosition;
(function (PieChartLabelPosition) {
    PieChartLabelPosition["BestFit"] = "BestFit";
    PieChartLabelPosition["Center"] = "Center";
    PieChartLabelPosition["InsideEnd"] = "InsideEnd";
    PieChartLabelPosition["OutsideEnd"] = "OutsideEnd";
    PieChartLabelPosition["None"] = "None";
})(PieChartLabelPosition = exports.PieChartLabelPosition || (exports.PieChartLabelPosition = {}));
var SecondaryColumnOperation;
(function (SecondaryColumnOperation) {
    SecondaryColumnOperation["Sum"] = "Sum";
    SecondaryColumnOperation["Count"] = "Count";
})(SecondaryColumnOperation = exports.SecondaryColumnOperation || (exports.SecondaryColumnOperation = {}));
var SliceLabelOption;
(function (SliceLabelOption) {
    SliceLabelOption["Value"] = "Value";
    SliceLabelOption["ValueAndName"] = "ValueAndName";
    SliceLabelOption["Ratio"] = "Ratio";
    SliceLabelOption["RatioAndName"] = "RatioAndName";
    SliceLabelOption["Name"] = "Name";
})(SliceLabelOption = exports.SliceLabelOption || (exports.SliceLabelOption = {}));
var SliceSortOption;
(function (SliceSortOption) {
    SliceSortOption["None"] = "None";
    SliceSortOption["ValueDescending"] = "Value Descending";
    SliceSortOption["ValueAscending"] = "Value Ascending";
    SliceSortOption["NameDescending"] = "Name Descending";
    SliceSortOption["NameAscending"] = "Name Ascending";
})(SliceSortOption = exports.SliceSortOption || (exports.SliceSortOption = {}));
var OthersCategoryType;
(function (OthersCategoryType) {
    OthersCategoryType["Number"] = "Number";
    OthersCategoryType["Percent"] = "Percent";
})(OthersCategoryType = exports.OthersCategoryType || (exports.OthersCategoryType = {}));
