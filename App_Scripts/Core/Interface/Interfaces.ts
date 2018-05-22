import { IStrategy } from '../../Strategy/Interface/IStrategy'
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
import { IEvent } from './IEvent'
import { ICalendarService } from '../Services/Interface/ICalendarService'
import { IAuditService } from '../Services/Interface/IAuditService'
import { IValidationService } from '../Services/Interface/IValidationService'
import { IPPStyle } from '../../Strategy/Interface/IExportStrategy'
import { AuditLogService } from '../Services/AuditLogService'
import { ICalculatedColumnExpressionService } from "../Services/Interface/ICalculatedColumnExpressionService";
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';


export interface ISelectedCells {
    //map of UUID with their associated values/columns
    Selection: Map<any, { columnID: string, value: any }[]>
}

export interface IAdaptableStrategyCollection extends Map<string, IStrategy> {
}



export interface IEntitlement {
    FunctionName: string;
    AccessLevel: "ReadOnly" | "Hidden" | "Default";
}

export interface IPermittedColumnValues {
    ColumnId: string;
    PermittedValues: any[]
}


export interface ICellInfo {
    Id: any;
    ColumnId: string;
    Value: any;
}

