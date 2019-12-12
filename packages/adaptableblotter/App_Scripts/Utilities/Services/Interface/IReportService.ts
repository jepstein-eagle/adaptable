import { Report } from '../../../PredefinedConfig/ExportState';
import { AdaptableBlotterColumn } from '../../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { ExportDestination } from '../../../PredefinedConfig/Common/Enums';
import { IAdaptableBlotter } from '../../../types';
import { IStrategyActionReturn } from '../../../Strategy/Interface/IStrategyActionReturn';

export interface IReportService {
  IsSystemReport(Report: Report): boolean;

  GetReportColumnsDescription(report: Report, cols: AdaptableBlotterColumn[]): string;

  GetReportExpressionDescription(Report: Report, cols: AdaptableBlotterColumn[]): string;

  IsReportDestinationActive(exportDestination: ExportDestination): boolean;

  ConvertReportToArray(report: Report): IStrategyActionReturn<any[]>;

  GetPrimaryKeysForReport(report: Report): any[];
}
