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
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.CellValidationStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Column",
                        Index: 0,
                        Element: React.createElement(CellValidationSelectColumnWizard_1.CellValidationSelectColumnWizard, null)
                    },
                    {
                        StepName: "Action",
                        Index: 1,
                        Element: React.createElement(CellValidationActionWizard_1.CellValidationActionWizard, null),
                    },
                    {
                        StepName: "Validation",
                        Index: 2,
                        Element: React.createElement(CellValidationRulesWizard_1.CellValidationRulesWizard, null),
                    },
                    {
                        StepName: "Query",
                        Index: 3,
                        Element: React.createElement(CellValidationSelectQueryWizard_1.CellValidationSelectQueryWizard, null),
                    },
                    {
                        StepName: "Query",
                        Index: 4,
                        Element: React.createElement(CellValidationExpressionWizard_1.CellValidationExpressionWizard, { UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters }),
                    },
                    {
                        StepName: "Summary",
                        Index: 5,
                        Element: React.createElement(CellValidationSummaryWizard_1.CellValidationSummaryWizard, { UserFilters: this.props.UserFilters })
                    }
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.CellValidationWizard = CellValidationWizard;
