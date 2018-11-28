"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyConstants = require("../../../Core/Constants/StrategyConstants");
const ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
const GeneralConstants = require("../../../Core/Constants/GeneralConstants");
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
            { Key: "Y Axis Column", Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.YAxisColumnId, this.props.Columns) },
            { Key: "X Axis Column", Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.XAxisColumnId, this.props.Columns) },
            { Key: "X Axis Values", Value: this.getColumnValuesList(this.props.Data.XAxisColumnValues) },
            {
                Key: "Additional Column", Value: (this.props.Data.AdditionalColumnId) ?
                    ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.AdditionalColumnId, this.props.Columns) :
                    "None"
            },
            { Key: "Additional Column Values", Value: (this.props.Data.AdditionalColumnValues) ? this.getColumnValuesList(this.props.Data.AdditionalColumnValues) : "n/a" },
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyConstants.ChartStrategyName });
        return React.createElement("div", { className: cssClassName }, summaryPage);
    }
    getColumnValuesList(columnValueArray) {
        if (columnValueArray[0] == GeneralConstants.ALL_COLUMN_VALUES) {
            return "All Column Values";
        }
        else {
            return columnValueArray.join(', ');
        }
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
