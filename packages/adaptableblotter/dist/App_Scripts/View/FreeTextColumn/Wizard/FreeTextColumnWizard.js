"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const FreeTextColumnSettingsWizard_1 = require("./FreeTextColumnSettingsWizard");
const FreeTextColumnSummaryWizard_1 = require("./FreeTextColumnSummaryWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
class FreeTextColumnWizard extends React.Component {
    render() {
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.FreeTextColumnStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Settings",
                        Index: 0,
                        Element: React.createElement(FreeTextColumnSettingsWizard_1.FreeTextColumnSettingsWizard, null),
                    },
                    {
                        StepName: "Summary",
                        Index: 1,
                        Element: React.createElement(FreeTextColumnSummaryWizard_1.FreeTextColumnSummaryWizard, null)
                    }
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.FreeTextColumnWizard = FreeTextColumnWizard;
