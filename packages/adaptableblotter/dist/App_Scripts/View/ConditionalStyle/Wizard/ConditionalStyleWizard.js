"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const ConditionalStyleStyleWizard_1 = require("./ConditionalStyleStyleWizard");
const ConditionalStyleScopeWizard_1 = require("./ConditionalStyleScopeWizard");
const ConditionalStyleExpressionWizard_1 = require("./ConditionalStyleExpressionWizard");
const ConditionalStyleSummaryWizard_1 = require("./ConditionalStyleSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
class ConditionalStyleWizard extends React.Component {
    render() {
        let stepNames = ["Scope", "Style", "Query", "Summary"];
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ConditionalStyleStrategyName, StepNames: stepNames, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    React.createElement(ConditionalStyleScopeWizard_1.ConditionalStyleScopeWizard, { StepName: stepNames[0], ColumnCategories: this.props.ColumnCategories }),
                    React.createElement(ConditionalStyleStyleWizard_1.ConditionalStyleStyleWizard, { StepName: stepNames[1], ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames }),
                    React.createElement(ConditionalStyleExpressionWizard_1.ConditionalStyleExpressionWizard, { StepName: stepNames[2], UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters }),
                    React.createElement(ConditionalStyleSummaryWizard_1.ConditionalStyleSummaryWizard, { StepName: stepNames[3], UserFilters: this.props.UserFilters })
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.ConditionalStyleWizard = ConditionalStyleWizard;
