"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StyleVisualItem_1 = require("../../Components/StyleVisualItem");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
const Enums_1 = require("../../../Utilities/Enums");
const ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
class ConditionalStyleSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let keyValuePairs = [
            { Key: "Scope", Value: this.getScope() },
            { Key: "Style", Value: React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: this.props.Data.Style }) },
            { Key: "Query", Value: ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(this.props.Data.Expression, this.props.Columns) }
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyConstants.ConditionalStyleStrategyName });
        return React.createElement("div", { className: cssClassName }, summaryPage);
    }
    getScope() {
        switch (this.props.Data.ConditionalStyleScope) {
            case Enums_1.ConditionalStyleScope.Row:
                return "Row";
            case Enums_1.ConditionalStyleScope.Column:
                return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns);
            case Enums_1.ConditionalStyleScope.ColumnCategory:
                return "Category: " + this.props.Data.ColumnCategoryId;
        }
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
