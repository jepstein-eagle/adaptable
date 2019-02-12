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
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.CalculatedColumnStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Column",
                        Index: 0,
                        Element: React.createElement(CalculatedColumnSettingsWizard_1.CalculatedColumnSettingsWizard, null)
                    },
                    {
                        StepName: "Expression",
                        Index: 1,
                        Element: React.createElement(CalculatedColumnExpressionWizard_1.CalculatedColumnExpressionWizard, { GetErrorMessage: this.props.GetErrorMessage, IsExpressionValid: this.props.IsExpressionValid }),
                    },
                    {
                        StepName: "Summary",
                        Index: 2,
                        Element: React.createElement(CalculatedColumnSummaryWizard_1.CalculatedColumnSummaryWizard, null)
                    }
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.CalculatedColumnWizard = CalculatedColumnWizard;
