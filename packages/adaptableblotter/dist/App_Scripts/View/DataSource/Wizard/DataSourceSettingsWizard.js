"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
class DataSourceSettingsWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.Data.Name,
            Description: this.props.Data.Description,
            ErrorMessage: null
        };
    }
    render() {
        let validationState = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";
        let cssClassName = this.props.cssClassName + "-settings";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "DataSource Definition Settings", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "DataSourceName" },
                        React.createElement(react_bootstrap_1.Col, { xs: 3, componentClass: react_bootstrap_1.ControlLabel }, "Name:"),
                        React.createElement(react_bootstrap_1.Col, { xs: 7 },
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName", validationState: validationState },
                                React.createElement(react_bootstrap_1.FormControl, { value: this.state.Name, type: "string", placeholder: "Enter DataSource name", onChange: (e) => this.onDataSourceNameChange(e) }),
                                React.createElement(react_bootstrap_1.FormControl.Feedback, null),
                                React.createElement(react_bootstrap_1.HelpBlock, null, this.state.ErrorMessage)))),
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "DataSourceDescription" },
                        React.createElement(react_bootstrap_1.Col, { xs: 3, componentClass: react_bootstrap_1.ControlLabel }, "Description:"),
                        React.createElement(react_bootstrap_1.Col, { xs: 7 },
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineDescription", validationState: validationState },
                                React.createElement(react_bootstrap_1.FormControl, { value: this.state.Description, type: "string", placeholder: "Enter description", onChange: (e) => this.onDataSourceDescriptionChange(e) })))))));
    }
    onDataSourceNameChange(event) {
        let e = event.target;
        this.setState({
            Name: e.value,
            ErrorMessage: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.DataSourceNames, e.value) ? "A data source already exists with that name" : null
        }, () => this.props.UpdateGoBackState());
    }
    onDataSourceDescriptionChange(event) {
        let e = event.target;
        this.setState({ Description: e.value, }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.Name) && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.Description);
    }
    canBack() { return true; }
    Next() {
        this.props.Data.Name = this.state.Name;
        this.props.Data.Description = this.state.Description;
    }
    Back() { }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.DataSourceSettingsWizard = DataSourceSettingsWizard;
