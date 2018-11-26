"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const ColumnHelper_1 = require("../../Core/Helpers/ColumnHelper");
class ColumnCategoryEntityRow extends React.Component {
    render() {
        let ColumnCategory = this.props.AdaptableBlotterObject;
        let colItems = [].concat(this.props.colItems);
        let columnNames = ColumnCategory.ColumnIds.map(ci => { return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(ci, this.props.Columns); });
        colItems[0].Content = ColumnCategory.ColumnCategoryId;
        colItems[1].Content = columnNames.join(', ');
        let buttons = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, ConfirmDeleteAction: this.props.onDeleteConfirm, showShare: this.props.TeamSharingActivated, editClick: () => this.props.onEdit(this.props.Index, ColumnCategory), shareClick: () => this.props.onShare(), overrideDisableEdit: false, EntityName: StrategyConstants.ColumnCategoryStrategyName });
        colItems[2].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.ColumnCategoryEntityRow = ColumnCategoryEntityRow;
