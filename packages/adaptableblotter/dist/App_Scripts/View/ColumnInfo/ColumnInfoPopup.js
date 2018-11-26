"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const CustomSortSummary_1 = require("../CustomSort/CustomSortSummary");
const ConditionalStyleSummary_1 = require("../ConditionalStyle/ConditionalStyleSummary");
const CellValidationSummary_1 = require("../CellValidation/CellValidationSummary");
const UserFilterSummary_1 = require("../UserFilter/UserFilterSummary");
const ColumnFilterSummary_1 = require("../ColumnFilter/ColumnFilterSummary");
const PlusMinusSummary_1 = require("../PlusMinus/PlusMinusSummary");
const FormatColumnSummary_1 = require("../FormatColumn/FormatColumnSummary");
const FlashingCellSummary_1 = require("../FlashingCells/FlashingCellSummary");
const CalculatedColumnSummary_1 = require("../CalculatedColumn/CalculatedColumnSummary");
const Enums_1 = require("../../Core/Enums");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const react_bootstrap_1 = require("react-bootstrap");
const ColumnSelector_1 = require("../Components/Selectors/ColumnSelector");
const AdaptableBlotterForm_1 = require("../Components/Forms/AdaptableBlotterForm");
const GeneralConstants = require("../../Core/Constants/GeneralConstants");
const ArrayExtensions_1 = require("../../Core/Extensions/ArrayExtensions");
const EntitlementHelper_1 = require("../../Core/Helpers/EntitlementHelper");
const ColumnCategorySummary_1 = require("../ColumnCategory/ColumnCategorySummary");
class ColumnInfoPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { SelectedColumn: null, ShowSelector: true };
    }
    componentWillMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            this.setState({ SelectedColumn: this.props.Columns.find(c => c.ColumnId == this.props.PopupParams), ShowSelector: false });
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__columninfo";
        let infoBody = ["Displays information about a column in the grid - which Adaptable Blotter Objects it has attached."];
        let colItems = [
            { Content: "Function", Size: 3 },
            { Content: "Summary", Size: 7 },
            { Content: "", Size: 2 },
        ];
        let selectedColumnId = (this.state.SelectedColumn) ? this.state.SelectedColumn.ColumnId : null;
        let headerText = StrategyConstants.ColumnInfoStrategyName;
        let summaries = [];
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategory)) {
            summaries.push(React.createElement("div", { key: StrategyConstants.ColumnCategoryStrategyId, className: this.isStrategyReadOnly(StrategyConstants.ColumnCategoryStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(ColumnCategorySummary_1.ColumnCategorySummary, { key: StrategyConstants.ColumnChooserStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, AccessLevel: this.getAccessLevel(StrategyConstants.ColumnChooserStrategyId) })));
        }
        if (this.isStrategyVisible(StrategyConstants.CustomSortStrategyId)) {
            summaries.push(React.createElement("div", { key: StrategyConstants.CustomSortStrategyId, className: this.isStrategyReadOnly(StrategyConstants.CustomSortStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(CustomSortSummary_1.CustomSortSummary, { key: StrategyConstants.CustomSortStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Blotter.getColumnValueDisplayValuePairDistinctList, AccessLevel: this.getAccessLevel(StrategyConstants.CustomSortStrategyId) })));
        }
        if (this.isStrategyVisible(StrategyConstants.ConditionalStyleStrategyId)) {
            summaries.push(React.createElement("div", { key: StrategyConstants.ConditionalStyleStrategyId, className: this.isStrategyReadOnly(StrategyConstants.ConditionalStyleStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(ConditionalStyleSummary_1.ConditionalStyleSummary, { key: StrategyConstants.ConditionalStyleStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Blotter.getColumnValueDisplayValuePairDistinctList, AccessLevel: this.getAccessLevel(StrategyConstants.ConditionalStyleStrategyId) })));
        }
        if (this.isStrategyVisible(StrategyConstants.CellValidationStrategyId)) {
            summaries.push(React.createElement("div", { key: StrategyConstants.CellValidationStrategyId, className: this.isStrategyReadOnly(StrategyConstants.CellValidationStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(CellValidationSummary_1.CellValidationSummary, { key: StrategyConstants.CellValidationStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Blotter.getColumnValueDisplayValuePairDistinctList, AccessLevel: this.getAccessLevel(StrategyConstants.CellValidationStrategyId) })));
        }
        if (this.isStrategyVisible(StrategyConstants.UserFilterStrategyId)) {
            summaries.push(React.createElement("div", { key: StrategyConstants.UserFilterStrategyId, className: this.isStrategyReadOnly(StrategyConstants.UserFilterStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(UserFilterSummary_1.UserFilterSummary, { key: StrategyConstants.UserFilterStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Blotter.getColumnValueDisplayValuePairDistinctList, AccessLevel: this.getAccessLevel(StrategyConstants.UserFilterStrategyId), Blotter: this.props.Blotter })));
        }
        if (this.isStrategyVisible(StrategyConstants.ColumnFilterStrategyId)) {
            summaries.push(React.createElement("div", { key: StrategyConstants.ColumnFilterStrategyId, className: this.isStrategyReadOnly(StrategyConstants.ColumnFilterStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(ColumnFilterSummary_1.ColumnFilterSummary, { key: StrategyConstants.ColumnFilterStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Blotter.getColumnValueDisplayValuePairDistinctList, AccessLevel: this.getAccessLevel(StrategyConstants.ColumnFilterStrategyId) })));
        }
        if (this.isStrategyVisible(StrategyConstants.FormatColumnStrategyId)) {
            summaries.push(React.createElement("div", { key: StrategyConstants.FormatColumnStrategyId, className: this.isStrategyReadOnly(StrategyConstants.FormatColumnStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(FormatColumnSummary_1.FormatColumnSummary, { key: StrategyConstants.FormatColumnStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Blotter.getColumnValueDisplayValuePairDistinctList, AccessLevel: this.getAccessLevel(StrategyConstants.FormatColumnStrategyId) })));
        }
        if (this.state.SelectedColumn) {
            if (this.isStrategyVisible(StrategyConstants.PlusMinusStrategyId) && this.state.SelectedColumn.DataType == Enums_1.DataType.Number) {
                summaries.push(React.createElement("div", { key: StrategyConstants.PlusMinusStrategyId, className: this.isStrategyReadOnly(StrategyConstants.PlusMinusStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                    React.createElement(PlusMinusSummary_1.PlusMinusSummary, { key: StrategyConstants.PlusMinusStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Blotter.getColumnValueDisplayValuePairDistinctList, AccessLevel: this.getAccessLevel(StrategyConstants.PlusMinusStrategyId) })));
            }
            if (this.isStrategyVisible(StrategyConstants.FlashingCellsStrategyId) && this.state.SelectedColumn.DataType == Enums_1.DataType.Number) {
                summaries.push(React.createElement("div", { key: StrategyConstants.FlashingCellsStrategyId, className: this.isStrategyReadOnly(StrategyConstants.FlashingCellsStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                    React.createElement(FlashingCellSummary_1.FlashingCellSummary, { key: StrategyConstants.FlashingCellsStrategyId, SummarisedColumn: this.state.SelectedColumn, AccessLevel: this.getAccessLevel(StrategyConstants.FlashingCellsStrategyId) })));
            }
            if (this.isStrategyVisible(StrategyConstants.CalculatedColumnStrategyId) && this.props.CalculatedColumns.findIndex(c => c.ColumnId == this.state.SelectedColumn.ColumnId) != -1) {
                summaries.push(React.createElement("div", { key: StrategyConstants.CalculatedColumnStrategyId, className: this.isStrategyReadOnly(StrategyConstants.CalculatedColumnStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                    React.createElement(CalculatedColumnSummary_1.CalculatedColumnSummary, { key: StrategyConstants.CalculatedColumnStrategyId, SummarisedColumn: this.state.SelectedColumn, AccessLevel: this.getAccessLevel(StrategyConstants.CalculatedColumnStrategyId) })));
            }
            headerText = headerText + ": " + this.state.SelectedColumn.FriendlyName;
        }
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: headerText, bsStyle: "primary", glyphicon: StrategyConstants.ColumnInfoGlyph, infoBody: infoBody },
                this.state.ShowSelector &&
                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                        React.createElement(react_bootstrap_1.FormGroup, { controlId: "searchName" },
                            React.createElement(react_bootstrap_1.Row, null,
                                React.createElement(react_bootstrap_1.Col, { xs: 2, componentClass: react_bootstrap_1.ControlLabel }, "Column: "),
                                React.createElement(react_bootstrap_1.Col, { xs: 8 },
                                    React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [selectedColumnId], ColumnList: this.props.Columns, onColumnChange: columns => this.onColumnSelectedChanged(columns), SelectionMode: Enums_1.SelectionMode.Single })),
                                React.createElement(react_bootstrap_1.Col, { xs: 2 },
                                    ' ',
                                    " ")))),
                this.state.SelectedColumn &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: summaries, reducedPanel: this.state.ShowSelector })));
    }
    onColumnSelectedChanged(columns) {
        this.setState({ SelectedColumn: columns.length > 0 ? columns[0] : null });
    }
    isStrategyVisible(strategyId) {
        return this.getAccessLevel(strategyId) == Enums_1.AccessLevel.Full;
    }
    isStrategyReadOnly(strategyId) {
        return this.getAccessLevel(strategyId) == Enums_1.AccessLevel.ReadOnly;
    }
    getAccessLevel(strategyId) {
        return EntitlementHelper_1.EntitlementHelper.getEntitlementAccessLevelForStrategy(this.props.FunctionEntitlements, strategyId);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
        ColumnCategory: state.ColumnCategory.ColumnCategories,
        FunctionEntitlements: state.Entitlements.FunctionEntitlements
    };
}
function mapDispatchToProps(dispatch) {
    return {};
}
exports.ColumnInfoPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnInfoPopupComponent);
