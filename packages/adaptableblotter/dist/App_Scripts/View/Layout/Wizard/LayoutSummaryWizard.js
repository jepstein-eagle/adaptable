"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const WizardSummaryPage_1 = require("../../Components/WizardSummaryPage");
const StrategyConstants = require("../../../Utilities/Constants/StrategyConstants");
const LayoutHelper_1 = require("../../../Utilities/Helpers/LayoutHelper");
const ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
class LayoutSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let keyValuePairs = [
            { Key: "Name", Value: this.props.Data.Name },
            { Key: "Columns", Value: this.getColumnNames() },
            { Key: "Grid Sorts", Value: LayoutHelper_1.LayoutHelper.getGridSort(this.props.Data.GridSorts, this.props.Columns) },
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyConstants.LayoutStrategyName });
        return React.createElement("div", { className: cssClassName }, summaryPage);
    }
    canNext() {
        return true;
    }
    getColumnNames() {
        return ColumnHelper_1.ColumnHelper.getFriendlyNamesFromColumnIds(this.props.Data.Columns, this.props.Columns).join(", ");
    }
    canBack() { return true; }
    Next() {
        //
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
exports.LayoutSummaryWizard = LayoutSummaryWizard;
