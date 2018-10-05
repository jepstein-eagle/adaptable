"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const StyleConstants = require("../../Core/Constants/StyleConstants");
class ColumnChooserSummaryComponent extends React.Component {
    render() {
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__ColumnChoosers";
        alert("AccessLevel for chooser: " + this.props.AccessLevel);
        let colItems = [];
        colItems.push({ Size: 3, Content: React.createElement("b", null, 'Column Category') });
        colItems.push({ Size: 5, Content: this.props.SummarisedColumn.Category ? this.props.SummarisedColumn.Category : "None" });
        colItems.push({ Size: 3, Content: null });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: cssWizardClassName, colItems: colItems });
    }
}
exports.ColumnChooserSummaryComponent = ColumnChooserSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        ColumnCategories: state.UserInterface.ColumnCategories,
        Columns: state.Grid.Columns
    };
}
function mapDispatchToProps(dispatch) {
    return {};
}
exports.ColumnChooserSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ColumnChooserSummaryComponent);
