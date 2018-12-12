"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
const EnumExtensions_1 = require("../../../Utilities/Extensions/EnumExtensions");
const Enums_1 = require("../../../Utilities/Enums");
class ChartSettingsWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            Title: props.Data.Title,
            SubTitle: props.Data.SubTitle,
            ErrorMessage: null
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-settings";
        let validationState = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";
        let optionChartTypes = EnumExtensions_1.EnumExtensions.getNames(Enums_1.ChartType).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Chart Definition Settings", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "chartTitle" },
                        React.createElement(react_bootstrap_1.Col, { xs: 3, componentClass: react_bootstrap_1.ControlLabel }, "Title:"),
                        React.createElement(react_bootstrap_1.Col, { xs: 7 },
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineTitle", validationState: validationState },
                                React.createElement(react_bootstrap_1.FormControl, { value: this.state.Title, type: "string", placeholder: "Enter chart title", onChange: (e) => this.onChartTitleChange(e) }),
                                React.createElement(react_bootstrap_1.FormControl.Feedback, null),
                                React.createElement(react_bootstrap_1.HelpBlock, null, this.state.ErrorMessage)))),
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "chartName" },
                        React.createElement(react_bootstrap_1.Col, { xs: 3, componentClass: react_bootstrap_1.ControlLabel }, "Sub title:"),
                        React.createElement(react_bootstrap_1.Col, { xs: 7 },
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName", validationState: validationState },
                                React.createElement(react_bootstrap_1.FormControl, { value: this.state.SubTitle, type: "string", placeholder: "Enter chart subtitle (optional)", onChange: (e) => this.onChartSubTitleChange(e) })))))));
    }
    onChartTitleChange(event) {
        let e = event.target;
        this.setState({
            Title: e.value,
            ErrorMessage: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.ChartDefinitions.map(s => s.Title), e.value) ? "A Chart Definition already exists with that title" : null
        }, () => this.props.UpdateGoBackState());
    }
    onChartSubTitleChange(event) {
        let e = event.target;
        this.setState({ SubTitle: e.value, }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return StringExtensions_1.StringExtensions.IsNotEmpty(this.state.Title) && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage);
    }
    canBack() { return true; }
    Next() {
        this.props.Data.Title = this.state.Title;
        this.props.Data.SubTitle = this.state.SubTitle;
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
exports.ChartSettingsWizard = ChartSettingsWizard;
