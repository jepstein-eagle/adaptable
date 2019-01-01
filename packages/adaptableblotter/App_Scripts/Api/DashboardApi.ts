import * as DashboardRedux from '../Redux/ActionsReducers/DashboardRedux'
import { ApiBase } from "./ApiBase";
import { Visibility } from '../Utilities/Enums';

export interface IDashboardApi {

    // Dashboard api methods
    dashboardSetAvailableToolbars(availableToolbars: string[]): void
    dashboardSetVisibleToolbars(visibleToolbars: string[]): void
    dashboardShowToolbar(visibleToolbar: string): void
    dashboardHideToolbar(visibleToolbar: string): void
    dashboardSetVisibleButtons(functionButtons: string[]): void
    dashboardSetZoom(zoom: Number): void
    dashboardSetVisibility(dashboardVisibility: 'Minimised' | 'Visible' | 'Hidden'): void
    dashboardShow(): void
    dashboardHide(): void
    dashboardShowSystemStatusButton(): void
    dashboardHideSystemStatusButton(): void
    dashboardShowAboutButton(): void
    dashboardHideAboutButton(): void
    dashboardShowFunctionsDropdown(): void
    dashboardHideFunctionsDropdown(): void
    dashboardShowColumnsDropdown(): void
    dashboardHideColumnsDropdown(): void
    dashboardSetHomeToolbarTitle(title: string): void
    dashboardSetApplicationToolbarTitle(title: string): void
    dashboardMinimise(): void

}



export class DashboardApi extends ApiBase implements IDashboardApi {



    // Dashboard api methods
    public dashboardSetAvailableToolbars(availableToolbars: string[]): void {
        this.dispatchAction(DashboardRedux.DashboardSetAvailableToolbars(availableToolbars))
    }

    public dashboardSetVisibleToolbars(visibleToolbars: string[]): void {
        visibleToolbars.forEach(vt => {
            this.dashboardShowToolbar(vt)
        })
    }

    public dashboardShowToolbar(visibleToolbar: string): void {
        this.dispatchAction(DashboardRedux.DashboardShowToolbar(visibleToolbar))
    }

    public dashboardHideToolbar(visibleToolbar: string): void {
        this.dispatchAction(DashboardRedux.DashboardHideToolbar(visibleToolbar))
    }

    public dashboardSetVisibleButtons(functionButtons: string[]): void {
        this.dispatchAction(DashboardRedux.DashboardSetFunctionButtons(functionButtons))
    }

    public dashboardSetZoom(zoom: Number): void {
        this.dispatchAction(DashboardRedux.DashboardSetZoom(zoom))
    }

    public dashboardSetVisibility(dashboardVisibility: 'Minimised' | 'Visible' | 'Hidden'): void {
        this.dispatchAction(DashboardRedux.DashboardSetVisibility(dashboardVisibility as Visibility))
    }

    public dashboardShow(): void {
        this.dashboardSetVisibility(Visibility.Visible);
    }

    public dashboardHide(): void {
        this.dashboardSetVisibility(Visibility.Hidden);
    }

    public dashboardMinimise(): void {
        this.dashboardSetVisibility(Visibility.Minimised);
    }

    public dashboardShowSystemStatusButton(): void {
        this.dispatchAction(DashboardRedux.DashboardShowSystemStatusButton())
    }

    public dashboardHideSystemStatusButton(): void {
        this.dispatchAction(DashboardRedux.DashboardHideSystemStatusButton())
    }

    public dashboardShowAboutButton(): void {
        this.dispatchAction(DashboardRedux.DashboardShowAboutButton())
    }

    public dashboardHideAboutButton(): void {
        this.dispatchAction(DashboardRedux.DashboardHideAboutButton())
    }

    public dashboardShowFunctionsDropdown(): void {
        this.dispatchAction(DashboardRedux.DashboardShowFunctionsDropdown())
    }

    public dashboardHideFunctionsDropdown(): void {
        this.dispatchAction(DashboardRedux.DashboardHideFunctionsDropdown())
    }

    public dashboardShowColumnsDropdown(): void {
        this.dispatchAction(DashboardRedux.DashboardShowColumnsDropdown())
    }

    public dashboardHideColumnsDropdown(): void {
        this.dispatchAction(DashboardRedux.DashboardHideColumnsDropdown())
    }

    public dashboardSetHomeToolbarTitle(title: string): void {
        this.dispatchAction(DashboardRedux.DashboardSetHomeToolbarTitle(title))
    }

    public dashboardSetApplicationToolbarTitle(title: string): void {
        this.dispatchAction(DashboardRedux.DashboardSetApplicationToolbarTitle(title))
    }



}