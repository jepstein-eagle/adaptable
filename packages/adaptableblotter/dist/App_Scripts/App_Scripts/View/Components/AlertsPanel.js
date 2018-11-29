"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const UIHelper_1 = require("../UIHelper");
const ButtonClear_1 = require("./Buttons/ButtonClear");
const ButtonPreviewDelete_1 = require("./Buttons/ButtonPreviewDelete");
const PanelWithButton_1 = require("./Panels/PanelWithButton");
const Enums_1 = require("../../Utilities/Enums");
class AlertsPanel extends React.Component {
    componentWillUnmount() {
        this.props.onRender();
    }
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.ALERTS;
        let panelHeader = this.props.ShowHeader && this.props.Alerts != null ? "Alerts: " : "";
        let alerts = this.props.Alerts.map((alert, index) => {
            let alertText = React.createElement("div", { style: { maxWidth: "600px" } },
                React.createElement("div", null,
                    React.createElement(react_bootstrap_1.InputGroup, null,
                        React.createElement("span", null,
                            React.createElement(react_bootstrap_1.Label, { bsSize: "xsmall", bsStyle: UIHelper_1.UIHelper.getStyleNameByMessageType(alert.MessageType), className: "ab_medium_padding" },
                                React.createElement(react_bootstrap_1.Glyphicon, { glyph: UIHelper_1.UIHelper.getGlyphByMessageType(alert.MessageType) })),
                            ' ',
                            React.createElement("b", null, alert.Header)),
                        React.createElement(react_bootstrap_1.InputGroup.Button, null,
                            React.createElement(ButtonPreviewDelete_1.ButtonPreviewDelete, { cssClassName: this.props.cssClassName, onClick: () => this.props.onClearAlert(index), overrideTooltip: "Clear Alert", bsStyle: "default", DisplayMode: "Glyph", size: "xsmall", overrideDisableButton: false, style: { float: 'left' }, AccessLevel: Enums_1.AccessLevel.Full })))),
                React.createElement("div", null,
                    React.createElement("span", { style: { fontSize: "xsmall" } }, alert.Msg)));
            return React.createElement(react_bootstrap_1.ListGroupItem, { key: index }, alertText);
        });
        let clearAllButton = React.createElement(ButtonClear_1.ButtonClear, { cssClassName: this.props.cssClassName + " pull-right ", onClick: () => this.props.onClearAllAlerts(), bsStyle: "default", style: { margin: "5px" }, size: "xsmall", overrideText: "Clear All", DisplayMode: "Text", hideToolTip: true, AccessLevel: Enums_1.AccessLevel.Full });
        return React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: "Alerts", className: "ab_no-padding-except-top-panel ab_small-padding-panel", bsStyle: "default", button: clearAllButton },
            React.createElement(react_bootstrap_1.ListGroup, { style: { overflowY: "hidden" } }, alerts));
    }
}
exports.AlertsPanel = AlertsPanel;
