import { CustomSortStrategy } from '../../Strategy/CustomSortStrategy';
import { RowNode } from '@ag-grid-community/all-modules';
import { CustomSort } from '../../PredefinedConfig/CustomSortState';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';

export class CustomSortStrategyagGrid extends CustomSortStrategy {
  constructor(adaptable: IAdaptable) {
    super(adaptable);
  }

  public getComparerFunction(customSort: CustomSort): Function {
    let theadaptable = this.adaptable as IAdaptable;
    return function compareItemsOfCustomSort(
      valueA: any,
      valueB: any,
      nodeA?: RowNode,
      nodeB?: RowNode
    ): number {
      let firstElementValueString = theadaptable.getDisplayValueFromRowNode(
        nodeA,
        customSort.ColumnId
      );
      let secondElementValueString = theadaptable.getDisplayValueFromRowNode(
        nodeB,
        customSort.ColumnId
      );
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
        return firstElementValue < secondElementValue ? -1 : 1;
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
