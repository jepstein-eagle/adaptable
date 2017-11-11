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

    public Export(rangeUid: string, exportDestination: ExportDestination): void {
            switch (exportDestination) {
                case ExportDestination.Clipboard:
                    this.copyToClipboard(rangeUid);
                    break;
                case ExportDestination.CSV:
                    this.ConvertRangetoCsv(rangeUid);
                    break;
                // case RangeExportDestination.Excel:
                //     //
                //     break;
                // case RangeExportDestination.JSON:
                //     this.ConvertRangetoJSON(rangeUid);
                //     break;
                // case RangeExportDestination.Symphony:
                //     //
                //     break;
            }
        }
    
        // Converts a range into an array of array - first array is the column names and subsequent arrays are the values
        private ConvertRangetoArray(rangeUid: string): any[] {
            let rangeToConvert: IRange = this.getRangeFromUid(rangeUid);
            let rangeCols: IColumn[] = this.getColsForRange(rangeToConvert);
            return RangeHelper.ConvertRangeToArray(this.blotter, rangeToConvert, rangeCols);
        }
    
        private ConvertRangetoJSON(rangeUid: string): string {
            let rangeAsArray: any[] = this.ConvertRangetoArray(rangeUid);
            return JSON.stringify(rangeAsArray)
        }
    
        private copyToClipboard(rangeUid: string) {
            let rangeAsArray: any[] = this.ConvertRangetoArray(rangeUid);
            let csvContent: string = Helper.convertArrayToCsv(rangeAsArray, ",");
            Helper.copyToClipboard(csvContent)
        }
    
        private ConvertRangetoCsv(rangeUid: string): void {
            let rangeAsArray: any[] = this.ConvertRangetoArray(rangeUid);
            let csvContent: string = Helper.convertArrayToCsv(rangeAsArray, ",");
            let csvFileName: string = this.getRangeFromUid(rangeUid).Name + ".csv"
            Helper.createDownloadedFile(csvContent, csvFileName, 'text/csv;encoding:utf-8');
        }
    
        private getColsForRange(range: IRange): IColumn[] {
            let allCols: IColumn[] = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            let cols: IColumn[] = (range.RangeScope == RangeScope.AllColumns) ?
                allCols :
                range.Columns.map(c => allCols.find(col => col.ColumnId == c));
            return cols;
        }
    
        private getRangeFromUid(rangeUid: string): IRange {
            return this.Ranges.find(r => r.Uid == rangeUid);
        }
    
        protected InitState() {
            if (this.Ranges != this.blotter.AdaptableBlotterStore.TheStore.getState().Range.Ranges) {
                this.Ranges = this.blotter.AdaptableBlotterStore.TheStore.getState().Range.Ranges;
            }
        }
    
    }