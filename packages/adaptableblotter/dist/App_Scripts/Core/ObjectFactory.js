"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressionHelper_1 = require("./Helpers/ExpressionHelper");
const Enums_1 = require("./Enums");
const ColumnHelper_1 = require("./Helpers/ColumnHelper");
const GeneralConstants = require("./Constants/GeneralConstants");
var ObjectFactory;
(function (ObjectFactory) {
    function CreateEmptyCustomSort() {
        return { ColumnId: "", SortedValues: [] };
    }
    ObjectFactory.CreateEmptyCustomSort = CreateEmptyCustomSort;
    function CreateEmptyChartDefinition() {
        return {
            Name: "",
            Type: Enums_1.ChartType.BarChart,
            YAxisColumn: "",
            XAxisColumn: "",
            XAxisColumnValues: [GeneralConstants.ALL_COLUMN_VALUES]
        };
    }
    ObjectFactory.CreateEmptyChartDefinition = CreateEmptyChartDefinition;
    function CreateEmptyCalculatedColumn() {
        return { ColumnId: "", ColumnExpression: "" };
    }
    ObjectFactory.CreateEmptyCalculatedColumn = CreateEmptyCalculatedColumn;
    function CreateEmptyPlusMinusRule() {
        return {
            ColumnId: "",
            IsDefaultNudge: false,
            NudgeValue: 1,
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression()
        };
    }
    ObjectFactory.CreateEmptyPlusMinusRule = CreateEmptyPlusMinusRule;
    function CreateEmptyAlertDefinition() {
        return {
            ColumnId: "",
            Range: {
                Operator: Enums_1.LeafExpressionOperator.None,
                Operand1: "",
                Operand2: "",
                Operand1Type: Enums_1.RangeOperandType.Column,
                Operand2Type: Enums_1.RangeOperandType.Column,
            },
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression(),
            MessageType: Enums_1.MessageType.Error,
            ShowAsPopup: true
        };
    }
    ObjectFactory.CreateEmptyAlertDefinition = CreateEmptyAlertDefinition;
    function CreateEmptyAdvancedSearch() {
        return {
            Name: "",
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression()
        };
    }
    ObjectFactory.CreateEmptyAdvancedSearch = CreateEmptyAdvancedSearch;
    function CreateEmptyRange() {
        return {
            Operator: Enums_1.LeafExpressionOperator.Unknown,
            Operand1: "",
            Operand2: "",
            Operand1Type: Enums_1.RangeOperandType.Value,
            Operand2Type: Enums_1.RangeOperandType.Value
        };
    }
    ObjectFactory.CreateEmptyRange = CreateEmptyRange;
    function CreateEmptyGridSort() {
        return {
            Column: "",
            SortOrder: Enums_1.SortOrder.Unknown
        };
    }
    ObjectFactory.CreateEmptyGridSort = CreateEmptyGridSort;
    function CreateEmptyCellValidation() {
        return {
            ActionMode: 'Stop Edit',
            ColumnId: "",
            Range: {
                Operator: Enums_1.LeafExpressionOperator.None,
                Operand1: "",
                Operand2: "",
                Operand1Type: Enums_1.RangeOperandType.Column,
                Operand2Type: Enums_1.RangeOperandType.Column,
            },
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression(),
            Description: ""
        };
    }
    ObjectFactory.CreateEmptyCellValidation = CreateEmptyCellValidation;
    function CreateEmptyUserFilter() {
        return {
            Name: "",
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression(),
            ColumnId: ""
        };
    }
    ObjectFactory.CreateEmptyUserFilter = CreateEmptyUserFilter;
    function CreateEmptyReport() {
        return {
            Name: "",
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression(),
            Columns: [],
            ReportColumnScope: Enums_1.ReportColumnScope.AllColumns,
            ReportRowScope: Enums_1.ReportRowScope.ExpressionRows
        };
    }
    ObjectFactory.CreateEmptyReport = CreateEmptyReport;
    function CreateDefaultFlashingCell(column) {
        return {
            IsLive: false,
            ColumnId: column.ColumnId,
            FlashingCellDuration: 500,
            UpColor: '#008000', DownColor: '#FF0000'
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
    function CreateCellValidationMessage(CellValidation, blotter, showIntro = true) {
        let columns = blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let userFilters = blotter.AdaptableBlotterStore.TheStore.getState().UserFilter.UserFilters;
        let columnFriendlyName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(CellValidation.ColumnId, columns);
        let expressionDescription = (ExpressionHelper_1.ExpressionHelper.IsNotEmptyExpression(CellValidation.Expression)) ?
            " when " + ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, columns) :
            "";
        return (columnFriendlyName + ": " + CellValidation.Description + expressionDescription);
    }
    ObjectFactory.CreateCellValidationMessage = CreateCellValidationMessage;
    function CreateEmptyConditionalStyle() {
        return {
            ColumnId: "",
            Style: CreateEmptyStyle(),
            ConditionalStyleScope: Enums_1.ConditionalStyleScope.Row,
            Expression: ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression()
        };
    }
    ObjectFactory.CreateEmptyConditionalStyle = CreateEmptyConditionalStyle;
    function CreateEmptyFormatColumn() {
        return {
            ColumnId: "",
            Style: CreateEmptyStyle()
        };
    }
    ObjectFactory.CreateEmptyFormatColumn = CreateEmptyFormatColumn;
    function CreateEmptyFreeTextColumn() {
        return {
            ColumnId: "",
            DefaultValue: "",
            StoredValues: null
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
    function CreateCellValidationRule(columnId, range, actionMode, description, expression) {
        return {
            ColumnId: columnId,
            Range: range,
            ActionMode: actionMode,
            Description: description,
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
            ClassName: ""
        };
    }
    ObjectFactory.CreateEmptyStyle = CreateEmptyStyle;
    function CreateEmptySelectedCellSummmary() {
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
    ObjectFactory.CreateEmptySelectedCellSummmary = CreateEmptySelectedCellSummmary;
})(ObjectFactory = exports.ObjectFactory || (exports.ObjectFactory = {}));
