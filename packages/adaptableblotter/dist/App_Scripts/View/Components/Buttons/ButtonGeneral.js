"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ButtonBase_1 = require("./ButtonBase");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
class ButtonGeneral extends React.Component {
    render() {
        return React.createElement(ButtonBase_1.ButtonBase, { ToolTipAndText: "", bsStyle: this.props.bsStyle, bsSize: this.props.size, glyph: this.props.glyph, onClick: () => this.props.onClick(), overrideDisableButton: this.props.overrideDisableButton, overrideTooltip: this.props.overrideTooltip, style: this.props.style, DisplayMode: this.props.DisplayMode, overrideText: this.props.overrideText, cssClassName: this.props.cssClassName + StyleConstants.NEW_BUTTON, hideToolTip: this.props.hideToolTip });
    }
}
exports.ButtonGeneral = ButtonGeneral;
