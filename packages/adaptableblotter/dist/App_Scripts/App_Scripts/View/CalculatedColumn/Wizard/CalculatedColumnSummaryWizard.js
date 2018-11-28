"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyConstants = require("../../../Core/Constants/StrategyConstants");
class CalculatedColumnSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = { ColumnId: this.props.Data.ColumnId, ErrorMessage: null };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let keyValuePairs = [
            { Key: "Name", Value: this.props.Data.ColumnId },
            { Key: "Expression", Value: this.props.Data.ColumnExpression }
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyConstants.CalculatedColumnStrategyName });
        return React.createElement("div", { className: cssClassName }, summaryPage);
    }
    canNext() { return true; }
    canBack() { return true; }
    Next() {
        //
    }
    Back() {
        //
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.CalculatedColumnSummaryWizard = CalculatedColumnSummaryWizard;
