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
        let stepNames = ["Select Column", "Alert Rules", "Type", "Add Query", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.AlertStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Steps: [
                    React.createElement(AlertSelectColumnWizard_1.AlertSelectColumnWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[0], Columns: this.props.Columns }),
                    React.createElement(AlertRulesWizard_1.AlertRulesWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[1], Columns: this.props.Columns }),
                    React.createElement(AlertTypeWizard_1.AlertTypeWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[2] }),
                    React.createElement(AlertSelectQueryWizard_1.AlertSelectQueryWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[3], Columns: this.props.Columns }),
                    React.createElement(AlertExpressionWizard_1.AlertExpressionWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[4], Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter }),
                    React.createElement(AlertSummaryWizard_1.AlertSummaryWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[4], Columns: this.props.Columns, UserFilters: this.props.UserFilters })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.AlertWizard = AlertWizard;
