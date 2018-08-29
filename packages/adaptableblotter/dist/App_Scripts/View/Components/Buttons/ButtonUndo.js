"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ButtonBase_1 = require("./ButtonBase");
const StyleConstants = require("../../../Core/Constants/StyleConstants");
class ButtonUndo extends React.Component {
    render() {
        return React.createElement(ButtonBase_1.ButtonBase, { ToolTipAndText: "Undo", bsStyle: 'success', bsSize: this.props.size, ConfigEntity: this.props.ConfigEntity, glyph: "share-alt", onClick: () => this.props.onClick(), overrideDisableButton: this.props.overrideDisableButton, overrideTooltip: this.props.overrideTooltip, style: this.props.style, DisplayMode: this.props.DisplayMode, overrideText: this.props.overrideText, transformGlyph: true, cssClassName: this.props.cssClassName + StyleConstants.UNDO_BUTTON });
    }
}
exports.ButtonUndo = ButtonUndo;
