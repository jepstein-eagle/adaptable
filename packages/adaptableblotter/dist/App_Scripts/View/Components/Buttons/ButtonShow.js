"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ButtonBase_1 = require("./ButtonBase");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
class ButtonShow extends React.Component {
    render() {
        return React.createElement(ButtonBase_1.ButtonBase, { ToolTipAndText: "Show", bsStyle: StyleConstants.DEFAULT_BSSTYLE, bsSize: this.props.size, glyph: "resize-full", onClick: () => this.props.onClick(), overrideDisableButton: this.props.overrideDisableButton, overrideTooltip: this.props.overrideTooltip, style: this.props.style, DisplayMode: this.props.DisplayMode, overrideText: this.props.overrideText, cssClassName: this.props.cssClassName + StyleConstants.SHOW_BUTTON, showDefaultStyle: this.props.showDefaultStyle });
    }
}
exports.ButtonShow = ButtonShow;
