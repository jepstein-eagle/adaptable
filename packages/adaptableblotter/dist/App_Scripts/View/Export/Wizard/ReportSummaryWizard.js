"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const ReportHelper_1 = require("../../../Utilities/Helpers/ReportHelper");
const UIHelper_1 = require("../../UIHelper");
class ReportSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let scheduleDescription = this.props.Data.AutoExport ?
            ' (' + UIHelper_1.UIHelper.GetScheduleDescription(this.props.Data.AutoExport.Schedule) + ')' :
            'None';
        let keyValuePairs = [
            { Key: "Name", Value: this.props.Data.Name },
            { Key: "Columns", Value: ReportHelper_1.ReportHelper.GetReportColumnsDescription(this.props.Data, this.props.Columns) },
            { Key: "Rows", Value: ReportHelper_1.ReportHelper.GetReportExpressionDescription(this.props.Data, this.props.Columns) },
            { Key: "Schedule", Value: scheduleDescription }
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyConstants.ExportStrategyName });
        return React.createElement("div", { className: cssClassName }, summaryPage);
    }
    canNext() { return true; }
    canBack() { return true; }
    Next() {
    }
    Back() {
        //todo
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.ReportSummaryWizard = ReportSummaryWizard;
