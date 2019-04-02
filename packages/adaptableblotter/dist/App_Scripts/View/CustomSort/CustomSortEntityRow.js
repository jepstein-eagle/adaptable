"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
const EntityRowItem_1 = require("../Components/EntityRowItem");
class CustomSortEntityRow extends React.Component {
    render() {
        let customSort = this.props.AdaptableBlotterObject;
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: this.props.ColumnLabel });
        colItems[1].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: customSort.SortedValues.join(', ') });
        colItems[2].Content = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, ConfirmDeleteAction: this.props.onDeleteConfirm, editClick: () => this.props.onEdit(this.props.Index, customSort), shareClick: () => this.props.onShare(), showShare: this.props.TeamSharingActivated, overrideDisableEdit: this.props.ColumnLabel.includes(GeneralConstants.MISSING_COLUMN), EntityType: StrategyConstants.CustomSortStrategyName });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.CustomSortEntityRow = CustomSortEntityRow;
