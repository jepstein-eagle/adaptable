"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const AdaptableBlotterForm_1 = require("../Forms/AdaptableBlotterForm");
class PanelWithInfo extends React.Component {
    render() {
        let className = "panel-with-info";
        if (this.props.className) {
            className += " " + this.props.className;
        }
        let headerRow = React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
            React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center" } },
                React.createElement(react_bootstrap_1.Col, { xs: 12 },
                    this.props.header,
                    React.createElement("span", null,
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: this.props.cssClassName, headerText: "", bodyText: this.props.infoBody })))));
        return React.createElement(react_bootstrap_1.Panel, { header: headerRow, className: className, style: this.props.style, bsSize: this.props.bsSize, bsStyle: this.props.bsStyle }, this.props.children);
    }
}
exports.PanelWithInfo = PanelWithInfo;
