"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Core/Extensions/StringExtensions");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
const Enums_1 = require("../../../Core/Enums");
const ColumnHelper_1 = require("../../../Core/Helpers/ColumnHelper");
class ChartYAxisWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            YAxisColumn: props.Data.YAxisColumn,
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-settings";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Chart Colum Y Axis", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "yAxisColumn" },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 1 }),
                            React.createElement(react_bootstrap_1.Col, { xs: 10 },
                                React.createElement(react_bootstrap_1.Well, null,
                                    "Select a numeric column for the Y Axis. ",
                                    React.createElement("br", null),
                                    "This will show grouped totals accorrding to values in the X Axis.")),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 })),
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 3, componentClass: react_bootstrap_1.ControlLabel }, "Y Axis Column: "),
                            React.createElement(react_bootstrap_1.Col, { xs: 8 },
                                React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.YAxisColumn], ColumnList: ColumnHelper_1.ColumnHelper.getNumericColumns(this.props.Columns), onColumnChange: columns => this.onYAxisColumnChanged(columns), SelectionMode: Enums_1.SelectionMode.Single })))))));
    }
    onYAxisColumnChanged(columns) {
        this.setState({
            YAxisColumn: columns.length > 0 ? columns[0].ColumnId : ""
        }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.YAxisColumn));
    }
    canBack() { return true; }
    Next() {
        this.props.Data.YAxisColumn = this.state.YAxisColumn;
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
exports.ChartYAxisWizard = ChartYAxisWizard;
