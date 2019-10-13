import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { AdaptableBlotterColumn } from '../Utilities/Interface/AdaptableBlotterColumn';
import { CustomSort } from '../PredefinedConfig/RunTimeState/CustomSortState';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class CustomSortStrategy extends AdaptableStrategyBase {
  private CustomSorts: CustomSort[];
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.CustomSortStrategyId, blotter);
  }

  protected InitState() {
    if (this.CustomSorts != this.blotter.api.customSortApi.getAllCustomSort()) {
      this.removeCustomSorts();
      this.CustomSorts = this.blotter.api.customSortApi.getAllCustomSort();
      this.applyCustomSorts();
    }
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.CustomSortStrategyName,
      ComponentName: ScreenPopups.CustomSortPopup,
      GlyphIcon: StrategyConstants.CustomSortGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableBlotterColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter, 'sort')) {
      let customSort = this.CustomSorts.find(x => x.ColumnId == column.ColumnId);
      let label = customSort ? 'Edit ' : 'Create ';

      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        action: customSort ? 'Edit' : 'New',
      };

      return this.createColumnMenuItemShowPopup(
        label + StrategyConstants.CustomSortStrategyName,
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
      this.blotter.setCustomSort(
        customSort.ColumnId,
        this.getComparerFunction(customSort, this.blotter)
      );
    });
  }

  public getComparerFunction(customSort: CustomSort, blotter: IAdaptableBlotter): Function {
    return function compareItemsOfCustomSort(firstElement: any, secondElement: any): number {
      let firstElementValueString = blotter.getDisplayValue(
        blotter.getPrimaryKeyValueFromRecord(firstElement),
        customSort.ColumnId
      ); //firstElement[customSort.ColumnId];
      let secondElementValueString = blotter.getDisplayValue(
        blotter.getPrimaryKeyValueFromRecord(secondElement),
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
