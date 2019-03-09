"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ButtonBase_1 = require("./ButtonBase");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
class ButtonEdit extends React.Component {
    render() {
        return React.createElement(ButtonBase_1.ButtonBase, { ToolTipAndText: "Edit", bsStyle: 'success', bsSize: this.props.size, glyph: "edit", onClick: () => this.props.onClick(), overrideDisableButton: this.props.overrideDisableButton, overrideTooltip: this.props.overrideTooltip, style: this.props.style, DisplayMode: this.props.DisplayMode, overrideText: this.props.overrideText, cssClassName: this.props.cssClassName + StyleConstants.EDIT_BUTTON, showDefaultStyle: this.props.showDefaultStyle });
    }
}
exports.ButtonEdit = ButtonEdit;
