"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Utilities/Enums");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const EnumExtensions_1 = require("../../../Utilities/Extensions/EnumExtensions");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
class ReminderAlertWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Header: this.props.Data.Alert.Header,
            Msg: this.props.Data.Alert.Msg,
            MessageType: this.props.Data.Alert.MessageType,
            ShowAsPopup: this.props.Data.Alert.ShowAsPopup,
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-scope";
        let messageTypes = EnumExtensions_1.EnumExtensions.getNames(Enums_1.MessageType).map((type) => {
            return React.createElement("option", { key: type, value: type }, type);
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Alert Settings", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                    React.createElement(react_bootstrap_1.Row, { style: { marginTop: '15px' } },
                        React.createElement(react_bootstrap_1.Col, { xs: 3 },
                            React.createElement(react_bootstrap_1.ControlLabel, null, "Header:")),
                        React.createElement(react_bootstrap_1.Col, { xs: 8 },
                            React.createElement(react_bootstrap_1.FormControl, { value: this.state.Header, style: { width: '100%' }, type: "string", placeholder: "Enter Reminder Header (optional)", onChange: (e) => this.onHeaderChanged(e) }))),
                    React.createElement(react_bootstrap_1.Row, { style: { marginTop: '15px' } },
                        React.createElement(react_bootstrap_1.Col, { xs: 3 },
                            React.createElement(react_bootstrap_1.ControlLabel, null, "Message:")),
                        React.createElement(react_bootstrap_1.Col, { xs: 8 },
                            React.createElement(react_bootstrap_1.FormControl, { value: this.state.Msg, style: { width: '100%' }, type: "string", placeholder: "Enter Reminder Message", onChange: (e) => this.onMessageChanged(e) }))),
                    React.createElement(react_bootstrap_1.Row, { style: { marginTop: '15px' } },
                        React.createElement(react_bootstrap_1.Col, { xs: 3 },
                            React.createElement(react_bootstrap_1.ControlLabel, null, "Message Type:")),
                        React.createElement(react_bootstrap_1.Col, { xs: 6 },
                            React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: this.state.MessageType, onChange: (x) => this.onMessageTypeChanged(x) }, messageTypes))),
                    React.createElement(react_bootstrap_1.Row, { style: { marginTop: '15px' } },
                        React.createElement(react_bootstrap_1.Col, { xs: 3 }),
                        React.createElement(react_bootstrap_1.Col, { xs: 6 },
                            React.createElement(react_bootstrap_1.Checkbox, { className: cssClassName + "__checkbox", inline: true, checked: this.state.ShowAsPopup == true, onChange: (e) => this.onShowAsPopupChanged(e) }, "Show as Popup"),
                            ' ',
                            " ",
                            ' ',
                            React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Reminder Details", bodyText: ["A popup is displayed when the Reminder is triggered."] }))))));
    }
    onHeaderChanged(event) {
        let e = event.target;
        this.setState({ Header: e.value }, () => this.props.UpdateGoBackState());
    }
    onMessageChanged(event) {
        let e = event.target;
        this.setState({ Msg: e.value }, () => this.props.UpdateGoBackState());
    }
    onMessageTypeChanged(event) {
        let e = event.target;
        this.setState({ MessageType: e.value }, () => this.props.UpdateGoBackState());
    }
    onShowAsPopupChanged(event) {
        let e = event.target;
        this.setState({ ShowAsPopup: e.checked }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return this.state.MessageType != null && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.Msg);
    }
    canBack() { return true; }
    Next() {
        this.props.Data.Alert.Header = this.state.Header;
        this.props.Data.Alert.Msg = this.state.Msg;
        this.props.Data.Alert.MessageType = this.state.MessageType;
        this.props.Data.Alert.ShowAsPopup = this.state.ShowAsPopup;
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
exports.ReminderAlertWizard = ReminderAlertWizard;
