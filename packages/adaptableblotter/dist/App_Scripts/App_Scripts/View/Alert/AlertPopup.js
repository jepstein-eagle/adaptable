"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const AlertRedux = require("../../Redux/ActionsReducers/AlertRedux");
const TeamSharingRedux = require("../../Redux/ActionsReducers/TeamSharingRedux");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const AlertWizard_1 = require("./Wizard/AlertWizard");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const AlertEntityRow_1 = require("./AlertEntityRow");
const UIHelper_1 = require("../UIHelper");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
class AlertPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let arrayParams = this.props.PopupParams.split("|");
            if (arrayParams.length == 2 && arrayParams[0] == "New") {
                let cellValitdation = ObjectFactory_1.ObjectFactory.CreateEmptyAlertDefinition();
                cellValitdation.ColumnId = arrayParams[1];
                this.setState({ EditedAdaptableBlotterObject: cellValitdation, EditedAdaptableBlotterObjectIndex: -1, WizardStartIndex: 1 });
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__Alert";
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__Alert";
        let infoBody = ["Alert Definitions define which changes to the source data will trigger an Alert.", React.createElement("br", null), React.createElement("br", null),
            "An Alert will appear either as a popup or in the alerts container."];
        let colItems = [
            { Content: "Alert Definition", Size: 4 },
            { Content: "Type", Size: 2 },
            { Content: "Expression", Size: 4 },
            { Content: "", Size: 2 },
        ];
        let AlertItems = this.props.AlertDefinitions.map((x, index) => {
            let column = ColumnHelper_1.ColumnHelper.getColumnFromId(x.ColumnId, this.props.Columns);
            return React.createElement(AlertEntityRow_1.AlertEntityRow, { key: index, cssClassName: cssClassName, colItems: colItems, AdaptableBlotterObject: x, Column: column, Columns: this.props.Columns, UserFilters: this.props.UserFilters, Index: index, onEdit: (index, x) => this.onEdit(index, x), onShare: () => this.props.onShare(x), TeamSharingActivated: this.props.TeamSharingActivated, onDeleteConfirm: AlertRedux.AlertDefinitionDelete(index), onChangeMessageType: (index, x) => this.onMessageTypeChanged(index, x) });
        });
        let newButton = React.createElement(ButtonNew_1.ButtonNew, { cssClassName: cssClassName, onClick: () => this.createAlert(), overrideTooltip: "Create Alert", DisplayMode: "Glyph+Text", size: "small", AccessLevel: this.props.AccessLevel });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyConstants.AlertStrategyName, bsStyle: "primary", cssClassName: cssClassName, button: newButton, glyphicon: StrategyConstants.AlertGlyph, infoBody: infoBody },
                AlertItems.length > 0 &&
                    React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: AlertItems }),
                AlertItems.length == 0 &&
                    React.createElement(react_bootstrap_1.Well, { bsSize: "small" },
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Click 'New' to start creating alert definitions."),
                        React.createElement(react_bootstrap_1.HelpBlock, null, "An alert will be triggered whenever an edit - or external data change - matches the condition in the alert definition.")),
                this.state.EditedAdaptableBlotterObject != null &&
                    React.createElement(AlertWizard_1.AlertWizard, { cssClassName: cssWizardClassName, EditedAdaptableBlotterObject: this.state.EditedAdaptableBlotterObject, ConfigEntities: null, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: this.state.WizardStartIndex, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() })));
    }
    createAlert() {
        this.setState({ EditedAdaptableBlotterObject: ObjectFactory_1.ObjectFactory.CreateEmptyAlertDefinition(), EditedAdaptableBlotterObjectIndex: -1, WizardStartIndex: 0 });
    }
    onMessageTypeChanged(index, ActionMode) {
        this.props.onChangeMessageType(index, ActionMode);
    }
    onEdit(index, Alert) {
        this.setState({ EditedAdaptableBlotterObject: Helper_1.Helper.cloneObject(Alert), EditedAdaptableBlotterObjectIndex: index, WizardStartIndex: 1 });
    }
    onCloseWizard() {
        this.props.onClearPopupParams();
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    onFinishWizard() {
        this.props.onAddEditAlert(this.state.EditedAdaptableBlotterObjectIndex, this.state.EditedAdaptableBlotterObject);
        this.setState({ EditedAdaptableBlotterObject: null, WizardStartIndex: 0, EditedAdaptableBlotterObjectIndex: -1, });
    }
    canFinishWizard() {
        let AlertRule = this.state.EditedAdaptableBlotterObject;
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(AlertRule.ColumnId) &&
            ExpressionHelper_1.ExpressionHelper.IsEmptyOrValidExpression(AlertRule.Expression);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        AlertDefinitions: state.Alert.AlertDefinitions
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddEditAlert: (index, Alert) => dispatch(AlertRedux.AlertDefinitionAddUpdate(index, Alert)),
        onChangeMessageType: (index, MessageType) => dispatch(AlertRedux.AlertDefinitionChangeMessageType(index, MessageType)),
        onShare: (entity) => dispatch(TeamSharingRedux.TeamSharingShare(entity, StrategyConstants.AlertStrategyId))
    };
}
exports.AlertPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AlertPopupComponent);
