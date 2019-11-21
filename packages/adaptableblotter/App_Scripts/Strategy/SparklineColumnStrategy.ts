import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { ISparklineColumnStrategy } from './Interface/ISparklineColumnStrategy';

import { AdaptableBlotterColumn } from '../Utilities/Interface/AdaptableBlotterColumn';
import { SparklineColumnState } from '../PredefinedConfig/SparklineColumnState';
import { DataType } from '../PredefinedConfig/Common/Enums';
import {
  AdaptableBlotterMenuItem,
  ContextMenuInfo,
  MenuItemShowPopup,
} from '../Utilities/MenuItem';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class SparklineColumnStrategy extends AdaptableStrategyBase
  implements ISparklineColumnStrategy {
  protected SparklinesState: SparklineColumnState;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.SparklineColumnStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.SparklineColumnStrategyName,
      ComponentName: ScreenPopups.SparklineColumnPopup,
      Icon: StrategyConstants.SparklineColumnGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableBlotterColumn): AdaptableBlotterMenuItem | undefined {
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

  public addContextMenuItem(
    contextMenuInfo: ContextMenuInfo
  ): AdaptableBlotterMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup = undefined;
    if (
      contextMenuInfo.column &&
      this.canCreateColumnMenuItem(contextMenuInfo.column, this.blotter, 'sparkline')
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
