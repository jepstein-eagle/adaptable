"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Enums_1 = require("../../Core/Enums");
const SingleListBox_1 = require("../Components/ListBox/SingleListBox");
const react_bootstrap_1 = require("react-bootstrap");
class ExpressionBuilderColumnValues extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__querycolumnvalues";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { className: "ab_no-padding-anywhere-panel", style: divStyle },
                React.createElement(SingleListBox_1.SingleListBox, { Values: this.props.ColumnValues, cssClassName: cssClassName, UiSelectedValues: this.props.SelectedValues, DisplayMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.DisplayValue], ValueMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.DisplayValue], SortMember: Enums_1.DistinctCriteriaPairValue[Enums_1.DistinctCriteriaPairValue.RawValue], onSelectedChange: (list) => this.props.onColumnValuesChange(list), SelectionMode: Enums_1.SelectionMode.Multi })));
    }
}
exports.ExpressionBuilderColumnValues = ExpressionBuilderColumnValues;
let divStyle = {
    'overflowY': 'auto',
    'height': '350px',
};
