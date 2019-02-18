"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
const LayoutHelper_1 = require("../../Utilities/Helpers/LayoutHelper");
class LayoutEntityRow extends React.Component {
    render() {
        let layout = this.props.AdaptableBlotterObject;
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(react_bootstrap_1.Radio, { style: { padding: "0px", margin: "0px" }, onChange: () => this.props.onSelect(layout), checked: this.props.IsCurrentLayout });
        colItems[1].Content = layout.Name;
        colItems[2].Content = LayoutHelper_1.LayoutHelper.getLayoutDescription(layout, this.props.Columns);
        let buttons = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, ConfirmDeleteAction: this.props.onDeleteConfirm, showShare: this.props.TeamSharingActivated, editClick: () => this.props.onEdit(this.props.Index, layout), shareClick: () => this.props.onShare(), overrideDisableEdit: false, overrideDisableDelete: layout.Name == GeneralConstants_1.DEFAULT_LAYOUT, EntityType: StrategyConstants.LayoutStrategyName });
        colItems[3].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.LayoutEntityRow = LayoutEntityRow;
