import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IExportStrategy } from './Interface/IExportStrategy';
import { ExportDestination } from '../Utilities/Enums';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
export declare class ExportStrategy extends AdaptableStrategyBase implements IExportStrategy {
    private ExportState;
    private CurrentLiveReports;
    private isSendingData;
    private workAroundOpenfinExcelDataDimension;
    private throttledRecomputeAndSendLiveExcelEvent;
    constructor(blotter: IAdaptableBlotter);
    private handleGridReloaded;
    protected addPopupMenuItem(): void;
    private sendNewDataToLiveExcel;
    Export(ReportName: string, exportDestination: ExportDestination, folder?: string, page?: string): void;
    private convertReportToCsv;
    private copyToClipboard;
    private createCSVContent;
    private createTabularContent;
    private ConvertReportToArray;
    private getReport;
    protected InitState(): void;
    private scheduleReports;
}
