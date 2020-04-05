import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { CustomSort } from '../PredefinedConfig/CustomSortState';
import {
  AdaptableComparerFunction,
  AdaptableNodeComparerFunction,
} from '../PredefinedConfig/Common/AdaptableComparerFunction';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { ICustomSortStrategy } from './Interface/ICustomSortStrategy';
import AdaptableHelper from '../Utilities/Helpers/AdaptableHelper';

export class CustomSortStrategy extends AdaptableStrategyBase implements ICustomSortStrategy {
  private CustomSorts: CustomSort[];
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.CustomSortStrategyId, adaptable);
  }

  protected InitState() {
    if (this.CustomSorts != this.adaptable.api.customSortApi.getAllCustomSort()) {
      this.removeCustomSorts();
      this.CustomSorts = this.adaptable.api.customSortApi.getAllCustomSort();
      this.applyCustomSorts();
    }
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.CustomSortStrategyFriendlyName,
        ComponentName: ScreenPopups.CustomSortPopup,
        Icon: StrategyConstants.CustomSortGlyph,
      });
    }
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateColumnMenuItem(column, this.adaptable, 'Full', 'sort')) {
      let customSort = this.CustomSorts.find(x => x.ColumnId == column.ColumnId);
      let label = customSort ? 'Edit ' : 'Create ';

      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        action: customSort ? 'Edit' : 'New',
        source: 'ColumnMenu',
      };

      return [
        this.createColumnMenuItemShowPopup(
          label + StrategyConstants.CustomSortStrategyFriendlyName,
          ScreenPopups.CustomSortPopup,
          StrategyConstants.CustomSortGlyph,
          popupParam
        ),
      ];
    }
  }

  removeCustomSorts() {
    if (this.CustomSorts) {
      this.CustomSorts.forEach(customSort => {
        this.adaptable.removeCustomSort(customSort.ColumnId);
      });
    }
  }

  applyCustomSorts() {
    this.CustomSorts.forEach(customSort => {
      const customSortComparerFunction: AdaptableComparerFunction = customSort.CustomSortComparerFunction
        ? this.adaptable.getUserFunctionHandler(
            'CustomSortComparerFunction',
            customSort.CustomSortComparerFunction
          )
        : this.getComparerFunction(customSort);
      this.adaptable.setCustomSort(customSort.ColumnId, customSortComparerFunction);
    });
  }

  public getComparerFunction(customSort: CustomSort): AdaptableComparerFunction {
    return AdaptableHelper.runAdaptableComparerFunction(
      customSort.ColumnId,
      customSort.SortedValues,
      this.adaptable
    );
  }
}
