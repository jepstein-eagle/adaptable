"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/// <reference path="../../typings/.d.ts" />
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const StyleVisualItem_1 = require("../Components/StyleVisualItem");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
class FormatColumnEntityRow extends React.Component {
    render() {
        let formatColumn = this.props.AdaptableBlotterObject;
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(formatColumn.ColumnId, this.props.Columns);
        colItems[1].Content = React.createElement(StyleVisualItem_1.StyleVisualItem, { Style: formatColumn.Style });
        colItems[2].Content = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, editClick: () => this.props.onEdit(this.props.Index, formatColumn), showShare: this.props.TeamSharingActivated, shareClick: () => this.props.onShare(), ConfirmDeleteAction: this.props.onDeleteConfirm, EntityType: StrategyConstants.FormatColumnStrategyName });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.FormatColumnEntityRow = FormatColumnEntityRow;
