"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const StrategyNames = require("../../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../../Core/Constants/StrategyGlyphs");
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
        let headerText = StrategyNames.ColumnInfoStrategyName;
        let summaries = [];
        if (this.isStrategyVisible(StrategyIds.CustomSortStrategyId)) {
            summaries.push(React.createElement("div", { key: StrategyIds.CustomSortStrategyId, className: this.isStrategyReadOnly(StrategyIds.CustomSortStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(CustomSortSummary_1.CustomSortSummary, { key: StrategyIds.CustomSortStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Blotter.getColumnValueDisplayValuePairDistinctList })));
        }
        if (this.isStrategyVisible(StrategyIds.ConditionalStyleStrategyId)) {
            summaries.push(React.createElement("div", { key: StrategyIds.ConditionalStyleStrategyId, className: this.isStrategyReadOnly(StrategyIds.ConditionalStyleStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(ConditionalStyleSummary_1.ConditionalStyleSummary, { key: StrategyIds.ConditionalStyleStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Blotter.getColumnValueDisplayValuePairDistinctList })));
        }
        if (this.isStrategyVisible(StrategyIds.CellValidationStrategyId)) {
            summaries.push(React.createElement("div", { key: StrategyIds.CellValidationStrategyId, className: this.isStrategyReadOnly(StrategyIds.CellValidationStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(CellValidationSummary_1.CellValidationSummary, { key: StrategyIds.CellValidationStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Blotter.getColumnValueDisplayValuePairDistinctList })));
        }
        if (this.isStrategyVisible(StrategyIds.UserFilterStrategyId)) {
            summaries.push(React.createElement("div", { key: StrategyIds.UserFilterStrategyId, className: this.isStrategyReadOnly(StrategyIds.UserFilterStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(UserFilterSummary_1.UserFilterSummary, { key: StrategyIds.UserFilterStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Blotter.getColumnValueDisplayValuePairDistinctList })));
        }
        if (this.isStrategyVisible(StrategyIds.ColumnFilterStrategyId)) {
            summaries.push(React.createElement("div", { key: StrategyIds.ColumnFilterStrategyId, className: this.isStrategyReadOnly(StrategyIds.ColumnFilterStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(ColumnFilterSummary_1.ColumnFilterSummary, { key: StrategyIds.ColumnFilterStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Blotter.getColumnValueDisplayValuePairDistinctList })));
        }
        if (this.isStrategyVisible(StrategyIds.FormatColumnStrategyId)) {
            summaries.push(React.createElement("div", { key: StrategyIds.FormatColumnStrategyId, className: this.isStrategyReadOnly(StrategyIds.FormatColumnStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(FormatColumnSummary_1.FormatColumnSummary, { key: StrategyIds.FormatColumnStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Blotter.getColumnValueDisplayValuePairDistinctList })));
        }
        if (this.state.SelectedColumn) {
            if (this.isStrategyVisible(StrategyIds.PlusMinusStrategyId) && this.state.SelectedColumn.DataType == Enums_1.DataType.Number) {
                summaries.push(React.createElement("div", { key: StrategyIds.PlusMinusStrategyId, className: this.isStrategyReadOnly(StrategyIds.PlusMinusStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                    React.createElement(PlusMinusSummary_1.PlusMinusSummary, { key: StrategyIds.PlusMinusStrategyId, SummarisedColumn: this.state.SelectedColumn, TeamSharingActivated: this.props.TeamSharingActivated, getColumnValueDisplayValuePairDistinctList: this.props.Blotter.getColumnValueDisplayValuePairDistinctList })));
            }
            if (this.isStrategyVisible(StrategyIds.FlashingCellsStrategyId) && this.state.SelectedColumn.DataType == Enums_1.DataType.Number) {
                summaries.push(React.createElement("div", { key: StrategyIds.FlashingCellsStrategyId, className: this.isStrategyReadOnly(StrategyIds.FlashingCellsStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                    React.createElement(FlashingCellSummary_1.FlashingCellSummary, { key: StrategyIds.FlashingCellsStrategyId, SummarisedColumn: this.state.SelectedColumn })));
            }
            if (this.isStrategyVisible(StrategyIds.CalculatedColumnStrategyId) && this.props.CalculatedColumns.findIndex(c => c.ColumnId == this.state.SelectedColumn.ColumnId) != -1) {
                summaries.push(React.createElement("div", { key: StrategyIds.CalculatedColumnStrategyId, className: this.isStrategyReadOnly(StrategyIds.CalculatedColumnStrategyId) ? GeneralConstants.READ_ONLY_STYLE : "" },
                    React.createElement(CalculatedColumnSummary_1.CalculatedColumnSummary, { key: StrategyIds.CalculatedColumnStrategyId, SummarisedColumn: this.state.SelectedColumn })));
            }
            headerText = headerText + ": " + this.state.SelectedColumn.FriendlyName;
        }
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: headerText, bsStyle: "primary", glyphicon: StrategyGlyphs.ColumnInfoGlyph, infoBody: infoBody },
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
    isStrategyVisible(strategyID) {
        let entitlement = this.props.FunctionEntitlements.find(x => x.FunctionName == strategyID);
        return (entitlement) ? entitlement.AccessLevel != "Hidden" : true;
    }
    isStrategyReadOnly(strategyID) {
        let entitlement = this.props.FunctionEntitlements.find(x => x.FunctionName == strategyID);
        return (entitlement) ? entitlement.AccessLevel == "ReadOnly" : false;
    }
}
function mapStateToProps(state, ownProps) {
    return {
        CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
        FunctionEntitlements: state.Entitlements.FunctionEntitlements
    };
}
function mapDispatchToProps(dispatch) {
    return {};
}
exports.ColumnInfoPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnInfoPopupComponent);
