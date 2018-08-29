"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/// <reference path="../../typings/.d.ts" />
const react_bootstrap_1 = require("react-bootstrap");
const StyleConstants = require("../../Core/Constants/StyleConstants");
class WizardLegend extends React.Component {
    render() {
        let count = this.props.StepNames.length - 1;
        let stepNames = this.props.StepNames.map((s, index) => {
            let style = (s == this.props.ActiveStepName) ? "primary" : "default";
            let lastStep = (index == count);
            return React.createElement("span", { key: index },
                React.createElement(react_bootstrap_1.Label, { bsStyle: style, bsSize: "large" }, s),
                lastStep == false &&
                    React.createElement(react_bootstrap_1.Glyphicon, { style: { verticalAlign: "middle", margin: "5px", padding: "5px" }, glyph: "resize-horizontal" }));
        });
        return React.createElement("div", { className: StyleConstants.WIZARD_LEGEND },
            this.props.FriendlyName,
            " : ",
            stepNames);
    }
}
exports.WizardLegend = WizardLegend;
