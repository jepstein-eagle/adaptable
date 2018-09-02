"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const react_bootstrap_2 = require("react-bootstrap");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const ExportRedux = require("../../Redux/ActionsReducers/ExportRedux");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
const StyleConstants = require("../../Core/Constants/StyleConstants");
class IPushPullLoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Login: null, Password: null };
    }
    render() {
        let cssClassName = StyleConstants.PUSHPULL_LOGIN;
        return React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: "iPushPull Login", bsStyle: "primary", glyphicon: "export" },
            React.createElement(react_bootstrap_2.FormGroup, { controlId: "formEmail", validationState: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.ErrorMsg) ? "error" : null },
                React.createElement(react_bootstrap_2.ControlLabel, null, "Email address"),
                React.createElement(react_bootstrap_2.FormControl, { onChange: (e) => this.onLoginChange(e), type: "email", placeholder: "Enter email" })),
            React.createElement(react_bootstrap_2.FormGroup, { controlId: "formPassword", validationState: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.ErrorMsg) ? "error" : null },
                React.createElement(react_bootstrap_2.ControlLabel, null, "Password"),
                React.createElement(react_bootstrap_2.FormControl, { type: "password", onChange: (e) => this.onPasswordChange(e) }),
                React.createElement(react_bootstrap_1.HelpBlock, null, this.props.ErrorMsg)),
            React.createElement(react_bootstrap_2.Button, { className: "ab_right_modal_button", onClick: () => { this.props.onCancel(); } },
                "Cancel ",
                React.createElement(react_bootstrap_2.Glyphicon, { glyph: "remove" })),
            React.createElement(react_bootstrap_2.Button, { disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.Password), className: "ab_right_modal_button", bsStyle: "primary", onClick: () => { this.props.onLogin(this.state.Login, this.state.Password); } },
                React.createElement(react_bootstrap_2.Glyphicon, { glyph: "user" }),
                " Login"));
    }
    onLoginChange(event) {
        const e = event.target;
        this.setState({ Login: e.value });
    }
    onPasswordChange(event) {
        const e = event.target;
        this.setState({ Password: e.value });
    }
}
function mapStateToProps(state, ownProps) {
    return {
        ErrorMsg: state.Export.ErrorMsg
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onLogin: (login, password) => dispatch(ExportRedux.IPPLogin(login, password)),
        onCancel: () => { dispatch(PopupRedux.PopupHideScreen()); dispatch(ExportRedux.ReportSetErrorMsg("")); }
    };
}
exports.IPushPullLogin = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(IPushPullLoginComponent);
