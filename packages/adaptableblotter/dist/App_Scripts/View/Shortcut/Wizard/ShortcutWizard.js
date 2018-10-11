"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const ShortcutSettingsWizard_1 = require("./ShortcutSettingsWizard");
const ShortcutSummaryWizard_1 = require("./ShortcutSummaryWizard");
const ShortcutTypeWizard_1 = require("./ShortcutTypeWizard");
const StrategyConstants = require("../../../Core/Constants/StrategyConstants");
class ShortcutWizard extends React.Component {
    render() {
        let stepNames = ["Column Type", "Settings"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ShortcutStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Steps: [
                    React.createElement(ShortcutTypeWizard_1.ShortcutTypeWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[0] }),
                    React.createElement(ShortcutSettingsWizard_1.ShortcutSettingsWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[1], NumericKeysAvailable: this.props.NumericKeysAvailable, DateKeysAvailable: this.props.DateKeysAvailable }),
                    React.createElement(ShortcutSummaryWizard_1.ShortcutSummaryWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[2] })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.ShortcutWizard = ShortcutWizard;
