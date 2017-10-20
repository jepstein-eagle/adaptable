import { IRange, IRangeStrategy } from '../Core/Interface/IRangeStrategy';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import * as RangeRedux from '../Redux/ActionsReducers/RangeRedux'
import { MenuType } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { Helper } from '../Core/Helper';
import { Expression } from '../Core/Expression/Expression'
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';

export class RangeStrategy extends AdaptableStrategyBase implements IRangeStrategy {
    private Ranges: IRange[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.RangeStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Range", 'RangeConfig', MenuType.ConfigurationPopup, "tag");
    }

    // Converts a range into an array of array - first array is the column names and subsequent arrays are the values
    public ConvertRangetoArray(rangeUid: string): any[] {
        let rangeToConvert: IRange = this.getRangeFromUid(rangeUid);
        let rangeValues: any[] = this.blotter.convertRangeToArray(rangeToConvert);
        return rangeValues;
    }

    public ConvertRangetoCsv(rangeUid: string): string {
        let rangeAsArray: any[] = this.ConvertRangetoArray(rangeUid);
        return Helper.convertArrayToCsv(rangeAsArray, ",");
    }

    public ExportRangeToCsv(rangeUid: string): void {
        let csvContent: string = this.ConvertRangetoCsv(rangeUid);
        let csvFileName: string = this.getRangeFromUid(rangeUid).Name + ".csv"
        Helper.createDownloadedFile(csvContent, csvFileName, 'text/csv;encoding:utf-8');
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


