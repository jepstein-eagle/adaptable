"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StringExtensions_1 = require("../../../../Utilities/Extensions/StringExtensions");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableBlotterForm_1 = require("../../../Components/Forms/AdaptableBlotterForm");
const ArrayExtensions_1 = require("../../../../Utilities/Extensions/ArrayExtensions");
const ExpressionHelper_1 = require("../../../../Utilities/Helpers/ExpressionHelper");
class CategoryChartSettingsWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: props.Data.Name,
            Description: props.Data.Description,
            ErrorMessage: null
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-settings";
        let validationState = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Chart Definition Settings", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "chartName" },
                        React.createElement(react_bootstrap_1.Col, { xs: 3, componentClass: react_bootstrap_1.ControlLabel }, "Name:"),
                        React.createElement(react_bootstrap_1.Col, { xs: 7 },
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName", validationState: validationState },
                                React.createElement(react_bootstrap_1.FormControl, { value: this.state.Name, type: "string", placeholder: "Enter chart name", onChange: (e) => this.onChartNameChange(e) }),
                                React.createElement(react_bootstrap_1.FormControl.Feedback, null),
                                React.createElement(react_bootstrap_1.HelpBlock, null, this.state.ErrorMessage)))),
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "chartDescription" },
                        React.createElement(react_bootstrap_1.Col, { xs: 3, componentClass: react_bootstrap_1.ControlLabel }, "Description:"),
                        React.createElement(react_bootstrap_1.Col, { xs: 7 },
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineDescription", validationState: validationState },
                                React.createElement(react_bootstrap_1.FormControl, { value: this.state.Description, type: "string", placeholder: "Enter description (optional)", onChange: (e) => this.onChartDescriptionChange(e) })))))));
    }
    onChartNameChange(event) {
        let e = event.target;
        this.setState({
            Name: e.value,
            ErrorMessage: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.ChartNames, e.value) ? "A Chart Definition already exists with that name" : null
        }, () => this.props.UpdateGoBackState());
    }
    onChartDescriptionChange(event) {
        let e = event.target;
        this.setState({ Description: e.value, }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return StringExtensions_1.StringExtensions.IsNotEmpty(this.state.Name) && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage);
    }
    canBack() { return true; }
    Next() {
        this.props.Data.Name = this.state.Name;
        this.props.Data.Description = this.state.Description;
    }
    Back() {
        // todo
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return (ExpressionHelper_1.ExpressionHelper.IsEmptyExpression(this.props.Data.XAxisExpression)) ? 2 : 1;
    }
}
exports.CategoryChartSettingsWizard = CategoryChartSettingsWizard;
