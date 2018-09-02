"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StyleVisualItem_1 = require("../../Components/StyleVisualItem");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyNames = require("../../../Core/Constants/StrategyNames");
const ExpressionHelper_1 = require("../../../Core/Helpers/ExpressionHelper");
const Enums_1 = require("../../../Core/Enums");
const ColumnHelper_1 = require("../../../Core/Helpers/ColumnHelper");
class ConditionalStyleSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let keyValuePairs = [
            {
                Key: "Scope", Value: this.props.Data.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Row ? "Row" :
                    ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns)
            },
            { Key: "Style", Value: React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: this.props.Data.Style }) },
            { Key: "Query", Value: ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns, this.props.UserFilters) }
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyNames.ConditionalStyleStrategyName });
        return React.createElement("div", { className: cssClassName }, summaryPage);
    }
    canNext() { return true; }
    canBack() { return true; }
    Next() {
        //
    }
    Back() {
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.ConditionalStyleSummaryWizard = ConditionalStyleSummaryWizard;
