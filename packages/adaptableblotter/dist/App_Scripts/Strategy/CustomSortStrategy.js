"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const StrategyNames = require("../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../Core/Constants/StrategyGlyphs");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const ColumnHelper_1 = require("../Core/Helpers/ColumnHelper");
class CustomSortStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.CustomSortStrategyId, blotter);
    }
    InitState() {
        if (this.CustomSorts != this.blotter.AdaptableBlotterStore.TheStore.getState().CustomSort.CustomSorts) {
            this.removeCustomSorts();
            this.CustomSorts = this.blotter.AdaptableBlotterStore.TheStore.getState().CustomSort.CustomSorts;
            this.applyCustomSorts();
        }
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.CustomSortStrategyName, ScreenPopups.CustomSortPopup, StrategyGlyphs.CustomSortGlyph);
    }
    addContextMenuItem(columnId) {
        if (this.canCreateContextMenuItem(columnId)) {
            let column = ColumnHelper_1.ColumnHelper.getColumnFromId(columnId, this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns);
            if (column && column.Sortable) {
                let customSort = this.CustomSorts.find(x => x.ColumnId == columnId);
                let label = (customSort) ? "Edit " : "Create ";
                let popupParam = (customSort) ? "Edit|" : "New|";
                this.createContextMenuItemShowPopup(label + StrategyNames.CustomSortStrategyName, ScreenPopups.CustomSortPopup, StrategyGlyphs.CustomSortGlyph, popupParam + columnId);
            }
        }
    }
    removeCustomSorts() {
        if (this.CustomSorts) {
            this.CustomSorts.forEach(customSort => {
                this.blotter.removeCustomSort(customSort.ColumnId);
            });
        }
    }
    applyCustomSorts() {
        this.CustomSorts.forEach(customSort => {
            this.blotter.setCustomSort(customSort.ColumnId, this.getComparerFunction(customSort, this.blotter));
        });
    }
    getComparerFunction(customSort, blotter) {
        return function compareItemsOfCustomSort(firstElement, secondElement) {
            let firstElementValueString = blotter.getDisplayValue(blotter.getPrimaryKeyValueFromRecord(firstElement), customSort.ColumnId); //firstElement[customSort.ColumnId];
            let secondElementValueString = blotter.getDisplayValue(blotter.getPrimaryKeyValueFromRecord(secondElement), customSort.ColumnId); //secondElement[customSort.ColumnId];
            let firstElementValue = firstElement[customSort.ColumnId];
            let secondElementValue = secondElement[customSort.ColumnId];
            let indexFirstElement = customSort.SortedValues.indexOf(firstElementValueString);
            let containsFirstElement = indexFirstElement >= 0;
            let indexSecondElement = customSort.SortedValues.indexOf(secondElementValueString);
            let containsSecondElement = indexSecondElement >= 0;
            //if none of the element are in the list we jsut return normal compare
            if (!containsFirstElement && !containsSecondElement) {
                return (firstElementValue < secondElementValue) ? -1 : 1;
            }
            //if first item not in the list make sure we put it after the second item
            if (!containsFirstElement) {
                return 1;
            }
            //if second item not in the list make sure we put it after the first item
            if (!containsSecondElement) {
                return -1;
            }
            //return the comparison from the list if the two items are in the list
            return indexFirstElement - indexSecondElement;
        };
    }
}
exports.CustomSortStrategy = CustomSortStrategy;
