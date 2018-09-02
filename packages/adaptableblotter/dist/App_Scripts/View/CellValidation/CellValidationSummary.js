"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const Helper_1 = require("../../Core/Helpers/Helper");
const CellValidationWizard_1 = require("./Wizard/CellValidationWizard");
const CellValidationRedux = require("../../Redux/ActionsReducers/CellValidationRedux");
const ObjectFactory_1 = require("../../Core/ObjectFactory");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const StrategyNames = require("../../Core/Constants/StrategyNames");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
const StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Core/Constants/StyleConstants");
class CellValidationSummaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    render() {
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__cellvalidation";
        let strategySummaries = [];
        // title row
        let titleRow = React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyNames.CellValidationStrategyName, cssClassName: this.props.cssClassName, StrategyId: StrategyIds.CellValidationStrategyId, StrategySummary: Helper_1.Helper.ReturnItemCount(this.props.CellValidations.filter(item => item.ColumnId == this.props.SummarisedColumn.ColumnId), StrategyNames.CellValidationStrategyName), onNew: () => this.onNew(), NewButtonTooltip: StrategyNames.CellValidationStrategyName });
        strategySummaries.push(titleRow);
        // existing items
        this.props.CellValidations.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                let detailRow = React.createElement(StrategyDetail_1.StrategyDetail, { cssClassName: this.props.cssClassName, key: "CV" + index, Item1: StringExtensions_1.StringExtensions.PlaceSpaceBetweenCapitalisedWords(item.ActionMode), Item2: item.Description, ConfigEnity: item, EntityName: StrategyNames.CellValidationStrategyName, showShare: this.props.TeamSharingActivated, onEdit: () => this.onEdit(index, item), onShare: () => this.props.onShare(item), onDelete: CellValidationRedux.CellValidationDelete(index) });
                strategySummaries.push(detailRow);
            }
        });
        return React.createElement("div", null,
            strategySummaries,
            this.state.EditedAdaptableBlotterObject &&
                React.createElement(CellValidationWizard_1.CellValidationWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: null, BlotterOptions: this.props.BlotterOptions, BlotterApi: this.props.BlotterApi, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, getColumnValueDisplayValuePairDistinctList: this.props.getColumnValueDisplayValuePairDistinctList, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() }));
    }
    onNew() {
        let configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyCellValidation();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(index, CellValidation) {
        this.setState({ EditedAdaptableBlotterObject: Helper_1.Helper.cloneObject(CellValidation), WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        this.props.onAddUpdateCellValidation(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let cellValidatinRule = this.state.EditedAdaptableBlotterObject;
        return true;
    }
}
exports.CellValidationSummaryComponent = CellValidationSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        CellValidations: state.CellValidation.CellValidations,
        UserFilters: state.Filter.UserFilters,
        SystemFilters: state.Filter.SystemFilters
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUpdateCellValidation: (index, CellValidation) => dispatch(CellValidationRedux.CellValidationAddUpdate(index, CellValidation)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.CellValidationStrategyId))
    };
}
exports.CellValidationSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CellValidationSummaryComponent);
