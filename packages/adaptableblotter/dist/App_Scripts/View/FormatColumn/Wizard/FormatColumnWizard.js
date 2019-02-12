"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const FormatColumnScopeWizard_1 = require("./FormatColumnScopeWizard");
const FormatColumnStyleWizard_1 = require("./FormatColumnStyleWizard");
const FormatColumnSummaryWizard_1 = require("./FormatColumnSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
class FormatColumnWizard extends React.Component {
    render() {
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.FormatColumnStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Column",
                        Index: 0,
                        Element: React.createElement(FormatColumnScopeWizard_1.FormatColumnScopeWizard, null)
                    },
                    {
                        StepName: "Style",
                        Index: 1,
                        Element: React.createElement(FormatColumnStyleWizard_1.FormatColumnStyleWizard, { ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames }),
                    },
                    {
                        StepName: "Summary",
                        Index: 2,
                        Element: React.createElement(FormatColumnSummaryWizard_1.FormatColumnSummaryWizard, null)
                    }
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.FormatColumnWizard = FormatColumnWizard;
