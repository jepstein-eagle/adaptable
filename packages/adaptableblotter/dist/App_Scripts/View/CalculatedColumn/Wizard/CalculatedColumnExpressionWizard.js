"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
class CalculatedColumnExpressionWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = { ColumnExpression: this.props.Data.ColumnExpression };
    }
    render() {
        let validationState = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.GetErrorMessage()) ? null : "error";
        let cssClassName = this.props.cssClassName + "-expression";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Calculated Column Expression", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, null,
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName", validationState: validationState },
                        React.createElement(react_bootstrap_1.FormControl, { value: this.state.ColumnExpression, componentClass: "textarea", placeholder: "Enter expression", onChange: (e) => this.handleExpressionChange(e) }),
                        React.createElement(react_bootstrap_1.FormControl.Feedback, null),
                        React.createElement(react_bootstrap_1.HelpBlock, null, this.props.GetErrorMessage())))));
    }
    handleExpressionChange(event) {
        let e = event.target;
        this.props.IsExpressionValid(e.value);
        this.setState({ ColumnExpression: e.value }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ColumnExpression)
            && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.GetErrorMessage());
    }
    canBack() { return true; }
    Next() { this.props.Data.ColumnExpression = this.state.ColumnExpression; }
    Back() {
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.CalculatedColumnExpressionWizard = CalculatedColumnExpressionWizard;
