"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const Enums_1 = require("../../../Utilities/Enums");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
class ReportRowTypeWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            ReportRowScope: this.props.Data.ReportRowScope
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-ReportRows";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Select Rows for the Report", bsStyle: "primary" },
                React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                        React.createElement(react_bootstrap_1.Radio, { value: "All", checked: this.state.ReportRowScope == Enums_1.ReportRowScope.AllRows, onChange: (e) => this.onScopeSelectChanged(e) },
                            ' ',
                            ' ',
                            ' ',
                            "All Rows in the Data Source"),
                        ' ',
                        " ",
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Report: All Rows", bodyText: ["All rows in the datasource will be included in the report, whether visible or not at time of export."], MessageType: Enums_1.MessageType.Info }))),
                React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                        React.createElement(react_bootstrap_1.Radio, { value: "Visible", checked: this.state.ReportRowScope == Enums_1.ReportRowScope.VisibleRows, onChange: (e) => this.onScopeSelectChanged(e) },
                            ' ',
                            ' ',
                            " ",
                            ' ',
                            "Visible Rows Only (at time that report is run)"),
                        ' ',
                        " ",
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Report: Visible Rows", bodyText: ["Only rows that are visible at the time the Report is exported will be included in the Export."], MessageType: Enums_1.MessageType.Info }))),
                React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                        React.createElement(react_bootstrap_1.Radio, { value: "Expression", checked: this.state.ReportRowScope == Enums_1.ReportRowScope.ExpressionRows, onChange: (e) => this.onScopeSelectChanged(e) },
                            " ",
                            ' ',
                            ' ',
                            ' ',
                            "By Query - built by you in next step"),
                        ' ',
                        " ",
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Report: Bespoke Rows", bodyText: ["Only the rows which match the query will be exported (visible or not)."], MessageType: Enums_1.MessageType.Info })))));
    }
    onScopeSelectChanged(event) {
        let e = event.target;
        if (e.value == "All") {
            this.setState({ ReportRowScope: Enums_1.ReportRowScope.AllRows, SelectedColumnValues: [] }, () => this.props.UpdateGoBackState());
        }
        else if (e.value == "Visible") {
            this.setState({ ReportRowScope: Enums_1.ReportRowScope.VisibleRows, SelectedColumnValues: [] }, () => this.props.UpdateGoBackState());
        }
        else {
            this.setState({ ReportRowScope: Enums_1.ReportRowScope.ExpressionRows }, () => this.props.UpdateGoBackState());
        }
    }
    canNext() {
        return (this.state.ReportRowScope == Enums_1.ReportRowScope.AllRows ||
            this.state.ReportRowScope == Enums_1.ReportRowScope.VisibleRows ||
            this.state.ReportRowScope == Enums_1.ReportRowScope.ExpressionRows);
    }
    canBack() { return true; }
    Next() {
        this.props.Data.ReportRowScope = this.state.ReportRowScope;
        if (this.state.ReportRowScope != Enums_1.ReportRowScope.ExpressionRows) {
            this.props.Data.Expression = ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression();
        }
    }
    Back() {
        //todo
    }
    GetIndexStepIncrement() {
        return (this.state.ReportRowScope == Enums_1.ReportRowScope.ExpressionRows) ? 1 : 2;
    }
    GetIndexStepDecrement() {
        return (this.props.Data.ReportColumnScope == Enums_1.ReportColumnScope.BespokeColumns) ? 1 : 2;
    }
}
exports.ReportRowTypeWizard = ReportRowTypeWizard;
