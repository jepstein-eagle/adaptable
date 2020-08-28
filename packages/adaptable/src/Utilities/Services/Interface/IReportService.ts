import { Report } from '../../../PredefinedConfig/ExportState';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { ExportDestination } from '../../../PredefinedConfig/Common/Enums';
import { IStrategyActionReturn } from '../../../Strategy/Interface/IStrategyActionReturn';

export interface IReportService {
  IsSystemReport(report: Report): boolean;

  IsSystemReportActive(report: Report): boolean;

  GetReportColumnScopeShortDescription(report: Report): string;

  GetReportColumnScopeLongDescription(report: Report): string;

  GetReportExpressionDescription(Report: Report, cols: AdaptableColumn[]): string;

  IsReportDestinationActive(exportDestination: ExportDestination): boolean;

  ConvertReportToArray(report: Report): IStrategyActionReturn<any[]>;

  GetPrimaryKeysForReport(report: Report): any[];

  PublishLiveLiveDataChangedEvent(
    reportDestination: 'OpenFin' | 'ipushpull' | 'Glue42',
    liveDataChangedTrigger:
      | 'Connected'
      | 'Disconnected'
      | 'SnapshotSent'
      | 'LiveDataStarted'
      | 'LiveDataStopped'
      | 'LiveDataUpdated',
    liveReport?: any
  ): void;
}
