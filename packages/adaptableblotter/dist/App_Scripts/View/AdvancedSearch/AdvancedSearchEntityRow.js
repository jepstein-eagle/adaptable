"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const ExpressionHelper_1 = require("../../Utilities/Helpers/ExpressionHelper");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const EntityRowItem_1 = require("../Components/EntityRowItem");
class AdvancedSearchEntityRow extends React.Component {
    render() {
        let advancedSearch = this.props.AdaptableBlotterObject;
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(react_bootstrap_1.Radio, { style: { padding: "0px", margin: "0px" }, onChange: () => this.props.onSelect(advancedSearch), checked: this.props.IsCurrentAdvancedSearch });
        colItems[1].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: advancedSearch.Name });
        colItems[2].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(advancedSearch.Expression, this.props.Columns) });
        let buttons = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, ConfirmDeleteAction: this.props.onDeleteConfirm, showShare: this.props.TeamSharingActivated, editClick: () => this.props.onEdit(this.props.Index, advancedSearch), shareClick: () => this.props.onShare(), overrideDisableEdit: null, EntityType: StrategyConstants.AdvancedSearchStrategyName });
        colItems[3].Content = buttons;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.AdvancedSearchEntityRow = AdvancedSearchEntityRow;
