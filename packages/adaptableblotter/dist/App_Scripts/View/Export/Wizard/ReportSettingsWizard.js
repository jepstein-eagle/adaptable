"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
class ReportSettingsWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ReportName: this.props.Data.Name,
            ErrorMessage: null
        };
    }
    render() {
        let validationState = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";
        let cssClassName = this.props.cssClassName + "-settings";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Enter a Name for the Report", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.Col, { xs: 10 },
                        React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName", validationState: validationState },
                            React.createElement(react_bootstrap_1.FormControl, { type: "text", placeholder: "Enter Report Name", value: this.state.ReportName, onChange: (e) => this.onReportNameChanged(e) }),
                            React.createElement(react_bootstrap_1.FormControl.Feedback, null),
                            React.createElement(react_bootstrap_1.HelpBlock, null, this.state.ErrorMessage))),
                    React.createElement(react_bootstrap_1.Col, { xs: 2 },
                        ' ',
                        " "))));
    }
    onReportNameChanged(event) {
        let e = event.target;
        this.setState({
            ReportName: e.value,
            ErrorMessage: this.props.Reports.findIndex(x => x.Name == e.value) > -1 ? "A Report already exists with that name" : null
        }, () => this.props.UpdateGoBackState());
    }
    canNext() { return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ReportName) && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)); }
    canBack() { return true; }
    Next() { this.props.Data.Name = this.state.ReportName; }
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
exports.ReportSettingsWizard = ReportSettingsWizard;
