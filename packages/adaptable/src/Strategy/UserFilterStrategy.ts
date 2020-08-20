import { IUserFilterStrategy } from './Interface/IUserFilterStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import * as UserFilterRedux from '../Redux/ActionsReducers/UserFilterRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { UserFilter } from '../PredefinedConfig/UserFilterState';

export class UserFilterStrategy extends AdaptableStrategyBase implements IUserFilterStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.UserFilterStrategyId,
      StrategyConstants.UserFilterStrategyFriendlyName,
      StrategyConstants.UserFilterGlyph,
      ScreenPopups.UserFilterPopup,
      adaptable
    );
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full') && column.Filterable) {
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
      FunctionEntities: this.adaptable.api.userFilterApi.getAllUserFilter(),
      AddAction: UserFilterRedux.UserFilterAdd,
      EditAction: UserFilterRedux.UserFilterEdit,
    };
  }
}
