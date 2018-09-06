"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const SelectedCellsRedux = require("../../Redux/ActionsReducers/SelectedCellsRedux");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const PanelWithRow_1 = require("../Components/Panels/PanelWithRow");
const Helper_1 = require("../../Core/Helpers/Helper");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const Enums_1 = require("../../Core/Enums");
class SelectedCellsPopupComponent extends React.Component {
    componentDidMount() {
        this.props.onSelectedCellsCreateSummary();
    }
    render() {
        let cssClassName = this.props.cssClassName + "__SelectedCells";
        let colItems = [
            { Content: "Operation", Size: 3 },
            { Content: "Value", Size: 9 },
        ];
        let infoBody = ["Selected cells info."];
        let rowElements = [];
        if (this.props.SelectedCellSummary != null) {
            rowElements.push(this.createRow(colItems, Enums_1.SelectedCellOperation.Sum, this.props.SelectedCellSummary.Sum, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.SelectedCellOperation.Average, this.props.SelectedCellSummary.Average, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.SelectedCellOperation.Median, this.props.SelectedCellSummary.Median, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.SelectedCellOperation.Distinct, this.props.SelectedCellSummary.Distinct, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.SelectedCellOperation.Max, this.props.SelectedCellSummary.Max, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.SelectedCellOperation.Min, this.props.SelectedCellSummary.Min, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.SelectedCellOperation.Count, this.props.SelectedCellSummary.Count, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.SelectedCellOperation.Only, this.props.SelectedCellSummary.Only, cssClassName));
            rowElements.push(this.createRow(colItems, Enums_1.SelectedCellOperation.VWAP, this.props.SelectedCellSummary.VWAP, cssClassName));
        }
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: StrategyIds.SelectedCellsStrategyName, className: "ab_main_popup", bsStyle: "primary", glyphicon: StrategyIds.SelectedCellsGlyph, infoBody: infoBody },
                React.createElement("div", { className: this.props.cssClassName + StyleConstants.ITEMS_TABLE },
                    React.createElement(PanelWithRow_1.PanelWithRow, { cssClassName: cssClassName, colItems: colItems, bsStyle: "info" }),
                    this.props.SelectedCellSummary != null ?
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
        SelectedCellSummary: state.SelectedCells.SelectedCellSummary
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectedCellsCreateSummary: () => dispatch(SelectedCellsRedux.SelectedCellCreateSummary()),
    };
}
exports.SelectedCellsPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SelectedCellsPopupComponent);
