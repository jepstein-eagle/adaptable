"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const Helper_1 = require("../../Core/Helpers/Helper");
const AlertWizard_1 = require("./Wizard/AlertWizard");
const AlertRedux = require("../../Redux/ActionsReducers/AlertRedux");
const ObjectFactory_1 = require("../../Core/ObjectFactory");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const StrategyNames = require("../../Core/Constants/StrategyNames");
const StrategyHeader_1 = require("../Components/StrategySummary/StrategyHeader");
const StrategyDetail_1 = require("../Components/StrategySummary/StrategyDetail");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Core/Constants/StyleConstants");
class AlertSummaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    render() {
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__Alert";
        let strategySummaries = [];
        // title row
        let titleRow = React.createElement(StrategyHeader_1.StrategyHeader, { key: StrategyNames.AlertStrategyName, cssClassName: this.props.cssClassName, StrategyId: StrategyIds.AlertStrategyId, StrategySummary: Helper_1.Helper.ReturnItemCount(this.props.Alerts.filter(item => item.ColumnId == this.props.SummarisedColumn.ColumnId), StrategyNames.AlertStrategyName), onNew: () => this.onNew(), NewButtonTooltip: StrategyNames.AlertStrategyName });
        strategySummaries.push(titleRow);
        // existing items
        this.props.Alerts.map((item, index) => {
            if (item.ColumnId == this.props.SummarisedColumn.ColumnId) {
                let detailRow = React.createElement(StrategyDetail_1.StrategyDetail, { cssClassName: this.props.cssClassName, key: "CV" + index, Item1: "something here?", Item2: item.Description, ConfigEnity: item, EntityName: StrategyNames.AlertStrategyName, showShare: this.props.TeamSharingActivated, onEdit: () => this.onEdit(index, item), onShare: () => this.props.onShare(item), onDelete: AlertRedux.AlertDefinitionDelete(index) });
                strategySummaries.push(detailRow);
            }
        });
        return React.createElement("div", null,
            strategySummaries,
            this.state.EditedAdaptableBlotterObject &&
                React.createElement(AlertWizard_1.AlertWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() }));
    }
    onNew() {
        let configEntity = ObjectFactory_1.ObjectFactory.CreateEmptyAlertDefinition();
        configEntity.ColumnId = this.props.SummarisedColumn.ColumnId;
        this.setState({ EditedAdaptableBlotterObject: configEntity, WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: -1 });
    }
    onEdit(index, Alert) {
        this.setState({ EditedAdaptableBlotterObject: Helper_1.Helper.cloneObject(Alert), WizardStartIndex: 1, EditedAdaptableBlotterObjectIndex: index });
    }
    onCloseWizard() {
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        this.props.onAddUpdateAlert(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        //  let alertDefinition = this.state.EditedAdaptableBlotterObject as IAlertDefinition
        return true;
    }
}
exports.AlertSummaryComponent = AlertSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        Columns: state.Grid.Columns,
        Alerts: state.Alert.AlertDefinitions,
        UserFilters: state.Filter.UserFilters,
        SystemFilters: state.Filter.SystemFilters
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUpdateAlert: (index, Alert) => dispatch(AlertRedux.AlertDefinitionAddUpdate(index, Alert)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyIds.AlertStrategyId))
    };
}
exports.AlertSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AlertSummaryComponent);
