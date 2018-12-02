"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PanelWithInfo_1 = require("../../Components/Panels/PanelWithInfo");
const DualListBoxEditor_1 = require("../../Components/ListBox/DualListBoxEditor");
const ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
class LayoutColumnWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            SelectedColumns: ColumnHelper_1.ColumnHelper.getFriendlyNamesFromColumnIds(this.props.Data.Columns, this.props.Columns)
        };
    }
    render() {
        let infoBody = ["Create a layout.", React.createElement("br", null), React.createElement("br", null), "Use the buttons on the right of the box to order items in the list as required.", React.createElement("br", null), React.createElement("br", null), "The new sort will consist first of the items in the 'Custom Sort Order' listbox; all other column values will then sort alphabetically."];
        let cssClassName = this.props.cssClassName + "-column";
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithInfo_1.PanelWithInfo, { cssClassName: cssClassName, header: "Choose columns for the Layout", bsStyle: "primary", infoBody: infoBody },
                React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: this.props.Columns.map(x => x.FriendlyName), cssClassName: cssClassName, SelectedValues: this.state.SelectedColumns, HeaderAvailable: "Available Columns", HeaderSelected: "Columns in Layout", onChange: (SelectedValues) => this.OnSelectedValuesChange(SelectedValues), ReducedDisplay: true })));
    }
    OnSelectedValuesChange(newValues) {
        this.setState({ SelectedColumns: newValues }, () => this.props.UpdateGoBackState());
    }
    canNext() { return this.state.SelectedColumns.length > 0; }
    canBack() { return true; ; }
    Next() {
        this.props.Data.Columns = ColumnHelper_1.ColumnHelper.getColumnIdsFromFriendlyNames(this.state.SelectedColumns, this.props.Columns);
    }
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
exports.LayoutColumnWizard = LayoutColumnWizard;
