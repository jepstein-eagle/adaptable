"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ColorPicker_1 = require("../../ColorPicker");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
class PercentBarSettingsWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            PositiveColor: this.props.Data.PositiveColor,
            NegativeColor: this.props.Data.NegativeColor,
            ShowValue: this.props.Data.ShowValue,
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-s";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Select Style", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, null,
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "formPositiveColour" },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(react_bootstrap_1.ControlLabel, null, "Positive Colour:")),
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.PositiveColor, onChange: (x) => this.onPositiveColorSelectChanged(x) })))),
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "formNegativeColour" },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(react_bootstrap_1.ControlLabel, null, "Negative Colour:")),
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.NegativeColor, onChange: (x) => this.onNegativeColorSelectChanged(x) })))),
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "formShowValue" },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(react_bootstrap_1.ControlLabel, null, "Show Cell Value:")),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                React.createElement(react_bootstrap_1.Checkbox, { style: { margin: '0px' }, onChange: (e) => this.onShowValueChanged(e), checked: this.state.ShowValue })),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Percent Bar: Show Value", bodyText: ["Whether to show additionally the value of the cell in the bar."] })))))));
    }
    onPositiveColorSelectChanged(event) {
        let e = event.target;
        this.setState({ PositiveColor: e.value }, () => this.props.UpdateGoBackState());
    }
    onNegativeColorSelectChanged(event) {
        let e = event.target;
        this.setState({ NegativeColor: e.value }, () => this.props.UpdateGoBackState());
    }
    onShowValueChanged(event) {
        let e = event.target;
        this.setState({ ShowValue: e.checked }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.PositiveColor) || StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.NegativeColor)) {
            return false;
        }
        return true;
    }
    canBack() { return true; }
    Next() {
        this.props.Data.PositiveColor = this.state.PositiveColor;
        this.props.Data.NegativeColor = this.state.NegativeColor;
        this.props.Data.ShowValue = this.state.ShowValue;
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
exports.PercentBarSettingsWizard = PercentBarSettingsWizard;
