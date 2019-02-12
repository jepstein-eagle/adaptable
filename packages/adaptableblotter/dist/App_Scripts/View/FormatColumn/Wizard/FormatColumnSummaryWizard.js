"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StyleVisualItem_1 = require("../../Components/StyleVisualItem");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
class FormatColumnSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Style: this.props.Data.Style };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let keyValuePairs = [
            { Key: "Scope", Value: ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns) },
            { Key: "Style", Value: React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: this.props.Data.Style }) },
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyConstants.FormatColumnStrategyName });
        return React.createElement("div", { className: cssClassName }, summaryPage);
    }
    canNext() {
        return true;
    }
    canBack() { return true; }
    Next() {
        // todo   
    }
    Back() {
        // todo
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.FormatColumnSummaryWizard = FormatColumnSummaryWizard;
