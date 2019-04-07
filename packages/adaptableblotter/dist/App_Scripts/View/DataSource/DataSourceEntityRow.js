"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const EntityRowItem_1 = require("../Components/EntityRowItem");
class DataSourceEntityRow extends React.Component {
    render() {
        let dataSource = this.props.AdaptableBlotterObject;
        let colItems = [].concat(this.props.colItems);
        // put in the ability to change name / description later...
        colItems[0].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: dataSource.Name });
        colItems[1].Content = React.createElement(EntityRowItem_1.EntityRowItem, { Content: dataSource.Description });
        colItems[2].Content =
            React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, editClick: () => this.props.onEdit(this.props.Index, dataSource), shareClick: () => this.props.onShare(), showShare: this.props.TeamSharingActivated, ConfirmDeleteAction: this.props.onDeleteConfirm, EntityType: StrategyConstants.DataSourceStrategyName });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
    onDescriptionChange(event) {
        let e = event.target;
        this.props.onChangeDescription(this.props.AdaptableBlotterObject, e.value);
    }
    onNameChange(event) {
        let e = event.target;
        this.props.onChangeName(this.props.AdaptableBlotterObject, e.value);
    }
}
exports.DataSourceEntityRow = DataSourceEntityRow;
