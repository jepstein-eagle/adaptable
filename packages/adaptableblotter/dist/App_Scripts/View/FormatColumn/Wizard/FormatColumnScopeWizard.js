"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Core/Enums");
const ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
const StringExtensions_1 = require("../../../Core/Extensions/StringExtensions");
class FormatColumnScopeWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            ColumnId: this.props.Data.ColumnId
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-scope";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Choose a column to format", bsStyle: "primary" },
                React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_medium_margin" },
                    React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.ColumnId], ColumnList: this.props.Columns, onColumnChange: columns => this.onColumnSelectedChanged(columns), SelectionMode: Enums_1.SelectionMode.Single }))));
    }
    onColumnSelectedChanged(columns) {
        this.setState({ ColumnId: columns.length > 0 ? columns[0].ColumnId : "" }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ColumnId));
    }
    canBack() { return false; }
    Next() {
        this.props.Data.ColumnId = this.state.ColumnId;
    }
    Back() {
        //todo
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.FormatColumnScopeWizard = FormatColumnScopeWizard;
