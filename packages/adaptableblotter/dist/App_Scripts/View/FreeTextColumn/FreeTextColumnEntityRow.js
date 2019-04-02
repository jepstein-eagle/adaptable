"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/// <reference path="../../typings/.d.ts" />
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const EntityRowItem_1 = require("../Components/EntityRowItem");
class FreeTextColumnEntityRow extends React.Component {
    render() {
        let FreeTextColumn = this.props.AdaptableBlotterObject;
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: FreeTextColumn.ColumnId });
        colItems[1].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: StringExtensions_1.StringExtensions.IsNullOrEmpty(FreeTextColumn.DefaultValue) ? "[None]" : FreeTextColumn.DefaultValue });
        colItems[2].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(FreeTextColumn.FreeTextStoredValues) ? 0 : FreeTextColumn.FreeTextStoredValues.length });
        colItems[3].Content = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, editClick: () => this.props.onEdit(this.props.Index, FreeTextColumn), showShare: this.props.TeamSharingActivated, shareClick: () => this.props.onShare(), ConfirmDeleteAction: this.props.onDeleteConfirm, EntityType: StrategyConstants.FreeTextColumnStrategyName });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.FreeTextColumnEntityRow = FreeTextColumnEntityRow;
