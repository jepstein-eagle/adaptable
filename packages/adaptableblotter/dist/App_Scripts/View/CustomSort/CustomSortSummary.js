"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const Helper_1 = require("../../Core/Helpers/Helper");
const CustomSortWizard_1 = require("./Wizard/CustomSortWizard");
const CustomSortRedux = require("../../Redux/ActionsReducers/CustomSortRedux");
const ObjectFactory_1 = require("../../Core/ObjectFactory");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const StrategyNames = require("../../Core/Constants/StrategyNames");
const StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
const StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
const StrategyProfile_1 = require("../Components/StrategyProfile");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const ArrayExtensions_1 = require("../../Core/Extensions/ArrayExtensions");
class CustomSortSummaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    render() {
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__customsort";
        let customSort = this.props.CustomSorts.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId);
        let noCustomSort = customSort == null;
        let customSortRow;
        if (!this.props.SummarisedColumn.Sortable) {
            customSortRow = React.createElement(StrategyHeader_1.StrategyHeader, { cssClassName: this.props.cssClassName, key: StrategyNames.CustomSortStrategyName, StrategyId: StrategyIds.CustomSortStrategyId, StrategySummary: "Column is not sortable", NewButtonDisabled: true, onNew: () => this.onNew(), NewButtonTooltip: StrategyNames.CustomSortStrategyName });
        }
        else if (noCustomSort) {
            // title row
            customSortRow = React.createElement(StrategyHeader_1.StrategyHeader, { cssClassName: this.props.cssClassName, key: StrategyNames.CustomSortStrategyName, StrategyId: StrategyIds.CustomSortStrategyId, StrategySummary: "No Custom Sort Set", onNew: () => this.onNew(), NewButtonTooltip: StrategyNames.CustomSortStrategyName });
        }
        else {
            customSortRow = React.createElement(StrategyDetail_1.StrategyDetail, { cssClassName: this.props.cssClassName, key: StrategyNames.CustomSortStrategyName, Item1: React.createElement(StrategyProfile_1.StrategyProfile, { cssClassName: this.props.cssClassName, StrategyId: StrategyIds.CustomSortStrategyId }), Item2: customSort.SortedValues.join(', '), ConfigEnity: customSort, EntityName: StrategyNames.CustomSortStrategyName, onEdit: () => this.onEdit(customSort), onShare: () => this.props.onShare(customSort), showShare: this.props.TeamSharingActivated, onDelete: CustomSortRedux.CustomSortDelete(customSort), showBold: true });
        }
        return React.createElement("div", null,
            customSortRow,
            this.state.EditedAdaptableBlotterObject &&
                React.createElement(CustomSortWizard_1.CustomSortWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: this.props.CustomSorts, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() }));
    }
    onNew() {
        let configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyCustomSort();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1 });
    }
    onEdit(customSort) {
        this.setState({ EditedAdaptableBlotterObject: Helper_1.Helper.cloneObject(customSort), WizardStartIndex: 1 });
    }
    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        let customSort = this.state.EditedAdaptableBlotterObject;
        if (this.props.CustomSorts.find(x => x.ColumnId == customSort.ColumnId)) {
            this.props.onEditCustomSort(customSort);
        }
        else {
            this.props.onAddCustomSort(customSort);
        }
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let customSort = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(customSort.ColumnId) && ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(customSort.SortedValues);
    }
}
exports.CustomSortSummaryComponent = CustomSortSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        CustomSorts: state.CustomSort.CustomSorts
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddCustomSort: (customSort) => dispatch(CustomSortRedux.CustomSortAdd(customSort)),
        onEditCustomSort: (customSort) => dispatch(CustomSortRedux.CustomSortEdit(customSort)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.CustomSortStrategyId))
    };
}
exports.CustomSortSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CustomSortSummaryComponent);
