"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const FlashingCellsRedux = require("../../Redux/ActionsReducers/FlashingCellsRedux");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../Utilities/Enums");
const FlashingCellEntityRow_1 = require("./FlashingCellEntityRow");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const AdaptableObjectCollection_1 = require("../Components/AdaptableObjectCollection");
const AdaptableBlotterForm_1 = require("../Components/Forms/AdaptableBlotterForm");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
class FlashingCellsPopupComponent extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__flashingcells";
        let infoBody = ["Make numeric cells flash briefly as their value changes", React.createElement("br", null), React.createElement("br", null), "Click the 'Live' checkbox to turn on flashing for a particular column; or the 'All Columns' checkbox to turn on flashing for all Columns", React.createElement("br", null), React.createElement("br", null), "Defaults are Green for positive change, Red for negative change and a Duration of 0.5 seconds, but these can be amended for each column."];
        let colItems = [
            { Content: "Live", Size: 1 },
            { Content: "Column", Size: 4 },
            { Content: "Flash Duration", Size: 3 },
            { Content: "Up Colour", Size: 2 },
            { Content: "Down Colour", Size: 2 },
        ];
        let flashingCellDurations = [250, 500, 750, 1000];
        let calculatedColumns = this.props.CalculatedColumns.map(c => c.ColumnId);
        let numericColumns = this.props.Columns.filter(c => c.DataType == Enums_1.DataType.Number);
        let numericNonCalcColumns = numericColumns.filter(c => ArrayExtensions_1.ArrayExtensions.NotContainsItem(calculatedColumns, c.ColumnId));
        numericNonCalcColumns = Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Ascending, numericNonCalcColumns, "FriendlyName");
        let allPotentialFlashingCells = [];
        numericNonCalcColumns.forEach(nc => {
            let existingfc = this.props.FlashingCells.find(e => e.ColumnId == nc.ColumnId);
            if (!existingfc) {
                allPotentialFlashingCells.push(ObjectFactory_1.ObjectFactory.CreateDefaultFlashingCell(nc));
            }
            else {
                allPotentialFlashingCells.push(existingfc);
            }
        });
        let allFlashingCells = allPotentialFlashingCells.map((flashingcell, index) => {
            return React.createElement(FlashingCellEntityRow_1.FlashingCellEntityRow, { cssClassName: cssClassName, AdaptableBlotterObject: flashingcell, key: flashingcell.ColumnId, Index: index, Columns: this.props.Columns, UserFilters: null, colItems: colItems, FlashingCellDurations: flashingCellDurations, ColorPalette: this.props.ColorPalette, onSelect: (flashingcell) => this.props.onSelectColumn(flashingcell), onChangeFlashingDuration: (flashingcell, newFlashDuration) => this.props.onChangeFlashDuration(flashingcell, newFlashDuration), onChangeDownColorFlashingCell: (flashingcell, DownColor) => this.props.onChangeDownColorFlashingCell(flashingcell, DownColor), onChangeUpColorFlashingCell: (flashingcell, UpColor) => this.props.onChangeUpColorFlashingCell(flashingcell, UpColor), TeamSharingActivated: false, onShare: null, onEdit: null, onDeleteConfirm: null });
        });
        let areAllLive = allPotentialFlashingCells.every(f => f.IsLive);
        let setAllOption = React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName" },
                React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_medium_margin" },
                    React.createElement(react_bootstrap_1.Checkbox, { onChange: () => this.props.onSelectAllColumns(!areAllLive, allPotentialFlashingCells), checked: areAllLive }, " All Columns "))));
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyConstants.FlashingCellsStrategyName, bsStyle: "primary", className: "ab_main_popup", glyphicon: StrategyConstants.FlashingCellGlyph, infoBody: infoBody },
                setAllOption,
                React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: allFlashingCells, reducedPanel: true })));
    }
}
function mapStateToProps(state, ownProps) {
    return {
        FlashingCells: state.FlashingCell.FlashingCells,
        CalculatedColumns: state.CalculatedColumn.CalculatedColumns
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectColumn: (flashingCell) => dispatch(FlashingCellsRedux.FlashingCellSelect(flashingCell)),
        onSelectAllColumns: (shouldTurnOn, numericColumns) => dispatch(FlashingCellsRedux.FlashingCellSelectAll(shouldTurnOn, numericColumns)),
        onChangeFlashDuration: (flashingCell, newFlashDuration) => dispatch(FlashingCellsRedux.FlashingCellChangeDuration(flashingCell, newFlashDuration)),
        onChangeDownColorFlashingCell: (flashingCell, DownColor) => dispatch(FlashingCellsRedux.FlashingCellChangeDownColor(flashingCell, DownColor)),
        onChangeUpColorFlashingCell: (flashingCell, UpColor) => dispatch(FlashingCellsRedux.FlashingCellChangeUpColor(flashingCell, UpColor))
    };
}
exports.FlashingCellsPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FlashingCellsPopupComponent);
