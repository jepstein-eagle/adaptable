"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const Enums_1 = require("../../../Utilities/Enums");
const ColumnSelector_1 = require("../../Components/Selectors/ColumnSelector");
const ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
class PercentBarSelectColumnWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ColumnId: this.props.Data.ColumnId,
            MinValue: this.props.Data.MinValue,
            MaxValue: this.props.Data.MaxValue,
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-selectcolumn";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Select a Column", bsStyle: "primary" },
                React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.ColumnId], ColumnList: ColumnHelper_1.ColumnHelper.getNumericColumns(this.props.Columns), onColumnChange: columns => this.onColumnSelectedChanged(columns), SelectionMode: Enums_1.SelectionMode.Single })));
    }
    onColumnSelectedChanged(columns) {
        if (columns.length > 0) {
            let distinctColumnsValues = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(columns[0].ColumnId, Enums_1.DistinctCriteriaPairValue.RawValue).map(pair => {
                return pair.RawValue;
            });
            let minValue = Math.min(...distinctColumnsValues);
            let maxValue = Math.max(...distinctColumnsValues);
            this.setState({ ColumnId: columns[0].ColumnId, MinValue: minValue, MaxValue: maxValue }, () => this.props.UpdateGoBackState());
        }
        else {
            this.setState({ ColumnId: "" }, () => this.props.UpdateGoBackState());
        }
    }
    canNext() {
        return (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.ColumnId));
    }
    canBack() { return true; }
    Next() {
        this.props.Data.ColumnId = this.state.ColumnId;
        this.props.Data.MinValue = this.state.MinValue;
        this.props.Data.MaxValue = this.state.MaxValue;
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
exports.PercentBarSelectColumnWizard = PercentBarSelectColumnWizard;
