"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomSortStrategy_1 = require("./CustomSortStrategy");
class CustomSortagGridStrategy extends CustomSortStrategy_1.CustomSortStrategy {
    constructor(blotter) {
        super(blotter);
    }
    getComparerFunction(customSort, blotter) {
        return function compareItemsOfCustomSort(valueA, valueB, nodeA, nodeB, isInverted) {
            let firstElementValueString = blotter.getDisplayValueFromRecord(nodeA, customSort.ColumnId);
            let secondElementValueString = blotter.getDisplayValueFromRecord(nodeB, customSort.ColumnId);
            let firstElementValue = valueA;
            let secondElementValue = valueB;
            let indexFirstElement = customSort.SortedValues.indexOf(firstElementValueString);
            let containsFirstElement = indexFirstElement >= 0;
            let indexSecondElement = customSort.SortedValues.indexOf(secondElementValueString);
            let containsSecondElement = indexSecondElement >= 0;
            //if none of the element are in the list we jsut return normal compare
            if (!containsFirstElement && !containsSecondElement) {
                if (firstElementValue == secondElementValue) {
                    return 0;
                }
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
exports.CustomSortagGridStrategy = CustomSortagGridStrategy;
