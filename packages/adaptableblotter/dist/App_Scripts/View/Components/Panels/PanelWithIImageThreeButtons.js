"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const AdaptableBlotterForm_1 = require("../Forms/AdaptableBlotterForm");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
class PanelWithImageThreeButtons extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.ITEMS_PANEL;
        let className = "ab_panel-with-button";
        if (this.props.className) {
            className += " " + this.props.className;
        }
        className += " " + "ab_panel-with-button-reduce-header-padding";
        let header = React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
            React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                React.createElement(react_bootstrap_1.Col, { xs: 4 },
                    React.createElement(react_bootstrap_1.Glyphicon, { glyph: this.props.glyphicon, className: "ab_large_right_margin_style" }),
                    this.props.header,
                    ' ',
                    this.props.infoBody != null &&
                        React.createElement("span", null,
                            React.createElement("label", null, ' '),
                            React.createElement("span", null,
                                "  ",
                                ' ',
                                " ",
                                React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "", bodyText: this.props.infoBody })))),
                React.createElement(react_bootstrap_1.Col, { xs: 8 },
                    this.props.secondButton && React.cloneElement(this.props.secondButton, { style: { float: 'right' } }),
                    this.props.thirdButton && React.cloneElement(this.props.thirdButton, { style: { float: 'right' } }),
                    this.props.firstButton && React.cloneElement(this.props.firstButton, { style: { float: 'right', marginRight: '20px' } }))));
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: header, className: className, style: this.props.style, bsStyle: this.props.bsStyle }, this.props.children));
    }
}
exports.PanelWithImageThreeButtons = PanelWithImageThreeButtons;
