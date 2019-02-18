"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const UserFilterWizard_1 = require("./Wizard/UserFilterWizard");
const UserFilterRedux = require("../../Redux/ActionsReducers/UserFilterRedux");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
const StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
class UserFilterSummaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.getEmptyConfigState();
    }
    render() {
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__userfilter";
        let strategySummaries = [];
        // title row
        let titleRow = React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyConstants.UserFilterStrategyName, cssClassName: this.props.cssClassName, StrategyId: StrategyConstants.UserFilterStrategyId, StrategySummary: this.getSummary(), onNew: () => this.onNew(), NewButtonDisabled: !this.isFilterable(), NewButtonTooltip: StrategyConstants.UserFilterStrategyName, AccessLevel: this.props.AccessLevel });
        strategySummaries.push(titleRow);
        // existing items
        this.props.UserFilters.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                let detailRow = React.createElement(StrategyDetail_1.StrategyDetail, { key: "UF" + index, cssClassName: this.props.cssClassName, Item1: item.Name, Item2: this.getDescription(item), ConfigEnity: item, showShare: this.props.TeamSharingActivated, showEdit: this.isFilterable(), EntityType: StrategyConstants.UserFilterStrategyName, onEdit: () => this.onEdit(index, item), onShare: () => this.props.onShare(item), onDelete: UserFilterRedux.UserFilterDelete(item) });
                strategySummaries.push(detailRow);
            }
        });
        return React.createElement("div", null,
            strategySummaries,
            this.state.EditedAdaptableBlotterObject &&
                React.createElement(UserFilterWizard_1.UserFilterWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, SelectedColumnId: this.props.SummarisedColumn.ColumnId, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() }));
    }
    getSummary() {
        if (!this.isColumnFilterable()) {
            return "Column is not filterable";
        }
        return Helper_1.Helper.ReturnItemCount(this.props.UserFilters.filter(uf => uf.ColumnId == this.props.SummarisedColumn.ColumnId), StrategyConstants.UserFilterStrategyName);
    }
    getDescription(userFilter) {
        if (!this.isColumnFilterable()) {
            return "Column is not filterable";
        }
        return ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(userFilter.Expression, this.props.Columns);
    }
    isFilterable() {
        if (!this.isColumnFilterable()) {
            return false;
        }
        return true;
    }
    isColumnFilterable() {
        if (this.props.SummarisedColumn && !this.props.SummarisedColumn.Filterable) {
            return false;
        }
        return true;
    }
    onNew() {
        let configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyUserFilter();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(index, UserFilter) {
        this.setState({ EditedAdaptableBlotterObject: Helper_1.Helper.cloneObject(UserFilter), WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let userFilter = this.state.EditedAdaptableBlotterObject;
        this.props.onAddUpdateUserFilter(this.state.EditedAdaptableBlotterObjectIndex, userFilter);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let userFilter = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(userFilter.Name) && StringExtensions_1.StringExtensions.IsNotEmpty(userFilter.ColumnId) && ExpressionHelper_1.ExpressionHelper.IsNotEmptyOrInvalidExpression(userFilter.Expression);
    }
}
exports.UserFilterSummaryComponent = UserFilterSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters,
        Entitlements: state.Entitlements.FunctionEntitlements
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUpdateUserFilter: (index, UserFilter) => dispatch(UserFilterRedux.UserFilterAddUpdate(index, UserFilter)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.UserFilterStrategyId))
    };
}
exports.UserFilterSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(UserFilterSummaryComponent);
