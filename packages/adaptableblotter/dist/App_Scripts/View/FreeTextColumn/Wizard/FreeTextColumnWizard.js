"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const FreeTextColumnSettingsWizard_1 = require("./FreeTextColumnSettingsWizard");
const FreeTextColumnSummaryWizard_1 = require("./FreeTextColumnSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
class FreeTextColumnWizard extends React.Component {
    render() {
        let stepNames = ["Settings", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.FreeTextColumnStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    React.createElement(FreeTextColumnSettingsWizard_1.FreeTextColumnSettingsWizard, { StepName: stepNames[0] }),
                    React.createElement(FreeTextColumnSummaryWizard_1.FreeTextColumnSummaryWizard, { StepName: stepNames[1] })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.FreeTextColumnWizard = FreeTextColumnWizard;
