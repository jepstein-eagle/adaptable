import { ISharedExpressionStrategy } from './Interface/ISharedExpressionStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import * as SharedExpressionRedux from '../Redux/ActionsReducers/SharedExpressionRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { SharedExpression } from '../PredefinedConfig/SharedExpressionState';

export class SharedExpressionStrategy extends AdaptableStrategyBase
  implements ISharedExpressionStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.SharedExpressionStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.SharedExpressionStrategyFriendlyName,
        ComponentName: ScreenPopups.SharedExpressionPopup,
        Icon: StrategyConstants.SharedExpressionGlyph,
      });
    }
  }

  public getTeamSharingAction(): TeamSharingImportInfo<SharedExpression> {
    return {
      FunctionEntities: this.adaptable.api.sharedExpressionApi.getAllSharedExpression(),
      AddAction: SharedExpressionRedux.SharedExpressionAdd,
      EditAction: SharedExpressionRedux.SharedExpressionEdit,
    };
  }
}
