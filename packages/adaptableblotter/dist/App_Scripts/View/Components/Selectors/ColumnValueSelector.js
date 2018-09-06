"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Helper_1 = require("../../../Core/Helpers/Helper");
const StringExtensions_1 = require("../../../Core/Extensions/StringExtensions");
const react_bootstrap_typeahead_1 = require("react-bootstrap-typeahead");
const Enums_1 = require("../../../Core/Enums");
const StyleConstants = require("../../../Core/Constants/StyleConstants");
class ColumnValueSelector extends React.Component {
    componentWillReceiveProps(nextProps, nextContext) {
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.SelectedColumnValue) && StringExtensions_1.StringExtensions.IsNullOrEmpty(nextProps.SelectedColumnValue)) {
            let typeahed = this.refs.typeahead;
            if (typeahed) {
                typeahed.getInstance().clear();
            }
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.COLUMN_VALUE_SELECTOR;
        let sortedColumnValues = [];
        let selectedValue = "";
        let placeholderText = "Select column value";
        let allowNew = (this.props.AllowNew != null) ? this.props.AllowNew : true;
        if (allowNew) {
            placeholderText += " or enter free text";
        }
        if (this.props.SelectedColumn != null && this.props.Blotter != null && this.props.Blotter.getColumnValueDisplayValuePairDistinctList != null) {
            let columnDisplayValuePairs = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(this.props.SelectedColumn.ColumnId, Enums_1.DistinctCriteriaPairValue.DisplayValue);
            if (StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.SelectedColumnValue)) {
                selectedValue = "";
            }
            else {
                let existingPair = columnDisplayValuePairs.find(cdv => cdv.RawValue == this.props.SelectedColumnValue);
                selectedValue = (existingPair) ? existingPair.DisplayValue : this.props.SelectedColumnValue;
            }
            sortedColumnValues = Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Ascending, columnDisplayValuePairs, "RawValue");
        }
        return React.createElement(react_bootstrap_typeahead_1.Typeahead, { ref: "typeahead", bsSize: this.props.bsSize, emptyLabel: "", placeholder: placeholderText, labelKey: "DisplayValue", multiple: false, selected: [selectedValue], onChange: (selected) => { this.onColumnChange(selected); }, options: sortedColumnValues, disabled: this.props.disabled, allowNew: allowNew, newSelectionPrefix: "new value: ", filterBy: ["DisplayValue"] });
    }
    onColumnChange(selected) {
        if (selected.length == 0 && this.props.SelectedColumnValue == "") {
            return; // must be a nicer way but we want to avoid ridiculous amounts of prop calls
        }
        if (selected.length == 0) {
            this.props.onColumnValueChange("");
        }
        else {
            if (selected[0].customOption) {
                this.props.onColumnValueChange(selected[0].DisplayValue);
            }
            else {
                let pair = selected[0];
                this.props.onColumnValueChange(pair.RawValue);
            }
        }
    }
}
exports.ColumnValueSelector = ColumnValueSelector;
