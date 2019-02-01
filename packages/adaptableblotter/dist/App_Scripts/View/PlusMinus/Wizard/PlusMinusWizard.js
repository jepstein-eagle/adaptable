"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const PlusMinusColumnWizard_1 = require("./PlusMinusColumnWizard");
const PlusMinusSettingsWizard_1 = require("./PlusMinusSettingsWizard");
const PlusMinusExpressionWizard_1 = require("./PlusMinusExpressionWizard");
const PlusMinusSummaryWizard_1 = require("./PlusMinusSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const Enums_1 = require("../../../Utilities/Enums");
class PlusMinusWizard extends React.Component {
    render() {
        let stepNames = ["Column", "Settings", "Query", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.PlusMinusStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [React.createElement(PlusMinusColumnWizard_1.PlusMinusColumnWizard, { StepName: stepNames[0], NumericColumns: this.props.Columns.filter(x => x.DataType == Enums_1.DataType.Number) }),
                    React.createElement(PlusMinusSettingsWizard_1.PlusMinusSettingsWizard, { StepName: stepNames[1] }),
                    React.createElement(PlusMinusExpressionWizard_1.PlusMinusExpressionWizard, { StepName: stepNames[2], UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters }),
                    React.createElement(PlusMinusSummaryWizard_1.PlusMinusSummaryWizard, { StepName: stepNames[3], UserFilters: this.props.UserFilters })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.PlusMinusWizard = PlusMinusWizard;
