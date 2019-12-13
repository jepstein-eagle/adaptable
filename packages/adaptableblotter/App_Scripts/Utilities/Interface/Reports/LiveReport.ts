import { ExportDestination } from '../../../PredefinedConfig/Common/Enums';
import { Report } from '../../../PredefinedConfig/ExportState';

export interface LiveReport {
  PageName: string; // for Excel this will be the workbook name, for iPushpull the page name.  for Glue42?
  Report: Report;
  ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull;
}
