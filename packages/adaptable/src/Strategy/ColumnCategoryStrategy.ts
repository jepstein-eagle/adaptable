import { IColumnCategoryStrategy } from './Interface/IColumnCategoryStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import * as ColumnCategoryRedux from '../Redux/ActionsReducers/ColumnCategoryRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { ColumnCategory } from '../PredefinedConfig/ColumnCategoryState';

export class ColumnCategoryStrategy extends AdaptableStrategyBase
  implements IColumnCategoryStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.ColumnCategoryStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.ColumnCategoryStrategyFriendlyName,
        ComponentName: ScreenPopups.ColumnCategoryPopup,
        Icon: StrategyConstants.ColumnCategoryGlyph,
      });
    }
  }

  public getTeamSharingAction(): TeamSharingImportInfo<ColumnCategory> {
    return {
      FunctionEntities: this.adaptable.api.columnCategoryApi.getAllColumnCategory(),
      AddAction: ColumnCategoryRedux.ColumnCategoryAdd,
      EditAction: ColumnCategoryRedux.ColumnCategoryEdit,
    };
  }
}
