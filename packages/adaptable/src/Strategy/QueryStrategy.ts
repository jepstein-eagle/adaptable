import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import * as QueryRedux from '../Redux/ActionsReducers/QueryRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { SharedQuery } from '../PredefinedConfig/QueryState';
import { IQueryStrategy } from './Interface/IQueryStrategy';

export class QueryStrategy extends AdaptableStrategyBase implements IQueryStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.QueryStrategyId,
      StrategyConstants.QueryStrategyFriendlyName,
      StrategyConstants.QueryGlyph,
      ScreenPopups.QueryPopup,
      adaptable
    );
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.QueryStrategyFriendlyName,
        ComponentName: ScreenPopups.QueryPopup,
        Icon: StrategyConstants.QueryGlyph,
      });
    }
  }

  public getTeamSharingAction(): TeamSharingImportInfo<SharedQuery> {
    return {
      FunctionEntities: this.adaptable.api.queryApi.getAllSharedQuery(),
      AddAction: QueryRedux.SharedQueryAdd,
      EditAction: QueryRedux.SharedQueryEdit,
    };
  }
}
