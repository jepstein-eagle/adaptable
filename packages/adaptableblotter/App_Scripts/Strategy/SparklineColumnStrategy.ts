import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
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

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.SparklineColumnStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.SparklineColumnStrategyName,
      ComponentName: ScreenPopups.SparklineColumnPopup,
      Icon: StrategyConstants.SparklineColumnGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter, 'sparkline')) {
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
      this.canCreateColumnMenuItem(menuInfo.column, this.blotter, 'sparkline')
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
      if (this.blotter.isInitialised) {
        // if we have made any changes then first delete them all
        this.SparklinesState.SparklineColumns.forEach(sparklineColumn => {
          this.blotter.removeSparkline(sparklineColumn);
        });

        this.GetSparklinesState().SparklineColumns.forEach(sparklineColumn => {
          this.blotter.editSparkline(sparklineColumn);
        });
        this.blotter.redraw();
      }
      this.SparklinesState = this.GetSparklinesState();
    }
  }

  protected GetSparklinesState(): SparklineColumnState {
    return this.blotter.api.sparklineColumnApi.getSparklineColumnState();
  }
}
