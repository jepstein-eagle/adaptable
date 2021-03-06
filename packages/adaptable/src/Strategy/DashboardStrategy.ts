import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IDashboardStrategy } from './Interface/IDashboardStrategy';
import * as DashboardRedux from '../Redux/ActionsReducers/DashboardRedux';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import { DashboardTab } from '../PredefinedConfig/DashboardState';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';

export class DashboardStrategy extends AdaptableStrategyBase implements IDashboardStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.DashboardStrategyId,
      StrategyConstants.DashboardStrategyFriendlyName,
      StrategyConstants.DashboardGlyph,
      ScreenPopups.DashboardPopup,
      adaptable
    );

    adaptable.adaptableStore.onAny((eventName: string) => {
      if (
        eventName == DashboardRedux.DASHBOARD_SET_ACTIVE_TAB ||
        eventName == DashboardRedux.DASHBOARD_SET_IS_COLLAPSED ||
        eventName == DashboardRedux.DASHBOARD_SET_IS_FLOATING ||
        eventName == DashboardRedux.DASHBOARD_SET_TABS
      ) {
        this.prepareToolbarVisibilityChangedEvent();
      }
    });
  }

  public tidyOldConfig(): void {
    // create a default Dashboard tab if one not provided
    this.adaptable.api.internalApi.setDefaultDashboardTab();
    this.prepareToolbarVisibilityChangedEvent();
  }

  private prepareToolbarVisibilityChangedEvent(): void {
    let currentTabs: DashboardTab[] = this.adaptable.api.dashboardApi.getDashboardState().Tabs;
    if (ArrayExtensions.IsNotNullOrEmpty(currentTabs)) {
      let activeTab = this.adaptable.api.dashboardApi.getDashboardState().ActiveTab;
      if (activeTab > -1) {
        let tab: DashboardTab = this.adaptable.api.dashboardApi.getDashboardState().Tabs[activeTab];
        if (tab) {
          tab.Toolbars.forEach(toolbar => {
            this.adaptable.api.dashboardApi.fireToolbarVisibilityChangedEvent(
              tab,
              toolbar,
              'Visible'
            );
          });
        }
      }
    }
  }

  public addColumnMenuItems(): AdaptableMenuItem[] | undefined {
    // for now just show / hide = lets worry about minimise later..
    if (this.canCreateMenuItem('ReadOnly')) {
      let menuItems: AdaptableMenuItem[] = [];
      if (this.adaptable.api.dashboardApi.getDashboardState().IsCollapsed) {
        menuItems.push(
          this.createColumnMenuItemReduxAction(
            'Expand Dashboard',
            'expand',
            DashboardRedux.DashboardSetIsCollapsed(false)
          )
        );
      } else {
        menuItems.push(
          this.createColumnMenuItemReduxAction(
            'Collapse Dashboard',
            'collapse',
            DashboardRedux.DashboardSetIsCollapsed(true)
          )
        );
      }
      if (this.adaptable.api.dashboardApi.getDashboardState().IsFloating) {
        menuItems.push(
          this.createColumnMenuItemReduxAction(
            'Dock Dashboard',
            'dock',
            DashboardRedux.DashboardSetIsFloating(false)
          )
        );
      } else if (this.adaptable.api.dashboardApi.getDashboardState().CanFloat) {
        menuItems.push(
          this.createColumnMenuItemReduxAction(
            'Float Dashboard',
            'dock',
            DashboardRedux.DashboardSetIsFloating(true)
          )
        );
      }

      return menuItems;
    }
  }
}
