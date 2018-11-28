"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableObjectRow_1 = require("./AdaptableObjectRow");
class WizardSummaryRow extends React.Component {
    render() {
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = this.props.propertyName;
        colItems[1].Content = this.props.propertyValue;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems, fontSize: "medium" });
    }
}
exports.WizardSummaryRow = WizardSummaryRow;
