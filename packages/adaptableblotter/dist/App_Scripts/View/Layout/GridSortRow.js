"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const Enums_1 = require("../../Core/Enums");
const ColumnSelector_1 = require("../Components/Selectors/ColumnSelector");
const EnumExtensions_1 = require("../../Core/Extensions/EnumExtensions");
const ButtonDelete_1 = require("../Components/Buttons/ButtonDelete");
class GridSortRow extends React.Component {
    render() {
        let colItems = [].concat(this.props.colItems);
        let sortOrders = EnumExtensions_1.EnumExtensions.getNames(Enums_1.SortOrder).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        colItems[0].Content = React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: this.props.cssClassName, SelectedColumnIds: [this.props.GridSort.Column], ColumnList: this.props.Columns.filter(c => c.Sortable), onColumnChange: columns => this.onColumnSelectedChanged(columns), SelectionMode: Enums_1.SelectionMode.Single });
        colItems[1].Content = React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: this.props.GridSort.SortOrder, onChange: (x) => this.onSortOrderChanged(x) }, sortOrders);
        let deleteButton = React.createElement(ButtonDelete_1.ButtonDelete, { cssClassName: this.props.cssClassName, style: { marginLeft: "1px", marginTop: "2px", marginBottom: "2px", marginRight: "1px" }, overrideDisableButton: false, ConfigEntity: null, overrideTooltip: "Delete Sort", DisplayMode: "Glyph", ConfirmAction: null, ConfirmationMsg: "", ConfirmationTitle: "", onClickAction: () => this.props.onDeleteGridSort(), size: "small" });
        colItems[2].Content = deleteButton;
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
    onColumnSelectedChanged(columns) {
        let column = columns[0];
        this.props.onGridSortColumnChanged(column);
    }
    onSortOrderChanged(event) {
        let e = event.target;
        this.props.onGridSortOrderChanged(e.value);
    }
}
exports.GridSortRow = GridSortRow;
