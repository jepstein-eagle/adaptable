import { EventDispatcher } from "../EventDispatcher";
import { IEvent } from "../../Api/Interface/IEvent";
import { IDataService } from "./Interface/IDataService";
import { IAdaptableBlotter } from "../../Api/Interface/IAdaptableBlotter";
import { IDataChangedInfo } from "../../Api/Interface/IDataChangedInfo";


export class DataService implements IDataService {
  
    constructor(private blotter: IAdaptableBlotter) {
    }

    public CreateDataSourcedChangedEvent(dataChangedEvent: IDataChangedInfo): void {
        if (dataChangedEvent.NewValue != dataChangedEvent.OldValue) {
            this._onDataSourceChanged.Dispatch(this, dataChangedEvent);
        }
    }

    public CreateDataEvent(identifierValue: any, newValue: any, columnId: string, record: any): void {
        var dataChangedEvent: IDataChangedInfo = { OldValue: null, NewValue: newValue, ColumnId: columnId, IdentifierValue: identifierValue, Timestamp: Date.now(), Record: record };
        this.CreateDataSourcedChangedEvent(dataChangedEvent);
    }

    private _onDataSourceChanged: EventDispatcher<IDataService, IDataChangedInfo> = new EventDispatcher<IDataService, IDataChangedInfo>();

    OnDataSourceChanged(): IEvent<IDataService, IDataChangedInfo> {
        return this._onDataSourceChanged;
    }
}