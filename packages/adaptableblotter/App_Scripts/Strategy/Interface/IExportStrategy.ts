import { IStrategy } from './IStrategy';
import { ExportDestination } from '../../Utilities/Enums';
import { IReport } from '../../Utilities/Interface/BlotterObjects/IReport';

export interface IExportStrategy extends IStrategy {
  Export(
    report: IReport,
    exportDestination: ExportDestination,
    folder?: string,
    page?: string
  ): void;

  scheduleReports(): void;
}
