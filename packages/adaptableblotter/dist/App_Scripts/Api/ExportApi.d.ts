import { ApiBase } from "./ApiBase";
import { IReport } from "../Utilities/Interface/BlotterObjects/IReport";
import { ILiveReport } from "../Utilities/Interface/Reports/ILiveReport";
import { ExportDestination } from "../Utilities/Enums";
import { IExportApi } from './Interface/IExportApi';
import { ExportState } from '../Redux/ActionsReducers/Interface/IState';
export declare class ExportApi extends ApiBase implements IExportApi {
    GetState(): ExportState;
    GetCurrent(): string;
    GetAllReports(): IReport[];
    GetAllLiveReports(): ILiveReport[];
    SendReport(reportName: string, destination: ExportDestination): void;
}
