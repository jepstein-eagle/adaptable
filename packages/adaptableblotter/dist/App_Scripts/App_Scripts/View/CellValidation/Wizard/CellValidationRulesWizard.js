"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Core/Enums");
const StringExtensions_1 = require("../../../Core/Extensions/StringExtensions");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const ExpressionHelper_1 = require("../../../Core/Helpers/ExpressionHelper");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ColumnHelper_1 = require("../../../Core/Helpers/ColumnHelper");
class CellValidationRulesWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            Operator: this.props.Data.Range.Operator,
            Operand1: this.props.Data.Range.Operand1,
            Operand2: this.props.Data.Range.Operand2,
        };
    }
    render() {
        let operatorTypes = this.getAvailableOperators().map((operator) => {
            return React.createElement("option", { key: operator, value: operator.toString() }, ExpressionHelper_1.ExpressionHelper.OperatorToLongFriendlyString(operator, ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns)));
        });
        let columnFriendlyName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns);
        let validationRuleHeader = "Validation Rule for Column: " + columnFriendlyName;
        let helpText = "Choose whether to prevent all edits for this column, or whether to allow those which match a rule (to be set by you).";
        let cssClassName = this.props.cssClassName + "-rules";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: validationRuleHeader, bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, null,
                    React.createElement(react_bootstrap_1.Col, { xs: 12 },
                        React.createElement(react_bootstrap_1.HelpBlock, null, helpText)),
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: "None", checked: this.state.Operator == Enums_1.LeafExpressionOperator.None, onChange: (e) => this.onDisallowEditChanged(e) }, "Disallow ALL edits"),
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Validation Rule: No Edits Allowed", bodyText: ["Any edit is invalid - effectively makes the column read-only."], MessageType: Enums_1.MessageType.Info })),
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: "others", checked: this.state.Operator != Enums_1.LeafExpressionOperator.None, onChange: (e) => this.onDisallowEditChanged(e) }, "Disallow edits where the new cell value matches rule:"),
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Validation Rule: Custom", bodyText: ["Disallow edits that match the rule defined in the dropdown below."], MessageType: Enums_1.MessageType.Info }))),
                React.createElement(react_bootstrap_1.FormGroup, { className: "ab_large_margin" },
                    React.createElement(react_bootstrap_1.Col, { xs: 1 }),
                    React.createElement(react_bootstrap_1.Col, { xs: 6 },
                        React.createElement(react_bootstrap_1.FormControl, { disabled: this.checkOperator(Enums_1.LeafExpressionOperator.None), componentClass: "select", placeholder: "select", value: this.state.Operator.toString(), onChange: (x) => this.onOperatorChanged(x) }, operatorTypes)),
                    !this.checkOperator(Enums_1.LeafExpressionOperator.None) && !this.checkOperator(Enums_1.LeafExpressionOperator.Unknown) && !this.checkOperator(Enums_1.LeafExpressionOperator.IsPositive) && !this.checkOperator(Enums_1.LeafExpressionOperator.IsNegative) && !this.checkOperator(Enums_1.LeafExpressionOperator.IsNotNumber) && ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns) == Enums_1.DataType.Number &&
                        React.createElement(react_bootstrap_1.Col, { xs: 5 },
                            React.createElement(react_bootstrap_1.FormControl, { value: this.state.Operand1, type: "number", placeholder: "Enter Number", onChange: (x) => this.onOperand1ValueChanged(x) }),
                            this.isBetweenOperator() &&
                                React.createElement(react_bootstrap_1.FormControl, { value: this.state.Operand2, type: "number", placeholder: "Enter Number", onChange: (x) => this.onOperand2ValueChanged(x) })),
                    !this.checkOperator(Enums_1.LeafExpressionOperator.None) && !this.checkOperator(Enums_1.LeafExpressionOperator.Unknown) && ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns) == Enums_1.DataType.Date &&
                        React.createElement(react_bootstrap_1.Col, { xs: 5 },
                            React.createElement(react_bootstrap_1.FormControl, { type: "date", placeholder: "Enter Date", value: this.state.Operand1, onChange: (x) => this.onOperand1ValueChanged(x) }),
                            this.isBetweenOperator() &&
                                React.createElement(react_bootstrap_1.FormControl, { value: this.state.Operand2, type: "date", placeholder: "Enter Date", onChange: (x) => this.onOperand2ValueChanged(x) })),
                    !this.checkOperator(Enums_1.LeafExpressionOperator.None) && !this.checkOperator(Enums_1.LeafExpressionOperator.Unknown) && !this.checkOperator(Enums_1.LeafExpressionOperator.NoDuplicates) && ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns) == Enums_1.DataType.String &&
                        React.createElement(react_bootstrap_1.Col, { xs: 5 },
                            React.createElement(react_bootstrap_1.FormControl, { value: this.state.Operand1, type: "string", placeholder: "Enter a Value", onChange: (x) => this.onOperand1ValueChanged(x) })))));
    }
    onOperatorChanged(event) {
        let e = event.target;
        this.setState({ Operator: e.value, Operand1: "", Operand2: "" }, () => this.props.UpdateGoBackState());
    }
    onOperand1ValueChanged(event) {
        let e = event.target;
        this.setState({ Operand1: e.value }, () => this.props.UpdateGoBackState());
    }
    onOperand2ValueChanged(event) {
        let e = event.target;
        this.setState({ Operand2: e.value }, () => this.props.UpdateGoBackState());
    }
    onDisallowEditChanged(event) {
        let e = event.target;
        let operator = (e.value == "None") ? Enums_1.LeafExpressionOperator.None : Enums_1.LeafExpressionOperator.Unknown;
        this.setState({ Operator: operator }, () => this.props.UpdateGoBackState());
    }
    checkOperator(operator) {
        return this.state.Operator == operator;
    }
    isBetweenOperator() {
        return this.checkOperator(Enums_1.LeafExpressionOperator.Between) || this.checkOperator(Enums_1.LeafExpressionOperator.NotBetween);
    }
    getAvailableOperators() {
        switch (ColumnHelper_1.ColumnHelper.getColumnDataTypeFromColumnId(this.props.Data.ColumnId, this.props.Columns)) {
            case Enums_1.DataType.Boolean:
                return [Enums_1.LeafExpressionOperator.Unknown, Enums_1.LeafExpressionOperator.IsTrue, Enums_1.LeafExpressionOperator.IsFalse];
            case Enums_1.DataType.String:
                return [Enums_1.LeafExpressionOperator.Unknown, Enums_1.LeafExpressionOperator.Equals, Enums_1.LeafExpressionOperator.NotEquals, Enums_1.LeafExpressionOperator.Contains, Enums_1.LeafExpressionOperator.NotContains, Enums_1.LeafExpressionOperator.StartsWith, Enums_1.LeafExpressionOperator.Regex, Enums_1.LeafExpressionOperator.NoDuplicates];
            case Enums_1.DataType.Date:
                return [Enums_1.LeafExpressionOperator.Unknown, Enums_1.LeafExpressionOperator.Equals, Enums_1.LeafExpressionOperator.NotEquals, Enums_1.LeafExpressionOperator.GreaterThan, Enums_1.LeafExpressionOperator.LessThan, Enums_1.LeafExpressionOperator.Between, Enums_1.LeafExpressionOperator.NotBetween];
            case Enums_1.DataType.Number:
                return [Enums_1.LeafExpressionOperator.Unknown, Enums_1.LeafExpressionOperator.Equals, Enums_1.LeafExpressionOperator.NotEquals, Enums_1.LeafExpressionOperator.LessThan, Enums_1.LeafExpressionOperator.GreaterThan, Enums_1.LeafExpressionOperator.Between, Enums_1.LeafExpressionOperator.NotBetween, Enums_1.LeafExpressionOperator.IsPositive, Enums_1.LeafExpressionOperator.IsNegative, Enums_1.LeafExpressionOperator.ValueChange, Enums_1.LeafExpressionOperator.PercentChange, Enums_1.LeafExpressionOperator.IsNotNumber];
        }
    }
    canNext() {
        if (!ExpressionHelper_1.ExpressionHelper.OperatorRequiresValue(this.state.Operator)) {
            return true;
        }
        if (this.checkOperator(Enums_1.LeafExpressionOperator.Unknown)) {
            return false;
        }
        if (this.isBetweenOperator() && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.Operand2)) {
            return false;
        }
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.Operand1);
    }
    canBack() { return true; }
    Next() {
        let rangeExpression = {
            Operator: this.state.Operator,
            Operand1: this.state.Operand1,
            Operand2: this.state.Operand2,
            Operand1Type: Enums_1.RangeOperandType.Value,
            Operand2Type: Enums_1.RangeOperandType.Value
        };
        this.props.Data.Range = rangeExpression;
        //     this.props.Data.Description = this.createCellValidationDescription(this.props.Data);
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
exports.CellValidationRulesWizard = CellValidationRulesWizard;
