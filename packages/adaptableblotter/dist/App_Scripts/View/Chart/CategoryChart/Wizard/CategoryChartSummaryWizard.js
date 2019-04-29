"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StrategyConstants = require("../../../../Utilities/Constants/StrategyConstants");
const ColumnHelper_1 = require("../../../../Utilities/Helpers/ColumnHelper");
const WizardSummaryPage_1 = require("../../../Components/WizardSummaryPage");
const ExpressionHelper_1 = require("../../../../Utilities/Helpers/ExpressionHelper");
class CategoryChartSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let friendlyNames = this.props.Data.YAxisColumnIds.map(c => {
            return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(c, this.props.Columns);
        });
        let keyValuePairs = [
            { Key: "Name", Value: this.props.Data.Name },
            { Key: "Description", Value: this.props.Data.Description },
            { Key: "Y Axis Column(s)", Value: friendlyNames.join(', ') },
            { Key: "Total", Value: this.props.Data.YAxisTotal },
            { Key: "X Axis Column", Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.XAxisColumnId, this.props.Columns) },
            { Key: "X Axis Values", Value: this.getExpressionString(this.props.Data.XAxisExpression) },
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyConstants.ChartStrategyName });
        return React.createElement("div", { className: cssClassName }, summaryPage);
    }
    getExpressionString(expression) {
        if (ExpressionHelper_1.ExpressionHelper.IsNullOrEmptyExpression(expression)) {
            return "[All Column Values]";
        }
        else {
            return ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(expression, this.props.Columns, false);
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
exports.CategoryChartSummaryWizard = CategoryChartSummaryWizard;
