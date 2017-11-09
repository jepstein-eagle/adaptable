import { IRange, IRangeStrategy } from '../Core/Interface/IRangeStrategy';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import * as RangeRedux from '../Redux/ActionsReducers/RangeRedux'
import { MenuType, RangeScope, RangeExportDestination } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { Helper } from '../Core/Helper';
import { RangeHelper } from '../Core/Services/RangeHelper';
import { Expression } from '../Core/Expression/Expression'
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';

export class RangeStrategy extends AdaptableStrategyBase implements IRangeStrategy {
    private Ranges: IRange[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.RangeStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Range", 'RangeConfig', MenuType.ConfigurationPopup, "tag");
    }


    public ExportRange(rangeUid: string, rangeExportDestination: RangeExportDestination): void {
        switch (rangeExportDestination) {
            case RangeExportDestination.Clipboard:
                this.ConvertRangetoJSON(rangeUid);
                // do something else
                break;
            case RangeExportDestination.CSV:
                this.ConvertRangetoCsv(rangeUid);
                break;
            case RangeExportDestination.Excel:
                //
                break;
            case RangeExportDestination.JSON:
                this.ConvertRangetoJSON(rangeUid);
                break;
            case RangeExportDestination.Symphony:
                //
                break;
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


