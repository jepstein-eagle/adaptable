"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const CalculatedColumnExpressionWizard_1 = require("./CalculatedColumnExpressionWizard");
const CalculatedColumnSettingsWizard_1 = require("./CalculatedColumnSettingsWizard");
const CalculatedColumnSummaryWizard_1 = require("./CalculatedColumnSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
class CalculatedColumnWizard extends React.Component {
    render() {
        let stepNames = ["Create Column", "Write Expression", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.CalculatedColumnStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Steps: [
                    React.createElement(CalculatedColumnSettingsWizard_1.CalculatedColumnSettingsWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[0], Columns: this.props.Columns }),
                    React.createElement(CalculatedColumnExpressionWizard_1.CalculatedColumnExpressionWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[1], GetErrorMessage: this.props.GetErrorMessage, IsExpressionValid: this.props.IsExpressionValid }),
                    React.createElement(CalculatedColumnSummaryWizard_1.CalculatedColumnSummaryWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[2] })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.CalculatedColumnWizard = CalculatedColumnWizard;
