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
class PanelWithImage extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.PANEL_WITH_IMAGE;
        let headerRow = React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
            React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                React.createElement(react_bootstrap_1.Col, { xs: 9 },
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
                                React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "", bodyText: this.props.infoBody, MessageType: Enums_1.MessageType.Info })))),
                React.createElement(react_bootstrap_1.Col, { xs: 3 }, this.props.button && React.cloneElement(this.props.button, { style: { float: 'right' } }))));
        return React.createElement(react_bootstrap_1.Panel, { header: headerRow, className: cssClassName, style: this.props.style, bsStyle: this.props.bsStyle }, this.props.children);
    }
}
exports.PanelWithImage = PanelWithImage;
