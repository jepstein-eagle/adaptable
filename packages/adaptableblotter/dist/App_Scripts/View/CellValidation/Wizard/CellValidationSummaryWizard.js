"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
const ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
const CellValidationHelper_1 = require("../../../Utilities/Helpers/CellValidationHelper");
class CellValidationSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let keyValuePairs = [
            { Key: "Column", Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns) },
            { Key: "Mode", Value: this.props.Data.ActionMode },
            { Key: "Rule", Value: CellValidationHelper_1.CellValidationHelper.createCellValidationDescription(this.props.Data, this.props.Columns) },
            {
                Key: "Query", Value: ExpressionHelper_1.ExpressionHelper.IsNotEmptyExpression(this.props.Data.Expression) ?
                    ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns) :
                    "None"
            }
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyConstants.CellValidationStrategyName });
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
        return ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(this.props.Data.Expression) ? 2 : 1;
    }
}
exports.CellValidationSummaryWizard = CellValidationSummaryWizard;
