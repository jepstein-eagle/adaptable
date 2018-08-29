"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const EntityListActionButtons_1 = require("../Buttons/EntityListActionButtons");
const SummaryRowItem_1 = require("./SummaryRowItem");
class StrategyDetail extends React.Component {
    render() {
        let summaryItems = [];
        this.props.showBold ?
            summaryItems.push(React.createElement("b", null, this.props.Item1)) :
            summaryItems.push(React.createElement("i", null, this.props.Item1));
        summaryItems.push(React.createElement("i", null, this.props.Item2));
        summaryItems.push(React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, ConfirmDeleteAction: this.props.onDelete, editClick: () => this.props.onEdit(), shareClick: () => this.props.onShare(), showShare: this.props.showShare, ConfigEntity: this.props.ConfigEnity, EntityName: this.props.EntityName }));
        return React.createElement(SummaryRowItem_1.SummaryRowItem, { cssClassName: this.props.cssClassName, SummaryItems: summaryItems });
    }
}
exports.StrategyDetail = StrategyDetail;
