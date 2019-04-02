"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableBlotterForm_1 = require("../../../Components/Forms/AdaptableBlotterForm");
const ColumnSelector_1 = require("../../../Components/Selectors/ColumnSelector");
const Enums_1 = require("../../../../Utilities/Enums");
const ArrayExtensions_1 = require("../../../../Utilities/Extensions/ArrayExtensions");
const ChartEnums_1 = require("../../../../Utilities/ChartEnums");
const StringExtensions_1 = require("../../../../Utilities/Extensions/StringExtensions");
const ColumnHelper_1 = require("../../../../Utilities/Helpers/ColumnHelper");
class PieChartSecondaryColumnWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SecondaryColumnId: props.Data.SecondaryColumnId,
            SecondaryColumnOperation: props.Data.SecondaryColumnOperation,
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-settings";
        let secondaryColumnDataType = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.SecondaryColumnId) ?
            ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(this.state.SecondaryColumnId, this.props.Columns) :
            Enums_1.DataType.Unknown;
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Secondary Column", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "secondaryColumn" },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 1 }),
                            React.createElement(react_bootstrap_1.Col, { xs: 10 },
                                React.createElement(react_bootstrap_1.HelpBlock, null, "Select a Secondary Column for the Pie Chart.")),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 })),
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 4, componentClass: react_bootstrap_1.ControlLabel }, "Secondary Column: "),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, placeHolder: "Choose a column (optional)", SelectedColumnIds: [this.state.SecondaryColumnId], ColumnList: this.props.Columns, onColumnChange: columns => this.onSecondaryColumnChanged(columns), SelectionMode: Enums_1.SelectionMode.Single }))),
                        StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.SecondaryColumnId) && secondaryColumnDataType == Enums_1.DataType.Number &&
                            React.createElement("div", null,
                                React.createElement("br", null),
                                React.createElement(react_bootstrap_1.Row, null,
                                    React.createElement(react_bootstrap_1.Col, { xs: 1 }),
                                    React.createElement(react_bootstrap_1.Col, { xs: 10 },
                                        React.createElement(react_bootstrap_1.HelpBlock, null, "Choose whether to show a count for these values or to sum them")),
                                    React.createElement(react_bootstrap_1.Col, { xs: 1 })),
                                React.createElement(react_bootstrap_1.Row, null,
                                    React.createElement(react_bootstrap_1.Col, { xs: 4, componentClass: react_bootstrap_1.ControlLabel }, "Summary Type:"),
                                    React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: "Count", checked: this.state.SecondaryColumnOperation == ChartEnums_1.SecondaryColumnOperation.Count, onChange: (e) => this.onSecondaryColumnOperationChanged(e) }, "Count"),
                                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: "Sum", checked: this.state.SecondaryColumnOperation == ChartEnums_1.SecondaryColumnOperation.Sum, onChange: (e) => this.onSecondaryColumnOperationChanged(e) }, "Sum"))))))));
    }
    onSecondaryColumnOperationChanged(event) {
        let e = event.target;
        this.setState({ SecondaryColumnOperation: e.value }, () => this.props.UpdateGoBackState());
    }
    onSecondaryColumnChanged(columns) {
        let isColumn = ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columns);
        let secondaryColumnOperation = ChartEnums_1.SecondaryColumnOperation.Count;
        if (isColumn) {
            if (columns[0].DataType == Enums_1.DataType.Number) {
                secondaryColumnOperation = ChartEnums_1.SecondaryColumnOperation.Sum;
            }
        }
        this.setState({
            SecondaryColumnId: isColumn ? columns[0].ColumnId : "",
            SecondaryColumnOperation: secondaryColumnOperation
        }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return true;
    }
    canBack() { return true; }
    Next() {
        this.props.Data.SecondaryColumnId = this.state.SecondaryColumnId;
        this.props.Data.SecondaryColumnOperation = this.state.SecondaryColumnOperation;
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
exports.PieChartSecondaryColumnWizard = PieChartSecondaryColumnWizard;
