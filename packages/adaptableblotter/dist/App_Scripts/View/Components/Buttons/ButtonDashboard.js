"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ButtonBase_1 = require("./ButtonBase");
const StyleConstants = require("../../../Core/Constants/StyleConstants");
class ButtonDashboard extends React.Component {
    render() {
        return React.createElement(ButtonBase_1.ButtonBase, { bsStyle: this.props.bsStyle, bsSize: this.props.bsSize, glyph: this.props.glyph, onClick: () => this.props.onClick(), overrideDisableButton: this.props.overrideDisableButton, overrideTooltip: this.props.overrideTooltip, style: this.props.style, DisplayMode: this.props.DisplayMode, overrideText: this.props.overrideText, ToolTipAndText: this.props.ToolTipAndText, cssClassName: this.props.cssClassName + StyleConstants.DASHBOARD_BUTTON });
    }
}
exports.ButtonDashboard = ButtonDashboard;
