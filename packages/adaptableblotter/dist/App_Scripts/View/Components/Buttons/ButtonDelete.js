"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PopupRedux = require("../../../Redux/ActionsReducers/PopupRedux");
const ButtonBase_1 = require("./ButtonBase");
const StyleConstants = require("../../../Core/Constants/StyleConstants");
class ButtonDeleteComponent extends React.Component {
    render() {
        return React.createElement(ButtonBase_1.ButtonBase, { ToolTipAndText: "Delete", bsStyle: 'danger', bsSize: this.props.size, glyph: "trash", onClick: () => this.onClick(), overrideDisableButton: this.props.overrideDisableButton, overrideTooltip: this.props.overrideTooltip, style: this.props.style, DisplayMode: this.props.DisplayMode, overrideText: this.props.overrideText, cssClassName: this.props.cssClassName + StyleConstants.DELETE_BUTTON });
    }
    onClick() {
        if (this.props.ConfirmAction) {
            let confirmation = {
                CancelText: "Cancel",
                ConfirmationTitle: this.props.ConfirmationTitle,
                ConfirmationMsg: this.props.ConfirmationMsg,
                ConfirmationText: "Delete",
                CancelAction: null,
                ConfirmAction: this.props.ConfirmAction,
                ShowCommentBox: false
            };
            this.props.onConfirmWarning(confirmation);
        }
        else {
            this.props.onClickAction();
        }
    }
}
//Here we bypass slightly how the whole thing works and consider Delete as a smart component that will show the warning 
//Purist will say that we should pass in everything we need through the props but I don't think it's really needed in that case
//and it makes the component where we use the DeleteButton slighlty less verbos
function mapStateToProps(state, ownProps) {
    return {
        ConfirmAction: ownProps.ConfirmAction,
        ConfirmationMsg: ownProps.ConfirmationMsg,
        ConfirmationTitle: ownProps.ConfirmationTitle
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onConfirmWarning: (confirmation) => dispatch(PopupRedux.PopupShowConfirmation(confirmation)),
    };
}
exports.ButtonDelete = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ButtonDeleteComponent);
