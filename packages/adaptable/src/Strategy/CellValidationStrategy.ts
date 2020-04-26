import { ICellValidationStrategy } from './Interface/ICellValidationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import * as CellValidationRedux from '../Redux/ActionsReducers/CellValidationRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { CellValidationRule } from '../PredefinedConfig/CellValidationState';

export class CellValidationStrategy extends AdaptableStrategyBase
  implements ICellValidationStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.CellValidationStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.CellValidationStrategyFriendlyName,
        ComponentName: ScreenPopups.CellValidationPopup,
        Icon: StrategyConstants.CellValidationGlyph,
      });
    }
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateColumnMenuItem(column, this.adaptable, 'Full', 'editable')) {
      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        action: 'New',
        source: 'ColumnMenu',
      };
      return [
        this.createColumnMenuItemShowPopup(
          'Create Cell Validation Rule',
          ScreenPopups.CellValidationPopup,
          StrategyConstants.CellValidationGlyph,
          popupParam
        ),
      ];
    }
  }

  public getTeamSharingAction(): TeamSharingImportInfo<CellValidationRule> {
    return {
      FunctionEntities: this.adaptable.api.cellValidationApi.getAllCellValidation(),
      AddAction: CellValidationRedux.CellValidationAdd,
      EditAction: CellValidationRedux.CellValidationEdit,
    };
  }
}
