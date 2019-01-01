import * as DashboardRedux from '../Redux/ActionsReducers/DashboardRedux'
import { ApiBase } from "./ApiBase";
import { Visibility } from '../Utilities/Enums';

export interface IDashboardApi {

    SetAvailableToolbars(availableToolbars: string[]): void
    SetVisibleToolbars(visibleToolbars: string[]): void
    ShowToolbar(visibleToolbar: string): void
    HideToolbar(visibleToolbar: string): void
    SetVisibleButtons(functionButtons: string[]): void
    SetZoom(zoom: Number): void
    SetVisibility(dashboardVisibility: 'Minimised' | 'Visible' | 'Hidden'): void
    Show(): void
    Hide(): void
    ShowSystemStatusButton(): void
    HideSystemStatusButton(): void
    ShowAboutButton(): void
    HideAboutButton(): void
    ShowFunctionsDropdown(): void
    HideFunctionsDropdown(): void
    ShowColumnsDropdown(): void
    HideColumnsDropdown(): void
    SetHomeToolbarTitle(title: string): void
    SetApplicationToolbarTitle(title: string): void
    Minimise(): void
}



export class DashboardApi extends ApiBase implements IDashboardApi {

  public SetAvailableToolbars(availableToolbars: string[]): void {
        this.dispatchAction(DashboardRedux.DashboardSetAvailableToolbars(availableToolbars))
    }

    public SetVisibleToolbars(visibleToolbars: string[]): void {
        visibleToolbars.forEach(vt => {
            this.ShowToolbar(vt)
        })
    }

    public ShowToolbar(visibleToolbar: string): void {
        this.dispatchAction(DashboardRedux.DashboardShowToolbar(visibleToolbar))
    }

    public HideToolbar(visibleToolbar: string): void {
        this.dispatchAction(DashboardRedux.DashboardHideToolbar(visibleToolbar))
    }

    public SetVisibleButtons(functionButtons: string[]): void {
        this.dispatchAction(DashboardRedux.DashboardSetFunctionButtons(functionButtons))
    }

    public SetZoom(zoom: Number): void {
        this.dispatchAction(DashboardRedux.DashboardSetZoom(zoom))
    }

    public SetVisibility(dashboardVisibility: 'Minimised' | 'Visible' | 'Hidden'): void {
        this.dispatchAction(DashboardRedux.DashboardSetVisibility(dashboardVisibility as Visibility))
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
        this.dispatchAction(DashboardRedux.DashboardShowSystemStatusButton())
    }

    public HideSystemStatusButton(): void {
        this.dispatchAction(DashboardRedux.DashboardHideSystemStatusButton())
    }

    public ShowAboutButton(): void {
        this.dispatchAction(DashboardRedux.DashboardShowAboutButton())
    }

    public HideAboutButton(): void {
        this.dispatchAction(DashboardRedux.DashboardHideAboutButton())
    }

    public ShowFunctionsDropdown(): void {
        this.dispatchAction(DashboardRedux.DashboardShowFunctionsDropdown())
    }

    public HideFunctionsDropdown(): void {
        this.dispatchAction(DashboardRedux.DashboardHideFunctionsDropdown())
    }

    public ShowColumnsDropdown(): void {
        this.dispatchAction(DashboardRedux.DashboardShowColumnsDropdown())
    }

    public HideColumnsDropdown(): void {
        this.dispatchAction(DashboardRedux.DashboardHideColumnsDropdown())
    }

    public SetHomeToolbarTitle(title: string): void {
        this.dispatchAction(DashboardRedux.DashboardSetHomeToolbarTitle(title))
    }

    public SetApplicationToolbarTitle(title: string): void {
        this.dispatchAction(DashboardRedux.DashboardSetApplicationToolbarTitle(title))
    }



}