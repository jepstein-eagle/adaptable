"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/// <reference path="../../typings/.d.ts" />
const react_bootstrap_1 = require("react-bootstrap");
const StyleConstants = require("../../Core/Constants/StyleConstants");
class AdaptableObjectRow extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.LIST_GROUP_ITEM;
        let fontSize = this.props.fontSize ? this.props.fontSize : "small";
        let colItems = this.props.colItems.map((colItem, index) => {
            return React.createElement(react_bootstrap_1.Col, { key: index, xs: colItem.Size },
                React.createElement("span", { style: { fontSize: fontSize } }, colItem.Content));
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement("li", { className: "list-group-item", onClick: () => {
                    // no implementation: not sure if this is actually needed...
                } },
                React.createElement(react_bootstrap_1.Row, { style: { display: "flex", alignItems: "center", overflowY: 'visible' } }, colItems)));
    }
}
exports.AdaptableObjectRow = AdaptableObjectRow;
