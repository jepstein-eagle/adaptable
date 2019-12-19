import { Report } from '../../../PredefinedConfig/ExportState';
import { AdaptableBlotterColumn } from '../../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { ExportDestination, LiveReportTrigger } from '../../../PredefinedConfig/Common/Enums';
import { IStrategyActionReturn } from '../../../Strategy/Interface/IStrategyActionReturn';

export interface IReportService {
  IsSystemReport(Report: Report): boolean;

  GetReportColumnsDescription(report: Report, cols: AdaptableBlotterColumn[]): string;

  GetReportExpressionDescription(Report: Report, cols: AdaptableBlotterColumn[]): string;

  IsReportDestinationActive(exportDestination: ExportDestination): boolean;

  ConvertReportToArray(report: Report): IStrategyActionReturn<any[]>;

  GetPrimaryKeysForReport(report: Report): any[];

  PublishLiveReportUpdatedEvent(
    exportDestination:
      | ExportDestination.OpenfinExcel
      | ExportDestination.iPushPull
      | ExportDestination.Glue42,
    liveReportTrigger: LiveReportTrigger
  ): void;

  IsReportLiveReport(report: Report, exportDestination: ExportDestination): boolean;
}
