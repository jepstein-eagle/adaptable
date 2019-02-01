"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const AdvancedSearchSettingsWizard_1 = require("./AdvancedSearchSettingsWizard");
const AdvancedSearchExpressionWizard_1 = require("./AdvancedSearchExpressionWizard");
const AdvancedSearchSummaryWizard_1 = require("./AdvancedSearchSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
class AdvancedSearchWizard extends React.Component {
    render() {
        let stepNames = ["Query", "Name", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.AdvancedSearchStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    React.createElement(AdvancedSearchExpressionWizard_1.AdvancedSearchExpressionWizard, { StepName: stepNames[0], UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, cssClassName: this.props.cssClassName }),
                    React.createElement(AdvancedSearchSettingsWizard_1.AdvancedSearchSettingsWizard, { StepName: stepNames[1], AdvancedSearches: this.props.ConfigEntities }),
                    React.createElement(AdvancedSearchSummaryWizard_1.AdvancedSearchSummaryWizard, { StepName: stepNames[2], UserFilters: this.props.UserFilters })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.AdvancedSearchWizard = AdvancedSearchWizard;
