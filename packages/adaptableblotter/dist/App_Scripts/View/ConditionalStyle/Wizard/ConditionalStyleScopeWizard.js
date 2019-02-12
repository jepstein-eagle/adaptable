"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Utilities/Enums");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
class ConditionalStyleScopeWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ColumnId: StringExtensions_1.StringExtensions.IsNull(this.props.Data.ColumnId) ? "" : this.props.Data.ColumnId,
            ColumnCategoryId: StringExtensions_1.StringExtensions.IsNull(this.props.Data.ColumnCategoryId) ? "" : this.props.Data.ColumnCategoryId,
            ConditionalStyleScope: this.props.Data.ConditionalStyleScope,
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-scope";
        let optionColumnCategorys = this.props.ColumnCategories.map(cc => {
            return React.createElement("option", { value: cc.ColumnCategoryId, key: cc.ColumnCategoryId }, cc.ColumnCategoryId);
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Select Where the Conditional Style is Applied", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(react_bootstrap_1.Radio, { className: cssClassName + "__radiobutton", inline: true, value: "Row", checked: this.state.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Row, onChange: (e) => this.onScopeSelectChanged(e) }, "Whole Row"),
                        ' ',
                        " ",
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Conditional Style: Whole Row", bodyText: ["The conditional style will be applied to alls cells in each matching row."] })),
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(react_bootstrap_1.Radio, { className: cssClassName + "__radiobutton", inline: true, value: "Column", checked: this.state.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column, onChange: (e) => this.onScopeSelectChanged(e) }, "Column"),
                        ' ',
                        " ",
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Conditional Style: Single Column", bodyText: ["Pick the column from the list below which will have conditional style applied."] }))),
                this.state.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column &&
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.ColumnId], ColumnList: this.props.Columns, onColumnChange: columns => this.onColumnSelectedChanged(columns), SelectionMode: Enums_1.SelectionMode.Single })),
                ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategories) &&
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(react_bootstrap_1.Radio, { className: cssClassName + "__radiobutton", inline: true, value: "ColumnCategory", checked: this.state.ConditionalStyleScope == Enums_1.ConditionalStyleScope.ColumnCategory, onChange: (e) => this.onScopeSelectChanged(e) }, "Column Category"),
                        ' ',
                        " ",
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Conditional Style: Column Categorys", bodyText: ["Pick the Column Category from the list below to apply the conditional style to all Column Categorys."] })),
                ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnCategories) && this.state.ConditionalStyleScope == Enums_1.ConditionalStyleScope.ColumnCategory &&
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: this.state.ColumnCategoryId, onChange: (x) => this.onColumnCategorySelectedChanged(x) },
                            React.createElement("option", { value: "select", key: "select" }, "Select a Column Category"),
                            optionColumnCategorys))));
    }
    onColumnSelectedChanged(columns) {
        this.setState({ ColumnId: columns.length > 0 ? columns[0].ColumnId : "" }, () => this.props.UpdateGoBackState());
    }
    onColumnCategorySelectedChanged(event) {
        let e = event.target;
        this.setState({ ColumnCategoryId: e.value }, () => this.props.UpdateGoBackState());
    }
    onScopeSelectChanged(event) {
        let e = event.target;
        if (e.value == "Column") {
            this.setState({ ConditionalStyleScope: Enums_1.ConditionalStyleScope.Column }, () => this.props.UpdateGoBackState());
        }
        else if (e.value == "ColumnCategory") {
            this.setState({ ConditionalStyleScope: Enums_1.ConditionalStyleScope.ColumnCategory }, () => this.props.UpdateGoBackState());
        }
        else {
            this.setState({ ConditionalStyleScope: Enums_1.ConditionalStyleScope.Row, ColumnId: "" }, () => this.props.UpdateGoBackState());
        }
    }
    canNext() {
        if (!this.state.ConditionalStyleScope == null) {
            return false;
        }
        if (this.state.ConditionalStyleScope == Enums_1.ConditionalStyleScope.Column && StringExtensions_1.StringExtensions.IsEmpty(this.state.ColumnId)) {
            return false;
        }
        if (this.state.ConditionalStyleScope == Enums_1.ConditionalStyleScope.ColumnCategory && StringExtensions_1.StringExtensions.IsEmpty(this.state.ColumnCategoryId)) {
            return false;
        }
        return true;
    }
    canBack() { return false; }
    Next() {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.ColumnCategoryId = this.state.ColumnCategoryId;
        this.props.Data.ConditionalStyleScope = this.state.ConditionalStyleScope;
    }
    Back() {
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.ConditionalStyleScopeWizard = ConditionalStyleScopeWizard;
