import { IReport } from "../../Utilities/Interface/BlotterObjects/IReport";
import { ILiveReport } from "../../Utilities/Interface/Reports/ILiveReport";
import { ExportDestination } from "../../Utilities/Enums";
export interface IExportApi {
    GetCurrent(): string;
    GetAllReports(): IReport[];
    GetAllLiveReports(): ILiveReport[];
    SendReport(reportName: string, destination: ExportDestination): void;
}
