"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
const Enums_1 = require("../../../Utilities/Enums");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
const ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
class ChartXSegmentColumnWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AdditionalColumnId: props.Data.XSegmentColumnId,
            UseAllAdditionalColumnValues: ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(this.props.Data.XSegmentExpression),
            XSegmentExpression: this.props.Data.XSegmentExpression
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-settings";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "X Axis Additional Column", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "additionalColumn" },
                        React.createElement(react_bootstrap_1.Row, null,
                            "  ",
                            React.createElement(react_bootstrap_1.Col, { xs: 1 }),
                            React.createElement(react_bootstrap_1.Col, { xs: 10 },
                                React.createElement(react_bootstrap_1.HelpBlock, null, "You can, optionally, segment the X Axis further by grouping totals against the values in another column")),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 })),
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 4, componentClass: react_bootstrap_1.ControlLabel }, "Additional Column: "),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.AdditionalColumnId], ColumnList: this.props.Columns, onColumnChange: columns => this.onAdditionalColumnChanged(columns), SelectionMode: Enums_1.SelectionMode.Single }))),
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 4, componentClass: react_bootstrap_1.ControlLabel }, "Additional Column Values:"),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "All", checked: this.state.UseAllAdditionalColumnValues == true, onChange: (e) => this.onUseAllColumnValuesChanged(e) }, "All"),
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "Bespoke", checked: this.state.UseAllAdditionalColumnValues == false, onChange: (e) => this.onUseAllColumnValuesChanged(e) }, "Bespoke")))))));
    }
    onUseAllColumnValuesChanged(event) {
        let e = event.target;
        let showAll = e.value == "All";
        this.setState({ UseAllAdditionalColumnValues: showAll }, () => this.props.UpdateGoBackState());
    }
    onAdditionalColumnChanged(columns) {
        let isColumn = ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columns);
        this.setState({
            AdditionalColumnId: isColumn ? columns[0].ColumnId : "",
            UseAllAdditionalColumnValues: true,
        }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return true; /// its not mandatory.... (StringExtensions.IsNotNullOrEmpty(this.state.AdditionalColumnId))
    }
    canBack() { return true; }
    Next() {
        this.props.Data.XSegmentColumnId = this.state.AdditionalColumnId;
        this.props.Data.XSegmentExpression = (this.state.UseAllAdditionalColumnValues) ? ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression() : this.state.XSegmentExpression;
        if (this.props.Data.XSegmentColumnId != this.state.AdditionalColumnId) {
            this.props.Data.XSegmentExpression = ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression();
        }
    }
    Back() {
        // todo
    }
    GetIndexStepIncrement() {
        return (this.state.UseAllAdditionalColumnValues) ? 2 : 1;
    }
    GetIndexStepDecrement() {
        return (ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(this.props.Data.XAxisExpression)) ? 2 : 1;
    }
}
exports.ChartXSegmentColumnWizard = ChartXSegmentColumnWizard;
