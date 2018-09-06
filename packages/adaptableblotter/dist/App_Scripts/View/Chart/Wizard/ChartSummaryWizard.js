"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyIds = require("../../../Core/Constants/StrategyIds");
const ColumnHelper_1 = require("../../../Core/Helpers/ColumnHelper");
class ChartSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let keyValuePairs = [
            { Key: "Name", Value: this.props.Data.Name },
            { Key: "Type", Value: this.props.Data.Type },
            { Key: "Y Axis Column", Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.YAxisColumn, this.props.Columns) },
            { Key: "X Axis Column", Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.XAxisColumn, this.props.Columns) },
            { Key: "X Axis Values", Value: this.props.Data.XAxisColumnValues.join(', ') },
            {
                Key: "Additional Column", Value: (this.props.Data.AdditionalColumn) ?
                    ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.AdditionalColumn, this.props.Columns) :
                    "None"
            },
            { Key: "Additional Column Values", Value: (this.props.Data.AdditionalColumnValues) ? this.props.Data.AdditionalColumnValues.join(', ') : "n/a" },
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyIds.ChartStrategyName });
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
exports.ChartSummaryWizard = ChartSummaryWizard;
