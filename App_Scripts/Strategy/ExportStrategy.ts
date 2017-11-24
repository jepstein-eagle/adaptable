import { MenuItemShowPopup } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import { IExportStrategy, IRange } from '../Core/Interface/IExportStrategy'
import { MenuType, RangeScope, ExportDestination } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { Helper } from '../Core/Helper';
import { RangeHelper } from '../Core/Services/RangeHelper';
import { Expression } from '../Core/Expression/Expression'
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { OpenfinHelper } from '../Core/OpenfinHelper';
import * as _ from 'lodash'
export class ExportStrategy extends AdaptableStrategyBase implements IExportStrategy {

    private Ranges: IRange[]
    private currentLiveExcel: {
        workbookName: string,
        range: string
    }[] = []

    private throttledRecomputeAndSendLiveExcelEvent = _.throttle(() => this.sendNewDataToOpenfinExcel(), 500);

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ExportStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Export", 'ExportAction', MenuType.ActionPopup, "export");
        OpenfinHelper.OnExcelDisconnected().Subscribe((sender, event) => {
            console.log("Excel closed stopping all Live Excel");
            this.currentLiveExcel = []
        })
        OpenfinHelper.OnWorkbookDisconnected().Subscribe((sender, workbook) => {
            console.log("Workbook closed:" + workbook.name);
            let idx = this.currentLiveExcel.findIndex(x => x.workbookName == workbook.name)
            if (idx != -1) {
                this.currentLiveExcel.splice(idx, 1)
                console.log("Live Excel stopped for Workbook :" + workbook.name);
            }
        })
        OpenfinHelper.OnWorkbookSaved().Subscribe((sender, workbookSavedEvent) => {
            console.log("Workbook Saved", workbookSavedEvent);
            let cle = this.currentLiveExcel.find(x => x.workbookName == workbookSavedEvent.OldName)
            if (cle) {
                cle.workbookName = workbookSavedEvent.NewName
                console.log("Workbook Saved", workbookSavedEvent);
            }
        })
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, event) => {
            this.throttledRecomputeAndSendLiveExcelEvent()
        })
    }

    private sendNewDataToOpenfinExcel() {
        if (this.currentLiveExcel.length > 0) {
            this.currentLiveExcel.forEach(cle => {
                let rangeAsArray: any[] = this.ConvertRangetoArray(cle.range);
                if (rangeAsArray) {
                    OpenfinHelper.pushData(cle.workbookName, rangeAsArray);
                }
            })
        }
    }

    public Export(rangeName: string, exportDestination: ExportDestination): void {
        switch (exportDestination) {
            case ExportDestination.Clipboard:
                this.copyToClipboard(rangeName);
                break;
            case ExportDestination.CSV:
                this.convertRangetoCsv(rangeName);
                break;
            case ExportDestination.OpenfinExcel:
                OpenfinHelper.initOpenFinExcel()//.then((workbook) => OpenfinHelper.addRangeWorkSheet(workbook, rangeName))
                    .then((workbookName) => {
                        this.currentLiveExcel.push({
                            workbookName: workbookName,
                            range: rangeName
                        })
                    });
                break;
        }
    }

    private convertRangetoCsv(rangeName: string): void {
        let csvContent: string = this.createCSVContent(rangeName);
        if (csvContent) {
            let csvFileName: string = this.getRange(rangeName).Name + ".csv"
            Helper.createDownloadedFile(csvContent, csvFileName, 'text/csv;encoding:utf-8');
        }
    }

    private copyToClipboard(rangeName: string) {
        let csvContent: string = this.createTabularContent(rangeName);
        if (csvContent) {
            Helper.copyToClipboard(csvContent)
        }
    }

    private createCSVContent(rangeName: string): string {
        let rangeAsArray: any[] = this.ConvertRangetoArray(rangeName);
        if (rangeAsArray) {
            return Helper.convertArrayToCsv(rangeAsArray, ",");
        }
        return null
    }

    private createTabularContent(rangeName: string): string {
        let rangeAsArray: any[] = this.ConvertRangetoArray(rangeName);
        if (rangeAsArray) {
            return Helper.convertArrayToCsv(rangeAsArray, "\t");
        }
        return null
    }

    // Converts a range into an array of array - first array is the column names and subsequent arrays are the values
    private ConvertRangetoArray(rangeName: string): any[] {
        let rangeToConvert: IRange = this.getRange(rangeName);
        let rangeCols: IColumn[] = this.getColsForRange(rangeToConvert);
        let actionReturnObj = RangeHelper.ConvertRangeToArray(this.blotter, rangeToConvert, rangeCols);
        if (actionReturnObj.Error) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(PopupRedux.PopupShowError(actionReturnObj.Error))
            return null
        }
        return actionReturnObj.ActionReturn
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