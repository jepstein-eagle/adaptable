import { MenuItemShowPopup } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import { AdaptableViewFactory } from '../View/AdaptableViewFactory'
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { ISmartEditStrategy, ISmartEditValueTuple, ISmartEditPreviewReturn } from '../Core/Interface/ISmartEditStrategy'
import { IExportStrategy } from '../Core/Interface/IExportStrategy'
import { MenuType } from '../Core/Enums';


export class ExportStrategy extends AdaptableStrategyBase implements IExportStrategy {
    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ExportStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Export Blotter", this.Id, 'ExportAction', MenuType.Action, "export");
    }

    public ExportBlotter(): void {
        this.blotter.exportBlotter();
    }



    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}