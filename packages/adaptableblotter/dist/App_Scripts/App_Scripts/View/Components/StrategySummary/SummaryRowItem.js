"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/// <reference path="../../typings/.d.ts" />
const AdaptableObjectRow_1 = require("../AdaptableObjectRow");
class SummaryRowItem extends React.Component {
    render() {
        let colItems = [];
        colItems.push({ Size: 3, Content: this.props.SummaryItems[0] });
        colItems.push({ Size: 7, Content: this.props.SummaryItems[1] });
        colItems.push({ Size: 2, Content: this.props.SummaryItems[2] });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.SummaryRowItem = SummaryRowItem;
