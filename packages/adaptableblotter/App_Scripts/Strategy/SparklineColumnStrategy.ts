import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ISparklineColumnStrategy } from './Interface/ISparklineColumnStrategy';

import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { SparklineColumnState } from '../PredefinedConfig/SparklineColumnState';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class SparklineColumnStrategy extends AdaptableStrategyBase
  implements ISparklineColumnStrategy {
  protected SparklinesState: SparklineColumnState;

  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.SparklineColumnStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.SparklineColumnStrategyFriendlyName,
      ComponentName: ScreenPopups.SparklineColumnPopup,
      Icon: StrategyConstants.SparklineColumnGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.adaptable, 'sparkline')) {
      let popUpParams: StrategyParams = {
        columnId: column.ColumnId,
        source: 'ColumnMenu',
      };
      return this.createColumnMenuItemShowPopup(
        'Edit Sparkline Column',
        ScreenPopups.SparklineColumnPopup,
        StrategyConstants.SparklineColumnGlyph,
        popUpParams
      );
    }
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup = undefined;
    if (
      menuInfo.column &&
      this.canCreateColumnMenuItem(menuInfo.column, this.adaptable, 'sparkline')
    ) {
      let popUpParams: StrategyParams = {
        source: 'ContextMenu',
      };
      menuItemShowPopup = this.createMainMenuItemShowPopup({
        Label: 'Edit Sparkline Column',
        ComponentName: ScreenPopups.SparklineColumnPopup,
        Icon: StrategyConstants.SparklineColumnGlyph,
        PopupParams: popUpParams,
      });
    }
    return menuItemShowPopup;
  }

  protected InitState() {
    if (this.SparklinesState != this.GetSparklinesState()) {
      if (this.adaptable.isInitialised) {
        // if we have made any changes then first delete them all
        this.SparklinesState.SparklineColumns.forEach(sparklineColumn => {
          this.adaptable.removeSparklineColumn(sparklineColumn);
        });

        this.GetSparklinesState().SparklineColumns.forEach(sparklineColumn => {
          this.adaptable.editSparklineColumn(sparklineColumn);
        });
        this.adaptable.redraw();
      }
      this.SparklinesState = this.GetSparklinesState();
    }
  }

  protected GetSparklinesState(): SparklineColumnState {
    return this.adaptable.api.sparklineColumnApi.getSparklineColumnState();
  }
}
