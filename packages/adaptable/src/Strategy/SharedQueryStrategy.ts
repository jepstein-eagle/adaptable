import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import * as SharedQueryRedux from '../Redux/ActionsReducers/SharedQueryRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { SharedQuery } from '../PredefinedConfig/SharedQueryState';
import { ISharedQueryStrategy } from './Interface/ISharedQueryStrategy';

export class SharedQueryStrategy extends AdaptableStrategyBase implements ISharedQueryStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.SharedQueryStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.SharedQueryStrategyFriendlyName,
        ComponentName: ScreenPopups.SharedQueryPopup,
        Icon: StrategyConstants.SharedQueryGlyph,
      });
    }
  }

  public getTeamSharingAction(): TeamSharingImportInfo<SharedQuery> {
    return {
      FunctionEntities: this.adaptable.api.sharedQueryApi.getAllSharedQuery(),
      AddAction: SharedQueryRedux.SharedQueryAdd,
      EditAction: SharedQueryRedux.SharedQueryEdit,
    };
  }
}
