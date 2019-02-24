"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const react_redux_1 = require("react-redux");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const FlashingCellRedux = require("../../Redux/ActionsReducers/FlashingCellsRedux");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const StyleConstants = require("../../Utilities/Constants/StyleConstants");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
class FlashingCellSummaryComponent extends React.Component {
    render() {
        let cssWizardClassName = StyleConstants.WIZARD_STRATEGY + "__flashingcells";
        let flashingCell = this.props.FlashingCells.find(fc => fc.ColumnId == this.props.SummarisedColumn.ColumnId);
        let isFlashingCellColumn = (flashingCell && flashingCell.IsLive);
        let message = isFlashingCellColumn ? "Flashing on" : "Flashing off";
        let showFlashingButton = isFlashingCellColumn ?
            React.createElement(react_bootstrap_1.Button, { onClick: () => this.onFlashingSelectedChanged(flashingCell), bsStyle: "default", bsSize: "small" }, "Turn Off")
            : React.createElement(react_bootstrap_1.Button, { onClick: () => this.onFlashingSelectedChanged(flashingCell), bsStyle: "deffault", bsSize: "small" }, "Turn On");
        let colItems = [];
        colItems.push({ Size: 3, Content: React.createElement("b", null, StrategyConstants.FlashingCellsStrategyName) });
        colItems.push({ Size: 7, Content: message });
        colItems.push({ Size: 2, Content: showFlashingButton });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: cssWizardClassName, colItems: colItems });
    }
    onFlashingSelectedChanged(flashingCell) {
        let existingfc = this.props.FlashingCells.find(e => e.ColumnId == this.props.SummarisedColumn.ColumnId);
        if (!existingfc) {
            let flashingCellState = this.props.Blotter.api.configApi.configGetFlashingCellState(false);
            let col = ColumnHelper_1.ColumnHelper.getColumnFromId(this.props.SummarisedColumn.ColumnId, this.props.Columns);
            existingfc = ObjectFactory_1.ObjectFactory.CreateDefaultFlashingCell(col, flashingCellState.DefaultUpColor, flashingCellState.DefautDownColor, flashingCellState.DefaultDuration);
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
