"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableBlotterForm_1 = require("../../../Components/Forms/AdaptableBlotterForm");
const ColumnSelector_1 = require("../../../Components/Selectors/ColumnSelector");
const Enums_1 = require("../../../../Utilities/Enums");
const ArrayExtensions_1 = require("../../../../Utilities/Extensions/ArrayExtensions");
const StringExtensions_1 = require("../../../../Utilities/Extensions/StringExtensions");
class PieChartPrimaryColumnWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PrimaryColumnId: props.Data.PrimaryColumnId,
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-settings";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Primary Column", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "primaryColumn" },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 1 }),
                            React.createElement(react_bootstrap_1.Col, { xs: 10 },
                                React.createElement(react_bootstrap_1.HelpBlock, null,
                                    "Select a Primary Column for the Pie Chart.",
                                    React.createElement("br", null))),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 })),
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 4, componentClass: react_bootstrap_1.ControlLabel }, "Primary Column: "),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.PrimaryColumnId], ColumnList: this.props.Columns, onColumnChange: columns => this.onPrimaryColumnChanged(columns), SelectionMode: Enums_1.SelectionMode.Single })))))));
    }
    onPrimaryColumnChanged(columns) {
        let isColumn = ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(columns);
        this.setState({
            PrimaryColumnId: isColumn ? columns[0].ColumnId : "",
        }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.PrimaryColumnId));
    }
    canBack() { return true; }
    Next() {
        this.props.Data.PrimaryColumnId = this.state.PrimaryColumnId;
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
exports.PieChartPrimaryColumnWizard = PieChartPrimaryColumnWizard;
