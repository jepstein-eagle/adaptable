"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Core/Enums");
const StringExtensions_1 = require("../../../Core/Extensions/StringExtensions");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
class ConditionalStyleScopeWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            ColumnId: this.props.Data.ColumnId,
            ConditionalStyleScope: this.props.Data.ConditionalStyleScope,
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-scope";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Select Where the Conditional Style is Applied", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(react_bootstrap_1.Radio, { className: cssClassName + "__radiobutton", inline: true, value: "Row", checked: this.state.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Row, onChange: (e) => this.onScopeSelectChanged(e) }, "Whole Row"),
                        ' ',
                        " ",
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Conditional Style: Whole Row", bodyText: ["The conditional style will be applied to alls cells in each matching row."], MessageType: Enums_1.MessageType.Info })),
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(react_bootstrap_1.Radio, { className: cssClassName + "__radiobutton", inline: true, value: "Column", checked: this.state.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column, onChange: (e) => this.onScopeSelectChanged(e) }, "Column"),
                        ' ',
                        " ",
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Conditional Style: Single Column", bodyText: ["Pick the column from the list below which will have conditional style applied."], MessageType: Enums_1.MessageType.Info }))),
                React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                    React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, disabled: this.state.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Row, SelectedColumnIds: [this.state.ColumnId], ColumnList: this.props.Columns, onColumnChange: columns => this.onColumnSelectedChanged(columns), SelectionMode: Enums_1.SelectionMode.Single }))));
    }
    onColumnSelectedChanged(columns) {
        this.setState({ ColumnId: columns.length > 0 ? columns[0].ColumnId : "" }, () => this.props.UpdateGoBackState());
    }
    onScopeSelectChanged(event) {
        let e = event.target;
        if (e.value == "Column") {
            this.setState({ ConditionalStyleScope: Enums_1.ConditionalStyleScope.Column }, () => this.props.UpdateGoBackState());
        }
        else {
            this.setState({ ConditionalStyleScope: Enums_1.ConditionalStyleScope.Row, ColumnId: "" }, () => this.props.UpdateGoBackState());
        }
    }
    canNext() {
        if (!this.state.ConditionalStyleScope == null) {
            return false;
        }
        if (this.state.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ColumnId)) {
            return false;
        }
        return true;
    }
    canBack() { return false; }
    Next() {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.ConditionalStyleScope = this.state.ConditionalStyleScope;
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
exports.ConditionalStyleScopeWizard = ConditionalStyleScopeWizard;
