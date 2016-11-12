import {MenuItemShowPopup} from '../../Core/MenuItem'
import {AdaptableStrategyBase} from '../../Core/AdaptableStrategyBase'
import {AdaptableViewFactory} from '../../View/AdaptableViewFactory'
import * as StrategyIds from '../../Core/StrategyIds'
import {IMenuItem} from '../../Core/Interface/IStrategy'
import {IAdaptableBlotter} from '../../Core/Interface/IAdaptableBlotter'
import {ISmartEditStrategy, ISmartEditValueTuple, ISmartEditPreviewReturn} from '../../Core/Interface/ISmartEditStrategy'
import {IExcelExportStrategy} from '../../Core/Interface/IExcelExportStrategy'


export class ExcelExportStrategy extends AdaptableStrategyBase implements IExcelExportStrategy {
    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ExcelExportStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Export To Excel", this.Id, 'ExcelExportAction', "export");
    }

    public ExportToExcel(fileName: string, allPages: boolean): void {
        this.blotter.printGrid();
        this.blotter.saveAsExcel(fileName, allPages     );
    }


    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}