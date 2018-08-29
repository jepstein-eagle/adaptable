"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const AlertRedux = require("../../Redux/ActionsReducers/AlertRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const StrategyGlyphs = require("../../Core/Constants/StrategyGlyphs");
const StrategyNames = require("../../Core/Constants/StrategyNames");
const ScreenPopups = require("../../Core/Constants/ScreenPopups");
const AdaptablePopover_1 = require("../AdaptablePopover");
const Enums_1 = require("../../Core/Enums");
const AlertsPanel_1 = require("../Components/AlertsPanel");
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
            "No Alerts" :
            this.props.Alerts.length == 1 ?
                "1 Alert" :
                this.props.Alerts.length + " Alerts";
        let content = React.createElement("span", null,
            React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", style: { width: "80px" }, value: collapsedText, disabled: true, type: "string" }),
            ' ',
            this.state.ShowMessage &&
                React.createElement(react_bootstrap_1.Label, { bsStyle: "success" }, "New"),
            ' ',
            this.props.Alerts.length > 0 &&
                React.createElement("span", { style: { marginLeft: "3px" } },
                    React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "", tooltipText: "Alerts", bodyText: [alertsPanel], MessageType: this.getMessageType(), useButton: true, triggerAction: "click" })));
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, headerText: StrategyNames.AlertStrategyName, glyphicon: StrategyGlyphs.AlertGlyph, onClose: () => this.props.onClose(StrategyIds.AlertStrategyId), onConfigure: () => this.props.onConfigure(this.props.IsReadOnly) }, content);
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
        Alerts: state.Alert.Alerts,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onDeleteAlert: (index) => dispatch(AlertRedux.AlertDelete(index)),
        onDeleteAllAlert: () => dispatch(AlertRedux.AlertDeleteAll()),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: (isReadOnly) => dispatch(PopupRedux.PopupShowScreen(ScreenPopups.AlertPopup, isReadOnly))
    };
}
exports.AlertToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AlertToolbarControlComponent);
