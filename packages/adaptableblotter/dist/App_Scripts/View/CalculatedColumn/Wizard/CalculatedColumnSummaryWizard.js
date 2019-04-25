"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const CalculatedColumnHelper_1 = require("../../../Utilities/Helpers/CalculatedColumnHelper");
class CalculatedColumnSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ColumnId: this.props.Data.ColumnId, ErrorMessage: null };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let keyValuePairs = [
            { Key: "Name", Value: this.props.Data.ColumnId },
            { Key: "Expression", Value: CalculatedColumnHelper_1.CalculatedColumnHelper.getExpressionString(this.props.Data.ColumnExpression, this.props.Columns) }
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
