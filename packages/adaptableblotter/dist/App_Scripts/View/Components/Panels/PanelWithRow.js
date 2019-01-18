"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableBlotterForm_1 = require("../Forms/AdaptableBlotterForm");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
//We cannot destructure this.props using the react way in typescript which is a real pain as you 
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
class PanelWithRow extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.ITEMS_TABLE_HEADER;
        let className = "ab_panel-with-button"; // this will change...
        let headerItems = this.props.colItems.map((colItem) => {
            return React.createElement(react_bootstrap_1.Col, { key: colItem.Content + colItem.Size, xs: colItem.Size }, colItem.Content);
        });
        let header = React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
            React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center", fontSize: "small" } }, headerItems));
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: header, bsSize: "small", className: "ab_no_padding_no_margin", bsStyle: this.props.bsStyle }, this.props.children));
    }
}
exports.PanelWithRow = PanelWithRow;
