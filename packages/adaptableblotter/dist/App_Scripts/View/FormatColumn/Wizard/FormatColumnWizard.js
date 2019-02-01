"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const FormatColumnScopeWizard_1 = require("./FormatColumnScopeWizard");
const FormatColumnStyleWizard_1 = require("./FormatColumnStyleWizard");
const FormatColumnSummaryWizard_1 = require("./FormatColumnSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
class FormatColumnWizard extends React.Component {
    render() {
        let stepNames = ["Column", "Style", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.FormatColumnStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    React.createElement(FormatColumnScopeWizard_1.FormatColumnScopeWizard, { StepName: stepNames[0] }),
                    React.createElement(FormatColumnStyleWizard_1.FormatColumnStyleWizard, { StepName: stepNames[1], ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames }),
                    React.createElement(FormatColumnSummaryWizard_1.FormatColumnSummaryWizard, { StepName: stepNames[2] })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.FormatColumnWizard = FormatColumnWizard;
