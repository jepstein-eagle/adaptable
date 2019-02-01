"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const CellValidationActionWizard_1 = require("./CellValidationActionWizard");
const CellValidationSelectColumnWizard_1 = require("./CellValidationSelectColumnWizard");
const CellValidationExpressionWizard_1 = require("./CellValidationExpressionWizard");
const CellValidationRulesWizard_1 = require("./CellValidationRulesWizard");
const CellValidationSummaryWizard_1 = require("./CellValidationSummaryWizard");
const CellValidationSelectQueryWizard_1 = require("./CellValidationSelectQueryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
class CellValidationWizard extends React.Component {
    render() {
        let stepNames = ["Column", "Action", "Validation", "Query", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.CellValidationStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    React.createElement(CellValidationSelectColumnWizard_1.CellValidationSelectColumnWizard, { StepName: stepNames[0] }),
                    React.createElement(CellValidationActionWizard_1.CellValidationActionWizard, { StepName: stepNames[1] }),
                    React.createElement(CellValidationRulesWizard_1.CellValidationRulesWizard, { StepName: stepNames[2] }),
                    React.createElement(CellValidationSelectQueryWizard_1.CellValidationSelectQueryWizard, { StepName: stepNames[3] }),
                    React.createElement(CellValidationExpressionWizard_1.CellValidationExpressionWizard, { StepName: stepNames[3], UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters }),
                    React.createElement(CellValidationSummaryWizard_1.CellValidationSummaryWizard, { StepName: stepNames[4], UserFilters: this.props.UserFilters })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.CellValidationWizard = CellValidationWizard;
