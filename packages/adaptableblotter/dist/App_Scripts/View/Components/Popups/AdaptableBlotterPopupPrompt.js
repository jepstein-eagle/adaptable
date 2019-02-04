"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StyleConstants = require("../../../Utilities/Constants/StyleConstants");
const react_bootstrap_1 = require("react-bootstrap");
const UIHelper_1 = require("../../UIHelper");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
class AdaptableBlotterPopupPrompt extends React.Component {
    constructor(props) {
        super(props);
        this.changeContent = (e) => {
            this.setState({ PromptText: e.target.value });
        };
        this.state = { PromptText: "" };
    }
    render() {
        let modalContainer = UIHelper_1.UIHelper.getModalContainer(this.props.AdaptableBlotter.BlotterOptions, document);
        let cssClassName = StyleConstants.POPUP_PROMPT;
        return this.props.ShowPopup && React.createElement("div", { className: StyleConstants.POPUP_PROMPT },
            React.createElement(react_bootstrap_1.Modal, { show: this.props.ShowPopup, onHide: this.props.onClose, className: cssClassName, container: modalContainer, bsSize: "small" },
                React.createElement("div", { className: cssClassName + StyleConstants.MODAL_BASE },
                    React.createElement(react_bootstrap_1.Modal.Body, { className: cssClassName + StyleConstants.MODAL_BODY },
                        React.createElement("div", { className: cssClassName },
                            React.createElement("div", null,
                                React.createElement("div", { style: { display: "flex", alignItems: "center" } },
                                    React.createElement(react_bootstrap_1.ControlLabel, null, this.props.Header)),
                                StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.Msg) &&
                                    React.createElement("div", { style: { display: "flex", alignItems: "center" } }, this.props.Msg.split("\n").map(function (item, index) {
                                        return (React.createElement("span", { key: index },
                                            item,
                                            React.createElement("br", null)));
                                    })),
                                React.createElement("div", { style: { marginTop: '20px' } },
                                    React.createElement(react_bootstrap_1.FormControl, { value: this.state.PromptText, type: "string", placeholder: "Enter text", onChange: (e) => this.changeContent(e) })),
                                React.createElement("div", { style: { marginTop: '20px' } },
                                    React.createElement(react_bootstrap_1.Row, null,
                                        React.createElement(react_bootstrap_1.Col, { xs: 4 },
                                            React.createElement(react_bootstrap_1.Button, { bsStyle: StyleConstants.PRIMARY_BSSTYLE, className: cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CONFIRM_BUTTON, disabled: StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.PromptText), onClick: () => this.onConfirmmForm() }, "OK")),
                                        React.createElement(react_bootstrap_1.Col, { xs: 4 }),
                                        React.createElement(react_bootstrap_1.Col, { xs: 4 },
                                            React.createElement(react_bootstrap_1.Button, { bsStyle: StyleConstants.DEFAULT_BSSTYLE, className: cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CANCEL_BUTTON, onClick: () => this.onCloseForm() }, "Cancel"))))))))));
    }
    onCloseForm() {
        this.setState({ PromptText: "" });
        this.props.onClose();
    }
    onConfirmmForm() {
        let promptText = this.state.PromptText;
        this.setState({ PromptText: "" });
        this.props.onConfirm(promptText);
    }
}
exports.AdaptableBlotterPopupPrompt = AdaptableBlotterPopupPrompt;
