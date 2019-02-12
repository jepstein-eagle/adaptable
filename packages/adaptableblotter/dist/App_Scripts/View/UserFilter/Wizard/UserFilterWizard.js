"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Enums_1 = require("../../../Utilities/Enums");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const UserFilterSettingsWizard_1 = require("./UserFilterSettingsWizard");
const UserFilterExpressionWizard_1 = require("./UserFilterExpressionWizard");
const UserFilterSelectColumnWizard_1 = require("./UserFilterSelectColumnWizard");
const UserFilterSummaryWizard_1 = require("./UserFilterSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
class UserFilterWizard extends React.Component {
    render() {
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.UserFilterStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Column",
                        Index: 0,
                        Element: React.createElement(UserFilterSelectColumnWizard_1.UserFilterSelectColumnWizard, null)
                    },
                    {
                        StepName: "Query",
                        Index: 1,
                        Element: React.createElement(UserFilterExpressionWizard_1.UserFilterExpressionWizard, { UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, ExpressionMode: Enums_1.ExpressionMode.SingleColumn }),
                    },
                    {
                        StepName: "Settings",
                        Index: 2,
                        Element: React.createElement(UserFilterSettingsWizard_1.UserFilterSettingsWizard, { UserFilters: this.props.UserFilters })
                    },
                    {
                        StepName: "Summary",
                        Index: 3,
                        Element: React.createElement(UserFilterSummaryWizard_1.UserFilterSummaryWizard, { UserFilters: this.props.UserFilters })
                    }
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.UserFilterWizard = UserFilterWizard;
