"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const ColumnHelper_1 = require("../../Core/Helpers/ColumnHelper");
const ColorPicker_1 = require("../ColorPicker");
class PercentBarEntityRow extends React.Component {
    render() {
        let PercentBar = this.props.AdaptableBlotterObject;
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(PercentBar.ColumnId, this.props.Column);
        colItems[1].Content = PercentBar.MinValue;
        colItems[2].Content = PercentBar.MaxValue;
        colItems[3].Content = React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: PercentBar.PositiveColor, onChange: (x) => this.onPositiveColorChanged(x) });
        colItems[4].Content = React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: PercentBar.NegativeColor, onChange: (x) => this.onNegativeColorChanged(x) });
        colItems[5].Content = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, ConfirmDeleteAction: this.props.onDeleteConfirm, showShare: this.props.TeamSharingActivated, editClick: () => this.props.onEdit(this.props.Index, PercentBar), shareClick: () => this.props.onShare(), overrideDisableEdit: !this.props.Column, EntityName: StrategyConstants.PercentBarStrategyName });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
    onPositiveColorChanged(event) {
        let e = event.target;
        this.props.onPositiveColorChanged(this.props.AdaptableBlotterObject, e.value);
    }
    onNegativeColorChanged(event) {
        let e = event.target;
        this.props.onNegativeColorChanged(this.props.AdaptableBlotterObject, e.value);
    }
}
exports.PercentBarEntityRow = PercentBarEntityRow;
