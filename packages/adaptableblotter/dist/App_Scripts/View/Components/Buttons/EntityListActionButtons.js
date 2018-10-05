"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const ButtonEdit_1 = require("./ButtonEdit");
const ButtonDelete_1 = require("./ButtonDelete");
const ButtonShare_1 = require("./ButtonShare");
const StyleConstants = require("../../../Core/Constants/StyleConstants");
const Enums_1 = require("../../../Core/Enums");
class EntityListActionButtons extends React.Component {
    render() {
        return React.createElement(react_bootstrap_1.ButtonToolbar, { className: this.props.cssClassName + StyleConstants.BUTTON_TOOLBAR, bsSize: "small", style: { margin: "0px", padding: "0px" } },
            this.props.showEdit &&
                React.createElement(ButtonEdit_1.ButtonEdit, { onClick: () => this.props.editClick(), cssClassName: this.props.cssClassName, style: { marginLeft: "0px", marginTop: "2px", marginBottom: "2px", marginRight: "2px" }, overrideDisableButton: this.props.overrideDisableEdit, overrideTooltip: this.props.overrideTooltipEdit, DisplayMode: "Glyph", size: "small", AccessLevel: this.props.AccessLevel }),
            this.props.showDelete &&
                React.createElement(ButtonDelete_1.ButtonDelete, { cssClassName: this.props.cssClassName, style: { marginLeft: "1px", marginTop: "2px", marginBottom: "2px", marginRight: "1px" }, overrideDisableButton: this.props.overrideDisableDelete, overrideTooltip: this.props.overrideTooltipDelete, DisplayMode: "Glyph", ConfirmAction: this.props.ConfirmDeleteAction, ConfirmationMsg: "Are you sure you want to delete this " + this.props.EntityName + "?", ConfirmationTitle: "Delete " + this.props.EntityName, size: "small", AccessLevel: this.props.AccessLevel }),
            this.props.showShare &&
                React.createElement(ButtonShare_1.ButtonShare, { onClick: () => this.props.shareClick(), cssClassName: this.props.cssClassName, style: { marginLeft: "2px", marginTop: "2px", marginBottom: "2px", marginRight: "0px" }, overrideDisableButton: this.props.overrideDisableShare, overrideTooltip: this.props.overrideTooltipShare, DisplayMode: "Glyph", size: "small", AccessLevel: this.props.AccessLevel }));
    }
}
EntityListActionButtons.defaultProps = {
    showEdit: true,
    showDelete: true,
    showShare: false,
    overrideDisableEdit: false,
    overrideDisableDelete: false,
    overrideDisableShare: false,
    ConfirmDeleteAction: null,
    EntityName: "",
    cssClassName: "",
    AccessLevel: Enums_1.AccessLevel.Full
};
exports.EntityListActionButtons = EntityListActionButtons;
