"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/// <reference path="../../typings/.d.ts" />
const react_bootstrap_1 = require("react-bootstrap");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
class WizardLegend extends React.Component {
    render() {
        let count = this.props.StepNames.length - 1;
        let activeStepIndex = this.props.StepNames.findIndex(s => s == this.props.ActiveStepName);
        let stepButtons = this.props.StepNames.map((s, index) => {
            let isActiveStep = index == activeStepIndex;
            let isDisabled = (this.props.CanShowAllSteps) ?
                false :
                isActiveStep || index > activeStepIndex;
            let style = isActiveStep ? "primary" : "default";
            let lastStep = (index == count);
            return React.createElement("span", { key: index },
                React.createElement(react_bootstrap_1.Button, { bsStyle: style, bsSize: "small", disabled: isDisabled, onClick: () => this.onStepButtonClicked(s) }, s),
                lastStep == false &&
                    React.createElement(react_bootstrap_1.Glyphicon, { style: { verticalAlign: "middle", margin: "5px", padding: "5px" }, glyph: "resize-horizontal" }));
        });
        return React.createElement("div", { className: StyleConstants.WIZARD_LEGEND },
            this.props.FriendlyName,
            " : ",
            stepButtons);
    }
    onStepButtonClicked(stepName) {
        this.props.onStepButtonClicked(stepName);
    }
}
exports.WizardLegend = WizardLegend;
