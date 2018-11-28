"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Core/Enums");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
class AlertTypeWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            MessageType: this.props.Data.MessageType,
            ShowAsPopup: this.props.Data.ShowAsPopup,
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-scope";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Select The Type of the Alert", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(react_bootstrap_1.Radio, { className: cssClassName + "__radiobutton", inline: true, value: "Info", checked: this.state.MessageType == Enums_1.MessageType.Info, onChange: (e) => this.onMessageTypeSelectChanged(e) }, "Info"),
                        ' ',
                        " ",
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Alert Type: Info", bodyText: ["Sends the alert as a message."], MessageType: Enums_1.MessageType.Info })),
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(react_bootstrap_1.Radio, { className: cssClassName + "__radiobutton", inline: true, value: "Warning", checked: this.state.MessageType == Enums_1.MessageType.Warning, onChange: (e) => this.onMessageTypeSelectChanged(e) }, "Warning"),
                        ' ',
                        " ",
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Alert Type: Warning", bodyText: ["Sends the alert as a warning."], MessageType: Enums_1.MessageType.Info })),
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(react_bootstrap_1.Radio, { className: cssClassName + "__radiobutton", inline: true, value: "Error", checked: this.state.MessageType == Enums_1.MessageType.Error, onChange: (e) => this.onMessageTypeSelectChanged(e) }, "Error"),
                        ' ',
                        " ",
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Alert Type: Error", bodyText: ["Sends the alert as an error."], MessageType: Enums_1.MessageType.Info })))),
            React.createElement(react_bootstrap_1.Panel, { header: "Alert Details", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(react_bootstrap_1.Checkbox, { className: cssClassName + "__checkbox", inline: true, checked: this.state.ShowAsPopup == true, onChange: (e) => this.onShowAsPopupChanged(e) }, "Show as Popup"),
                        ' ',
                        " ",
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Alert Details", bodyText: ["Shows a popup in centre of screen when Alert is triggered."], MessageType: Enums_1.MessageType.Info })))));
    }
    onMessageTypeSelectChanged(event) {
        let e = event.target;
        if (e.value == "Info") {
            this.setState({ MessageType: Enums_1.MessageType.Info }, () => this.props.UpdateGoBackState());
        }
        else if (e.value == 'Warning') {
            this.setState({ MessageType: Enums_1.MessageType.Warning }, () => this.props.UpdateGoBackState());
        }
        else if (e.value == 'Error') {
            this.setState({ MessageType: Enums_1.MessageType.Error }, () => this.props.UpdateGoBackState());
        }
    }
    onShowAsPopupChanged(event) {
        let e = event.target;
        this.setState({ ShowAsPopup: e.checked }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return this.state.MessageType != null;
    }
    canBack() { return true; }
    Next() {
        this.props.Data.MessageType = this.state.MessageType;
        this.props.Data.ShowAsPopup = this.state.ShowAsPopup;
    }
    Back() {
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.AlertTypeWizard = AlertTypeWizard;
