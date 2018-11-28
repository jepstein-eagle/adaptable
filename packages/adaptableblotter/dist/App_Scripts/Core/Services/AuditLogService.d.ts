import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { IDataChangedEvent } from './Interface/IAuditService';
import { IAdaptableBlotterOptions } from '../../Api/Interface/IAdaptableBlotterOptions';
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
