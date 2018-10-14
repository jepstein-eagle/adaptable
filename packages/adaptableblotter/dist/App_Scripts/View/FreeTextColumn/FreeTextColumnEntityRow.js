"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
/// <reference path="../../typings/.d.ts" />
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const ArrayExtensions_1 = require("../../Core/Extensions/ArrayExtensions");
class FreeTextColumnEntityRow extends React.Component {
    render() {
        let FreeTextColumn = this.props.AdaptableBlotterObject;
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = FreeTextColumn.ColumnId;
        colItems[1].Content = FreeTextColumn.DefaultValue;
        colItems[2].Content = ArrayExtensions_1.ArrayExtensions.IsNullOrEmpty(FreeTextColumn.StoredValues) ? 0 : FreeTextColumn.StoredValues.length;
        colItems[3].Content = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, editClick: () => this.props.onEdit(this.props.Index, FreeTextColumn), showShare: this.props.TeamSharingActivated, shareClick: () => this.props.onShare(), ConfirmDeleteAction: this.props.onDeleteConfirm, EntityName: StrategyConstants.FreeTextColumnStrategyName });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.FreeTextColumnEntityRow = FreeTextColumnEntityRow;
