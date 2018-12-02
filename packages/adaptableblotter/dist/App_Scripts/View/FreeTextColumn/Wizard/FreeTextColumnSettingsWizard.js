"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
class FreeTextColumnSettingsWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = { ColumnId: this.props.Data.ColumnId, ErrorMessage: null, DefaultValue: this.props.Data.DefaultValue };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-settings";
        let validationState = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "FreeText Column Settings", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName" },
                        React.createElement(react_bootstrap_1.Col, { xs: 3 },
                            React.createElement(react_bootstrap_1.ControlLabel, null, "Column Name")),
                        React.createElement(react_bootstrap_1.Col, { xs: 8 },
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName", validationState: validationState },
                                React.createElement(react_bootstrap_1.FormControl, { value: this.state.ColumnId, type: "text", placeholder: "Enter a name", onChange: (e) => this.handleColumnNameChange(e) }),
                                React.createElement(react_bootstrap_1.FormControl.Feedback, null),
                                React.createElement(react_bootstrap_1.HelpBlock, null, this.state.ErrorMessage))),
                        React.createElement(react_bootstrap_1.Col, { xs: 1 },
                            ' ',
                            " ")),
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineDefaultValue" },
                        React.createElement(react_bootstrap_1.Col, { xs: 3 },
                            React.createElement(react_bootstrap_1.ControlLabel, null, "Default Value")),
                        React.createElement(react_bootstrap_1.Col, { xs: 8 },
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName", validationState: null },
                                React.createElement(react_bootstrap_1.FormControl, { value: this.state.DefaultValue, type: "text", placeholder: "Default Column Value (not required)", onChange: (e) => this.handleDefaultValueChange(e) }),
                                React.createElement(react_bootstrap_1.FormControl.Feedback, null),
                                React.createElement(react_bootstrap_1.HelpBlock, null, ""))),
                        React.createElement(react_bootstrap_1.Col, { xs: 1 },
                            ' ',
                            " ")))));
    }
    handleColumnNameChange(event) {
        let e = event.target;
        this.setState({
            ColumnId: e.value,
            ErrorMessage: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.Columns, e.value) ? "A Column already exists with that name" : null
        }, () => this.props.UpdateGoBackState());
    }
    handleDefaultValueChange(event) {
        let e = event.target;
        this.setState({
            DefaultValue: e.value,
        }, () => this.props.UpdateGoBackState());
    }
    canNext() { return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ColumnId) && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage); }
    canBack() { return true; }
    Next() {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.DefaultValue = this.state.DefaultValue;
    }
    Back() {
        //
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.FreeTextColumnSettingsWizard = FreeTextColumnSettingsWizard;
