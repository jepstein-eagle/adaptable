"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/// <reference path="../../typings/.d.ts" />
const PanelWithRow_1 = require("./Panels/PanelWithRow");
const react_bootstrap_1 = require("react-bootstrap");
const StyleConstants = require("../../Core/Constants/StyleConstants");
class AdaptableObjectCollection extends React.Component {
    render() {
        let allowOverflow = this.props.allowOverflow ? "visible" : "auto";
        let bsStyle = (this.props.bsStyle) ? this.props.bsStyle : "info";
        let className = (this.props.reducedPanel == true) ? "ab_object_list_item_small" : "ab_object_list_item";
        let bsSize = (this.props.bsSize) ? this.props.bsSize : "small";
        return React.createElement("div", { className: this.props.cssClassName + StyleConstants.ITEMS_TABLE },
            React.createElement(PanelWithRow_1.PanelWithRow, { cssClassName: this.props.cssClassName, colItems: this.props.colItems, bsStyle: bsStyle, bsSize: bsSize }),
            React.createElement("div", { className: this.props.cssClassName + StyleConstants.ITEMS_TABLE_BODY },
                React.createElement(react_bootstrap_1.ListGroup, { className: className, style: { overflowY: allowOverflow } }, this.props.items)));
    }
}
exports.AdaptableObjectCollection = AdaptableObjectCollection;
