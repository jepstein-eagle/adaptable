import { Report } from '../../../PredefinedConfig/ExportState';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { ExportDestination } from '../../../PredefinedConfig/Common/Enums';
import { IStrategyActionReturn } from '../../../Strategy/Interface/IStrategyActionReturn';

export interface IReportService {
  IsSystemReport(Report: Report): boolean;

  GetReportColumnsDescription(report: Report, cols: AdaptableColumn[]): string;

  GetReportExpressionDescription(Report: Report, cols: AdaptableColumn[]): string;

  IsReportDestinationActive(exportDestination: ExportDestination): boolean;

  ConvertReportToArray(report: Report): IStrategyActionReturn<any[]>;

  GetPrimaryKeysForReport(report: Report): any[];

  PublishLiveLiveDataChangedEvent(
    reportDestination: 'OpenfinExcel' | 'iPushPull' | 'Glue42',
    liveDataChangedTrigger:
      | 'Connected'
      | 'Disconnected'
      | 'LiveDataStarted'
      | 'LiveDataStopped'
      | 'LiveDataUpdated',
    liveReport?: any
  ): void;

  IsReportLiveReport(report: Report, exportDestination: ExportDestination): boolean;
}
