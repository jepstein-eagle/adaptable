import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import * as ApplicationRedux from '../../Redux/ActionsReducers/ApplicationRedux';
import { ApiBase } from './ApiBase';
import { Visibility } from '../../PredefinedConfig/Common/Enums';
import { DashboardApi } from '../DashboardApi';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import LoggingHelper from '../../Utilities/Helpers/LoggingHelper';
import { DashboardState, CustomToolbar } from '../../PredefinedConfig/DashboardState';
import {
  AdaptableDashboardToolbars,
  AdaptableDashboardToolbar,
  AdaptableFunctionButtons,
} from '../../PredefinedConfig/Common/Types';

export class DashboardApiImpl extends ApiBase implements DashboardApi {
  public GetDashboardState(): DashboardState {
    return this.getBlotterState().Dashboard;
  }

  public SetAvailableToolbars(availableToolbars: AdaptableDashboardToolbars): void {
    this.dispatchAction(DashboardRedux.DashboardSetAvailableToolbars(availableToolbars));
  }

  public SetVisibleToolbars(visibleToolbars: AdaptableDashboardToolbars): void {
    visibleToolbars.forEach((vt: AdaptableDashboardToolbar) => {
      this.ShowToolbar(vt);
    });
  }

  public ShowToolbar(visibleToolbar: AdaptableDashboardToolbar): void {
    this.dispatchAction(DashboardRedux.DashboardShowToolbar(visibleToolbar));
  }

  public HideToolbar(visibleToolbar: AdaptableDashboardToolbar): void {
    this.dispatchAction(DashboardRedux.DashboardHideToolbar(visibleToolbar));
  }

  public SetVisibleButtons(functionButtons: AdaptableFunctionButtons): void {
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

  public ShowToolbarsDropdown(): void {
    this.dispatchAction(DashboardRedux.DashboardShowToolbarsDropdown());
  }

  public HideToolbarsDropdown(): void {
    this.dispatchAction(DashboardRedux.DashboardHideToolbarsDropdown());
  }

  public SetHomeToolbarTitle(title: string): void {
    this.dispatchAction(DashboardRedux.DashboardSetHomeToolbarTitle(title));
  }

  public SetApplicationToolbarTitle(title: string): void {
    LoggingHelper.LogAdaptableWarning(
      'This method is deprecated.  Use ApplicationApi.SetApplicationToolbarTitle instead.'
    );
    this.dispatchAction(ApplicationRedux.ApplicationSetApplicationToolbarTitle(title));
  }

  public getCustomToolbarContentsDiv(customToolbarName: string): HTMLElement | null {
    let customToolbar: CustomToolbar = this.getCustomToolbarByName(customToolbarName);
    if (customToolbar) {
      let divId: string = 'ab-CustomToolbar__' + customToolbar.Name + '__contents';
      return document.getElementById(divId);
    }
    return null;
  }

  public getCustomToolbarByName(customToolbarName: string): CustomToolbar {
    return this.GetDashboardState().CustomToolbars.find(ct => ct.Name == customToolbarName);
  }

  public showDashboardPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.DashboardStrategyId,
      ScreenPopups.DashboardPopup
    );
  }
}
