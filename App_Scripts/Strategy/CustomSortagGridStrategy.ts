import { CustomSortStrategy } from './CustomSortStrategy';
import { ICustomSort } from '../Strategy/Interface/ICustomSortStrategy';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { RowNode } from "ag-grid"

export class CustomSortagGridStrategy extends CustomSortStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(blotter)
    }
    protected getComparerFunction(customSort: ICustomSort, blotter: IAdaptableBlotter): Function {
        return function compareItemsOfCustomSort(valueA: any, valueB: any, nodeA?: RowNode, nodeB?: RowNode, isInverted?: boolean): number {
            let firstElementValueString = blotter.getDisplayValueFromRecord(nodeA, customSort.ColumnId)
            let secondElementValueString = blotter.getDisplayValueFromRecord(nodeB, customSort.ColumnId)
            let firstElementValue = valueA;
            let secondElementValue = valueB;
            let indexFirstElement = customSort.Values.indexOf(firstElementValueString);
            let containsFirstElement = indexFirstElement >= 0;
            let indexSecondElement = customSort.Values.indexOf(secondElementValueString);
            let containsSecondElement = indexSecondElement >= 0;
            //if none of the element are in the list we jsut return normal compare
            if (!containsFirstElement && !containsSecondElement) {
                if (firstElementValue == secondElementValue) {
                    return 0
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
        }
    }

}