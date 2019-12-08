import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import * as ApplicationRedux from '../../Redux/ActionsReducers/ApplicationRedux';
import { ApiBase } from './ApiBase';
import { Visibility } from '../../PredefinedConfig/Common/Enums';
import { DashboardApi } from '../DashboardApi';
import { DashboardState } from '../../PredefinedConfig/DashboardState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import LoggingHelper from '../../Utilities/Helpers/LoggingHelper';

export class DashboardApiImpl extends ApiBase implements DashboardApi {
  public GetState(): DashboardState {
    return this.getBlotterState().Dashboard;
  }

  public SetAvailableToolbars(availableToolbars: string[]): void {
    this.dispatchAction(DashboardRedux.DashboardSetAvailableToolbars(availableToolbars));
  }

  public SetVisibleToolbars(visibleToolbars: string[]): void {
    visibleToolbars.forEach(vt => {
      this.ShowToolbar(vt);
    });
  }

  public ShowToolbar(visibleToolbar: string): void {
    this.dispatchAction(DashboardRedux.DashboardShowToolbar(visibleToolbar));
  }

  public HideToolbar(visibleToolbar: string): void {
    this.dispatchAction(DashboardRedux.DashboardHideToolbar(visibleToolbar));
  }

  public SetVisibleButtons(functionButtons: string[]): void {
    this.dispatchAction(DashboardRedux.DashboardSetFunctionButtons(functionButtons));
  }

  public SetVisibility(dashboardVisibility: 'Minimised' | 'Visible' | 'Hidden'): void {
    this.dispatchAction(DashboardRedux.DashboardSetVisibility(dashboardVisibility as Visibility));
  }

  public Show(): void {
    this.SetVisibility(Visibility.Visible);
  }

  public Hide(): void {
    this.SetVisibility(Visibility.Hidden);
  }

  public Minimise(): void {
    this.SetVisibility(Visibility.Minimised);
  }

  public ShowSystemStatusButton(): void {
    this.dispatchAction(DashboardRedux.DashboardShowSystemStatusButton());
  }

  public HideSystemStatusButton(): void {
    this.dispatchAction(DashboardRedux.DashboardHideSystemStatusButton());
  }

  public ShowGridInfoButton(): void {
    this.dispatchAction(DashboardRedux.DashboardShowGridInfoButton());
  }

  public HideGridInfoButton(): void {
    this.dispatchAction(DashboardRedux.DashboardHideGridInfoButton());
  }

  public ShowFunctionsDropdown(): void {
    this.dispatchAction(DashboardRedux.DashboardShowFunctionsDropdown());
  }

  public HideFunctionsDropdown(): void {
    this.dispatchAction(DashboardRedux.DashboardHideFunctionsDropdown());
  }

  public ShowColumnsDropdown(): void {
    this.dispatchAction(DashboardRedux.DashboardShowColumnsDropdown());
  }

  public HideColumnsDropdown(): void {
    this.dispatchAction(DashboardRedux.DashboardHideColumnsDropdown());
  }

  public SetHomeToolbarTitle(title: string): void {
    this.dispatchAction(DashboardRedux.DashboardSetHomeToolbarTitle(title));
  }

  public SetApplicationToolbarTitle(title: string): void {
    LoggingHelper.LogAdaptableBlotterWarning(
      'This method is deprecated.  Use ApplicationApi.SetApplicationToolbarTitle instead.'
    );
    this.dispatchAction(ApplicationRedux.ApplicationSetApplicationToolbarTitle(title));
  }

  public showDashboardPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.DashboardStrategyId,
      ScreenPopups.DashboardPopup
    );
  }
}
