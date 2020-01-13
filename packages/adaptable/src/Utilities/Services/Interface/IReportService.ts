import { Report } from '../../../PredefinedConfig/ExportState';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { ExportDestination, LiveReportTrigger } from '../../../PredefinedConfig/Common/Enums';
import { IStrategyActionReturn } from '../../../Strategy/Interface/IStrategyActionReturn';

export interface IReportService {
  IsSystemReport(Report: Report): boolean;

  GetReportColumnsDescription(report: Report, cols: AdaptableColumn[]): string;

  GetReportExpressionDescription(Report: Report, cols: AdaptableColumn[]): string;

  IsReportDestinationActive(exportDestination: ExportDestination): boolean;

  ConvertReportToArray(report: Report): IStrategyActionReturn<any[]>;

  GetPrimaryKeysForReport(report: Report): any[];

  PublishLiveReportUpdatedEvent(
    reportDestination: 'OpenfinExcel' | 'iPushPull' | 'Glue42',
    liveReportTrigger: LiveReportTrigger
  ): void;

  IsReportLiveReport(report: Report, exportDestination: ExportDestination): boolean;
}
