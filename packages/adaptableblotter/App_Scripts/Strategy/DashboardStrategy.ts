import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { IDashboardStrategy } from './Interface/IDashboardStrategy';
import { Visibility } from '../PredefinedConfig/Common/Enums';
import * as DashboardRedux from '../Redux/ActionsReducers/DashboardRedux';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { arrayToKeyMap } from '../Utilities/Helpers/Helper';
import AdaptableHelper from '../Utilities/Helpers/AdaptableHelper';
import {
  ToolbarVisibilityChangedEventArgs,
  ToolbarVisibilityChangedInfo,
} from '../Api/Events/ToolbarVisibilityChanged';
import { AdaptableDashboardToolbar } from '../PredefinedConfig/Common/Types';

export class DashboardStrategy extends AdaptableStrategyBase implements IDashboardStrategy {
  private visibleToolbars: string[];
  private dashboardVisibility: Visibility;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.DashboardStrategyId, blotter);
  }

  protected InitState() {
    if (this.visibleToolbars != this.blotter.api.dashboardApi.GetState().VisibleToolbars) {
      const oldVisibleToolbars = arrayToKeyMap(this.visibleToolbars);
      const newVisibleToolbars = arrayToKeyMap(
        this.blotter.api.dashboardApi.GetState().VisibleToolbars
      );

      [...(this.blotter.api.dashboardApi.GetState().VisibleToolbars || [])].forEach(
        (toolbar: string) => {
          if (!oldVisibleToolbars[toolbar]) {
            if (
              this.blotter.api.dashboardApi.GetState().DashboardVisibility == Visibility.Visible
            ) {
              this.fireToolbarVisibilityChangedEvent(toolbar);
            }
          }
        }
      );

      [...(this.visibleToolbars || [])].forEach((toolbar: AdaptableDashboardToolbar) => {
        if (!newVisibleToolbars[toolbar]) {
          this.fireToolbarVisibilityChangedEvent(toolbar);
        }
      });

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
              this.fireToolbarVisibilityChangedEvent(toolbar);
            }
          }
        );
      }
    }
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.DashboardStrategyFriendlyName,
      ComponentName: ScreenPopups.DashboardPopup,
      Icon: StrategyConstants.DashboardGlyph,
    });
  }

  public addColumnMenuItem(): AdaptableMenuItem | undefined {
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

  private fireToolbarVisibilityChangedEvent(toolbar: string): void {
    let toolbarVisibilityChangedInfo: ToolbarVisibilityChangedInfo = {
      toolbar: toolbar,
      visibility: Visibility.Visible,
    };
    const toolbarVisibilityChangedEventArgs: ToolbarVisibilityChangedEventArgs = AdaptableHelper.createFDC3Message(
      'Toolbar Visibility Changed Args',
      toolbarVisibilityChangedInfo
    );

    this.blotter.api.eventApi.emit('ToolbarVisibilityChanged', toolbarVisibilityChangedEventArgs);
  }
}
