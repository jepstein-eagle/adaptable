import { IAdaptableBlotter, IColumn, IEntitlement } from './Interface/IAdaptableBlotter';
import { IStrategy, IMenuItem } from './Interface/IStrategy';
import { ICalendarService } from '../Core/Services/Interface/ICalendarService'
import { CalendarService } from '../Core/Services/CalendarService'
import { MenuItemShowPopup } from '../Core/MenuItem';
import { MenuState } from '../Redux/ActionsReducers/Interface/IState';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'

export abstract class AdaptableStrategyBase implements IStrategy {
    private buildContextMenu: boolean
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

    protected  InitState(): void{
       // base class implementation which is empty
    }

    public menuItemConfig: IMenuItem;

    public getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

    protected addColumnMenuItems(columnId: string): void {
        // base class implementation which is empty
    }

    getStrategyEntitlement(): IEntitlement {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements.find(x => x.FunctionName == this.Id)
    }

    createMenuItemShowPopup(Label: string,
        ComponentName: string,
        GlyphIcon: string,
        PopupParams?: string): MenuItemShowPopup {
        return new MenuItemShowPopup(Label,
            this.Id,
            ComponentName,
            GlyphIcon,
            this.getStrategyEntitlement(),
            PopupParams);
    }

    protected AuditFunctionAction(action: string, info: string, data?: any) {
        this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(this.Id,
            action,
            info,
            data)
    }

}

