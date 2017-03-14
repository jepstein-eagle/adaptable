import { MenuItemShowPopup } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import { AdaptableViewFactory } from '../View/AdaptableViewFactory'
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter'
import { IExportStrategy } from '../Core/Interface/IExportStrategy'
import { MenuType } from '../Core/Enums';


export class ExportStrategy extends AdaptableStrategyBase implements IExportStrategy {
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ExportStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Export", this.Id, 'ExportAction', MenuType.Action, "export");
    }

    public ExportBlotter(): void {
        this.blotter.exportBlotter();
    }

  
}