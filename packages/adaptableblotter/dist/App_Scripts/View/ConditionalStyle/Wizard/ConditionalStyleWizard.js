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
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ConditionalStyleStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Scope",
                        Index: 0,
                        Element: React.createElement(ConditionalStyleScopeWizard_1.ConditionalStyleScopeWizard, { ColumnCategories: this.props.ColumnCategories }),
                    },
                    {
                        StepName: "Style",
                        Index: 1,
                        Element: React.createElement(ConditionalStyleStyleWizard_1.ConditionalStyleStyleWizard, { ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames }),
                    },
                    {
                        StepName: "Query",
                        Index: 2,
                        Element: React.createElement(ConditionalStyleExpressionWizard_1.ConditionalStyleExpressionWizard, { UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters }),
                    },
                    {
                        StepName: "Summary",
                        Index: 3,
                        Element: React.createElement(ConditionalStyleSummaryWizard_1.ConditionalStyleSummaryWizard, { UserFilters: this.props.UserFilters })
                    }
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.ConditionalStyleWizard = ConditionalStyleWizard;
