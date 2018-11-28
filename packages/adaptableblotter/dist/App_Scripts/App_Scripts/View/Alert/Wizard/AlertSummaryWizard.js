"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyConstants = require("../../../Core/Constants/StrategyConstants");
const ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
const ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
const AlertHelper_1 = require("../../../Utilities/Helpers/AlertHelper");
class AlertSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let keyValuePairs = [
            { Key: "Column", Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns) },
            { Key: "Rule", Value: AlertHelper_1.AlertHelper.createAlertDescription(this.props.Data, this.props.Columns) },
            { Key: "Alert Type", Value: this.props.Data.MessageType },
            {
                Key: "Query", Value: ExpressionHelper_1.ExpressionHelper.IsNotEmptyExpression(this.props.Data.Expression) ?
                    ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns) :
                    "None"
            }
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyConstants.AlertStrategyName });
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
exports.AlertSummaryWizard = AlertSummaryWizard;
