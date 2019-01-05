"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
const Enums_1 = require("../../../Utilities/Enums");
const ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
const ChartEnums_1 = require("../../../Utilities/ChartEnums");
class ChartYAxisWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            YAxisColumnIds: props.Data.YAxisColumnIds,
            YAxisTotal: props.Data.YAxisTotal
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-settings";
        let newLabelText = "Y Axis Column";
        let idsCount = this.state.YAxisColumnIds.length + 1;
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.state.YAxisColumnIds)) {
            let additionalLabelTextString = ' (' + idsCount + ')';
            newLabelText = newLabelText + additionalLabelTextString;
        }
        let availableCols = this.getAvailableNumericColumns("");
        let newRow = ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(availableCols) ?
            this.createRow(idsCount, newLabelText, cssClassName, "", this.state.YAxisColumnIds.length, availableCols)
            : null;
        let existingColumnRows = this.state.YAxisColumnIds.map((colId, index) => {
            let columnNumber = index + 1;
            let labelText = "Y Axis Column (" + columnNumber + ")";
            let availableNumericCols = this.getAvailableNumericColumns(colId);
            return this.createRow(columnNumber, labelText, cssClassName, colId, index, availableNumericCols);
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Chart Colum Y Axis", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "yAxisColumn" },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 1 }),
                            React.createElement(react_bootstrap_1.Col, { xs: 10 },
                                React.createElement(react_bootstrap_1.Well, null,
                                    "Select numeric column(s) for the Y Axis. ",
                                    React.createElement("br", null),
                                    "This will show grouped totals according to values in the X Axis.")),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 })),
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 3, componentClass: react_bootstrap_1.ControlLabel }, "Display Total:"),
                            React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "Sum", checked: this.state.YAxisTotal == ChartEnums_1.AxisTotal.Sum, onChange: (e) => this.onYAisTotalChanged(e) }, "Sum"),
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "Average", checked: this.state.YAxisTotal == ChartEnums_1.AxisTotal.Average, onChange: (e) => this.onYAisTotalChanged(e) }, "Average"))),
                        existingColumnRows,
                        newRow))));
    }
    createRow(columnNumber, labelText, cssClassName, colId, index, availableCols) {
        return React.createElement(react_bootstrap_1.Row, { key: columnNumber, style: { marginTop: '10px' } },
            React.createElement(react_bootstrap_1.Col, { xs: 3, componentClass: react_bootstrap_1.ControlLabel }, labelText),
            React.createElement(react_bootstrap_1.Col, { xs: 8 },
                React.createElement(ColumnSelector_1.ColumnSelector, { key: "colSelect" + columnNumber, cssClassName: cssClassName, SelectedColumnIds: [colId], ColumnList: availableCols, onColumnChange: columns => this.onYAxisColumnChanged(columns, index), SelectionMode: Enums_1.SelectionMode.Single })));
    }
    onYAxisColumnChanged(columns, index) {
        let column = columns.length > 0 ? columns[0].ColumnId : "";
        let currentColumns = this.state.YAxisColumnIds;
        if (column == "") {
            if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(currentColumns)) {
                currentColumns.splice(index, 1);
            }
        }
        else {
            if (currentColumns.length <= index) {
                currentColumns.push(column);
            }
            else {
                currentColumns[index] = column;
            }
        }
        this.setState({ YAxisColumnIds: currentColumns }, () => this.props.UpdateGoBackState());
    }
    onYAisTotalChanged(event) {
        let e = event.target;
        let axisTotal = (e.value == "Sum") ? ChartEnums_1.AxisTotal.Sum : ChartEnums_1.AxisTotal.Average;
        this.setState({ YAxisTotal: axisTotal }, () => this.props.UpdateGoBackState());
    }
    getAvailableNumericColumns(selectedColumnId) {
        let cols = [];
        ColumnHelper_1.ColumnHelper.getNumericColumns(this.props.Columns).forEach(c => {
            if (c.ColumnId == selectedColumnId) {
                cols.push(c);
            }
            else {
                ArrayExtensions_1.ArrayExtensions.AddItem(this.state.YAxisColumnIds, c.ColumnId);
            }
        });
        return cols;
    }
    canNext() {
        return (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.state.YAxisColumnIds));
    }
    canBack() { return true; }
    Next() {
        this.props.Data.YAxisColumnIds = this.state.YAxisColumnIds;
        this.props.Data.YAxisTotal = this.state.YAxisTotal;
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
