"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const GridRedux = require("../../Redux/ActionsReducers/GridRedux");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const PanelWithRow_1 = require("../Components/Panels/PanelWithRow");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const Enums_1 = require("../../Utilities/Enums");
class CellSummaryPopupComponent extends React.Component {
    componentDidMount() {
        this.props.onSetSelectedCellSummary();
    }
    render() {
        let cssClassName = this.props.cssClassName + "__CellSummary";
        let colItems = [
            { Content: "Operation", Size: 3 },
            { Content: "Value", Size: 9 },
        ];
        let infoBody = ["Selected cells info."];
        let rowElements = [];
        if (this.props.CellSummary != null) {
            rowElements.push(this.createRow(colItems, Enums_1.CellSumaryOperation.Sum, this.props.CellSummary.Sum, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.CellSumaryOperation.Average, this.props.CellSummary.Average, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.CellSumaryOperation.Median, this.props.CellSummary.Median, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.CellSumaryOperation.Distinct, this.props.CellSummary.Distinct, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.CellSumaryOperation.Max, this.props.CellSummary.Max, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.CellSumaryOperation.Min, this.props.CellSummary.Min, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.CellSumaryOperation.Count, this.props.CellSummary.Count, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.CellSumaryOperation.Only, this.props.CellSummary.Only, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.CellSumaryOperation.VWAP, this.props.CellSummary.VWAP, cssClassName));
        }
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: StrategyConstants.CellSummaryStrategyName, className: "ab_main_popup", bsStyle: "primary", glyphicon: StrategyConstants.CellSummaryGlyph, infoBody: infoBody },
                React.createElement("div", { className: this.props.cssClassName + StyleConstants.ITEMS_TABLE },
                    React.createElement(PanelWithRow_1.PanelWithRow, { cssClassName: cssClassName, colItems: colItems, bsStyle: "info" }),
                    this.props.CellSummary != null ?
                        React.createElement("div", { className: cssClassName + StyleConstants.ITEMS_TABLE_BODY }, rowElements)
                        :
                            React.createElement(react_bootstrap_1.ControlLabel, null, "No cells are selected - please select some cells."))));
    }
    createRow(colItems, key, value, cssClassName) {
        let rowColItems = Helper_1.Helper.cloneObject(colItems);
        rowColItems[0].Content = key;
        rowColItems[1].Content = value;
        let rowElement = React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: cssClassName, key: key, colItems: rowColItems });
        return rowElement;
    }
}
function mapStateToProps(state, ownProps) {
    return {
        CellSummary: state.Grid.CellSummary
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSetSelectedCellSummary: () => dispatch(GridRedux.GridCreateCellSummary()),
    };
}
exports.CellSummaryPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CellSummaryPopupComponent);
