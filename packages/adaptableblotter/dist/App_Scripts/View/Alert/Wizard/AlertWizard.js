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
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.AlertStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Column",
                        Index: 0,
                        Element: React.createElement(AlertSelectColumnWizard_1.AlertSelectColumnWizard, null)
                    },
                    {
                        StepName: "Rules",
                        Index: 1,
                        Element: React.createElement(AlertRulesWizard_1.AlertRulesWizard, null),
                    },
                    {
                        StepName: "Type",
                        Index: 2,
                        Element: React.createElement(AlertTypeWizard_1.AlertTypeWizard, null)
                    },
                    {
                        StepName: "Query",
                        Index: 3,
                        Element: React.createElement(AlertSelectQueryWizard_1.AlertSelectQueryWizard, null)
                    },
                    {
                        StepName: "Query",
                        Index: 4,
                        Element: React.createElement(AlertExpressionWizard_1.AlertExpressionWizard, { Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter }),
                    },
                    {
                        StepName: "Summary",
                        Index: 5,
                        Element: React.createElement(AlertSummaryWizard_1.AlertSummaryWizard, { UserFilters: this.props.UserFilters })
                    },
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.AlertWizard = AlertWizard;
