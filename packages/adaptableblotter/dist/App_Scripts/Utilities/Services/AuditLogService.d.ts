import { IAdaptableBlotterOptions } from "../Interface/BlotterOptions/IAdaptableBlotterOptions";
import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { IDataChangedInfo } from "../../Api/Interface/IDataChangedInfo";
export declare class AuditLogService {
    private blotter;
    private auditLogQueue;
    private canSendLog;
    private numberOfMissedPing;
    private blotterOptions;
    IsAuditEnabled: boolean;
    IsAuditStateChangesEnabled: boolean;
    IsAuditCellEditsEnabled: boolean;
    IsAuditFunctionEventsEnabled: boolean;
    IsAuditUserStateChangesEnabled: boolean;
    IsAuditInternalStateChangesEnabled: boolean;
    constructor(blotter: IAdaptableBlotter, blotterOptions: IAdaptableBlotterOptions);
    private setUpFlags;
    AddEditCellAuditLogBatch(dataChangedEvents: IDataChangedInfo[]): void;
    AddEditCellAuditLog(dataChangedEvent: IDataChangedInfo): void;
    AddStateChangeAuditLog(stateChanges: any, actionType: string): void;
    AddAdaptableBlotterFunctionLog(functionName: string, action: string, info: string, data?: any): void;
    private ping;
    private SetCanSendLog;
    private flushAuditQueue;
    private convertToText;
}
