"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ChartEnums_1 = require("../../../../Utilities/ChartEnums");
const ColumnHelper_1 = require("../../../../Utilities/Helpers/ColumnHelper");
const ArrayExtensions_1 = require("../../../../Utilities/Extensions/ArrayExtensions");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableBlotterForm_1 = require("../../../Components/Forms/AdaptableBlotterForm");
const AdaptablePopover_1 = require("../../../AdaptablePopover");
const DualListBoxEditor_1 = require("../../../Components/ListBox/DualListBoxEditor");
class CategoryChartYAxisWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            YAxisColumnIds: props.Data.YAxisColumnIds,
            YAxisTotal: props.Data.YAxisTotal,
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-settings";
        let numericColumnIds = ColumnHelper_1.ColumnHelper.getNumericColumns(this.props.Columns).map(c => { return c.ColumnId; });
        let availableColumns = numericColumnIds.filter(c => ArrayExtensions_1.ArrayExtensions.NotContainsItem(this.state.YAxisColumnIds, c)).map(ac => {
            return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(ac, this.props.Columns);
        });
        let existingColumns = this.state.YAxisColumnIds.map(ec => {
            return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(ec, this.props.Columns);
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Chart: Y (Vertical) Axis Column(s)", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "yAxisColumn" },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 3, componentClass: react_bootstrap_1.ControlLabel }, "Display Total:"),
                            React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "Sum", checked: this.state.YAxisTotal == ChartEnums_1.AxisTotal.Sum, onChange: (e) => this.onYAisTotalChanged(e) }, "Sum"),
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "Average", checked: this.state.YAxisTotal == ChartEnums_1.AxisTotal.Average, onChange: (e) => this.onYAisTotalChanged(e) }, "Average"),
                                ' ',
                                " ",
                                ' ',
                                React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Chart Y Axis: Display Total", bodyText: ["Choose whether the X Axis is grouped according to the sum of it values (by X Axis) or their average."] }))))),
                React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: availableColumns, cssClassName: cssClassName, SelectedValues: existingColumns, HeaderAvailable: "Numeric Columns", HeaderSelected: "Y Axis Columns", onChange: (SelectedValues) => this.OnSelectedValuesChange(SelectedValues), DisplaySize: DualListBoxEditor_1.DisplaySize.XSmall })));
    }
    OnSelectedValuesChange(newValues) {
        let yAxisColumnIds = ColumnHelper_1.ColumnHelper.getColumnIdsFromFriendlyNames(newValues, this.props.Columns);
        this.setState({ YAxisColumnIds: yAxisColumnIds }, () => this.props.UpdateGoBackState());
    }
    onYAisTotalChanged(event) {
        let e = event.target;
        let axisTotal = (e.value == "Sum") ? ChartEnums_1.AxisTotal.Sum : ChartEnums_1.AxisTotal.Average;
        this.setState({ YAxisTotal: axisTotal }, () => this.props.UpdateGoBackState());
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
exports.CategoryChartYAxisWizard = CategoryChartYAxisWizard;
