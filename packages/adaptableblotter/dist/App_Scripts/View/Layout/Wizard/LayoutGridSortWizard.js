"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const Enums_1 = require("../../../Utilities/Enums");
const GridSortRow_1 = require("../GridSortRow");
const AdaptableObjectCollection_1 = require("../../Components/AdaptableObjectCollection");
const ObjectFactory_1 = require("../../../Utilities/ObjectFactory");
const PanelWithButton_1 = require("../../Components/Panels/PanelWithButton");
class LayoutGridSortWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            GridSorts: this.props.Data.GridSorts
        };
    }
    onEdit(arg0) {
        throw new Error("Method not implemented.");
    }
    render() {
        let addButton = React.createElement(react_bootstrap_1.Button, { bsSize: "small", bsStyle: "default", style: { marginBottom: '20px' }, onClick: () => this.addSort() },
            React.createElement(react_bootstrap_1.Glyphicon, { glyph: "plus" }),
            "Add Sort");
        let colItems = [
            { Content: "Column", Size: 4 },
            { Content: "Sort Order", Size: 4 },
            { Content: "", Size: 4 },
        ];
        let gridSortRows = this.state.GridSorts.map((x, index) => {
            return React.createElement(GridSortRow_1.GridSortRow, { key: index, cssClassName: "", AdaptableBlotterObject: null, colItems: colItems, Columns: this.props.Columns, UserFilters: null, Index: index, onEdit: null, onDeleteGridSort: () => this.onDeleteGridSort(index), onGridSortColumnChanged: (column) => this.onColumnSelectedChanged(index, column), onGridSortOrderChanged: (sortOrder) => this.onSortOrderChanged(index, sortOrder), onShare: null, TeamSharingActivated: false, onDeleteConfirm: null, GridSort: x });
        });
        let cssClassName = this.props.cssClassName + "-gridsort";
        return React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: "Sort Information", bsStyle: "primary", style: divStyle, button: addButton },
            React.createElement("div", null,
                React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: gridSortRows, allowOverflow: true })));
    }
    addSort() {
        let sorts = [].concat(this.state.GridSorts, ObjectFactory_1.ObjectFactory.CreateEmptyGridSort());
        this.setState({ GridSorts: sorts }, () => this.props.UpdateGoBackState());
    }
    onColumnSelectedChanged(index, column) {
        let sorts = [].concat(this.state.GridSorts);
        let sort = sorts[index];
        sort.Column = column.ColumnId;
        this.setState({ GridSorts: sorts }, () => this.props.UpdateGoBackState());
    }
    onSortOrderChanged(index, sortOrder) {
        let sorts = [].concat(this.state.GridSorts);
        let sort = sorts[index];
        sort.SortOrder = sortOrder;
        this.setState({ GridSorts: sorts }, () => this.props.UpdateGoBackState());
    }
    onDeleteGridSort(index) {
        let sorts = [].concat(this.state.GridSorts);
        sorts.splice(index, 1);
        this.setState({ GridSorts: sorts }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        let canNext = true;
        this.state.GridSorts.forEach(gs => {
            if (StringExtensions_1.StringExtensions.IsNullOrEmpty(gs.Column) || gs.SortOrder == Enums_1.SortOrder.Unknown) {
                canNext = false;
            }
        });
        return canNext;
    }
    canBack() { return true; }
    Next() {
        this.props.Data.GridSorts = this.state.GridSorts;
    }
    Back() {
        // todo
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1; // some way of knowing to go back 2 steps?
    }
}
exports.LayoutGridSortWizard = LayoutGridSortWizard;
let divStyle = {
    'overflowY': 'auto',
    'height': '500px',
};
