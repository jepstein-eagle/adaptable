"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const react_redux_1 = require("react-redux");
const ObjectFactory_1 = require("../../Core/ObjectFactory");
const StrategyNames = require("../../Core/Constants/StrategyNames");
const FlashingCellRedux = require("../../Redux/ActionsReducers/FlashingCellsRedux");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const StyleConstants = require("../../Core/Constants/StyleConstants");
class FlashingCellSummaryComponent extends React.Component {
    render() {
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__flashingcells";
        let flashingCell = this.props.FlashingCells.find(fc => fc.ColumnId == this.props.SummarisedColumn.ColumnId);
        let showFlashingButton = (!flashingCell || !flashingCell.IsLive) ?
            React.createElement(react_bootstrap_1.Button, { onClick: () => this.onFlashingSelectedChanged(flashingCell), bsStyle: "info", bsSize: "small" }, "Flashing Off")
            : React.createElement(react_bootstrap_1.Button, { onClick: () => this.onFlashingSelectedChanged(flashingCell), bsStyle: "success", bsSize: "small" }, "Flashing On");
        let colItems = [];
        colItems.push({ Size: 3, Content: React.createElement("b", null, StrategyNames.FlashingCellsStrategyName) });
        colItems.push({ Size: 5, Content: showFlashingButton });
        colItems.push({ Size: 3, Content: null });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: cssWizardClassName, colItems: colItems });
    }
    onFlashingSelectedChanged(flashingCell) {
        let existingfc = this.props.FlashingCells.find(e => e.ColumnId == this.props.SummarisedColumn.ColumnId);
        if (!existingfc) {
            let col = this.props.Columns.find(c => c.ColumnId == this.props.SummarisedColumn.ColumnId);
            existingfc = ObjectFactory_1.ObjectFactory.CreateDefaultFlashingCell(col);
            this.props.onSelectFlashingCell(existingfc);
        }
        this.props.onSelectFlashingCell(existingfc);
    }
}
exports.FlashingCellSummaryComponent = FlashingCellSummaryComponent;
function mapStateToProps(state, ownProps) {
    return {
        FlashingCells: state.FlashingCell.FlashingCells,
        Columns: state.Grid.Columns
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectFlashingCell: (flashingCell) => dispatch(FlashingCellRedux.FlashingCellSelect(flashingCell)),
    };
}
exports.FlashingCellSummary = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FlashingCellSummaryComponent);
