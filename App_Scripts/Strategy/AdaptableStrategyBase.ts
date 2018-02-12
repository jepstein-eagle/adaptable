import { IAdaptableBlotter, IEntitlement } from '../Core/Interface/IAdaptableBlotter';
import { IStrategy, } from '../Strategy/Interface/IStrategy';
import { IMenuItem } from '../Core/Interface/IMenu';
import { MenuItemShowPopup, MenuItemDoReduxAction } from '../Core/MenuItem';
import { IEnterpriseCache } from 'ag-grid';
import { Action } from 'redux';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'

export abstract class AdaptableStrategyBase implements IStrategy {
    private buildContextMenu: boolean
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
                this.addColumnMenuItems(this.blotter.AdaptableBlotterStore.TheStore.getState().Menu.ContextMenu.ColumnId)
            }
        }
    }

    protected InitState(): void {
        // stff - check this works
    }

   
    public menuItemConfig: IMenuItem;

    public getMenuItems(): IMenuItem[] {
        if (this.menuItemConfig) {
            return [this.menuItemConfig];
        }
        return []
    }

   
    protected addColumnMenuItems(columnId: string): void {
        // base class implementation which is empty
    }

    getStrategyEntitlement(): IEntitlement {
        let state = this.blotter.AdaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements;
        return state.find(x => x.FunctionName == this.Id)
    }

    isVisibleStrategy(): boolean {
        let entitlement: IEntitlement = this.getStrategyEntitlement();
        if (entitlement) {
         if(entitlement.AccessLevel == "Hidden")
         {
             let s="hello"
         }
            return entitlement.AccessLevel != "Hidden"
        }
        return true;
    }

    isReadOnlyStrategy(): boolean {
        let entitlement: IEntitlement = this.getStrategyEntitlement();
        if (entitlement) {
          if(entitlement.AccessLevel == "ReadOnly"){
              return true
          }else{
              return false;
          }
         }
        return false;
    }

    createMenuItemReduxAction(Label: string,
        GlyphIcon: string,
        Action: Action): any {
        if (this.isVisibleStrategy()) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                MenuRedux.AddItemColumnContextMenu(
                    new MenuItemDoReduxAction(
                        Label,
                        this.Id,
                        Action,
                        GlyphIcon
                    )))
        }
    }



    createMenuItemShowPopup(Label: string,
        ComponentName: string,
        GlyphIcon: string,
        PopupParams?: string): MenuItemShowPopup {
        if (this.isVisibleStrategy()) {
           let menuItemShowPopup: MenuItemShowPopup= new MenuItemShowPopup(
            Label,
            this.Id,
            ComponentName,
            GlyphIcon,
           this.getStrategyEntitlement(),
            PopupParams)
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                MenuRedux.AddItemColumnContextMenu(
                   menuItemShowPopup
                ))
                return menuItemShowPopup;
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

