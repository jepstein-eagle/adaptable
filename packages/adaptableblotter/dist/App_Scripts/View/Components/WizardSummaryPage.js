"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WizardSummaryRow_1 = require("./WizardSummaryRow");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableObjectCollection_1 = require("./AdaptableObjectCollection");
class WizardSummaryPage extends React.Component {
    render() {
        let colItems = [
            { Content: "Property", Size: 4 },
            { Content: "Value", Size: 8 },
        ];
        let summaryRows = [];
        this.props.KeyValuePairs.forEach((kvp, index) => {
            summaryRows.push(React.createElement(WizardSummaryRow_1.WizardSummaryRow, { key: index, cssClassName: this.props.cssClassName + "__summaryrow", colItems: colItems, propertyName: kvp.Key, propertyValue: kvp.Value }));
        });
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(react_bootstrap_1.Panel, { className: this.props.cssClassName, header: this.props.header + " Summary", bsStyle: "primary" },
                React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: this.props.cssClassName, colItems: colItems, items: summaryRows, bsSize: "medium" })));
    }
}
exports.WizardSummaryPage = WizardSummaryPage;
