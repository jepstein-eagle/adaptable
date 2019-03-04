"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressionHelper_1 = require("./Helpers/ExpressionHelper");
const Enums_1 = require("./Enums");
const ColumnHelper_1 = require("./Helpers/ColumnHelper");
const CellValidationHelper_1 = require("./Helpers/CellValidationHelper");
const GeneralConstants_1 = require("./Constants/GeneralConstants");
const DefaultCategoryChartProperties_1 = require("./Defaults/DefaultCategoryChartProperties");
var ObjectFactory;
(function (ObjectFactory) {
    function CreateEmptyCustomSort() {
        return { ColumnId: GeneralConstants_1.EMPTY_STRING, SortedValues: [] };
    }
    ObjectFactory.CreateEmptyCustomSort = CreateEmptyCustomSort;
    function CreateEmptyCategoryChartDefinition() {
        return {
            Title: GeneralConstants_1.EMPTY_STRING,
            SubTitle: GeneralConstants_1.EMPTY_STRING,
            YAxisColumnIds: [],
            YAxisTotal: GeneralConstants_1.CHART_DEFAULT_YAXIS_TOTAL,
            XAxisColumnId: GeneralConstants_1.EMPTY_STRING,
            XAxisExpression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression(),
            ChartProperties: DefaultCategoryChartProperties_1.DefaultCategoryChartProperties
        };
    }
    ObjectFactory.CreateEmptyCategoryChartDefinition = CreateEmptyCategoryChartDefinition;
    function CreateEmptyCalculatedColumn() {
        return { ColumnId: GeneralConstants_1.EMPTY_STRING, ColumnExpression: GeneralConstants_1.EMPTY_STRING };
    }
    ObjectFactory.CreateEmptyCalculatedColumn = CreateEmptyCalculatedColumn;
    function CreateEmptyPlusMinusRule() {
        return {
            ColumnId: GeneralConstants_1.EMPTY_STRING,
            IsDefaultNudge: false,
            NudgeValue: GeneralConstants_1.PLUS_MINUS_DEFAULT_NUDGE_VALUE,
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression()
        };
    }
    ObjectFactory.CreateEmptyPlusMinusRule = CreateEmptyPlusMinusRule;
    function CreateEmptyAlertDefinition() {
        return {
            ColumnId: GeneralConstants_1.EMPTY_STRING,
            Range: {
                Operator: GeneralConstants_1.ALERT_DEFAULT_OPERATOR,
                Operand1: GeneralConstants_1.EMPTY_STRING,
                Operand2: GeneralConstants_1.EMPTY_STRING,
                Operand1Type: GeneralConstants_1.ALERT_DEFAULT_RANGE_OPERAND_TYPE,
                Operand2Type: GeneralConstants_1.ALERT_DEFAULT_RANGE_OPERAND_TYPE,
            },
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression(),
            MessageType: GeneralConstants_1.ALERT_DEFAULT_MESSAGE_TYPE,
            ShowAsPopup: GeneralConstants_1.ALERT_DEFAULT_SHOW_AS_POPUP
        };
    }
    ObjectFactory.CreateEmptyAlertDefinition = CreateEmptyAlertDefinition;
    function CreateEmptyAdvancedSearch() {
        return {
            Name: GeneralConstants_1.EMPTY_STRING,
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression()
        };
    }
    ObjectFactory.CreateEmptyAdvancedSearch = CreateEmptyAdvancedSearch;
    function CreateEmptyColumnCategory() {
        return {
            ColumnCategoryId: GeneralConstants_1.EMPTY_STRING,
            ColumnIds: []
        };
    }
    ObjectFactory.CreateEmptyColumnCategory = CreateEmptyColumnCategory;
    function CreateEmptyRange() {
        return {
            Operator: Enums_1.LeafExpressionOperator.Unknown,
            Operand1: GeneralConstants_1.EMPTY_STRING,
            Operand2: GeneralConstants_1.EMPTY_STRING,
            Operand1Type: Enums_1.RangeOperandType.Value,
            Operand2Type: Enums_1.RangeOperandType.Value
        };
    }
    ObjectFactory.CreateEmptyRange = CreateEmptyRange;
    function CreateEmptyGridSort() {
        return {
            Column: GeneralConstants_1.EMPTY_STRING,
            SortOrder: Enums_1.SortOrder.Unknown
        };
    }
    ObjectFactory.CreateEmptyGridSort = CreateEmptyGridSort;
    function CreateEmptyCellValidation() {
        return {
            ActionMode: 'Stop Edit',
            ColumnId: GeneralConstants_1.EMPTY_STRING,
            Range: {
                Operator: Enums_1.LeafExpressionOperator.None,
                Operand1: GeneralConstants_1.EMPTY_STRING,
                Operand2: GeneralConstants_1.EMPTY_STRING,
                Operand1Type: Enums_1.RangeOperandType.Column,
                Operand2Type: Enums_1.RangeOperandType.Column,
            },
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression()
        };
    }
    ObjectFactory.CreateEmptyCellValidation = CreateEmptyCellValidation;
    function CreateEmptyPercentBar() {
        return {
            ColumnId: GeneralConstants_1.EMPTY_STRING,
            MaxValue: 100,
            MinValue: 0,
            PositiveColor: GeneralConstants_1.DEFAULT_DARK_GREEN_COLOR,
            NegativeColor: GeneralConstants_1.DEFAULT_DARK_RED_COLOR,
            ShowValue: false,
            MaxValueColumnId: null,
            MinValueColumnId: null
        };
    }
    ObjectFactory.CreateEmptyPercentBar = CreateEmptyPercentBar;
    function CreateEmptyUserFilter() {
        return {
            Name: GeneralConstants_1.EMPTY_STRING,
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression(),
            ColumnId: GeneralConstants_1.EMPTY_STRING
        };
    }
    ObjectFactory.CreateEmptyUserFilter = CreateEmptyUserFilter;
    function CreateEmptyReport() {
        return {
            Name: GeneralConstants_1.EMPTY_STRING,
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression(),
            ColumnIds: [],
            ReportColumnScope: Enums_1.ReportColumnScope.AllColumns,
            ReportRowScope: Enums_1.ReportRowScope.AllRows
        };
    }
    ObjectFactory.CreateEmptyReport = CreateEmptyReport;
    function CreateDefaultFlashingCell(column, upColor, downColor, duration) {
        return {
            IsLive: false,
            ColumnId: column.ColumnId,
            FlashingCellDuration: duration,
            UpColor: upColor,
            DownColor: downColor
        };
    }
    ObjectFactory.CreateDefaultFlashingCell = CreateDefaultFlashingCell;
    function CreateEmptyShortcut() {
        return {
            ShortcutKey: null,
            ShortcutResult: null,
            ColumnType: Enums_1.DataType.Number,
            ShortcutOperation: Enums_1.MathOperation.Multiply,
            IsDynamic: false
        };
    }
    ObjectFactory.CreateEmptyShortcut = CreateEmptyShortcut;
    function CreateCellValidationMessage(CellValidation, blotter) {
        let columns = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let columnFriendlyName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(CellValidation.ColumnId, columns);
        let expressionDescription = (ExpressionHelper_1.ExpressionHelper.IsNotEmptyExpression(CellValidation.Expression)) ?
            " when " + ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, columns) :
            GeneralConstants_1.EMPTY_STRING;
        return (columnFriendlyName + ": " + CellValidationHelper_1.CellValidationHelper.createCellValidationDescription(CellValidation, columns) + expressionDescription);
    }
    ObjectFactory.CreateCellValidationMessage = CreateCellValidationMessage;
    function CreateEmptyConditionalStyle() {
        return {
            ColumnId: null,
            ColumnCategoryId: null,
            Style: CreateEmptyStyle(),
            ConditionalStyleScope: Enums_1.ConditionalStyleScope.Row,
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression()
        };
    }
    ObjectFactory.CreateEmptyConditionalStyle = CreateEmptyConditionalStyle;
    function CreateEmptyFormatColumn() {
        return {
            ColumnId: GeneralConstants_1.EMPTY_STRING,
            Style: CreateEmptyStyle()
        };
    }
    ObjectFactory.CreateEmptyFormatColumn = CreateEmptyFormatColumn;
    function CreateEmptyFreeTextColumn() {
        return {
            ColumnId: GeneralConstants_1.EMPTY_STRING,
            DefaultValue: GeneralConstants_1.EMPTY_STRING,
            FreeTextStoredValues: []
        };
    }
    ObjectFactory.CreateEmptyFreeTextColumn = CreateEmptyFreeTextColumn;
    function CreateLayout(columns, gridSorts, vendorGridInfo, name) {
        return {
            Columns: (columns) ? columns.map(x => x.ColumnId) : [],
            GridSorts: gridSorts,
            Name: name,
            VendorGridInfo: vendorGridInfo
        };
    }
    ObjectFactory.CreateLayout = CreateLayout;
    function CreateColumnFilter(columnId, expression) {
        return {
            ColumnId: columnId,
            Filter: expression
        };
    }
    ObjectFactory.CreateColumnFilter = CreateColumnFilter;
    function CreateColumnFilterFromUserFilter(userFilter) {
        return {
            ColumnId: userFilter.ColumnId,
            Filter: ExpressionHelper_1.ExpressionHelper.CreateSingleColumnExpression(userFilter.ColumnId, [], [], [userFilter.Name], []),
        };
    }
    ObjectFactory.CreateColumnFilterFromUserFilter = CreateColumnFilterFromUserFilter;
    function CreateUserFilterFromColumnFilter(columnFilter, name) {
        return {
            Name: name,
            ColumnId: columnFilter.ColumnId,
            Expression: columnFilter.Filter,
        };
    }
    ObjectFactory.CreateUserFilterFromColumnFilter = CreateUserFilterFromColumnFilter;
    function CreateRange(operator, operand1, operand2, rangeOperandType, rangeOperandType2) {
        return {
            Operator: operator,
            Operand1: operand1,
            Operand2: operand2,
            Operand1Type: rangeOperandType,
            Operand2Type: rangeOperandType2
        };
    }
    ObjectFactory.CreateRange = CreateRange;
    function CreateRangeEvaluation(operator, operand1, operand2, newValue, initialValue, columnId) {
        return {
            operand1: operand1,
            operand2: operand2,
            newValue: newValue,
            operator: operator,
            initialValue: initialValue,
            columnId: columnId
        };
    }
    ObjectFactory.CreateRangeEvaluation = CreateRangeEvaluation;
    function CreateCellValidationRule(columnId, range, actionMode, expression) {
        return {
            ColumnId: columnId,
            Range: range,
            ActionMode: actionMode,
            Expression: expression,
        };
    }
    ObjectFactory.CreateCellValidationRule = CreateCellValidationRule;
    function CreateEmptyStyle() {
        return {
            BackColor: null,
            ForeColor: null,
            FontWeight: Enums_1.FontWeight.Normal,
            FontStyle: Enums_1.FontStyle.Normal,
            FontSize: null,
            ClassName: GeneralConstants_1.EMPTY_STRING
        };
    }
    ObjectFactory.CreateEmptyStyle = CreateEmptyStyle;
    function CreateEmptyCellSummmary() {
        return {
            Sum: null,
            Average: null,
            Median: null,
            Distinct: null,
            Max: null,
            Min: null,
            Count: null,
            Only: null,
            VWAP: null
        };
    }
    ObjectFactory.CreateEmptyCellSummmary = CreateEmptyCellSummmary;
})(ObjectFactory = exports.ObjectFactory || (exports.ObjectFactory = {}));
