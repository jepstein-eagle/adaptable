import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IDashboardStrategy } from './Interface/IDashboardStrategy';
import { Visibility } from '../PredefinedConfig/Common/Enums';
import * as DashboardRedux from '../Redux/ActionsReducers/DashboardRedux';

export class DashboardStrategy extends AdaptableStrategyBase implements IDashboardStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.DashboardStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.DashboardStrategyName,
      ScreenPopups.DashboardPopup,
      StrategyConstants.DashboardGlyph
    );
  }

  public addContextMenuItem(): void {
    // for now just show / hide = lets worry about minimise later..
    if (this.blotter.api.dashboardApi.GetState().DashboardVisibility == Visibility.Hidden) {
      this.createContextMenuItemReduxAction(
        'Show Dashboard',
        StrategyConstants.DashboardGlyph,
        DashboardRedux.DashboardSetVisibility(Visibility.Visible)
      );
    } else {
      this.createContextMenuItemReduxAction(
        'Hide Dashboard',
        StrategyConstants.DashboardGlyph,
        DashboardRedux.DashboardSetVisibility(Visibility.Hidden)
      );
    }
  }
}
