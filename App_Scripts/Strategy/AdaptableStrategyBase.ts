import { IAdaptableBlotter, IEntitlement } from '../Core/Interface/IAdaptableBlotter';
import { IStrategy, } from '../Strategy/Interface/IStrategy';
import { IMenuItem } from '../Core/Interface/IMenu';
import { MenuItemShowPopup } from '../Core/MenuItem';

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

