"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Utilities/Enums");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
class PercentBarValuesWizard extends React.Component {
    constructor(props) {
        super(props);
        this.onMinValueChanged = (e) => {
            this.setState({ MinValue: e.target.value }, () => this.props.UpdateGoBackState());
        };
        this.onMaxValueChanged = (e) => {
            this.setState({ MaxValue: e.target.value }, () => this.props.UpdateGoBackState());
        };
        this.state = {
            MinValue: this.props.Data.MinValue,
            MaxValue: this.props.Data.MaxValue,
            MinValueColumnId: this.props.Data.MinValueColumnId,
            MaxValueColumnId: this.props.Data.MaxValueColumnId,
            UseMinColumn: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.Data.MinValueColumnId),
            UseMaxColumn: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.Data.MaxValueColumnId),
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-s";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Minimum Value", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, null,
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "formMinimumValueSelect" },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(react_bootstrap_1.ControlLabel, null, "Use:")),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "value", checked: this.state.UseMinColumn == false, onChange: (e) => this.onUseMinColumnSelectChanged(e) }, "Static Value"),
                                ' ',
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "column", checked: this.state.UseMinColumn == true, onChange: (e) => this.onUseMinColumnSelectChanged(e) }, "Another Column Value"),
                                React.createElement("span", { style: { marginLeft: '10px' } },
                                    React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Percent Bar: Minimum Value", bodyText: ["The minimum value of the column (can be minus).  Defaults to the currenty smallest value in the column.  If the column only contains positive numbers use 0.  Additionally, you can set the value to be that in another column."] })))),
                        React.createElement(react_bootstrap_1.Row, { style: { marginTop: '10px' } },
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(react_bootstrap_1.ControlLabel, null, this.state.UseMinColumn == false ?
                                    'Value'
                                    :
                                        'Column')),
                            React.createElement(react_bootstrap_1.Col, { xs: 5 }, this.state.UseMinColumn == false ?
                                React.createElement(react_bootstrap_1.FormControl, { type: "number", placeholder: "Enter Number", onChange: this.onMinValueChanged, value: this.state.MinValue })
                                :
                                    React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.MinValueColumnId], ColumnList: this.props.Columns, onColumnChange: columns => this.onColumnMinValueSelectedChanged(columns), SelectionMode: Enums_1.SelectionMode.Single })))))),
            React.createElement(react_bootstrap_1.Panel, { header: "Maximum Value", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, null,
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "formMaximumValueSelect" },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(react_bootstrap_1.ControlLabel, null, "Use:")),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "value", checked: this.state.UseMaxColumn == false, onChange: (e) => this.onUseMaxColumnSelectChanged(e) }, "Static Value"),
                                ' ',
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "column", checked: this.state.UseMaxColumn == true, onChange: (e) => this.onUseMaxColumnSelectChanged(e) }, "Another Column Value"),
                                React.createElement("span", { style: { marginLeft: '10px' } },
                                    React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Percent Bar: Maximum Value", bodyText: ["The maximum value of the bar.  Defaults to the currently largest value in the column.  Additionally, you can set the value to be that in another column."] })))),
                        React.createElement(react_bootstrap_1.Row, { style: { marginTop: '10px' } },
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(react_bootstrap_1.ControlLabel, null, this.state.UseMaxColumn == false ?
                                    'Value'
                                    :
                                        'Column')),
                            React.createElement(react_bootstrap_1.Col, { xs: 5 }, this.state.UseMaxColumn == false ?
                                React.createElement(react_bootstrap_1.FormControl, { type: "number", placeholder: "Enter Number", onChange: this.onMaxValueChanged, value: this.state.MaxValue })
                                :
                                    React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.MaxValueColumnId], ColumnList: this.props.Columns, onColumnChange: columns => this.onColumnMaxValueSelectedChanged(columns), SelectionMode: Enums_1.SelectionMode.Single })))))));
    }
    onUseMinColumnSelectChanged(event) {
        let e = event.target;
        this.setState({ UseMinColumn: (e.value == "column") }, () => this.props.UpdateGoBackState());
    }
    onColumnMinValueSelectedChanged(columns) {
        this.setState({ MinValueColumnId: columns.length > 0 ? columns[0].ColumnId : "" }, () => this.props.UpdateGoBackState());
    }
    onUseMaxColumnSelectChanged(event) {
        let e = event.target;
        this.setState({ UseMaxColumn: (e.value == "column") }, () => this.props.UpdateGoBackState());
    }
    onColumnMaxValueSelectedChanged(columns) {
        this.setState({ MaxValueColumnId: columns.length > 0 ? columns[0].ColumnId : "" }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.Data.ColumnId)) {
            return false;
        }
        if (this.state.UseMinColumn && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.MinValueColumnId)) {
            return false;
        }
        if (this.state.UseMaxColumn && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.MaxValueColumnId)) {
            return false;
        }
        return true;
    }
    canBack() { return true; }
    Next() {
        this.props.Data.MinValue = (this.state.UseMinColumn) ? 0 : this.state.MinValue;
        this.props.Data.MaxValue = (this.state.UseMaxColumn) ? 100 : this.state.MaxValue;
        this.props.Data.MinValueColumnId = (this.state.UseMinColumn) ? this.state.MinValueColumnId : null;
        this.props.Data.MaxValueColumnId = (this.state.UseMaxColumn) ? this.state.MaxValueColumnId : null;
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
exports.PercentBarValuesWizard = PercentBarValuesWizard;
