import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../BlotterInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { CustomSort } from '../PredefinedConfig/CustomSortState';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { ICustomSortStrategy } from './Interface/ICustomSortStrategy';

export class CustomSortStrategy extends AdaptableStrategyBase implements ICustomSortStrategy {
  private CustomSorts: CustomSort[];
  constructor(blotter: IAdaptable) {
    super(StrategyConstants.CustomSortStrategyId, blotter);
  }

  protected InitState() {
    if (this.CustomSorts != this.blotter.api.customSortApi.getAllCustomSort()) {
      this.removeCustomSorts();
      this.CustomSorts = this.blotter.api.customSortApi.getAllCustomSort();
      this.applyCustomSorts();
    }
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.CustomSortStrategyFriendlyName,
      ComponentName: ScreenPopups.CustomSortPopup,
      Icon: StrategyConstants.CustomSortGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter, 'sort')) {
      let customSort = this.CustomSorts.find(x => x.ColumnId == column.ColumnId);
      let label = customSort ? 'Edit ' : 'Create ';

      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        action: customSort ? 'Edit' : 'New',
        source: 'ColumnMenu',
      };

      return this.createColumnMenuItemShowPopup(
        label + StrategyConstants.CustomSortStrategyFriendlyName,
        ScreenPopups.CustomSortPopup,
        StrategyConstants.CustomSortGlyph,
        popupParam
      );
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
      this.blotter.setCustomSort(customSort.ColumnId, this.getComparerFunction(customSort));
    });
  }

  // make this an abstract function?
  public getComparerFunction(customSort: CustomSort): Function {
    let theBlotter = this.blotter as IAdaptable;
    return function compareItemsOfCustomSort(firstElement: any, secondElement: any): number {
      let firstElementValueString = theBlotter.getDisplayValue(
        theBlotter.getPrimaryKeyValueFromRowNode(firstElement),
        customSort.ColumnId
      ); //firstElement[customSort.ColumnId];
      let secondElementValueString = theBlotter.getDisplayValue(
        theBlotter.getPrimaryKeyValueFromRowNode(secondElement),
        customSort.ColumnId
      ); //secondElement[customSort.ColumnId];
      let firstElementValue = firstElement[customSort.ColumnId];
      let secondElementValue = secondElement[customSort.ColumnId];
      let indexFirstElement = customSort.SortedValues.indexOf(firstElementValueString);
      let containsFirstElement = indexFirstElement >= 0;
      let indexSecondElement = customSort.SortedValues.indexOf(secondElementValueString);
      let containsSecondElement = indexSecondElement >= 0;
      //if none of the element are in the list we jsut return normal compare
      if (!containsFirstElement && !containsSecondElement) {
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
