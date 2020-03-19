import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IDashboardStrategy } from './Interface/IDashboardStrategy';
import * as DashboardRedux from '../Redux/ActionsReducers/DashboardRedux';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import AdaptableHelper from '../Utilities/Helpers/AdaptableHelper';
import {
  ToolbarVisibilityChangedEventArgs,
  ToolbarVisibilityChangedInfo,
} from '../Api/Events/ToolbarVisibilityChanged';
import { DashboardTab } from '../PredefinedConfig/DashboardState';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';

export class DashboardStrategy extends AdaptableStrategyBase implements IDashboardStrategy {
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.DashboardStrategyId, adaptable);

    this.adaptable.api.eventApi.on('AdaptableReady', () => {
      // create the default Dashboard tab - this is for jump from 6 to 6.1
      this.adaptable.api.internalApi.setDefaultDashboardTab();
      this.prepareToolbarVisibilityChangedEvent();
    });

    adaptable.AdaptableStore.onAny((eventName: string) => {
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

  private prepareToolbarVisibilityChangedEvent(): void {
    let currentTabs: DashboardTab[] = this.adaptable.api.dashboardApi.getDashboardState().Tabs;
    if (ArrayExtensions.IsNotNullOrEmpty(currentTabs)) {
      let activeTab = this.adaptable.api.dashboardApi.getDashboardState().ActiveTab;
      if (activeTab > -1) {
        let tab: DashboardTab = this.adaptable.api.dashboardApi.getDashboardState().Tabs[activeTab];
        if (tab) {
          tab.Toolbars.forEach(toolbar => {
            this.fireToolbarVisibilityChangedEvent(tab, toolbar);
          });
        }
      }
    }
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    if (this.canCreateMenuItem('ReadOnly')) {
      return this.createMainMenuItemShowPopup({
        Label: StrategyConstants.DashboardStrategyFriendlyName,
        ComponentName: ScreenPopups.DashboardPopup,
        Icon: StrategyConstants.DashboardGlyph,
      });
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
            StrategyConstants.DashboardGlyph,
            DashboardRedux.DashboardSetIsCollapsed(false)
          )
        );
      } else {
        menuItems.push(
          this.createColumnMenuItemReduxAction(
            'Collapse Dashboard',
            StrategyConstants.DashboardGlyph,
            DashboardRedux.DashboardSetIsCollapsed(true)
          )
        );
      }
      if (this.adaptable.api.dashboardApi.getDashboardState().IsFloating) {
        menuItems.push(
          this.createColumnMenuItemReduxAction(
            'Dock Dashboard',
            StrategyConstants.DashboardGlyph,
            DashboardRedux.DashboardSetIsFloating(false)
          )
        );
      } else {
        menuItems.push(
          this.createColumnMenuItemReduxAction(
            'Float Dashboard',
            StrategyConstants.DashboardGlyph,
            DashboardRedux.DashboardSetIsFloating(true)
          )
        );
      }

      return menuItems;
    }
  }

  private fireToolbarVisibilityChangedEvent(tab: DashboardTab, toolbar: string): void {
    let toolbarVisibilityChangedInfo: ToolbarVisibilityChangedInfo = {
      tab: tab,
      toolbar: toolbar,
      visibility: 'Visible',
    };
    const toolbarVisibilityChangedEventArgs: ToolbarVisibilityChangedEventArgs = AdaptableHelper.createFDC3Message(
      'Toolbar Visibility Changed Args',
      toolbarVisibilityChangedInfo
    );

    this.adaptable.api.eventApi.emit('ToolbarVisibilityChanged', toolbarVisibilityChangedEventArgs);
  }
}
