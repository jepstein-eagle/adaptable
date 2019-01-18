"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const Enums_1 = require("../../../Utilities/Enums");
const ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
const ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
class UserFilterSelectColumnWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            ColumnId: props.Data.ColumnId
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-column";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Select a Column", bsStyle: "primary" },
                React.createElement(react_bootstrap_1.HelpBlock, null, "Choose which column the User Filter will apply to."),
                React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.ColumnId], ColumnList: this.props.Columns, onColumnChange: columns => this.onColumnSelectedChanged(columns), SelectionMode: Enums_1.SelectionMode.Single })));
    }
    onColumnSelectedChanged(columns) {
        this.setState({ ColumnId: columns.length > 0 ? columns[0].ColumnId : "" }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ColumnId));
    }
    canBack() { return true; }
    Next() {
        if (this.props.Data.ColumnId != this.state.ColumnId) {
            this.props.Data.Expression = ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression();
        }
        this.props.Data.ColumnId = this.state.ColumnId;
    }
    Back() {
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.UserFilterSelectColumnWizard = UserFilterSelectColumnWizard;
