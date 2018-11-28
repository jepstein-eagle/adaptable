"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Core/Enums");
const EnumExtensions_1 = require("../../../Utilities/Extensions/EnumExtensions");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const CalendarConstants = require("../../../Core/Constants/CalendarConstants");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
class ShortcutSettingsWizard extends React.Component {
    constructor(props) {
        super(props);
        this.changeContent = (e) => {
            this.setState({ ShortcutResult: e.target.value }, () => this.props.UpdateGoBackState());
        };
        this.StepName = this.props.StepName;
        this.state = {
            ShortcutKey: this.props.Data.ShortcutKey,
            ShortcutResult: this.props.Data.ShortcutResult == null ? "" : this.props.Data.ShortcutResult,
            ShortcutOperation: this.props.Data.ShortcutOperation,
            IsDynamic: this.props.Data.IsDynamic
        };
    }
    onClickShortcutOperation(shortcutOperation) {
        this.setState({ ShortcutOperation: shortcutOperation, ShortcutResult: this.state.ShortcutResult }, () => this.props.UpdateGoBackState());
    }
    render() {
        // sort out keys
        let keyList = (this.props.Data.ColumnType == Enums_1.DataType.Number) ? this.props.NumericKeysAvailable : this.props.DateKeysAvailable;
        let optionKeys = keyList.map(x => {
            return React.createElement("option", { value: x, key: x }, x);
        });
        // sort out actions
        let optionActions = EnumExtensions_1.EnumExtensions.getNames(Enums_1.MathOperation).filter(name => name != Enums_1.MathOperation.Replace).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        let currentActionValue = this.state.ShortcutOperation;
        let currentKeyValue = !this.state.ShortcutKey ? "select" : this.state.ShortcutKey;
        let currentDynamicResult = this.state.ShortcutResult != "" ? this.state.ShortcutResult : "select";
        let cssClassName = this.props.cssClassName + "-settings";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Shortcut Settings", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineKey" },
                        React.createElement(react_bootstrap_1.Col, { xs: 3 },
                            React.createElement(react_bootstrap_1.ControlLabel, null, "Key:")),
                        React.createElement(react_bootstrap_1.Col, { xs: 6 },
                            React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: currentKeyValue, onChange: (x) => this.onShortcutKeyChanged(x) },
                                React.createElement("option", { value: "select", key: "select" }, "Select Key"),
                                optionKeys)),
                        React.createElement(react_bootstrap_1.Col, { xs: 1 },
                            React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Shortcut: Key", bodyText: ["The keyboard key that, when pressed, triggers the shortcut."], MessageType: Enums_1.MessageType.Info }))),
                    this.props.Data.ColumnType == Enums_1.DataType.Number ?
                        React.createElement("span", null,
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineAction" },
                                React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                    React.createElement(react_bootstrap_1.ControlLabel, null, "Operation:")),
                                React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                    React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: currentActionValue, onChange: (x) => this.onShortcutOperationChanged(x) }, optionActions)),
                                React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                    React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Shortcut: Operation", bodyText: ["The mathematical operation that is peformed on the cell's current value - using the shortcut's 'value' - in order to calculate the new total for the cell."], MessageType: Enums_1.MessageType.Info }))),
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineNumberResult" },
                                React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                    React.createElement(react_bootstrap_1.ControlLabel, null, "Value:")),
                                React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                    React.createElement(react_bootstrap_1.FormControl, { type: "number", placeholder: "Enter Number", onChange: this.changeContent, value: this.state.ShortcutResult })),
                                React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                    React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Shortcut: Value", bodyText: ["The number that is used - together with the shortcut's mathmetical 'operation' and the current cell value - in order to calculate the new total for the cell."], MessageType: Enums_1.MessageType.Info }))))
                        :
                            React.createElement("span", null,
                                React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineDateType" },
                                    React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Date Type:")),
                                    React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: "custom", checked: this.state.IsDynamic == false, onChange: (e) => this.onDynamicSelectChanged(e) }, "Custom"),
                                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: "dynamic", checked: this.state.IsDynamic == true, onChange: (e) => this.onDynamicSelectChanged(e) }, "Dynamic")),
                                    React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Shortcut: Date Type", bodyText: [React.createElement("b", null, "Custom dates"), " are 'real' dates chosen by the user.", React.createElement("br", null), React.createElement("br", null), React.createElement("b", null, "Dynamic dates"), " are predefined dates that come with the Blotter and are re-evaluated each day (e.g. 'Today').", React.createElement("br", null), React.createElement("br", null), "Dynamic dates that use working days are based on the current holiday calendar."], MessageType: Enums_1.MessageType.Info }))),
                                this.state.IsDynamic == true ?
                                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineDateResultPredefined" },
                                        React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                            React.createElement(react_bootstrap_1.ControlLabel, null, "Dynamic Date:")),
                                        React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                            React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: currentDynamicResult, onChange: (x) => this.onDynamicResultChanged(x) },
                                                React.createElement("option", { value: "select", key: "select" }, "Select Dynamic Date"),
                                                React.createElement("option", { value: CalendarConstants.TODAY, key: CalendarConstants.TODAY }, "Today"),
                                                React.createElement("option", { value: CalendarConstants.YESTERDAY, key: CalendarConstants.YESTERDAY }, "Yesterday"),
                                                React.createElement("option", { value: CalendarConstants.TOMORROW, key: CalendarConstants.TOMORROW }, "Tomorrow"),
                                                React.createElement("option", { value: CalendarConstants.PREVIOUS_WORK_DAY, key: CalendarConstants.PREVIOUS_WORK_DAY }, "Previous Work Day"),
                                                React.createElement("option", { value: CalendarConstants.NEXT_WORK_DAY, key: CalendarConstants.NEXT_WORK_DAY }, "Next Work Day"))),
                                        React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                            React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Shortcut: Dynamic Date", bodyText: ["The dynamic date that becomes the cell's new value when the shortcut is triggered."], MessageType: Enums_1.MessageType.Info })))
                                    :
                                        React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineDateResultCustom" },
                                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Custom Date:")),
                                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                React.createElement(react_bootstrap_1.FormControl, { type: "date", placeholder: "Shortcut Result", onChange: this.changeContent, value: this.state.ShortcutResult })),
                                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Shortcut: Custom Date", bodyText: ["The date that becomes the cell's new value when the shortcut is triggered."], MessageType: Enums_1.MessageType.Info })))))));
    }
    onShortcutKeyChanged(event) {
        let e = event.target;
        this.setState({ ShortcutKey: e.value }, () => this.props.UpdateGoBackState());
    }
    onShortcutOperationChanged(event) {
        let e = event.target;
        this.setState({ ShortcutOperation: e.value }, () => this.props.UpdateGoBackState());
    }
    onDynamicResultChanged(event) {
        let e = event.target;
        this.setState({ ShortcutResult: e.value }, () => this.props.UpdateGoBackState());
    }
    onDynamicSelectChanged(event) {
        let e = event.target;
        this.setState({ IsDynamic: (e.value == "dynamic") }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        if (this.state.IsDynamic && this.state.ShortcutResult == "select") {
            return false;
        }
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ShortcutResult) &&
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ShortcutKey) &&
            this.state.ShortcutKey != "select";
    }
    canBack() { return true; }
    Next() {
        this.props.Data.ShortcutResult = this.state.ShortcutResult;
        this.props.Data.ShortcutOperation = this.state.ShortcutOperation;
        this.props.Data.ShortcutKey = this.state.ShortcutKey;
        this.props.Data.IsDynamic = this.state.IsDynamic;
    }
    Back() { }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.ShortcutSettingsWizard = ShortcutSettingsWizard;
