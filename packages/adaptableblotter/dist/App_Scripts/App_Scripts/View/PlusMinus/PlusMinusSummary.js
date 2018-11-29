"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const PlusMinusWizard_1 = require("./Wizard/PlusMinusWizard");
const PlusMinusRedux = require("../../Redux/ActionsReducers/PlusMinusRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
const StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
class PlusMinusSummaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    render() {
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__plusminus";
        let strategySummaries = [];
        // title row
        let titleRow = React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.PlusMinusStrategyName, cssClassName: this.props.cssClassName, StrategyId: StrategyConstants.PlusMinusStrategyId, StrategySummary: Helper_1.Helper.ReturnItemCount(this.props.PlusMinusRules.filter(item => item.ColumnId == this.props.SummarisedColumn.ColumnId), "Plus Minus Condition"), onNew: () => this.onNew(), NewButtonTooltip: "Plus / Minus Rule", AccessLevel: this.props.AccessLevel });
        strategySummaries.push(titleRow);
        // existing items
        this.props.PlusMinusRules.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                let detailRow = React.createElement(StrategyDetail_1.StrategyDetail, { key: "PM" + index, cssClassName: this.props.cssClassName, Item1: "Nudge Value: " + item.NudgeValue, Item2: this.wrapExpressionDescription(ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(item.Expression, this.props.Columns)), ConfigEnity: item, showShare: this.props.TeamSharingActivated, EntityName: StrategyConstants.PlusMinusStrategyName, onEdit: () => this.onEdit(index, item), onShare: () => this.props.onShare(item), onDelete: PlusMinusRedux.PlusMinusDeleteCondition(index) });
                strategySummaries.push(detailRow);
            }
        });
        return React.createElement("div", null,
            strategySummaries,
            this.state.EditedAdaptableBlotterObject &&
                React.createElement(PlusMinusWizard_1.PlusMinusWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, SelectedColumnId: this.props.SummarisedColumn.ColumnId, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() }));
    }
    onNew() {
        let configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyPlusMinusRule();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(index, PlusMinus) {
        this.setState({ EditedAdaptableBlotterObject: Helper_1.Helper.cloneObject(PlusMinus), WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        this.props.onAddUpdatePlusMinus(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let plusMinus = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(plusMinus.ColumnId) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(plusMinus.NudgeValue.toString()) && // check its a number??
            (plusMinus.IsDefaultNudge || ExpressionHelper_1.ExpressionHelper.IsNotEmptyOrInvalidExpression(plusMinus.Expression));
    }
    wrapExpressionDescription(expressionDescription) {
        return (expressionDescription == "Any") ? "[Default Column Nudge Value]" : expressionDescription;
    }
}
exports.PlusMinusSummaryComponent = PlusMinusSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        PlusMinusRules: state.PlusMinus.PlusMinusRules,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        Entitlements: state.Entitlements.FunctionEntitlements
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUpdatePlusMinus: (index, PlusMinus) => dispatch(PlusMinusRedux.PlusMinusAddUpdateCondition(index, PlusMinus)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.PlusMinusStrategyId))
    };
}
exports.PlusMinusSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PlusMinusSummaryComponent);
