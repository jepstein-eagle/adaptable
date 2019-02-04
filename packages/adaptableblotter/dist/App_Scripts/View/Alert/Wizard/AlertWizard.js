"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const AlertSelectColumnWizard_1 = require("./AlertSelectColumnWizard");
const AlertExpressionWizard_1 = require("./AlertExpressionWizard");
const AlertRulesWizard_1 = require("./AlertRulesWizard");
const AlertSummaryWizard_1 = require("./AlertSummaryWizard");
const AlertSelectQueryWizard_1 = require("./AlertSelectQueryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const AlertTypeWizard_1 = require("./AlertTypeWizard");
class AlertWizard extends React.Component {
    render() {
        let stepNames = ["Column", "Rules", "Type", "Query", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.AlertStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    React.createElement(AlertSelectColumnWizard_1.AlertSelectColumnWizard, { StepName: stepNames[0] }),
                    React.createElement(AlertRulesWizard_1.AlertRulesWizard, { StepName: stepNames[1] }),
                    React.createElement(AlertTypeWizard_1.AlertTypeWizard, { StepName: stepNames[2] }),
                    React.createElement(AlertSelectQueryWizard_1.AlertSelectQueryWizard, { StepName: stepNames[3] }),
                    React.createElement(AlertExpressionWizard_1.AlertExpressionWizard, { StepName: stepNames[4], Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter }),
                    React.createElement(AlertSummaryWizard_1.AlertSummaryWizard, { StepName: stepNames[4], UserFilters: this.props.UserFilters })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.AlertWizard = AlertWizard;
