"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Utilities/Enums");
class ButtonBase extends React.Component {
    render() {
        let isDisabled;
        isDisabled = this.props.AccessLevel == Enums_1.AccessLevel.Hidden;
        if (this.props.overrideDisableButton) {
            isDisabled = true;
        }
        let text = this.props.ToolTipAndText;
        if (this.props.overrideText) {
            text = this.props.overrideText;
        }
        let tooltip = this.props.ToolTipAndText;
        if (this.props.overrideTooltip) {
            tooltip = this.props.overrideTooltip;
        }
        let hideToolTip = this.props.hideToolTip ? this.props.hideToolTip : false;
        let content;
        if (this.props.DisplayMode == "Glyph") {
            if (this.props.transformGlyph) {
                content = React.createElement(react_bootstrap_1.Glyphicon, { glyph: this.props.glyph, style: { "transform": "scale(-1, 1)" } });
            }
            else {
                content = React.createElement(react_bootstrap_1.Glyphicon, { glyph: this.props.glyph });
            }
        }
        else if (this.props.DisplayMode == "Text") {
            content = React.createElement("span", null, text);
        }
        else if (this.props.DisplayMode == "Glyph+Text") {
            content = React.createElement("div", null,
                React.createElement(react_bootstrap_1.Glyphicon, { glyph: this.props.glyph }),
                ' ',
                text);
        }
        else if (this.props.DisplayMode == "Text+Glyph") {
            content = React.createElement("div", null,
                text,
                ' ',
                React.createElement(react_bootstrap_1.Glyphicon, { glyph: this.props.glyph }));
        }
        let button = React.createElement(react_bootstrap_1.Button, { style: this.props.style, className: this.props.cssClassName, bsStyle: this.props.bsStyle, disabled: isDisabled, bsSize: this.props.bsSize, onClick: () => this.props.onClick(), onMouseDown: e => e.preventDefault() }, content);
        let buttonwithtooltip = React.createElement(react_bootstrap_1.OverlayTrigger, { overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "tooltipButton" },
                " ",
                tooltip) }, button);
        return isDisabled || hideToolTip ? button : buttonwithtooltip;
    }
}
ButtonBase.defaultProps = {
    overrideDisableButton: false,
    ToolTipAndText: "",
    bsStyle: "",
    bsSize: null,
    glyph: "",
    DisplayMode: "Glyph+Text",
    transformGlyph: false,
    cssClassName: "btn",
    AccessLevel: Enums_1.AccessLevel.Full
};
exports.ButtonBase = ButtonBase;
