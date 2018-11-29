"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const PercentBarSelectColumnWizard_1 = require("././PercentBarSelectColumnWizard");
const PercentBarSummaryWizard_1 = require("././PercentBarSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const PercentBarSettingsWizard_1 = require("./PercentBarSettingsWizard");
class PercentBarWizard extends React.Component {
    render() {
        let stepNames = ["Select Column", "Settings", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.PercentBarStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Steps: [
                    React.createElement(PercentBarSelectColumnWizard_1.PercentBarSelectColumnWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[0], Columns: this.props.Columns }),
                    React.createElement(PercentBarSettingsWizard_1.PercentBarSettingsWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[1], Columns: this.props.Columns, ColorPalette: this.props.ColorPalette }),
                    React.createElement(PercentBarSummaryWizard_1.PercentBarSummaryWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[2], Columns: this.props.Columns })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.PercentBarWizard = PercentBarWizard;
