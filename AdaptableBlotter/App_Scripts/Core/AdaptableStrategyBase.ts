import { IAdaptableBlotter, IColumn, IEntitlement } from './Interface/IAdaptableBlotter';
import { IStrategy, IMenuItem } from './Interface/IStrategy';
import { ICalendarService } from '../Core/Services/Interface/ICalendarService'
import { CalendarService } from '../Core/Services/CalendarService'
import { MenuType } from '../Core/Enums'
import { MenuItemShowPopup } from '../Core/MenuItem';


export abstract class AdaptableStrategyBase implements IStrategy {
    constructor(public Id: string, protected blotter: IAdaptableBlotter) {
    }

    public menuItemConfig: IMenuItem;

    public getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

    public addColumnMenuItem(column: IColumn, menuItems: string[]): void {
    }

    getStrategyEntitlement(): IEntitlement {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Entitlements.FunctionEntitlements.find(x => x.FunctionName == this.Id)
    }

    createMenuItemShowPopup(Label: string,
        ComponentName: string,
        MenuType: MenuType.ActionPopup | MenuType.ConfigurationPopup,
        GlyphIcon: string): MenuItemShowPopup {
        return new MenuItemShowPopup(Label,
            this.Id,
            ComponentName,
            MenuType,
            GlyphIcon,
            this.getStrategyEntitlement());
    }

}

