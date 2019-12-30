import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../BlotterInterfaces/IAdaptable';
import { IPercentBarStrategy } from './Interface/IPercentBarStrategy';
import { PercentBarState } from '../PredefinedConfig/PercentBarState';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class PercentBarStrategy extends AdaptableStrategyBase implements IPercentBarStrategy {
  protected PercentBarState: PercentBarState;
  constructor(blotter: IAdaptable) {
    super(StrategyConstants.PercentBarStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.PercentBarStrategyFriendlyName,
      ComponentName: ScreenPopups.PercentBarPopup,
      Icon: StrategyConstants.PercentBarGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter, 'numeric')) {
      let percentBarExists: boolean = ArrayExtensions.ContainsItem(
        this.PercentBarState.PercentBars.map(f => f.ColumnId),
        column.ColumnId
      );
      let label = percentBarExists ? 'Edit ' : 'Create ';

      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        action: percentBarExists ? 'Edit' : 'New',
        source: 'ColumnMenu',
      };

      return this.createColumnMenuItemShowPopup(
        label + StrategyConstants.PercentBarStrategyFriendlyName,
        ScreenPopups.PercentBarPopup,
        StrategyConstants.PercentBarGlyph,
        popupParam
      );
    }
  }

  public addContextMenuItem(menuInfo: MenuInfo): AdaptableMenuItem | undefined {
    let menuItemShowPopup: MenuItemShowPopup = undefined;
    let percentBarExists: boolean = ArrayExtensions.ContainsItem(
      this.PercentBarState.PercentBars.map(f => f.ColumnId),
      menuInfo.column.ColumnId
    );
    if (menuInfo.column && percentBarExists) {
      let popUpParams: StrategyParams = {
        source: 'ContextMenu',
      };
      menuItemShowPopup = this.createMainMenuItemShowPopup({
        Label: 'Edit Percent Bar',
        ComponentName: ScreenPopups.PercentBarPopup,
        Icon: StrategyConstants.PercentBarGlyph,
        PopupParams: popUpParams,
      });
    }
    return menuItemShowPopup;
  }

  protected InitState() {
    if (this.PercentBarState != this.GetPercentBarState()) {
      if (this.blotter.isInitialised) {
        // if we have made any changes then first delete them all
        this.PercentBarState.PercentBars.forEach(pb => {
          this.blotter.removePercentBar(pb);
        });

        this.GetPercentBarState().PercentBars.forEach(pb => {
          this.blotter.editPercentBar(pb);
        });
        this.blotter.redraw();
      }
      this.PercentBarState = this.GetPercentBarState();
    }
  }

  protected GetPercentBarState(): PercentBarState {
    return this.blotter.api.percentBarApi.getPercentBarState();
  }
}
