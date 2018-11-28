import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IExportStrategy } from './Interface/IExportStrategy';
import { ExportDestination } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
export declare class ExportStrategy extends AdaptableStrategyBase implements IExportStrategy {
    private ExportState;
    private CurrentLiveReports;
    private isSendingData;
    private workAroundOpenfinExcelDataDimension;
    private throttledRecomputeAndSendLiveExcelEvent;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    private sendNewDataToLiveExcel;
    Export(ReportName: string, exportDestination: ExportDestination, folder?: string, page?: string): void;
    private convertReporttoCsv;
    private copyToClipboard;
    private createCSVContent;
    private createTabularContent;
    private ConvertReporttoArray;
    private getReport;
    protected InitState(): void;
}
