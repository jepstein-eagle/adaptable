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
        column: column,
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

  public getTeamSharingAction(): TeamSharingImportInfo<UserFilter> | undefined {
    return undefined;
    // to do{
    //  FunctionEntities: this.adaptable.api.filterApi.getAllUserFilter(),
    //  AddAction: FilterRedux.UserFilterAdd,
    //  EditAction: FilterRedux.UserFilterEdit,
    // };
  }
}
