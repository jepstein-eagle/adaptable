"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const ColumnCategoryWizard_1 = require("./Wizard/ColumnCategoryWizard");
const ColumnCategoryRedux = require("../../Redux/ActionsReducers/ColumnCategoryRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
const StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
const StrategyProfile_1 = require("../Components/StrategyProfile");
class ColumnCategorySummaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.getEmptyConfigState();
    }
    render() {
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__ColumnCategory";
        let ColumnCategory = this.props.ColumnCategorys.find(lk => ArrayExtensions_1.ArrayExtensions.ContainsItem(lk.ColumnIds, this.props.SummarisedColumn.ColumnId));
        let noColumnCategory = ColumnCategory == null;
        let ColumnCategoryRow;
        if (noColumnCategory) {
            ColumnCategoryRow = React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.ColumnCategoryStrategyName, cssClassName: this.props.cssClassName, StrategyId: StrategyConstants.ColumnCategoryStrategyId, StrategySummary: "None", onNew: () => this.onNew(), NewButtonTooltip: StrategyConstants.ColumnCategoryStrategyName, AccessLevel: this.props.AccessLevel });
        }
        else {
            ColumnCategoryRow = React.createElement(StrategyDetail_1.StrategyDetail, { key: StrategyConstants.ColumnCategoryStrategyName, cssClassName: this.props.cssClassName, Item1: React.createElement(StrategyProfile_1.StrategyProfile, { cssClassName: this.props.cssClassName, StrategyId: StrategyConstants.ColumnCategoryStrategyId }), Item2: ColumnCategory.ColumnCategoryId, ConfigEnity: ColumnCategory, showShare: this.props.TeamSharingActivated, EntityType: StrategyConstants.ColumnCategoryStrategyName, onEdit: () => this.onEdit(ColumnCategory), onShare: () => this.props.onShare(ColumnCategory), onDelete: ColumnCategoryRedux.ColumnCategoryDelete(ColumnCategory), showBold: true });
        }
        return React.createElement("div", null,
            ColumnCategoryRow,
            this.state.EditedAdaptableBlotterObject &&
                React.createElement(ColumnCategoryWizard_1.ColumnCategoryWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, ColumnCategorys: this.props.ColumnCategorys, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() }));
    }
    onNew() {
        let configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyColumnCategory();
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(ColumnCategory) {
        this.setState({ EditedAdaptableBlotterObject: Helper_1.Helper.cloneObject(ColumnCategory), WizardStartIndex: 1 });
    }
    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        //  this.props.onAddUpdateColumnCategory(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject as IColumnCategory);
        //  this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        //   let ColumnCategory = this.state.EditedAdaptableBlotterObject as IColumnCategory
        //   return StringExtensions.IsNotNullOrEmpty(ColumnCategory.ColumnId) &&
        //       StringExtensions.IsNotNullOrEmpty(ColumnCategory.NudgeValue.toString()) && // check its a number??
        //       (ColumnCategory.IsDefaultNudge || ExpressionHelper.IsNotEmptyOrInvalidExpression(ColumnCategory.Expression))
    }
}
exports.ColumnCategorySummaryComponent = ColumnCategorySummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        ColumnCategorys: state.ColumnCategory.ColumnCategories,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        Entitlements: state.Entitlements.FunctionEntitlements
    };
}
function mapDispatchToProps(dispatch) {
    return {
        //   onAddUpdateColumnCategory: (index: number, ColumnCategory: IColumnCategory) => dispatch(ColumnCategoryRedux.ColumnCategoryAddUpdateCondition(index, ColumnCategory)),
        onClearPopupParams: () => dispatch(PopupRedux.PopupClearParam()),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.ColumnCategoryStrategyId))
    };
}
exports.ColumnCategorySummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnCategorySummaryComponent);
