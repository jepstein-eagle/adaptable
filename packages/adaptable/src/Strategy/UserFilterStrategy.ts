import { IUserFilterStrategy } from './Interface/IUserFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import * as FilterRedux from '../Redux/ActionsReducers/FilterRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { UserFilter } from '../PredefinedConfig/FilterState';

export class UserFilterStrategy extends AdaptableStrategyBase implements IUserFilterStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.UserFilterStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.UserFilterStrategyFriendlyName,
        ComponentName: ScreenPopups.UserFilterPopup,
        Icon: StrategyConstants.UserFilterGlyph,
      });
    }
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateColumnMenuItem(column, this.adaptable, 'Full', 'filter')) {
      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        action: 'New',
        source: 'ColumnMenu',
      };

      return [
        this.createColumnMenuItemShowPopup(
          'Create User Filter',
          ScreenPopups.UserFilterPopup,
          StrategyConstants.UserFilterGlyph,
          popupParam
        ),
      ];
    }
  }

  public getTeamSharingAction(): TeamSharingImportInfo<UserFilter> {
    return {
      FunctionEntities: this.adaptable.api.filterApi.getAllUserFilter(),
      AddAction: FilterRedux.UserFilterAdd,
      EditAction: FilterRedux.UserFilterEdit,
    };
  }
}
