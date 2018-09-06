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
const StrategyIds = require("../../../Core/Constants/StrategyIds");
class CellValidationWizard extends React.Component {
    render() {
        let stepNames = ["Select Column", "Choose Action", "Create Rule", "Query", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyIds.CellValidationStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Steps: [
                    React.createElement(CellValidationSelectColumnWizard_1.CellValidationSelectColumnWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[0], Columns: this.props.Columns }),
                    React.createElement(CellValidationActionWizard_1.CellValidationActionWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[1], Columns: this.props.Columns }),
                    React.createElement(CellValidationRulesWizard_1.CellValidationRulesWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[2], Columns: this.props.Columns }),
                    React.createElement(CellValidationSelectQueryWizard_1.CellValidationSelectQueryWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[3], Columns: this.props.Columns }),
                    React.createElement(CellValidationExpressionWizard_1.CellValidationExpressionWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[3], Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter }),
                    React.createElement(CellValidationSummaryWizard_1.CellValidationSummaryWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[4], Columns: this.props.Columns, UserFilters: this.props.UserFilters })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.CellValidationWizard = CellValidationWizard;
