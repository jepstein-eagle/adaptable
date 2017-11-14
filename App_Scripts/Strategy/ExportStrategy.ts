import { MenuItemShowPopup } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy'
import { IExportStrategy, IRange } from '../Core/Interface/IExportStrategy'
import { MenuType, RangeScope, ExportDestination } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { Helper } from '../Core/Helper';
import { RangeHelper } from '../Core/Services/RangeHelper';
import { Expression } from '../Core/Expression/Expression'
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';

export class ExportStrategy extends AdaptableStrategyBase implements IExportStrategy {

    private Ranges: IRange[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ExportStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Export", 'ExportAction', MenuType.ActionPopup, "export");
    }

    public Export(rangeName: string, exportDestination: ExportDestination): void {
        switch (exportDestination) {
            case ExportDestination.Clipboard:
                this.copyToClipboard(rangeName);
                break;
            case ExportDestination.CSV:
                this.convertRangetoCsv(rangeName);
                break;
            // case RangeExportDestination.Excel:
            //     //
            //     break;
            // case RangeExportDestination.JSON:
            //     this.convertRangetoJSON(rangeUid);
            //     break;
            // case RangeExportDestination.Symphony:
            //     //
            //     break;
        }
    }

    private convertRangetoCsv(rangeName: string): void {
        let csvContent: string = this.createCSVContent(rangeName);
        let csvFileName: string = this.getRange(rangeName).Name + ".csv"
        Helper.createDownloadedFile(csvContent, csvFileName, 'text/csv;encoding:utf-8');
    }

    private copyToClipboard(rangeName: string) {
        let csvContent: string = this.createCSVContent(rangeName);
        Helper.copyToClipboard(csvContent)
    }

    private convertRangetoJSON(rangeName: string): string {
        let rangeAsArray: any[] = this.ConvertRangetoArray(rangeName);
        return JSON.stringify(rangeAsArray)
    }

    private createCSVContent(rangeName: string): string {
        let rangeAsArray: any[] = this.ConvertRangetoArray(rangeName);
        return Helper.convertArrayToCsv(rangeAsArray, ",");
    }

    // Converts a range into an array of array - first array is the column names and subsequent arrays are the values
    private ConvertRangetoArray(rangeName: string): any[] {
        let rangeToConvert: IRange = this.getRange(rangeName);
        let rangeCols: IColumn[] = this.getColsForRange(rangeToConvert);
        return RangeHelper.ConvertRangeToArray(this.blotter, rangeToConvert, rangeCols);
    }

    private getColsForRange(range: IRange): IColumn[] {
        let allCols: IColumn[] = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        return (range.RangeScope == RangeScope.AllColumns) ?
            allCols :
            range.Columns.map(c => allCols.find(col => col.ColumnId == c));
    }

    private getRange(rangeName: string): IRange {
        return this.Ranges.find(r => r.Name == rangeName);
    }

    protected InitState() {
        if (this.Ranges != this.blotter.AdaptableBlotterStore.TheStore.getState().Range.Ranges) {
            this.Ranges = this.blotter.AdaptableBlotterStore.TheStore.getState().Range.Ranges;
        }
    }

}