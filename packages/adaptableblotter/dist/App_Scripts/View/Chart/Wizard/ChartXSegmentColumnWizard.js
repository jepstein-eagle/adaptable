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
            XSegmentColumnId: props.Data.XSegmentColumnId,
            UseAllXSegmentColumnValues: ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(this.props.Data.XSegmentExpression),
            XSegmentExpression: this.props.Data.XSegmentExpression
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-settings";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "X Axis Segment Column", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "segmentColumn" },
                        React.createElement(react_bootstrap_1.Row, null,
                            "  ",
                            React.createElement(react_bootstrap_1.Col, { xs: 1 }),
                            React.createElement(react_bootstrap_1.Col, { xs: 10 },
                                React.createElement(react_bootstrap_1.HelpBlock, null, "You can, optionally, segment the X Axis further by grouping totals against the values in another column")),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 })),
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 4, componentClass: react_bootstrap_1.ControlLabel }, "Segment Column: "),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.XSegmentColumnId], ColumnList: this.props.Columns, onColumnChange: columns => this.onSegmentColumnChanged(columns), SelectionMode: Enums_1.SelectionMode.Single }))),
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 4, componentClass: react_bootstrap_1.ControlLabel }, "Segment Column Values:"),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "All", checked: this.state.UseAllXSegmentColumnValues == true, onChange: (e) => this.onUseAllColumnValuesChanged(e) }, "All"),
                                React.createElement(react_bootstrap_1.Radio, { inline: true, value: "Bespoke", checked: this.state.UseAllXSegmentColumnValues == false, onChange: (e) => this.onUseAllColumnValuesChanged(e) }, "Bespoke")))))));
    }
    onUseAllColumnValuesChanged(event) {
        let e = event.target;
        let showAll = e.value == "All";
        this.setState({ UseAllXSegmentColumnValues: showAll }, () => this.props.UpdateGoBackState());
    }
    onSegmentColumnChanged(columns) {
        let isColumn = ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columns);
        this.setState({
            XSegmentColumnId: isColumn ? columns[0].ColumnId : "",
            UseAllXSegmentColumnValues: true,
        }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return true; /// its not mandatory
    }
    canBack() { return true; }
    Next() {
        this.props.Data.XSegmentColumnId = this.state.XSegmentColumnId;
        this.props.Data.XSegmentExpression = (this.state.UseAllXSegmentColumnValues) ? ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression() : this.state.XSegmentExpression;
        if (this.props.Data.XSegmentColumnId != this.state.XSegmentColumnId) {
            this.props.Data.XSegmentExpression = ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression();
        }
    }
    Back() {
        // todo
    }
    GetIndexStepIncrement() {
        return (this.state.UseAllXSegmentColumnValues) ? 2 : 1;
    }
    GetIndexStepDecrement() {
        return (ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(this.props.Data.XAxisExpression)) ? 2 : 1;
    }
}
exports.ChartXSegmentColumnWizard = ChartXSegmentColumnWizard;
