"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const UIHelper_1 = require("../../UIHelper");
class ReminderSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let keyValuePairs = [
            { Key: "Header", Value: this.props.Data.Alert.Header },
            { Key: "Message", Value: this.props.Data.Alert.Msg },
            { Key: "Message Type", Value: this.props.Data.Alert.MessageType },
            { Key: "Show as Popup", Value: this.props.Data.Alert.ShowAsPopup ? 'True' : 'False' },
            { Key: "Schedule", Value: UIHelper_1.UIHelper.GetScheduleDescription(this.props.Data.Schedule) },
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyConstants.ReminderStrategyName });
        return React.createElement("div", { className: cssClassName }, summaryPage);
    }
    canNext() {
        return true;
    }
    canBack() { return true; }
    Next() { }
    Back() { }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.ReminderSummaryWizard = ReminderSummaryWizard;
