import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { IDashboardStrategy } from './Interface/IDashboardStrategy';
import { Visibility } from '../PredefinedConfig/Common/Enums';
import * as DashboardRedux from '../Redux/ActionsReducers/DashboardRedux';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';
import { arrayToKeyMap } from '../Utilities/Helpers/Helper';
import { TOOLBAR_VISIBLE_EVENT } from '../Utilities/Constants/GeneralConstants';

export class DashboardStrategy extends AdaptableStrategyBase implements IDashboardStrategy {
  private visibleToolbars: string[];
  private dashboardVisibility: Visibility;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.DashboardStrategyId, blotter);
  }

  protected InitState() {
    if (this.visibleToolbars != this.blotter.api.dashboardApi.GetState().VisibleToolbars) {
      const oldVisibleToolbars = arrayToKeyMap(this.visibleToolbars);

      [...(this.blotter.api.dashboardApi.GetState().VisibleToolbars || [])].forEach(
        (toolbar: string) => {
          if (!oldVisibleToolbars[toolbar]) {
            if (
              this.blotter.api.dashboardApi.GetState().DashboardVisibility == Visibility.Visible
            ) {
              this.blotter.api.eventApi.emit(TOOLBAR_VISIBLE_EVENT, toolbar);
            }
          }
        }
      );
      this.visibleToolbars = this.blotter.api.dashboardApi.GetState().VisibleToolbars;
    }

    if (this.dashboardVisibility != this.blotter.api.dashboardApi.GetState().DashboardVisibility) {
      this.dashboardVisibility = this.blotter.api.dashboardApi.GetState()
        .DashboardVisibility as Visibility;

      if (this.dashboardVisibility == Visibility.Visible) {
        [...(this.blotter.api.dashboardApi.GetState().VisibleToolbars || [])].forEach(
          (toolbar: string) => {
            if (
              this.blotter.api.dashboardApi.GetState().DashboardVisibility == Visibility.Visible
            ) {
              this.blotter.api.eventApi.emit(TOOLBAR_VISIBLE_EVENT, toolbar);
            }
          }
        );
      }
    }
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.DashboardStrategyName,
      ComponentName: ScreenPopups.DashboardPopup,
      Icon: StrategyConstants.DashboardGlyph,
    });
  }

  public addColumnMenuItem(): AdaptableBlotterMenuItem | undefined {
    // for now just show / hide = lets worry about minimise later..
    if (this.blotter.api.dashboardApi.GetState().DashboardVisibility == Visibility.Hidden) {
      return this.createColumnMenuItemReduxAction(
        'Show Dashboard',
        StrategyConstants.DashboardGlyph,
        DashboardRedux.DashboardSetVisibility(Visibility.Visible)
      );
    } else {
      return this.createColumnMenuItemReduxAction(
        'Hide Dashboard',
        StrategyConstants.DashboardGlyph,
        DashboardRedux.DashboardSetVisibility(Visibility.Hidden)
      );
    }
  }
}
