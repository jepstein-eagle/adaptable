import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IFreeTextColumnStrategy } from './Interface/IFreeTextColumnStrategy';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';
import * as FreeTextColumnRedux from '../Redux/ActionsReducers/FreeTextColumnRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import { FreeTextColumn } from '../PredefinedConfig/FreeTextColumnState';

export class FreeTextColumnStrategy extends AdaptableStrategyBase
  implements IFreeTextColumnStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.FreeTextColumnStrategyId, adaptable);

    this.adaptable.api.eventApi.on('AdaptableReady', () => {
      let freeTextColumns = this.adaptable.api.freeTextColumnApi.getAllFreeTextColumn();

      freeTextColumns = freeTextColumns.map(freeTextColumn => {
        if (!freeTextColumn.ColumnId && freeTextColumn.FriendlyName) {
          freeTextColumn.ColumnId = freeTextColumn.FriendlyName;
        }
        return freeTextColumn;
      });

      this.adaptable.api.freeTextColumnApi.setFreeTextColumns(freeTextColumns);
    });
  }

  public addFreeTextColumnsToGrid(): void {
    const ftcArray = this.adaptable.api.freeTextColumnApi.getAllFreeTextColumn();

    this.adaptable.addFreeTextColumnsToGrid(ftcArray);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.FreeTextColumnStrategyFriendlyName,
        ComponentName: ScreenPopups.FreeTextColumnPopup,
        Icon: StrategyConstants.FreeTextColumnGlyph,
      });
    }
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    if (this.canCreateMenuItem('Full')) {
      if (
        this.adaptable.api.freeTextColumnApi
          .getAllFreeTextColumn()
          .find(ftc => ftc.ColumnId == column.ColumnId)
      ) {
        let popupParam: StrategyParams = {
          columnId: column.ColumnId,
          action: 'Edit',
          source: 'ColumnMenu',
        };
        return [
          this.createColumnMenuItemShowPopup(
            'Edit ' + StrategyConstants.FreeTextColumnStrategyFriendlyName,
            ScreenPopups.FreeTextColumnPopup,
            StrategyConstants.FreeTextColumnGlyph,
            popupParam
          ),
        ];
      }
    }
  }

  public getTeamSharingAction(): TeamSharingImportInfo<FreeTextColumn> {
    return {
      FunctionEntities: this.adaptable.api.freeTextColumnApi.getAllFreeTextColumn(),
      AddAction: FreeTextColumnRedux.FreeTextColumnAdd,
      EditAction: FreeTextColumnRedux.FreeTextColumnEdit,
    };
  }
}
