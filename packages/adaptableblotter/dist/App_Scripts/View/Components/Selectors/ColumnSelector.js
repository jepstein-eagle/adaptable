"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_typeahead_1 = require("react-bootstrap-typeahead");
const StringExtensions_1 = require("../../../Core/Extensions/StringExtensions");
const Enums_1 = require("../../../Core/Enums");
const Helper_1 = require("../../../Core/Helpers/Helper");
const react_bootstrap_1 = require("react-bootstrap");
const StyleConstants = require("../../../Core/Constants/StyleConstants");
const ButtonClear_1 = require("../Buttons/ButtonClear");
class ColumnSelector extends React.Component {
    // _typeahead: any;
    componentWillReceiveProps(nextProps, nextContext) {
        //if there was a selected column and parent unset the column we then clear the component 
        // otherwise it's correctly unselected but the input still have the previsous selected column text
        let propsSelectedColumnIds = this.props.SelectedColumnIds.filter(x => StringExtensions_1.StringExtensions.IsNotNullOrEmpty(x));
        let nextPropsSelectedColumnIds = nextProps.SelectedColumnIds.filter(x => StringExtensions_1.StringExtensions.IsNotNullOrEmpty(x));
        if (propsSelectedColumnIds.length == 0 && nextPropsSelectedColumnIds.length == 0) {
            this.refs.typeahead.getInstance().clear();
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + StyleConstants.COLUMN_SELECTOR;
        let sortedColumns = Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Ascending, this.props.ColumnList, "FriendlyName");
        let selectedColumnIds = this.props.SelectedColumnIds.filter(x => StringExtensions_1.StringExtensions.IsNotNullOrEmpty(x));
        let selectedColums = this.props.ColumnList.filter(x => selectedColumnIds.find(c => c == x.ColumnId));
        let placeHolder = (this.props.SelectionMode == Enums_1.SelectionMode.Single) ? "Select a column" : "Select columns";
        // let size: any = (this.props.bsSize) ? this.props.bsSize : 'large';
        let isEmptySelectedColumnIds = this.props.SelectedColumnIds.filter(x => StringExtensions_1.StringExtensions.IsNotNullOrEmpty(x)).length == 0;
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.InputGroup, null,
                React.createElement(react_bootstrap_typeahead_1.Typeahead, { ref: "typeahead", emptyLabel: "No Column", placeholder: placeHolder, labelKey: "FriendlyName", filterBy: ["FriendlyName", "ColumnId"], multiple: this.props.SelectionMode == Enums_1.SelectionMode.Multi, selected: selectedColums, onChange: (selected) => { this.onColumnChange(selected, isEmptySelectedColumnIds); }, options: sortedColumns, disabled: this.props.disabled }),
                React.createElement(react_bootstrap_1.InputGroup.Button, null,
                    React.createElement(ButtonClear_1.ButtonClear, { bsStyle: "default", cssClassName: cssClassName, onClick: () => this.onClearButton(), overrideTooltip: "Clear Column", overrideDisableButton: isEmptySelectedColumnIds, DisplayMode: "Glyph" }))));
    }
    onClearButton() {
        this.props.onColumnChange([]);
        // if (this._typeahead != null) {
        this.refs.typeahead.getInstance().clear();
        //  }
    }
    onColumnChange(selected, isEmptySelection) {
        if (selected.length == 0 && isEmptySelection) {
            return; // must be a nicer way but we want to avoid ridiculous amounts of prop calls
        }
        this.props.onColumnChange(selected);
    }
}
exports.ColumnSelector = ColumnSelector;
