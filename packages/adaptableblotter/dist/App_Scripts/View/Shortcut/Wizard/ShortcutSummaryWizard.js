"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyIds = require("../../../Core/Constants/StrategyIds");
class ShortcutSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let keyValuePairs = [
            { Key: "Key", Value: this.props.Data.ShortcutKey },
            { Key: "Result", Value: this.props.Data.ShortcutResult },
            { Key: "Operation", Value: this.props.Data.ShortcutOperation },
            { Key: "Columns", Value: this.props.Data.ColumnType },
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyIds.ShortcutStrategyName });
        return React.createElement("div", { className: cssClassName }, summaryPage);
    }
    canNext() {
        return true;
    }
    canBack() { return true; }
    Next() {
        //
    }
    Back() { }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.ShortcutSummaryWizard = ShortcutSummaryWizard;
