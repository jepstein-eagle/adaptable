"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const ConditionalStyleWizard_1 = require("./Wizard/ConditionalStyleWizard");
const ConditionalStyleRedux = require("../../Redux/ActionsReducers/ConditionalStyleRedux");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const Enums_1 = require("../../Utilities/Enums");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const StyleVisualItem_1 = require("../Components/StyleVisualItem");
const StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
const StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
class ConditionalStyleSummaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.getEmptyConfigState();
    }
    render() {
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__conditionalstyle";
        let strategySummaries = [];
        // title row
        let titleRow = React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.ConditionalStyleStrategyName, cssClassName: this.props.cssClassName, StrategyId: StrategyConstants.ConditionalStyleStrategyId, StrategySummary: Helper_1.Helper.ReturnItemCount(this.props.ConditionalStyles.filter(item => item.ColumnId == this.props.SummarisedColumn.ColumnId && item.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column), StrategyConstants.ConditionalStyleStrategyName), onNew: () => this.onNew(), NewButtonTooltip: StrategyConstants.ConditionalStyleStrategyName, AccessLevel: this.props.AccessLevel });
        strategySummaries.push(titleRow);
        // existing items
        this.props.ConditionalStyles.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId && item.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column) {
                let detailRow = React.createElement(StrategyDetail_1.StrategyDetail, { cssClassName: this.props.cssClassName, key: "CS" + index, Item1: React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: item.Style }), Item2: ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(item.Expression, this.props.Columns), ConfigEnity: item, EntityType: StrategyConstants.ConditionalStyleStrategyName, showShare: this.props.TeamSharingActivated, onEdit: () => this.onEdit(index, item), onShare: () => this.props.onShare(item), onDelete: ConditionalStyleRedux.ConditionalStyleDelete(index, item) });
                strategySummaries.push(detailRow);
            }
        });
        return React.createElement("div", null,
            strategySummaries,
            this.state.EditedAdaptableBlotterObject &&
                React.createElement(ConditionalStyleWizard_1.ConditionalStyleWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames, ColumnCategories: this.props.ColumnCategories, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() }));
    }
    onNew() {
        let configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyConditionalStyle();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        configEntity.ConditionalStyleScope = Enums_1.ConditionalStyleScope.Column;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(index, ConditionalStyle) {
        this.setState({ EditedAdaptableBlotterObject: Helper_1.Helper.cloneObject(ConditionalStyle), WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        this.props.onAddUpdateConditionalStyle(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let conditionalStyle = this.state.EditedAdaptableBlotterObject;
        return (conditionalStyle.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Row || StringExtensions_1.StringExtensions.IsNotNullOrEmpty(conditionalStyle.ColumnId)) &&
            ExpressionHelper_1.ExpressionHelper.IsNotEmptyOrInvalidExpression(conditionalStyle.Expression) &&
            UIHelper_1.UIHelper.IsNotEmptyStyle(conditionalStyle.Style);
    }
}
exports.ConditionalStyleSummaryComponent = ConditionalStyleSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        ConditionalStyles: state.ConditionalStyle.ConditionalStyles,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        Entitlements: state.Entitlements.FunctionEntitlements,
        ColorPalette: state.UserInterface.ColorPalette,
        StyleClassNames: state.UserInterface.StyleClassNames,
        ColumnCategories: state.ColumnCategory.ColumnCategories
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUpdateConditionalStyle: (index, conditionalStyle) => dispatch(ConditionalStyleRedux.ConditionalStyleAddUpdate(index, conditionalStyle)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ConditionalStyleStrategyId))
    };
}
exports.ConditionalStyleSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ConditionalStyleSummaryComponent);
