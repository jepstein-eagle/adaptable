"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Core/Enums");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ColorPicker_1 = require("../../ColorPicker");
const ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
class PercentBarSettingsWizard extends React.Component {
    constructor(props) {
        super(props);
        this.onMinValueChanged = (e) => {
            this.setState({ MinValue: e.target.value }, () => this.props.UpdateGoBackState());
        };
        this.onMaxValueChanged = (e) => {
            this.setState({ MaxValue: e.target.value }, () => this.props.UpdateGoBackState());
        };
        this.StepName = this.props.StepName;
        this.state = {
            MinValue: this.props.Data.MinValue,
            MaxValue: this.props.Data.MaxValue,
            PositiveColor: this.props.Data.PositiveColor,
            NegativeColor: this.props.Data.NegativeColor,
            ShowValue: this.props.Data.ShowValue,
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-s";
        let friendlyColumnName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns);
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Percent Bar for: " + friendlyColumnName, bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, null,
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "formMinimumValue" },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(react_bootstrap_1.ControlLabel, null, "Minimum Value:")),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(react_bootstrap_1.FormControl, { type: "number", placeholder: "Enter Number", onChange: this.onMinValueChanged, value: this.state.MinValue })),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Percent Bar: Minimum Value", bodyText: ["The minimum value of the column (can be minus).  If positive numbers only use the default of 0."], MessageType: Enums_1.MessageType.Info })))),
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "formMaximumValue" },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(react_bootstrap_1.ControlLabel, null, "Maximum Value:")),
                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                React.createElement(react_bootstrap_1.FormControl, { type: "number", placeholder: "Enter Number", onChange: this.onMaxValueChanged, value: this.state.MaxValue })),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Percent Bar: Maximum Value", bodyText: ["The maximum value of the column (default is 100)"], MessageType: Enums_1.MessageType.Info })))),
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
                                React.createElement(react_bootstrap_1.ControlLabel, null, "Show Value:")),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                React.createElement(react_bootstrap_1.Checkbox, { style: { margin: '0px' }, onChange: (e) => this.onShowValueChanged(e), checked: this.state.ShowValue })),
                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Percent Bar: Show Value", bodyText: ["Whether to show additionally the value of the cell in the bar."], MessageType: Enums_1.MessageType.Info })))))));
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
        return true; // StringExtensions.IsNotNullOrEmpty(this.state.PositiveColor);
    }
    canBack() { return true; }
    Next() {
        this.props.Data.MinValue = this.state.MinValue;
        this.props.Data.MaxValue = this.state.MaxValue;
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
