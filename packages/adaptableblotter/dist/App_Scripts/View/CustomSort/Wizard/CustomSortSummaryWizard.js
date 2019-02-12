"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
class CustomSortSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let keyValuePairs = [
            { Key: "Column", Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns) },
            { Key: "Values", Value: this.props.Data.SortedValues.join(', ') }
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyConstants.CustomSortStrategyName });
        return React.createElement("div", { className: cssClassName }, summaryPage);
    }
    canNext() { return true; }
    canBack() { return true; }
    Next() {
        // todo
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
exports.CustomSortSummaryWizard = CustomSortSummaryWizard;
