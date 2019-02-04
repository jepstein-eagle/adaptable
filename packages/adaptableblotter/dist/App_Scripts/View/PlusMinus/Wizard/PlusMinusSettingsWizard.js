"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
class PlusMinusSettingsWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            NudgeValue: this.props.Data.NudgeValue,
            IsDefaultNudge: this.props.Data.IsDefaultNudge
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-settings";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Plus/Minus Settings", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "nudgeColumn" },
                        React.createElement(react_bootstrap_1.Col, { xs: 3, componentClass: react_bootstrap_1.ControlLabel }, "Nudge Value: "),
                        React.createElement(react_bootstrap_1.Col, { xs: 9 },
                            React.createElement(react_bootstrap_1.FormControl, { value: this.state.NudgeValue.toString(), type: "number", placeholder: "Enter a Number", onChange: (e) => this.onColumnDefaultNudgeValueChange(e) }))),
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "applyTo" },
                        React.createElement(react_bootstrap_1.Col, { xs: 3, componentClass: react_bootstrap_1.ControlLabel }, "Apply As: "),
                        React.createElement(react_bootstrap_1.Col, { xs: 9 },
                            React.createElement(react_bootstrap_1.Radio, { value: "expression", checked: !this.state.IsDefaultNudge, onChange: (e) => this.onExpressionOptionChange(e) },
                                "Custom Plus/Minus Rule ",
                                ' ',
                                React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Plus Minus Settings: Apply As", bodyText: ["Create a Custom Plus/Minus Rule (using the Query Builder in the next step of the wizard)"] })),
                            React.createElement(react_bootstrap_1.Radio, { value: "default", checked: this.state.IsDefaultNudge, onChange: (e) => this.onExpressionOptionChange(e) },
                                "Default Nudge Value for Column ",
                                ' ',
                                React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Plus Minus Settings: Apply As", bodyText: ["Set default nudge value for the column"] })))))));
    }
    onExpressionOptionChange(event) {
        let e = event.target;
        let isDefault = (e.value == "default");
        this.setState({ IsDefaultNudge: isDefault }, () => this.props.UpdateGoBackState());
    }
    onColumnDefaultNudgeValueChange(event) {
        let e = event.target;
        this.setState({ NudgeValue: parseFloat(e.value) }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return Number.isFinite(this.state.NudgeValue);
        //  && this.state.IsDefaultNudge==false;
    }
    canBack() { return true; }
    Next() {
        this.props.Data.NudgeValue = this.state.NudgeValue;
        this.props.Data.IsDefaultNudge = this.state.IsDefaultNudge;
        if (this.props.Data.IsDefaultNudge) {
            this.props.Data.Expression = ExpressionHelper_1.ExpressionHelper.CreateEmptyExpression();
        }
    }
    Back() {
    }
    GetIndexStepIncrement() {
        return this.state.IsDefaultNudge ? 2 : 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.PlusMinusSettingsWizard = PlusMinusSettingsWizard;
