"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const ShortcutSettingsWizard_1 = require("./ShortcutSettingsWizard");
const ShortcutSummaryWizard_1 = require("./ShortcutSummaryWizard");
const ShortcutTypeWizard_1 = require("./ShortcutTypeWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
class ShortcutWizard extends React.Component {
    render() {
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ShortcutStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Column Type",
                        Index: 0,
                        Element: React.createElement(ShortcutTypeWizard_1.ShortcutTypeWizard, null)
                    },
                    {
                        StepName: "Settings",
                        Index: 1,
                        Element: React.createElement(ShortcutSettingsWizard_1.ShortcutSettingsWizard, { NumericKeysAvailable: this.props.NumericKeysAvailable, DateKeysAvailable: this.props.DateKeysAvailable }),
                    },
                    {
                        StepName: "Summary",
                        Index: 2,
                        Element: React.createElement(ShortcutSummaryWizard_1.ShortcutSummaryWizard, null)
                    }
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.ShortcutWizard = ShortcutWizard;
