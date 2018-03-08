import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IStrategy, } from '../Strategy/Interface/IStrategy';
import { IMenuItem } from '../Core/Interface/IMenu';
import { MenuItemShowPopup, MenuItemDoReduxAction } from '../Core/MenuItem';
import { IEnterpriseCache } from 'ag-grid';
import { Action } from 'redux';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { IEntitlement } from '../Core/Interface/Interfaces';

export abstract class AdaptableStrategyBase implements IStrategy {
    private buildContextMenu: boolean
    private buildPopupMenu: boolean
    private Entitlements: IEntitlement[]
    constructor(public Id: string, protected blotter: IAdaptableBlotter) {
    }

    public InitializeWithRedux() {
        this.InitBaseState()
        this.blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitBaseState())
        this.InitState();
        this.blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }


    private InitBaseState() {
        if (this.buildContextMenu != this.blotter.AdaptableBlotterStore.TheStore.getState().Menu.ContextMenu.BuildContextMenu) {
            this.buildContextMenu = this.blotter.AdaptableBlotterStore.TheStore.getState().Menu.ContextMenu.BuildContextMenu;
            if (this.buildContextMenu) {
                this.addColumnMenuItem(this.blotter.AdaptableBlotterStore.TheStore.getState().Menu.ContextMenu.ColumnId)
            }
        }
    }

    protected InitState(): void {
        // stff - check this works
    }


    public popupMenuItem: IMenuItem;

    public getPopupMenuItem(): IMenuItem {
        if (!this.hasPopupMenu()) {
            return null;
        }

        if (this.popupMenuItem == null) {
            this.addPopupMenuItem();
        }
        return this.popupMenuItem;
    }

    protected hasPopupMenu(): boolean {
        return true;
    }

    protected addPopupMenuItem(): void {
        // base class implementation which is empty
    }

    protected addColumnMenuItem(columnId: string): void {
        // base class implementation which is empty
    }

    getStrategyEntitlement(): IEntitlement {
        let state = this.blotter.AdaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements;
        return state.find(x => x.FunctionName == this.Id)
    }

    isVisibleStrategy(): boolean {
        let entitlement: IEntitlement = this.getStrategyEntitlement();
        if (entitlement) {
            if (entitlement.AccessLevel == "Hidden") {
                let s = "hello"
            }
            return entitlement.AccessLevel != "Hidden"
        }
        return true;
    }

    isReadOnlyStrategy(): boolean {
        let entitlement: IEntitlement = this.getStrategyEntitlement();
        if (entitlement) {
            if (entitlement.AccessLevel == "ReadOnly") {
                return true
            } else {
                return false;
            }
        }
        return false;
    }


    // direct actions called by the context menu - invisible if strategy is hidden or readonly
    createMenuItemReduxAction(Label: string,
        GlyphIcon: string,
        Action: Action): any {
        if (this.isVisibleStrategy()&& !this.isReadOnlyStrategy()) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                   MenuRedux.AddItemColumnContextMenu(
                new MenuItemDoReduxAction(
                    Label,
                    this.Id,
                    Action,
                    GlyphIcon,
                    false,
                    true
                ))
            )
        }
    }


    createMenuItemShowPopup(Label: string,
        ComponentName: string,
        GlyphIcon: string,
        PopupParams?: string) {
        let menuItemShowPopup: MenuItemShowPopup = new MenuItemShowPopup(
            Label,
            this.Id,
            ComponentName,
            GlyphIcon,
            this.isReadOnlyStrategy(),
            this.isVisibleStrategy(),
            PopupParams)
        //    this.blotter.AdaptableBlotterStore.TheStore.dispatch(
        //        MenuRedux.AddItemColumnContextMenu(
        //            menuItemShowPopup
        //        ))
        this.popupMenuItem = menuItemShowPopup;
    }

    // same as show popup but we hide it completely if the entitlement is hidden or readonly as they are actions
    createMenuItemColumnMenu(Label: string,
        ComponentName: string,
        GlyphIcon: string,
        PopupParams?: string) {
        if (this.isVisibleStrategy() && !this.isReadOnlyStrategy()) {
            let menuItemShowPopup: MenuItemShowPopup = new MenuItemShowPopup(
                Label,
                this.Id,
                ComponentName,
                GlyphIcon,
                false,
                true,
                PopupParams)
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                MenuRedux.AddItemColumnContextMenu(
                    menuItemShowPopup
                ))
        }
    }

    /*this.Action = PopupRedux.PopupShow(
            ComponentName,
            Entitlment ? Entitlment.AccessLevel == "ReadOnly" : false,
            this.PopupParams)
    }*/

    protected AuditFunctionAction(action: string, info: string, data?: any) {
        this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(this.Id,
            action,
            info,
            data)
    }

}

