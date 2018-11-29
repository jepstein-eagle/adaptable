import { IAuditService, IDataChangedEvent, IDataChangingEvent } from "./Interface/IAuditService";
import { IAdaptableBlotter } from "../../api/Interface/IAdaptableBlotter";
import { IEvent } from "../../api/Interface/IEvent";
export declare class AuditService implements IAuditService {
    private blotter;
    private _columnDataValueList;
    constructor(blotter: IAdaptableBlotter);
    Init(initialData: any): void;
    private InitAddDataValuesToList;
    CreateAuditChangedEvent(dataChangedEvent: IDataChangedEvent): void;
    CreateAuditEvent(identifierValue: any, newValue: any, columnId: string, record: any): void;
    private AddDataValuesToList;
    getExistingDataValue(dataChangingEvent: IDataChangingEvent): any;
    private getDataEventsForColumn;
    private _onDataSourceChanged;
    OnDataSourceChanged(): IEvent<IAuditService, IDataChangedEvent>;
}
