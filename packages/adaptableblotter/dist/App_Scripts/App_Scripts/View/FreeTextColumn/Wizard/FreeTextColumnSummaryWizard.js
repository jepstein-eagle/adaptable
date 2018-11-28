"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyConstants = require("../../../Core/Constants/StrategyConstants");
const ArrayExtensions_1 = require("../../../Core/Extensions/ArrayExtensions");
const StringExtensions_1 = require("../../../Core/Extensions/StringExtensions");
class FreeTextColumnSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = { ColumnId: this.props.Data.ColumnId };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let keyValuePairs = [
            { Key: "Name", Value: this.props.Data.ColumnId },
            { Key: "Default Value", Value: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.DefaultValue) ? "[None]" : this.props.Data.DefaultValue },
            { Key: "No. Stored Values", Value: ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(this.props.Data.FreeTextStoredValues) ? 0 : this.props.Data.FreeTextStoredValues.length },
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyConstants.FreeTextColumnStrategyName });
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
exports.FreeTextColumnSummaryWizard = FreeTextColumnSummaryWizard;
