import { ApiBase } from "./ApiBase";
import { IReport } from '../Utilities/Interface/IAdaptableBlotterObjects';
import { ILiveReport } from '../Strategy/Interface/IExportStrategy';
import { ExportDestination } from "../Utilities/Enums";
import { IExportApi } from './Interface/IExportApi';
export declare class ExportApi extends ApiBase implements IExportApi {
    GetCurrent(): string;
    GetAllReports(): IReport[];
    GetAllLiveReports(): ILiveReport[];
    SendReport(reportName: string, destination: ExportDestination): void;
}
