"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Utilities/Enums");
const DualListBoxEditor_1 = require("../../Components/ListBox/DualListBoxEditor");
class ReportColumnChooserWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AllColumnValues: this.props.Columns.map(c => c.FriendlyName),
            SelectedColumnValues: this.props.Data.ColumnIds.map(c => this.props.Columns.find(col => col.ColumnId == c).FriendlyName),
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-choosecolumns";
        return React.createElement("div", { className: cssClassName }, this.props.Data.ReportColumnScope == Enums_1.ReportColumnScope.BespokeColumns &&
            React.createElement(react_bootstrap_1.Panel, null,
                React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: this.state.AllColumnValues, cssClassName: cssClassName, SelectedValues: this.state.SelectedColumnValues, HeaderAvailable: "Columns", HeaderSelected: "Columns in Report", onChange: (SelectedValues) => this.OnSelectedValuesChange(SelectedValues), ReducedDisplay: true })));
    }
    OnSelectedValuesChange(newValues) {
        this.setState({ SelectedColumnValues: newValues }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return (this.state.SelectedColumnValues.length > 0);
    }
    canBack() { return true; }
    Next() {
        this.props.Data.ColumnIds = this.state.SelectedColumnValues.map(c => this.props.Columns.find(col => col.FriendlyName == c).ColumnId);
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
exports.ReportColumnChooserWizard = ReportColumnChooserWizard;
