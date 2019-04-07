"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AdaptableWizard_1 = require("../../Wizard/AdaptableWizard");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const ReminderSummaryWizard_1 = require("./ReminderSummaryWizard");
const RemindeAlertWizard_1 = require("./RemindeAlertWizard");
const ReminderScheduleWizard_1 = require("./ReminderScheduleWizard");
class ReminderWizard extends React.Component {
    render() {
        return React.createElement("div", { className: this.props.cssClassName },
            React.createElement(AdaptableWizard_1.AdaptableWizard, { FriendlyName: StrategyConstants.ReminderStrategyName, ModalContainer: this.props.ModalContainer, cssClassName: this.props.cssClassName, Blotter: this.props.Blotter, Columns: this.props.Columns, Steps: [
                    {
                        StepName: "Alert",
                        Index: 0,
                        Element: React.createElement(RemindeAlertWizard_1.ReminderAlertWizard, null)
                    },
                    {
                        StepName: "Schedule",
                        Index: 1,
                        Element: React.createElement(ReminderScheduleWizard_1.ReminderScheduleWizard, null)
                    },
                    {
                        StepName: "Summary",
                        Index: 2,
                        Element: React.createElement(ReminderSummaryWizard_1.ReminderSummaryWizard, null)
                    },
                ], Data: this.props.EditedAdaptableBlotterObject, StepStartIndex: this.props.WizardStartIndex, onHide: () => this.props.onCloseWizard(), onFinish: () => this.props.onFinishWizard(), canFinishWizard: () => this.props.canFinishWizard() }));
    }
}
exports.ReminderWizard = ReminderWizard;
