"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const PercentBarSelectColumnWizard_1 = require("././PercentBarSelectColumnWizard");
const PercentBarSummaryWizard_1 = require("././PercentBarSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const PercentBarSettingsWizard_1 = require("./PercentBarSettingsWizard");
const PercentBarValuesWizard_1 = require("./PercentBarValuesWizard");
class PercentBarWizard extends React.Component {
    render() {
        let stepNames = ["Column", "Values", "Settings", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.PercentBarStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    React.createElement(PercentBarSelectColumnWizard_1.PercentBarSelectColumnWizard, { StepName: stepNames[0] }),
                    React.createElement(PercentBarValuesWizard_1.PercentBarValuesWizard, { StepName: stepNames[1] }),
                    React.createElement(PercentBarSettingsWizard_1.PercentBarSettingsWizard, { StepName: stepNames[2], ColorPalette: this.props.ColorPalette }),
                    React.createElement(PercentBarSummaryWizard_1.PercentBarSummaryWizard, { StepName: stepNames[3] })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.PercentBarWizard = PercentBarWizard;
