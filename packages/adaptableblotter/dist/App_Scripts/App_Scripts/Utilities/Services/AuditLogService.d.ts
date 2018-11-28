import { IAdaptableBlotterOptions } from "../../Api/Interface/IAdaptableBlotterOptions";
import { IAdaptableBlotter } from "../../Core/Interface/IAdaptableBlotter";
import { IDataChangedEvent } from "./Interface/IAuditService";
export declare class AuditLogService {
    private blotter;
    private auditLogQueue;
    private canSendLog;
    private numberOfMissedPing;
    private blotterOptions;
    constructor(blotter: IAdaptableBlotter, blotterOptions: IAdaptableBlotterOptions);
    AddEditCellAuditLogBatch(dataChangedEvents: IDataChangedEvent[]): void;
    AddEditCellAuditLog(dataChangedEvent: IDataChangedEvent): void;
    AddStateChangeAuditLog(stateChanges: any, actionType: string): void;
    AddAdaptableBlotterFunctionLog(functionName: string, action: string, info: string, data?: any): void;
    private ping;
    private SetCanSendLog;
    private flushAuditQueue;
    private convertToText;
}
