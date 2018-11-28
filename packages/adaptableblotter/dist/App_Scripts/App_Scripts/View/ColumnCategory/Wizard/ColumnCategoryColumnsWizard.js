"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PanelWithInfo_1 = require("../../Components/Panels/PanelWithInfo");
const DualListBoxEditor_1 = require("../../Components/ListBox/DualListBoxEditor");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
const ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
class ColumnCategoryColumnsWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        let selectedFriendlyColumns = ColumnHelper_1.ColumnHelper.getFriendlyNamesFromColumnIds(this.props.Data.ColumnIds, this.props.Columns);
        let currentlyColumnCategorys = [];
        this.props.ColumnCategorys.map(lk => {
            currentlyColumnCategorys.push(...lk.ColumnIds);
        });
        let allColumns = this.props.Columns.map(c => c.ColumnId);
        let availableColumns = [];
        allColumns.forEach(c => {
            if (ArrayExtensions_1.ArrayExtensions.NotContainsItem(currentlyColumnCategorys, c)) {
                availableColumns.push(c);
            }
        });
        let availableFriendlyColumns = ColumnHelper_1.ColumnHelper.getFriendlyNamesFromColumnIds(availableColumns, this.props.Columns);
        selectedFriendlyColumns.forEach(sc => availableFriendlyColumns.push(sc));
        this.state = {
            AvailableColumns: availableFriendlyColumns,
            SelectedColumns: selectedFriendlyColumns,
            IsEdit: this.props.Data.ColumnIds.length > 0
        };
    }
    render() {
        let infoBody = ["Choose which columns should be linked.", React.createElement("br", null), React.createElement("br", null), "Use the buttons on the right of the box to order items in the list as required.", React.createElement("br", null), React.createElement("br", null),];
        let cssClassName = this.props.cssClassName + "-values";
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithInfo_1.PanelWithInfo, { cssClassName: cssClassName, header: "Columns in Column Category: " + this.props.Data.ColumnCategoryId, bsStyle: "primary", infoBody: infoBody },
                React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: this.state.AvailableColumns, cssClassName: cssClassName, SelectedValues: this.state.SelectedColumns, HeaderAvailable: "Available Columns", HeaderSelected: "Selected Columns", onChange: (SelectedValues) => this.OnSelectedValuesChange(SelectedValues), ReducedDisplay: true })));
    }
    OnSelectedValuesChange(newValues) {
        //   let selectedColumns: string[] = ColumnHelper.getFriendlyNamesFromColumnIds(newValues, this.props.Columns);
        console.log("from method: " + newValues);
        this.setState({ SelectedColumns: newValues }, () => this.props.UpdateGoBackState());
    }
    canNext() { return this.state.SelectedColumns.length > 0; }
    canBack() { return !this.state.IsEdit; }
    Next() { this.props.Data.ColumnIds = ColumnHelper_1.ColumnHelper.getColumnIdsFromFriendlyNames(this.state.SelectedColumns, this.props.Columns); }
    Back() {
        // todo
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.ColumnCategoryColumnsWizard = ColumnCategoryColumnsWizard;
