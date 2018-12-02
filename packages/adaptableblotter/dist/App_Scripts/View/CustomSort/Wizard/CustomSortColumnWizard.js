"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Utilities/Enums");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
class CustomSortColumnWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = { SelectedColumnId: this.props.Data.ColumnId };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-column";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Select a Column", bsStyle: "primary" },
                React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.SelectedColumnId], ColumnList: this.props.Columns, onColumnChange: columns => this.onColumnSelectedChanged(columns), SelectionMode: Enums_1.SelectionMode.Single })));
    }
    onColumnSelectedChanged(columns) {
        this.setState({ SelectedColumnId: columns.length > 0 ? columns[0].ColumnId : "" }, () => this.props.UpdateGoBackState());
    }
    canNext() { return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId)); }
    canBack() { return true; }
    Next() { this.props.Data.ColumnId = this.state.SelectedColumnId; }
    // tslint:disable-next-line:no-empty
    Back() { }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.CustomSortColumnWizard = CustomSortColumnWizard;
