import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { CustomSort } from '../PredefinedConfig/CustomSortState';
import * as CustomSortRedux from '../Redux/ActionsReducers/CustomSortRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import { ICustomSortStrategy } from './Interface/ICustomSortStrategy';

export class CustomSortStrategy extends AdaptableStrategyBase implements ICustomSortStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.CustomSortStrategyId,
      StrategyConstants.CustomSortStrategyFriendlyName,
      StrategyConstants.CustomSortGlyph,
      ScreenPopups.CustomSortPopup,
      adaptable
    );
  }

  public tidyOldConfig(): void {
    this.adaptable.api.customSortApi.getAllCustomSort().forEach(cs => {
      this.adaptable.setCustomSort(cs);
    });
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full') && column.Sortable) {
      let customSort = this.adaptable.api.customSortApi
        .getAllCustomSort()
        .find(x => x.ColumnId == column.ColumnId);
      let label = customSort ? 'Edit ' : 'Create ';

      // dont show a menu item if there is a custom sort that uses a comparer function
      if (customSort && customSort.CustomSortComparerFunction) {
        return undefined;
      }

      let popupParam: StrategyParams = {
        column: column,
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

  public getTeamSharingAction(): TeamSharingImportInfo<CustomSort> {
    return {
      FunctionEntities: this.adaptable.api.customSortApi.getAllCustomSort(),
      AddAction: CustomSortRedux.CustomSortAdd,
      EditAction: CustomSortRedux.CustomSortEdit,
    };
  }
}
