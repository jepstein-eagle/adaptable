"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const ButtonShowChart_1 = require("../Components/Buttons/ButtonShowChart");
class ChartEntityRow extends React.Component {
    render() {
        // assuming only category charts for now - silly assumption to make in due course...
        let Chart = this.props.AdaptableBlotterObject;
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = Chart.Name;
        colItems[1].Content = Chart.Description;
        colItems[2].Content = Chart.ChartType;
        colItems[3].Content = React.createElement(ButtonShowChart_1.ButtonShowChart, { key: "key:" + Chart.Name, style: { marginLeft: "2px" }, cssClassName: this.props.cssClassName, onClick: () => this.props.onShowChart(Chart.Name), size: "small", overrideTooltip: "Show Chart", DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel });
        colItems[4].Content = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, ConfirmDeleteAction: this.props.onDeleteConfirm, editClick: () => this.props.onEdit(this.props.Index, Chart), shareClick: () => this.props.onShare(), showShare: this.props.TeamSharingActivated, overrideDisableEdit: null, EntityType: StrategyConstants.ChartStrategyName });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
}
exports.ChartEntityRow = ChartEntityRow;
