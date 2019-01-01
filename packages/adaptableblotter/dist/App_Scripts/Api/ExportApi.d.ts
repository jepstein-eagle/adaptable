import { ApiBase } from "./ApiBase";
import { IReport } from './Interface/IAdaptableBlotterObjects';
import { ILiveReport } from '../Strategy/Interface/IExportStrategy';
import { ExportDestination } from "../Utilities/Enums";
export interface IExportApi {
    GetAllReports(): IReport[];
    GetAllLiveReports(): ILiveReport[];
    SendReport(reportName: string, destination: ExportDestination): void;
}
export declare class ExportApi extends ApiBase implements IExportApi {
    GetAllReports(): IReport[];
    GetAllLiveReports(): ILiveReport[];
    SendReport(reportName: string, destination: ExportDestination): void;
}
