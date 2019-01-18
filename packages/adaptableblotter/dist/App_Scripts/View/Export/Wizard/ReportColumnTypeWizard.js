"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const Enums_1 = require("../../../Utilities/Enums");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
class ReportColumnTypeWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            ReportColumnScope: this.props.Data.ReportColumnScope
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-reportcolumns";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Select Columns for the Report", bsStyle: "primary" },
                React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                        React.createElement(react_bootstrap_1.Radio, { value: "All", checked: this.state.ReportColumnScope == Enums_1.ReportColumnScope.AllColumns, onChange: (e) => this.onScopeSelectChanged(e) },
                            ' ',
                            ' ',
                            ' ',
                            "All Columns in the Data Source"),
                        ' ',
                        " ",
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Report: All Columns", bodyText: ["All columns in the datasource will be included in the report, whether visible or not at time of export."], MessageType: Enums_1.MessageType.Info }))),
                React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                        React.createElement(react_bootstrap_1.Radio, { value: "Visible", checked: this.state.ReportColumnScope == Enums_1.ReportColumnScope.VisibleColumns, onChange: (e) => this.onScopeSelectChanged(e) },
                            ' ',
                            ' ',
                            " ",
                            ' ',
                            "Visible Columns Only (at time that report is run)"),
                        ' ',
                        " ",
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Report: Visible Columns", bodyText: ["Only columns that are visible at the time the Report is exported will be included in the Export."], MessageType: Enums_1.MessageType.Info }))),
                React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                        React.createElement(react_bootstrap_1.Radio, { value: "Bespoke", checked: this.state.ReportColumnScope == Enums_1.ReportColumnScope.BespokeColumns, onChange: (e) => this.onScopeSelectChanged(e) },
                            " ",
                            ' ',
                            ' ',
                            ' ',
                            "Bespoke Columns - selected by you in next step"),
                        ' ',
                        " ",
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Report: Bespoke Columns", bodyText: ["Only the columns chosen in next step will be exported (visible or not)."], MessageType: Enums_1.MessageType.Info })))));
    }
    onScopeSelectChanged(event) {
        let e = event.target;
        if (e.value == "All") {
            this.setState({ ReportColumnScope: Enums_1.ReportColumnScope.AllColumns, SelectedColumnValues: [] }, () => this.props.UpdateGoBackState());
        }
        else if (e.value == "Visible") {
            this.setState({ ReportColumnScope: Enums_1.ReportColumnScope.VisibleColumns, SelectedColumnValues: [] }, () => this.props.UpdateGoBackState());
        }
        else {
            this.setState({ ReportColumnScope: Enums_1.ReportColumnScope.BespokeColumns }, () => this.props.UpdateGoBackState());
        }
    }
    canNext() {
        return (this.state.ReportColumnScope == Enums_1.ReportColumnScope.AllColumns ||
            this.state.ReportColumnScope == Enums_1.ReportColumnScope.VisibleColumns ||
            this.state.ReportColumnScope == Enums_1.ReportColumnScope.BespokeColumns);
    }
    canBack() { return true; }
    Next() {
        this.props.Data.ReportColumnScope = this.state.ReportColumnScope;
        if (this.state.ReportColumnScope != Enums_1.ReportColumnScope.BespokeColumns) {
            this.props.Data.ColumnIds = [];
        }
    }
    Back() {
        //todo
    }
    GetIndexStepIncrement() {
        return (this.state.ReportColumnScope == Enums_1.ReportColumnScope.BespokeColumns) ? 1 : 2;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.ReportColumnTypeWizard = ReportColumnTypeWizard;
