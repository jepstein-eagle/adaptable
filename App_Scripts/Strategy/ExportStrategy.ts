import { MenuItemShowPopup } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IExportStrategy } from '../Core/Interface/IExportStrategy'
import { MenuType } from '../Core/Enums';


export class ExportStrategy extends AdaptableStrategyBase implements IExportStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ExportStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Export", 'ExportAction', MenuType.ActionPopup, "export");
    }

    public ExportBlotter(): void {
        this.blotter.exportBlotter();
    }
    protected InitState() {
    }
  
}