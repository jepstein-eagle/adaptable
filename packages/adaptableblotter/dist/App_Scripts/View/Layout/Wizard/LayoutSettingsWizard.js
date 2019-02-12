"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
class LayoutSettingsWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LayoutName: props.Data.Name,
            ErrorMessage: null
        };
    }
    render() {
        let validationState = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";
        let cssClassName = this.props.cssClassName + "-settings";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Layout Settings", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "layouthName" },
                        React.createElement(react_bootstrap_1.Col, { xs: 3, componentClass: react_bootstrap_1.ControlLabel }, "Layout Name: "),
                        React.createElement(react_bootstrap_1.Col, { xs: 8 },
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName", validationState: validationState },
                                React.createElement(react_bootstrap_1.FormControl, { value: this.state.LayoutName, type: "string", placeholder: "Enter layout name", onChange: (e) => this.onLayoutNameChange(e) }),
                                React.createElement(react_bootstrap_1.FormControl.Feedback, null),
                                React.createElement(react_bootstrap_1.HelpBlock, null, this.state.ErrorMessage)))),
                    React.createElement(react_bootstrap_1.Col, { xs: 1 },
                        ' ',
                        " "))));
    }
    onLayoutNameChange(event) {
        let e = event.target;
        this.setState({
            LayoutName: e.value,
            ErrorMessage: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.Layouts.map(l => l.Name), e.value) ? "A Layout already exists with that name" : null
        }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return StringExtensions_1.StringExtensions.IsNotEmpty(this.state.LayoutName) && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage);
    }
    canBack() { return true; }
    Next() {
        this.props.Data.Name = this.state.LayoutName;
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
exports.LayoutSettingsWizard = LayoutSettingsWizard;
