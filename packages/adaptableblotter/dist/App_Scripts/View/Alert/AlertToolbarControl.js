"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
const AdaptablePopover_1 = require("../AdaptablePopover");
const Enums_1 = require("../../Utilities/Enums");
const AlertsPanel_1 = require("./AlertsPanel");
class AlertToolbarControlComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ShowMessage: false,
            Alerts: this.props.Alerts
        };
    }
    componentDidUpdate() {
        if (this.state.Alerts.length != this.props.Alerts.length) {
            this.setState({ ShowMessage: true, Alerts: this.props.Alerts });
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__Alert";
        let alertsPanel = React.createElement(AlertsPanel_1.AlertsPanel, { cssClassName: cssClassName, Alerts: this.props.Alerts, ShowPanel: true, ShowHeader: false, onClearAlert: this.props.onDeleteAlert, onRender: () => this.setState({ ShowMessage: false }), onClearAllAlerts: this.props.onDeleteAllAlert });
        let collapsedText = this.props.Alerts.length == 0 ?
            "0 Alerts" :
            this.props.Alerts.length == 1 ?
                "1 Alert" :
                this.props.Alerts.length + " Alerts";
        let formControlStyle = (this.props.DashboardSize == 'xsmall') ? smallFormControlStyle : standardFormControlStyle;
        let labelStyle = (this.props.UseSingleColourForButtons) ? 'default' : 'success';
        let content = React.createElement("span", null,
            React.createElement(react_bootstrap_1.FormControl, { bsSize: this.props.DashboardSize, style: formControlStyle, value: collapsedText, disabled: true, type: "string" }),
            ' ',
            this.state.ShowMessage &&
                React.createElement(react_bootstrap_1.Label, { bsStyle: labelStyle }, "New"),
            ' ',
            this.props.Alerts.length > 0 &&
                React.createElement("span", { style: { marginLeft: "3px" } },
                    React.createElement(AdaptablePopover_1.AdaptablePopover, { showDefaultStyle: this.props.UseSingleColourForButtons, size: this.props.DashboardSize, cssClassName: cssClassName, headerText: "", tooltipText: "Alerts", bodyText: [alertsPanel], MessageType: this.getMessageType(), useButton: true, triggerAction: "click" })));
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, headerText: StrategyConstants.AlertStrategyName, glyphicon: StrategyConstants.AlertGlyph, onClose: () => this.props.onClose(StrategyConstants.AlertStrategyId), onConfigure: () => this.props.onConfigure() }, content);
    }
    getMessageType() {
        if (this.props.Alerts.find(a => a.MessageType == Enums_1.MessageType.Error) != null) {
            return Enums_1.MessageType.Error;
        }
        if (this.props.Alerts.find(a => a.MessageType == Enums_1.MessageType.Warning) != null) {
            return Enums_1.MessageType.Warning;
        }
        return Enums_1.MessageType.Info;
    }
}
function mapStateToProps(state, ownProps) {
    return {
        AlertDefinitions: state.Alert.AlertDefinitions,
        Alerts: state.System.Alerts,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onDeleteAlert: (index) => dispatch(SystemRedux.SystemAlertDelete(index)),
        onDeleteAllAlert: () => dispatch(SystemRedux.SystemAlertDeleteAll()),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.AlertStrategyId, ScreenPopups.AlertPopup))
    };
}
exports.AlertToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AlertToolbarControlComponent);
let smallFormControlStyle = {
    'fontSize': 'xsmall',
    'height': '22px',
    'width': '80px'
};
let standardFormControlStyle = {
    'width': '80px'
};
