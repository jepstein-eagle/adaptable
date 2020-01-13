import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IPercentBarStrategy } from './Interface/IPercentBarStrategy';
import { PercentBarState } from '../PredefinedConfig/PercentBarState';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { MenuItemShowPopup } from '../Utilities/MenuItem';
import { AdaptableMenuItem, MenuInfo } from '../PredefinedConfig/Common/Menu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class PercentBarStrategy extends AdaptableStrategyBase implements IPercentBarStrategy {
  protected PercentBarState: PercentBarState;
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.PercentBarStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.PercentBarStrategyFriendlyName,
      ComponentName: ScreenPopups.PercentBarPopup,
      Icon: StrategyConstants.PercentBarGlyph,
    });
  }

  public addColumnMenuItem(column: AdaptableColumn): AdaptableMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.adaptable, 'numeric')) {
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
      menuInfo.Column.ColumnId
    );
    if (menuInfo.Column && percentBarExists) {
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
      if (this.adaptable.isInitialised) {
        // if we have made any changes then first delete them all
        this.PercentBarState.PercentBars.forEach(pb => {
          this.adaptable.removePercentBar(pb);
        });

        this.GetPercentBarState().PercentBars.forEach(pb => {
          this.adaptable.editPercentBar(pb);
        });
        this.adaptable.redraw();
      }
      this.PercentBarState = this.GetPercentBarState();
    }
  }

  protected GetPercentBarState(): PercentBarState {
    return this.adaptable.api.percentBarApi.getPercentBarState();
  }
}
