"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
const StyleVisualItem_1 = require("../../Components/StyleVisualItem");
const ObjectFactory_1 = require("../../../Utilities/ObjectFactory");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
class PercentBarSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let positiveStyle = ObjectFactory_1.ObjectFactory.CreateEmptyStyle();
        positiveStyle.BackColor = this.props.Data.PositiveColor;
        positiveStyle.ForeColor = this.props.Data.PositiveColor;
        let negativeStyle = ObjectFactory_1.ObjectFactory.CreateEmptyStyle();
        negativeStyle.BackColor = this.props.Data.NegativeColor;
        negativeStyle.ForeColor = this.props.Data.NegativeColor;
        let keyValuePairs = [
            { Key: "Column", Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns) },
            { Key: "Minimum Value", Value: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.MinValueColumnId) ? this.props.Data.MinValue : "[" + ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.MinValueColumnId, this.props.Columns) + "]" },
            { Key: "Maximum Value", Value: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.MaxValueColumnId) ? this.props.Data.MaxValue : "[" + ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.MaxValueColumnId, this.props.Columns) + "]" },
            { Key: "Positive Colour", Value: React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: positiveStyle }) },
            { Key: "Negative Colour", Value: React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: negativeStyle }) },
            { Key: "Show Cell Value", Value: this.props.Data.ShowValue ? "Yes" : "No" },
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyConstants.PercentBarStrategyName });
        return React.createElement("div", { className: cssClassName }, summaryPage);
    }
    canNext() { return true; }
    canBack() { return true; }
    Next() { }
    Back() { }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.PercentBarSummaryWizard = PercentBarSummaryWizard;
