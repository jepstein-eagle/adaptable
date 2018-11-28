"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableObjectRow_1 = require("../Components/AdaptableObjectRow");
const ColorPicker_1 = require("../ColorPicker");
const ColumnHelper_1 = require("../../Core/Helpers/ColumnHelper");
class FlashingCellEntityRow extends React.Component {
    render() {
        let flashingCell = this.props.AdaptableBlotterObject;
        //we could have the typeahead combobox with freetext and the correct items in the list
        //but I don't think we should allow users to enter a value....
        //I'm only managing the case where the duration is not one of the predefined ones to be nicely displayed in the UI
        let durations = this.props.FlashingCellDurations.map((flashingCellDuration) => {
            return React.createElement("option", { key: flashingCellDuration, value: flashingCellDuration }, this.getFriendlyFlashingDuration(flashingCellDuration));
        });
        if (!this.props.FlashingCellDurations.find(x => x == flashingCell.FlashingCellDuration)) {
            durations.push(React.createElement("option", { key: flashingCell.FlashingCellDuration, value: flashingCell.FlashingCellDuration }, this.getFriendlyFlashingDuration(flashingCell.FlashingCellDuration)));
        }
        let isDisabled = false; // TODO:  need to get from Entitlements !  flashingCell.IsReadOnly
        let column = ColumnHelper_1.ColumnHelper.getColumnFromId(flashingCell.ColumnId, this.props.Columns);
        if (!column) {
            return null;
        }
        let colItems = [].concat(this.props.colItems);
        colItems[0].Content = React.createElement(react_bootstrap_1.Checkbox, { disabled: isDisabled, onChange: () => this.props.onSelect(flashingCell), checked: flashingCell.IsLive });
        colItems[1].Content = column.FriendlyName;
        colItems[2].Content = React.createElement(react_bootstrap_1.FormControl, { disabled: isDisabled, componentClass: "select", value: flashingCell.FlashingCellDuration, onChange: (x) => this.onActionChange(x) }, durations);
        colItems[3].Content = React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, disabled: isDisabled, value: flashingCell.UpColor, onChange: (x) => this.onUpColorChange(x) });
        colItems[4].Content = React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, disabled: isDisabled, value: flashingCell.DownColor, onChange: (x) => this.onDownColorChange(x) });
        return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: this.props.cssClassName, colItems: colItems });
    }
    onActionChange(event) {
        let e = event.target;
        this.props.onChangeFlashingDuration(this.props.AdaptableBlotterObject, Number.parseInt(e.value));
    }
    onDownColorChange(event) {
        let e = event.target;
        this.props.onChangeDownColorFlashingCell(this.props.AdaptableBlotterObject, e.value);
    }
    onUpColorChange(event) {
        let e = event.target;
        this.props.onChangeUpColorFlashingCell(this.props.AdaptableBlotterObject, e.value);
    }
    getFriendlyFlashingDuration(duration) {
        switch (duration) {
            case 250:
                return "1/4 Second";
            case 500:
                return "1/2 Second";
            case 750:
                return "3/4 Second";
            case 1000:
                return "1 Second";
            default:
                return String(duration) + " ms";
        }
    }
}
exports.FlashingCellEntityRow = FlashingCellEntityRow;
