"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const GridRedux = require("../../Redux/ActionsReducers/GridRedux");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const CellSummaryDetails_1 = require("./CellSummaryDetails");
class CellSummaryPopupComponent extends React.Component {
    componentDidMount() {
        this.props.onSetSelectedCellSummary();
    }
    render() {
        let cssClassName = this.props.cssClassName + "__CellSummary";
        let infoBody = ["Selected cells info."];
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: StrategyConstants.CellSummaryStrategyName, className: "ab_main_popup", bsStyle: "primary", glyphicon: StrategyConstants.CellSummaryGlyph, infoBody: infoBody },
                React.createElement("div", { className: this.props.cssClassName + StyleConstants.ITEMS_TABLE },
                    React.createElement(CellSummaryDetails_1.CellSummaryDetails, { cssClassName: cssClassName, CellSummary: this.props.CellSummary }))));
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
