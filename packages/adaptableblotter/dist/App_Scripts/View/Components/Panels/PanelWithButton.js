"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const Enums_1 = require("../../../Utilities/Enums");
const AdaptableBlotterForm_1 = require("../Forms/AdaptableBlotterForm");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
class PanelWithButton extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.ITEMS_PANEL;
        let { buttonContent } = this.props;
        let className = "ab_panel-with-button";
        if (this.props.className) {
            className += " " + this.props.className;
        }
        //  if (buttonContent || this.props.button) {
        className += " " + "ab_panel-with-button-reduce-header-padding";
        //   }
        let buttonStyle = (this.props.buttonStyle) ? this.props.buttonStyle : "default";
        let header = React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
            React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                React.createElement(react_bootstrap_1.Col, { xs: 9 },
                    this.props.glyphicon != null &&
                        React.createElement(react_bootstrap_1.Glyphicon, { glyph: this.props.glyphicon, className: "ab_large_right_margin_style" }),
                    this.props.headerText,
                    ' ',
                    this.props.infoBody != null &&
                        React.createElement("span", null,
                            React.createElement("label", null, ' '),
                            React.createElement("span", null,
                                "  ",
                                ' ',
                                " ",
                                React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: this.props.cssClassName, headerText: "", bodyText: this.props.infoBody, MessageType: Enums_1.MessageType.Info })))),
                React.createElement(react_bootstrap_1.Col, { xs: 3 },
                    buttonContent &&
                        React.createElement(react_bootstrap_1.Button, { bsSize: "small", bsStyle: buttonStyle, disabled: this.props.buttonDisabled, onClick: () => this.props.buttonClick(), style: { float: 'right' } }, buttonContent),
                    this.props.button && React.cloneElement(this.props.button, { style: { float: 'right' } }))));
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: header, className: className, style: this.props.style, bsStyle: this.props.bsStyle, bsSize: this.props.bsSize }, this.props.children));
    }
}
exports.PanelWithButton = PanelWithButton;
