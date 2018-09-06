"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const Helper_1 = require("../../Core/Helpers/Helper");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const CalculatedColumnRedux = require("../../Redux/ActionsReducers/CalculatedColumnRedux");
const CalculatedColumnWizard_1 = require("./Wizard/CalculatedColumnWizard");
const UIHelper_1 = require("../UIHelper");
const StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
class CalculatedColumnSummaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    render() {
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__calculatedcolumn";
        let detailRow;
        let sharing = this.props.TeamSharingActivated;
        this.props.CalculatedColumns.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                detailRow =
                    React.createElement(StrategyDetail_1.StrategyDetail, { cssClassName: this.props.cssClassName, key: "UF" + index, Item1: StrategyIds.CalculatedColumnStrategyName, Item2: item.ColumnExpression, ConfigEnity: item, showShare: this.props.TeamSharingActivated, EntityName: StrategyIds.CalculatedColumnStrategyName, onEdit: () => this.onEdit(index, item), onShare: () => this.props.onShare(item), onDelete: CalculatedColumnRedux.CalculatedColumnDelete(index), showBold: true });
            }
        });
        return React.createElement("div", null,
            detailRow,
            this.state.EditedAdaptableBlotterObject &&
                React.createElement(CalculatedColumnWizard_1.CalculatedColumnWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: this.props.CalculatedColumns, Columns: this.props.Columns, ModalContainer: this.props.ModalContainer, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, GetErrorMessage: () => this.props.CalculatedColumnErrorMessage, IsExpressionValid: (expression) => this.props.IsExpressionValid(expression), Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() }));
    }
    onEdit(index, calculatedColumn) {
        this.setState({ EditedAdaptableBlotterObject: Helper_1.Helper.cloneObject(calculatedColumn), WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let calculatedColumn = Helper_1.Helper.cloneObject(this.state.EditedAdaptableBlotterObject);
        this.props.onEdit(this.state.EditedAdaptableBlotterObjectIndex, calculatedColumn);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let calculatedColumn = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(calculatedColumn.ColumnId) && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(calculatedColumn.ColumnExpression);
    }
}
exports.CalculatedColumnSummaryComponent = CalculatedColumnSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        CalculatedColumns: state.CalculatedColumn.CalculatedColumns,
        CalculatedColumnErrorMessage: state.CalculatedColumn.CalculatedColumnErrorMessage
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onEdit: (index, calculatedColumn) => dispatch(CalculatedColumnRedux.CalculatedColumnEdit(index, calculatedColumn)),
        IsExpressionValid: (expression) => dispatch(CalculatedColumnRedux.CalculatedColumnIsExpressionValid(expression))
    };
}
exports.CalculatedColumnSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CalculatedColumnSummaryComponent);
