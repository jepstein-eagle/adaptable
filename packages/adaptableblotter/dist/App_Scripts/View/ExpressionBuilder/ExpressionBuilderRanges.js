"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Enums_1 = require("../../Core/Enums");
const Enums_2 = require("../../Core/Enums");
const ExpressionHelper_1 = require("../../Core/Helpers/ExpressionHelper");
const react_bootstrap_1 = require("react-bootstrap");
const UIHelper_1 = require("../UIHelper");
const ColumnSelector_1 = require("../Components/Selectors/ColumnSelector");
const AdaptableBlotterForm_1 = require("../Components/Forms/AdaptableBlotterForm");
const EnumExtensions_1 = require("../../Core/Extensions/EnumExtensions");
const ObjectFactory_1 = require("../../Core/ObjectFactory");
class ExpressionBuilderRanges extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__queryranges";
        let selectedColumnDataType = this.props.SelectedColumn.DataType;
        let addButton = React.createElement(react_bootstrap_1.Button, { bsSize: "small", bsStyle: "default", onClick: () => this.addRange() },
            React.createElement(react_bootstrap_1.Glyphicon, { glyph: "plus" }),
            " Add Range");
        let rangesElement = this.props.Ranges.map((range, index) => {
            let optionLeafOperators = ExpressionHelper_1.ExpressionHelper.GetOperatorsForDataType(selectedColumnDataType).map((operator) => {
                return React.createElement("option", { key: operator, value: operator }, ExpressionHelper_1.ExpressionHelper.OperatorToLongFriendlyString(operator, selectedColumnDataType));
            });
            let rangeMenuItemsOperand1 = EnumExtensions_1.EnumExtensions.getNames(Enums_1.RangeOperandType).map((rangeOperand) => {
                return React.createElement(react_bootstrap_1.MenuItem, { key: index + rangeOperand, eventKey: index + rangeOperand, onClick: () => this.onRangeTypeChangedOperand1(index, rangeOperand) }, rangeOperand);
            });
            let rangeMenuItemsOperand2 = EnumExtensions_1.EnumExtensions.getNames(Enums_1.RangeOperandType).map((rangeOperand) => {
                return React.createElement(react_bootstrap_1.MenuItem, { key: index + rangeOperand, eventKey: index + rangeOperand, onClick: () => this.onRangeTypeChangedOperand2(index, rangeOperand) }, rangeOperand);
            });
            let deleteButton = React.createElement(react_bootstrap_1.Button, { bsSize: "small", bsStyle: "default", style: deleteButtonStyle, onClick: () => this.onRangeDelete(index) },
                React.createElement(react_bootstrap_1.Glyphicon, { glyph: "trash" }));
            return React.createElement("div", { className: "ab_no_padding_medium_margin", style: betweenDivStyle, key: index },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, key: index },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "Range" + index },
                        React.createElement(react_bootstrap_1.InputGroup, null,
                            React.createElement(react_bootstrap_1.FormControl, { style: dropDownStyle, componentClass: "select", placeholder: "select", value: range.Operator, onChange: (x) => this.onLeafExpressionOperatorChanged(index, x) }, optionLeafOperators),
                            React.createElement(react_bootstrap_1.InputGroup.Button, null,
                                React.createElement(react_bootstrap_1.OverlayTrigger, { overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "tooltipDelete" }, "Delete") },
                                    React.createElement(react_bootstrap_1.Button, { style: deleteButtonStyle, onClick: () => this.onRangeDelete(index) },
                                        React.createElement(react_bootstrap_1.Glyphicon, { glyph: "trash" }))))),
                        React.createElement(react_bootstrap_1.InputGroup, null,
                            React.createElement(react_bootstrap_1.DropdownButton, { style: rangeOperatorStyle, title: range.Operand1Type, id: "range_operand_1", componentClass: react_bootstrap_1.InputGroup.Button }, rangeMenuItemsOperand1),
                            range.Operand1Type == Enums_1.RangeOperandType.Column ?
                                React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [range.Operand1], ColumnList: this.props.Columns.filter(c => c.DataType == selectedColumnDataType && c.ColumnId != this.props.SelectedColumn.ColumnId), onColumnChange: columns => this.onColumnOperand1SelectedChanged(index, columns), SelectionMode: Enums_1.SelectionMode.Single })
                                :
                                    this.getOperand1FormControl(index, range)),
                        range.Operator == Enums_2.LeafExpressionOperator.Between &&
                            React.createElement(react_bootstrap_1.InputGroup, null,
                                React.createElement(react_bootstrap_1.DropdownButton, { style: rangeOperatorStyle, title: range.Operand2Type, id: "range_operand_2", componentClass: react_bootstrap_1.InputGroup.Button }, rangeMenuItemsOperand2),
                                range.Operand2Type == Enums_1.RangeOperandType.Column ?
                                    React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [range.Operand2], ColumnList: this.props.Columns.filter(c => c.DataType == selectedColumnDataType && c.ColumnId != this.props.SelectedColumn.ColumnId), onColumnChange: columns => this.onColumnOperand2SelectedChanged(index, columns), SelectionMode: Enums_1.SelectionMode.Single })
                                    :
                                        this.getOperand2FormControl(index, range)))));
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { className: "ab_no-padding-anywhere-panel", style: divStyle },
                addButton,
                rangesElement));
    }
    getOperand1FormControl(index, range) {
        return React.createElement(react_bootstrap_1.FormControl, { style: operandStyle, value: String(range.Operand1), type: UIHelper_1.UIHelper.getDescriptionForDataType(this.props.SelectedColumn.DataType), placeholder: UIHelper_1.UIHelper.getPlaceHolderforDataType(this.props.SelectedColumn.DataType), onChange: (e) => this.onOperand1Edit(index, e) });
    }
    getOperand2FormControl(index, range) {
        return React.createElement(react_bootstrap_1.FormControl, { style: operandStyle, value: String(range.Operand2), type: UIHelper_1.UIHelper.getDescriptionForDataType(this.props.SelectedColumn.DataType), placeholder: UIHelper_1.UIHelper.getPlaceHolderforDataType(this.props.SelectedColumn.DataType), onChange: (e) => this.onOperand2Edit(index, e) });
    }
    onRangeDelete(index) {
        let newCol = [].concat(this.props.Ranges);
        newCol.splice(index, 1);
        this.props.onRangesChange(newCol);
    }
    addRange() {
        this.props.onRangesChange([].concat(this.props.Ranges, ObjectFactory_1.ObjectFactory.CreateEmptyRange()));
    }
    onLeafExpressionOperatorChanged(index, event) {
        let e = event.target;
        let rangeCol = [].concat(this.props.Ranges);
        let range = this.props.Ranges[index];
        rangeCol[index] = Object.assign({}, range, { Operator: e.value });
        this.props.onRangesChange(rangeCol);
    }
    onRangeTypeChangedOperand1(index, rangeOperandType) {
        let rangeCol = [].concat(this.props.Ranges);
        let range = this.props.Ranges[index];
        rangeCol[index] = Object.assign({}, range, { Operand1Type: rangeOperandType });
        this.props.onRangesChange(rangeCol);
    }
    onRangeTypeChangedOperand2(index, rangeOperandType) {
        let rangeCol = [].concat(this.props.Ranges);
        let range = this.props.Ranges[index];
        rangeCol[index] = Object.assign({}, range, { Operand2Type: rangeOperandType });
        this.props.onRangesChange(rangeCol);
    }
    onOperand1Edit(index, x) {
        let e = x.target;
        let rangeCol = [].concat(this.props.Ranges);
        let range = this.props.Ranges[index];
        rangeCol[index] = Object.assign({}, range, { Operand1: e.value });
        this.props.onRangesChange(rangeCol);
    }
    onOperand2Edit(index, x) {
        let e = x.target;
        let rangeCol = [].concat(this.props.Ranges);
        let range = this.props.Ranges[index];
        rangeCol[index] = Object.assign({}, range, { Operand2: e.value });
        this.props.onRangesChange(rangeCol);
    }
    onColumnOperand1SelectedChanged(index, columns) {
        let rangeCol = [].concat(this.props.Ranges);
        let range = this.props.Ranges[index];
        let selectedColumn = columns.length > 0 ? columns[0].ColumnId : "";
        rangeCol[index] = Object.assign({}, range, { Operand1: selectedColumn });
        this.props.onRangesChange(rangeCol);
    }
    onColumnOperand2SelectedChanged(index, columns) {
        let rangeCol = [].concat(this.props.Ranges);
        let range = this.props.Ranges[index];
        let selectedColumn = columns.length > 0 ? columns[0].ColumnId : "";
        rangeCol[index] = Object.assign({}, range, { Operand2: selectedColumn });
        this.props.onRangesChange(rangeCol);
    }
}
exports.ExpressionBuilderRanges = ExpressionBuilderRanges;
let divStyle = {
    'overflowY': 'auto',
    'overflowX': 'hidden',
    'height': '350px',
};
let betweenDivStyle = {
    'marginBottom': '20px'
};
let deleteButtonStyle = {
    'marginRight': '10px'
};
let dropDownStyle = {
    'width': '250px',
    'marginLeft': '10px',
    'marginRight': '0px',
    'marginTop': '0px'
};
let operandStyle = {
    'width': '190px',
    'marginLeft': '0px',
    'marginRight': '2px',
    'marginTop': '0px'
};
let rangeOperatorStyle = {
    'width': '100px',
    'marginLeft': '10px',
    'marginRight': '0px',
    'marginTop': '0px'
};
let rangePanelStyle = {
    'margin': '0px',
    'padding': '0px'
};
