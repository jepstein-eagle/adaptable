"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
const EnumExtensions_1 = require("../../../Utilities/Extensions/EnumExtensions");
const Enums_1 = require("../../../Core/Enums");
class ChartSettingsWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            ChartName: props.Data.Name,
            ChartType: props.Data.Type,
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
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "chartName" },
                        React.createElement(react_bootstrap_1.Col, { xs: 3, componentClass: react_bootstrap_1.ControlLabel }, "Name:"),
                        React.createElement(react_bootstrap_1.Col, { xs: 7 },
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName", validationState: validationState },
                                React.createElement(react_bootstrap_1.FormControl, { value: this.state.ChartName, type: "string", placeholder: "Enter chart name", onChange: (e) => this.onChartNameChange(e) }),
                                React.createElement(react_bootstrap_1.FormControl.Feedback, null),
                                React.createElement(react_bootstrap_1.HelpBlock, null, this.state.ErrorMessage)))),
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "chartType" },
                        React.createElement(react_bootstrap_1.Col, { xs: 3, componentClass: react_bootstrap_1.ControlLabel }, "Type:"),
                        React.createElement(react_bootstrap_1.Col, { xs: 7 },
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName" },
                                React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: this.state.ChartType, onChange: (x) => this.onChartTypeChange(x) }, optionChartTypes)))))));
    }
    onChartNameChange(event) {
        let e = event.target;
        this.setState({
            ChartName: e.value,
            ErrorMessage: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.ChartDefinitions.map(s => s.Name), e.value) ? "A Chart Definition already exists with that name" : null
        }, () => this.props.UpdateGoBackState());
    }
    onChartTypeChange(event) {
        let e = event.target;
        this.setState({ ChartType: e.value, }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return StringExtensions_1.StringExtensions.IsNotEmpty(this.state.ChartName) && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage);
    }
    canBack() { return true; }
    Next() {
        this.props.Data.Name = this.state.ChartName;
        this.props.Data.Type = this.state.ChartType;
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
