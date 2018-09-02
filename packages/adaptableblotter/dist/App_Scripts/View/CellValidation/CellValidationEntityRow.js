"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const EntityListActionButtons_1 = require("../Components/Buttons/EntityListActionButtons");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const EnumExtensions_1 = require("../../Core/Extensions/EnumExtensions");
const ExpressionHelper_1 = require("../../Core/Helpers/ExpressionHelper");
const StrategyNames = require("../../Core/Constants/StrategyNames");
const Enums_1 = require("../../Core/Enums");
const ColumnHelper_1 = require("../../Core/Helpers/ColumnHelper");
class CellValidationEntityRow extends React.Component {
    render() {
        let cellValidation = this.props.AdaptableBlotterObject;
        let ActionModeTypes = EnumExtensions_1.EnumExtensions.getNames(Enums_1.ActionMode).map((validationMode) => {
            return React.createElement("option", { style: { fontSize: "5px" }, key: validationMode, value: validationMode }, validationMode);
        });
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = this.getColumnandRule(cellValidation);
        colItems[1].Content = this.setExpressionDescription(cellValidation);
        colItems[2].Content =
            React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: cellValidation.ActionMode, onChange: (x) => this.onActionModeChanged(this.props.Index, x) }, ActionModeTypes);
        colItems[3].Content = React.createElement(EntityListActionButtons_1.EntityListActionButtons, { cssClassName: this.props.cssClassName, ConfirmDeleteAction: this.props.onDeleteConfirm, showShare: this.props.TeamSharingActivated, editClick: () => this.props.onEdit(this.props.Index, cellValidation), shareClick: () => this.props.onShare(), overrideDisableEdit: !this.props.Column, ConfigEntity: cellValidation, EntityName: StrategyNames.CellValidationStrategyName });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
    setExpressionDescription(CellValidation) {
        return (ExpressionHelper_1.ExpressionHelper.IsNotEmptyExpression(CellValidation.Expression)) ?
            ExpressionHelper_1.ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, this.props.Columns, this.props.UserFilters) :
            "No Expression";
    }
    getColumnandRule(cellValidation) {
        let columnInfo = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumn(cellValidation.ColumnId, this.props.Column);
        columnInfo += ": " + cellValidation.Description;
        return columnInfo;
    }
    onActionModeChanged(index, event) {
        let e = event.target;
        let returnValue = (e.value == 'Stop Edit') ? 'Stop Edit' : 'Warn User';
        this.props.onChangeActionMode(index, returnValue);
    }
}
exports.CellValidationEntityRow = CellValidationEntityRow;
