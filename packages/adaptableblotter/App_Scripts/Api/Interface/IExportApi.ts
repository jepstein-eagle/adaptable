import { IReport } from "../../Utilities/Interface/BlotterObjects/IReport";
import { ILiveReport } from "../../Utilities/Interface/Reports/ILiveReport";
import { ExportDestination } from "../../Utilities/Enums";
import { ExportState } from "../../Redux/ActionsReducers/Interface/IState";

export interface IExportApi {
  getExportState(): ExportState;
  getCurrentReport(): string;
  getAllReports(): IReport[];
  sendReport(reportName: string, destination: ExportDestination): void;
}
