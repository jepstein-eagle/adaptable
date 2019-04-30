import { ApiBase } from "./ApiBase";
import { IReport } from "../Utilities/Interface/BlotterObjects/IReport";
import { ExportDestination } from "../Utilities/Enums";
import { IExportApi } from './Interface/IExportApi';
import { ExportState } from '../Redux/ActionsReducers/Interface/IState';
export declare class ExportApi extends ApiBase implements IExportApi {
    getExportState(): ExportState;
    getCurrentReport(): string;
    getAllReports(): IReport[];
    sendReport(reportName: string, destination: ExportDestination): void;
}
