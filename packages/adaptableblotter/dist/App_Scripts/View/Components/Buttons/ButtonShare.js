"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ButtonBase_1 = require("./ButtonBase");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
class ButtonShare extends React.Component {
    render() {
        return React.createElement(ButtonBase_1.ButtonBase, { ToolTipAndText: "Share", bsStyle: 'warning', bsSize: this.props.size, 
            //ConfigEntity={this.props.ConfigEntity}
            glyph: "share", onClick: () => this.props.onClick(), overrideDisableButton: this.props.overrideDisableButton, overrideTooltip: this.props.overrideTooltip, style: this.props.style, DisplayMode: this.props.DisplayMode, overrideText: this.props.overrideText, cssClassName: this.props.cssClassName + StyleConstants.SHARE_BUTTON, showDefaultStyle: this.props.showDefaultStyle });
    }
}
exports.ButtonShare = ButtonShare;
