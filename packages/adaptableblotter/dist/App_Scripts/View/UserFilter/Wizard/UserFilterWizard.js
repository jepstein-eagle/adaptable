"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Enums_1 = require("../../../Core/Enums");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const UserFilterSettingsWizard_1 = require("./UserFilterSettingsWizard");
const UserFilterExpressionWizard_1 = require("./UserFilterExpressionWizard");
const UserFilterSelectColumnWizard_1 = require("./UserFilterSelectColumnWizard");
const UserFilterSummaryWizard_1 = require("./UserFilterSummaryWizard");
const StrategyConstants = require("../../../Core/Constants/StrategyConstants");
class UserFilterWizard extends React.Component {
    render() {
        let stepNames = ["Select Column", "Build Query", "Settings", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.UserFilterStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Steps: [
                    React.createElement(UserFilterSelectColumnWizard_1.UserFilterSelectColumnWizard, { Columns: this.props.Columns, cssClassName: this.props.cssClassName, StepName: stepNames[0] }),
                    React.createElement(UserFilterExpressionWizard_1.UserFilterExpressionWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[1], Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, ExpressionMode: Enums_1.ExpressionMode.SingleColumn, Blotter: this.props.Blotter }),
                    React.createElement(UserFilterSettingsWizard_1.UserFilterSettingsWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[2], UserFilters: this.props.UserFilters, Columns: this.props.Columns }),
                    React.createElement(UserFilterSummaryWizard_1.UserFilterSummaryWizard, { cssClassName: this.props.cssClassName, StepName: stepNames[3], Columns: this.props.Columns, UserFilters: this.props.UserFilters })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.UserFilterWizard = UserFilterWizard;
