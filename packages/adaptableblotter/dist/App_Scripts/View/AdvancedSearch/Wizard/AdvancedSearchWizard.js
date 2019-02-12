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
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.AdvancedSearchStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Query",
                        Index: 0,
                        Element: React.createElement(AdvancedSearchExpressionWizard_1.AdvancedSearchExpressionWizard, { UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, cssClassName: this.props.cssClassName })
                    },
                    {
                        StepName: "Name",
                        Index: 1,
                        Element: React.createElement(AdvancedSearchSettingsWizard_1.AdvancedSearchSettingsWizard, { AdvancedSearches: this.props.ConfigEntities }),
                    },
                    {
                        StepName: "Summary",
                        Index: 2,
                        Element: React.createElement(AdvancedSearchSummaryWizard_1.AdvancedSearchSummaryWizard, { UserFilters: this.props.UserFilters })
                    }
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.AdvancedSearchWizard = AdvancedSearchWizard;
