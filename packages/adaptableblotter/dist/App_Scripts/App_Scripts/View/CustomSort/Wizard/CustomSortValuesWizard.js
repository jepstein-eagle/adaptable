"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Enums_1 = require("../../../Core/Enums");
const PanelWithInfo_1 = require("../../Components/Panels/PanelWithInfo");
const DualListBoxEditor_1 = require("../../Components/ListBox/DualListBoxEditor");
const ColumnHelper_1 = require("../../../Core/Helpers/ColumnHelper");
class CustomSortValuesWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            ColumnValues: this.props.Blotter.getColumnValueDisplayValuePairDistinctList(this.props.Data.ColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue),
            SelectedValues: this.props.Data.SortedValues,
            IsEdit: this.props.Data.SortedValues.length > 0
        };
    }
    render() {
        let friendlyName = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns);
        let infoBody = ["Create a custom sort for the '" + friendlyName + "' column by moving items to the 'Custom Sort Order' listbox.", React.createElement("br", null), React.createElement("br", null), "Use the buttons on the right of the box to order items in the list as required.", React.createElement("br", null), React.createElement("br", null), "The new sort will consist first of the items in the 'Custom Sort Order' listbox; all other column values will then sort alphabetically."];
        let cssClassName = this.props.cssClassName + "-values";
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithInfo_1.PanelWithInfo, { cssClassName: cssClassName, header: "Sort Order for: " + friendlyName, bsStyle: "primary", infoBody: infoBody },
                React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: this.state.ColumnValues, cssClassName: cssClassName, SelectedValues: this.state.SelectedValues, HeaderAvailable: "Column Values", HeaderSelected: "Custom Sort Order", DisplayMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.DisplayValue], SortMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.RawValue], ValueMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.DisplayValue], onChange: (SelectedValues) => this.OnSelectedValuesChange(SelectedValues), ReducedDisplay: true })));
    }
    OnSelectedValuesChange(newValues) {
        this.setState({ SelectedValues: newValues }, () => this.props.UpdateGoBackState());
    }
    canNext() { return this.state.SelectedValues.length > 0; }
    canBack() { return !this.state.IsEdit; }
    Next() { this.props.Data.SortedValues = this.state.SelectedValues; }
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
exports.CustomSortValuesWizard = CustomSortValuesWizard;
