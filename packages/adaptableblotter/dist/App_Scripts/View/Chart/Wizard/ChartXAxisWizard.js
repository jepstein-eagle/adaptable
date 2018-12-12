"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
const Enums_1 = require("../../../Utilities/Enums");
const GeneralConstants = require("../../../Utilities/Constants/GeneralConstants");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
const SingleListBox_1 = require("../../Components/ListBox/SingleListBox");
class ChartXAxisWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        let hasDistinctColumnValues = props.Data.XAxisColumnValues.length > 0 && props.Data.XAxisColumnValues[0] != GeneralConstants.ALL_COLUMN_VALUES;
        this.state = {
            XAxisColumn: props.Data.XAxisColumnId,
            XAxisColumnValues: props.Data.XAxisColumnValues,
            UseAllXAsisColumnValues: (hasDistinctColumnValues) ? false : true,
            AvailableXAxisColumnValues: (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.Data.XAxisColumnId)) ?
                props.Blotter.getColumnValueDisplayValuePairDistinctList(props.Data.XAxisColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue) :
                null
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-settings";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Chart Colum X Axis", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "xAxisColumn" },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 1 }),
                            React.createElement(react_bootstrap_1.Col, { xs: 10 },
                                React.createElement(react_bootstrap_1.Well, null, "Select a numeric column for the X Axis.")),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 })),
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 4, componentClass: react_bootstrap_1.ControlLabel }, "X Axis Column: "),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.XAxisColumn], ColumnList: this.props.Columns, onColumnChange: columns => this.onXAxisColumnChanged(columns), SelectionMode: Enums_1.SelectionMode.Single }))),
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 4, componentClass: react_bootstrap_1.ControlLabel }, "X Axis Column Values:"),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "All", checked: this.state.UseAllXAsisColumnValues == true, onChange: (e) => this.onUseAllColumnValuesChanged(e) }, "All"),
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "Bespoke", checked: this.state.UseAllXAsisColumnValues == false, onChange: (e) => this.onUseAllColumnValuesChanged(e) }, "Bespoke"))))),
                StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.XAxisColumn) && this.state.UseAllXAsisColumnValues == false &&
                    React.createElement(react_bootstrap_1.Row, null,
                        React.createElement(react_bootstrap_1.Col, { xs: 4 }),
                        React.createElement(react_bootstrap_1.Col, { xs: 6 },
                            React.createElement(react_bootstrap_1.Panel, { className: "ab_no-padding-anywhere-panel", style: divStyle },
                                React.createElement(SingleListBox_1.SingleListBox, { Values: this.state.AvailableXAxisColumnValues, cssClassName: cssClassName, UiSelectedValues: this.state.XAxisColumnValues, DisplayMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.DisplayValue], ValueMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.DisplayValue], SortMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.RawValue], onSelectedChange: (list) => this.onColumnValuesChange(list), SelectionMode: Enums_1.SelectionMode.Multi }))),
                        React.createElement(react_bootstrap_1.Col, { xs: 2 }))));
    }
    onUseAllColumnValuesChanged(event) {
        let e = event.target;
        let showAll = e.value == "All";
        let colValues = (showAll) ? [GeneralConstants.ALL_COLUMN_VALUES] : [];
        this.setState({ UseAllXAsisColumnValues: showAll, XAxisColumnValues: colValues }, () => this.props.UpdateGoBackState());
    }
    onXAxisColumnChanged(columns) {
        let isColumn = ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columns);
        this.setState({
            XAxisColumn: isColumn ? columns[0].ColumnId : "",
            UseAllXAsisColumnValues: true,
            XAxisColumnValues: [GeneralConstants.ALL_COLUMN_VALUES],
            AvailableXAxisColumnValues: isColumn ?
                this.props.Blotter.getColumnValueDisplayValuePairDistinctList(columns[0].ColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue) :
                null
        }, () => this.props.UpdateGoBackState());
    }
    onColumnValuesChange(list) {
        this.setState({ XAxisColumnValues: list }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.XAxisColumn) && ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.state.XAxisColumnValues));
    }
    canBack() { return true; }
    Next() {
        this.props.Data.XAxisColumnId = this.state.XAxisColumn;
        this.props.Data.XAxisColumnValues = this.state.XAxisColumnValues;
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
exports.ChartXAxisWizard = ChartXAxisWizard;
let divStyle = {
    'overflowY': 'auto',
    'height': '200px',
    'marginTop': '2px'
};
