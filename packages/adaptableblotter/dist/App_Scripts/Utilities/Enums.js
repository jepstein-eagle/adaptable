"use strict";
// General Enums
Object.defineProperty(exports, "__esModule", { value: true });
var DataType;
(function (DataType) {
    DataType["String"] = "String";
    DataType["Number"] = "Number";
    DataType["Boolean"] = "Boolean";
    DataType["Date"] = "Date";
    DataType["Object"] = "Object";
    DataType["All"] = "All";
    DataType["Unknown"] = "Unknown";
})(DataType = exports.DataType || (exports.DataType = {}));
var ExpressionMode;
(function (ExpressionMode) {
    ExpressionMode["SingleColumn"] = "SingleColumn";
    ExpressionMode["MultiColumn"] = "MultiColumn";
})(ExpressionMode = exports.ExpressionMode || (exports.ExpressionMode = {}));
var AccessLevel;
(function (AccessLevel) {
    AccessLevel["ReadOnly"] = "ReadOnly";
    AccessLevel["Hidden"] = "Hidden";
    AccessLevel["Full"] = "Full";
})(AccessLevel = exports.AccessLevel || (exports.AccessLevel = {}));
var LeafExpressionOperator;
(function (LeafExpressionOperator) {
    LeafExpressionOperator["Unknown"] = "Unknown";
    //Numeric and Date
    LeafExpressionOperator["GreaterThan"] = "GreaterThan";
    LeafExpressionOperator["LessThan"] = "LessThan";
    LeafExpressionOperator["Equals"] = "Equals";
    LeafExpressionOperator["NotEquals"] = "NotEquals";
    LeafExpressionOperator["GreaterThanOrEqual"] = "GreaterThanOrEqual";
    LeafExpressionOperator["LessThanOrEqual"] = "LessThanOrEqual";
    LeafExpressionOperator["Between"] = "Between";
    //String
    LeafExpressionOperator["Contains"] = "Contains";
    LeafExpressionOperator["NotContains"] = "NotContains";
    LeafExpressionOperator["StartsWith"] = "StartsWith";
    LeafExpressionOperator["EndsWith"] = "EndsWith";
    LeafExpressionOperator["Regex"] = "Regex";
    // Cell Validations
    LeafExpressionOperator["None"] = "None";
    LeafExpressionOperator["ValueChange"] = "ValueChange";
    LeafExpressionOperator["PercentChange"] = "PercentChange";
    LeafExpressionOperator["NotBetween"] = "NotBetween";
    LeafExpressionOperator["IsPositive"] = "IsPositive";
    LeafExpressionOperator["IsNegative"] = "IsNegative";
    LeafExpressionOperator["IsNotNumber"] = "IsNotNumber";
    LeafExpressionOperator["IsTrue"] = "IsTrue";
    LeafExpressionOperator["IsFalse"] = "IsFalse";
    LeafExpressionOperator["NoDuplicates"] = "NoDuplicates";
    // Special
    LeafExpressionOperator["PrimaryKeyDuplicate"] = "PrimaryKeyDuplicate";
})(LeafExpressionOperator = exports.LeafExpressionOperator || (exports.LeafExpressionOperator = {}));
var MathOperation;
(function (MathOperation) {
    MathOperation["Add"] = "Add";
    MathOperation["Subtract"] = "Subtract";
    MathOperation["Multiply"] = "Multiply";
    MathOperation["Divide"] = "Divide";
    MathOperation["Replace"] = "Replace";
})(MathOperation = exports.MathOperation || (exports.MathOperation = {}));
// Enums used in Strategies
var ActionMode;
(function (ActionMode) {
    ActionMode["WarnUser"] = "Warn User";
    ActionMode["StopEdit"] = "Stop Edit";
})(ActionMode = exports.ActionMode || (exports.ActionMode = {}));
var LayoutSource;
(function (LayoutSource) {
    LayoutSource["Existing"] = "Existing";
    LayoutSource["New"] = "New";
})(LayoutSource = exports.LayoutSource || (exports.LayoutSource = {}));
var ConditionalStyleScope;
(function (ConditionalStyleScope) {
    ConditionalStyleScope["Column"] = "Column";
    ConditionalStyleScope["Row"] = "Row";
    ConditionalStyleScope["ColumnCategory"] = "ColumnCategory";
})(ConditionalStyleScope = exports.ConditionalStyleScope || (exports.ConditionalStyleScope = {}));
var ReportColumnScope;
(function (ReportColumnScope) {
    ReportColumnScope["AllColumns"] = "AllColumns";
    ReportColumnScope["VisibleColumns"] = "VisibleColumns";
    ReportColumnScope["SelectedColumns"] = "SelectedColumns";
    ReportColumnScope["BespokeColumns"] = "BespokeColumns";
})(ReportColumnScope = exports.ReportColumnScope || (exports.ReportColumnScope = {}));
var ReportRowScope;
(function (ReportRowScope) {
    ReportRowScope["AllRows"] = "AllRows";
    ReportRowScope["VisibleRows"] = "VisibleRows";
    ReportRowScope["SelectedRows"] = "SelectedRows";
    ReportRowScope["ExpressionRows"] = "ExpressionRows";
})(ReportRowScope = exports.ReportRowScope || (exports.ReportRowScope = {}));
var ExportDestination;
(function (ExportDestination) {
    ExportDestination["CSV"] = "CSV";
    ExportDestination["Clipboard"] = "Clipboard";
    ExportDestination["OpenfinExcel"] = "OpenfinExcel";
    ExportDestination["iPushPull"] = "iPushPull";
})(ExportDestination = exports.ExportDestination || (exports.ExportDestination = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["Unknown"] = "Unknown";
    SortOrder["Ascending"] = "Ascending";
    SortOrder["Descending"] = "Descending";
})(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
var DisplayAction;
(function (DisplayAction) {
    DisplayAction["HighlightCell"] = "HighlightCell";
    DisplayAction["ShowRow"] = "ShowRow";
    DisplayAction["ShowRowAndHighlightCell"] = "ShowRowAndHighlightCell";
})(DisplayAction = exports.DisplayAction || (exports.DisplayAction = {}));
var AuditLogTrigger;
(function (AuditLogTrigger) {
    AuditLogTrigger["CellEdit"] = "CellEdit";
    AuditLogTrigger["StateChange"] = "StateChange";
    AuditLogTrigger["AdaptableBlotterFunction"] = "AdaptableBlotterFunction";
    AuditLogTrigger["Ping"] = "Ping";
})(AuditLogTrigger = exports.AuditLogTrigger || (exports.AuditLogTrigger = {}));
var RangeOperandType;
(function (RangeOperandType) {
    RangeOperandType["Column"] = "Column";
    RangeOperandType["Value"] = "Value";
})(RangeOperandType = exports.RangeOperandType || (exports.RangeOperandType = {}));
var SelectionMode;
(function (SelectionMode) {
    SelectionMode["Multi"] = "Multi";
    SelectionMode["Single"] = "Single";
})(SelectionMode = exports.SelectionMode || (exports.SelectionMode = {}));
//make sure enum items match IRawValueDisplayValuePair
var DistinctCriteriaPairValue;
(function (DistinctCriteriaPairValue) {
    DistinctCriteriaPairValue["RawValue"] = "RawValue";
    DistinctCriteriaPairValue["DisplayValue"] = "DisplayValue";
})(DistinctCriteriaPairValue = exports.DistinctCriteriaPairValue || (exports.DistinctCriteriaPairValue = {}));
var FontWeight;
(function (FontWeight) {
    FontWeight["Normal"] = "Normal";
    FontWeight["Bold"] = "Bold";
})(FontWeight = exports.FontWeight || (exports.FontWeight = {}));
var FontStyle;
(function (FontStyle) {
    FontStyle["Normal"] = "Normal";
    FontStyle["Italic"] = "Italic";
})(FontStyle = exports.FontStyle || (exports.FontStyle = {}));
var FontSize;
(function (FontSize) {
    FontSize["XSmall"] = "XSmall";
    FontSize["Small"] = "Small";
    FontSize["Medium"] = "Medium";
    FontSize["Large"] = "Large";
    FontSize["XLarge"] = "XLarge";
})(FontSize = exports.FontSize || (exports.FontSize = {}));
var PanelWidth;
(function (PanelWidth) {
    PanelWidth["Wide"] = "800px";
    PanelWidth["Medium"] = "600px";
    PanelWidth["Narrow"] = "400px";
})(PanelWidth = exports.PanelWidth || (exports.PanelWidth = {}));
var QueryBuildStatus;
(function (QueryBuildStatus) {
    QueryBuildStatus[QueryBuildStatus["SelectFirstColumn"] = 0] = "SelectFirstColumn";
    QueryBuildStatus[QueryBuildStatus["SelectFurtherColumn"] = 1] = "SelectFurtherColumn";
    QueryBuildStatus[QueryBuildStatus["ColumnSelected"] = 2] = "ColumnSelected";
    QueryBuildStatus[QueryBuildStatus["SingleConditionsAdded"] = 3] = "SingleConditionsAdded";
    QueryBuildStatus[QueryBuildStatus["MultipleConditionsAdded"] = 4] = "MultipleConditionsAdded";
})(QueryBuildStatus = exports.QueryBuildStatus || (exports.QueryBuildStatus = {}));
var SearchChangedTrigger;
(function (SearchChangedTrigger) {
    SearchChangedTrigger["DataSource"] = "DataSource";
    SearchChangedTrigger["AdvancedSearch"] = "AdvancedSearch";
    SearchChangedTrigger["QuickSearch"] = "QuickSearch";
    SearchChangedTrigger["ColumnFilter"] = "ColumnFilter";
    SearchChangedTrigger["UserFilter"] = "UserFilter";
    SearchChangedTrigger["DataChange"] = "DataChange";
    SearchChangedTrigger["Sort"] = "Sort";
})(SearchChangedTrigger = exports.SearchChangedTrigger || (exports.SearchChangedTrigger = {}));
var StateChangedTrigger;
(function (StateChangedTrigger) {
    StateChangedTrigger["AdvancedSearch"] = "AdvancedSearch";
    StateChangedTrigger["Alert"] = "Alert";
    StateChangedTrigger["BulkUpdate"] = "BulkUpdate";
    StateChangedTrigger["CalculatedColumn"] = "CalculatedColumn";
    StateChangedTrigger["Calendar"] = "Calendar";
    StateChangedTrigger["CellValidation"] = "CellValidation";
    StateChangedTrigger["PercentBar"] = "PercentBar";
    StateChangedTrigger["Chart"] = "Chart";
    StateChangedTrigger["ColumnFilter"] = "ColumnFilter";
    StateChangedTrigger["ConditionalStyle"] = "ConditionalStyle";
    StateChangedTrigger["CustomSort"] = "CustomSort";
    StateChangedTrigger["Dashboard"] = "Dashboard";
    StateChangedTrigger["DataSource"] = "DataSource";
    StateChangedTrigger["Export"] = "Export";
    StateChangedTrigger["FlashingCell"] = "FlashingCell";
    StateChangedTrigger["FormatColumn"] = "FormatColumn";
    StateChangedTrigger["FreeTextColumn"] = "FreeTextColumn";
    StateChangedTrigger["Layout"] = "Layout";
    StateChangedTrigger["ColumnCategory"] = "ColumnCategory";
    StateChangedTrigger["PlusMinus"] = "PlusMinus";
    StateChangedTrigger["QuickSearch"] = "QuickSearch";
    StateChangedTrigger["SelectedCells"] = "SelectedCells";
    StateChangedTrigger["Shortcut"] = "Shortcut";
    StateChangedTrigger["SmartEdit"] = "SmartEdit";
    StateChangedTrigger["Theme"] = "Theme";
    StateChangedTrigger["UserFilter"] = "UserFilter";
})(StateChangedTrigger = exports.StateChangedTrigger || (exports.StateChangedTrigger = {}));
var Visibility;
(function (Visibility) {
    Visibility["Minimised"] = "Minimised";
    Visibility["Visible"] = "Visible";
    Visibility["Hidden"] = "Hidden";
})(Visibility = exports.Visibility || (exports.Visibility = {}));
var QueryTab;
(function (QueryTab) {
    QueryTab["ColumnValue"] = "ColumnValue";
    QueryTab["Filter"] = "Filter";
    QueryTab["Range"] = "Range";
})(QueryTab = exports.QueryTab || (exports.QueryTab = {}));
var ContextMenuTab;
(function (ContextMenuTab) {
    ContextMenuTab["Menu"] = "Menu";
    ContextMenuTab["Filter"] = "Filter";
})(ContextMenuTab = exports.ContextMenuTab || (exports.ContextMenuTab = {}));
var StatusColour;
(function (StatusColour) {
    StatusColour["Red"] = "Red";
    StatusColour["Amber"] = "Amber";
    StatusColour["Green"] = "Green";
    StatusColour["Blue"] = "Blue";
})(StatusColour = exports.StatusColour || (exports.StatusColour = {}));
var MessageType;
(function (MessageType) {
    MessageType["Info"] = "Info";
    MessageType["Success"] = "Success";
    MessageType["Warning"] = "Warning";
    MessageType["Error"] = "Error";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var SelectedCellOperation;
(function (SelectedCellOperation) {
    SelectedCellOperation["Sum"] = "Sum";
    SelectedCellOperation["Average"] = "Average";
    SelectedCellOperation["Median"] = "Median";
    SelectedCellOperation["Distinct"] = "Distinct";
    SelectedCellOperation["Max"] = "Max";
    SelectedCellOperation["Min"] = "Min";
    SelectedCellOperation["Count"] = "Count";
    SelectedCellOperation["Only"] = "Only";
    SelectedCellOperation["VWAP"] = "VWAP";
})(SelectedCellOperation = exports.SelectedCellOperation || (exports.SelectedCellOperation = {}));
var PinnedColumnDirection;
(function (PinnedColumnDirection) {
    PinnedColumnDirection["Left"] = "Leftt";
    PinnedColumnDirection["Right"] = "Right";
})(PinnedColumnDirection = exports.PinnedColumnDirection || (exports.PinnedColumnDirection = {}));
