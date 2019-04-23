import { IReport } from "../../Utilities/Interface/BlotterObjects/IReport";
import { ILiveReport } from "../../Utilities/Interface/Reports/ILiveReport";
import { ExportDestination } from "../../Utilities/Enums";
import { ExportState } from "../../Redux/ActionsReducers/Interface/IState";

export interface IExportApi {
  GetState(): ExportState;
   GetCurrent(): string;
  GetAllReports(): IReport[];
  GetAllLiveReports(): ILiveReport[];
  SendReport(reportName: string, destination: ExportDestination): void;
 // ExportReport(adaptableExport: IAdaptableExport): void;
}
