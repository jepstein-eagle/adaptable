"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StrategyConstants = require("../../../../Utilities/Constants/StrategyConstants");
const ColumnHelper_1 = require("../../../../Utilities/Helpers/ColumnHelper");
const WizardSummaryPage_1 = require("../../../Components/WizardSummaryPage");
const StringExtensions_1 = require("../../../../Utilities/Extensions/StringExtensions");
class PieChartSummaryWizard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let cssClassName = this.props.cssClassName + "-summary";
        let primaryColumnFriendlyName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.PrimaryColumnId, this.props.Columns);
        let seondaryColumnFriendlyName = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.SecondaryColumnId) ?
            '[None]' :
            ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.SecondaryColumnId, this.props.Columns);
        let seondaryColumnOperation = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.SecondaryColumnId) ?
            '' :
            this.props.Data.SecondaryColumnOperation;
        let rowsDescription = this.props.Data.VisibleRowsOnly ? 'Visible Rows' : 'All Rows';
        let keyValuePairs = [
            { Key: "Name", Value: this.props.Data.Name },
            { Key: "Description", Value: this.props.Data.Description },
            { Key: "Primary Column", Value: primaryColumnFriendlyName },
            { Key: "Secondary Column", Value: seondaryColumnFriendlyName },
            { Key: "Operation", Value: seondaryColumnOperation },
            { Key: "Rows in Chart", Value: rowsDescription },
        ];
        let summaryPage = React.createElement(WizardSummaryPage_1.WizardSummaryPage, { cssClassName: cssClassName, KeyValuePairs: keyValuePairs, header: StrategyConstants.ChartStrategyName });
        return React.createElement("div", { className: cssClassName }, summaryPage);
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
exports.PieChartSummaryWizard = PieChartSummaryWizard;
