import {MenuItemShowPopup} from '../Core/MenuItem'
import {AdaptableStrategyBase} from '../Core/AdaptableStrategyBase'
import {AdaptableViewFactory} from '../View/AdaptableViewFactory'
import * as StrategyIds from '../Core/StrategyIds'
import {IMenuItem} from '../Core/Interface/IStrategy'
import {IAdaptableBlotter} from '../Core/Interface/IAdaptableBlotter'
import {ISmartEditStrategy, ISmartEditValueTuple, ISmartEditPreviewReturn} from '../Core/Interface/ISmartEditStrategy'
import {IPrintPreviewStrategy} from '../Core/Interface/IPrintPreviewStrategy'
import {MenuType} from '../Core/Enums';


export class PrintPreviewStrategy extends AdaptableStrategyBase implements IPrintPreviewStrategy {
    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.PrintPreviewStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Print Preview", this.Id, 'PrintPreviewAction',MenuType.Action, "print");
    }

    public ApplyPrintPreview(): void {
        this.blotter.printGrid();
    }


    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}