import { IEvent } from "../../Api/Interface/IEvent";
import { IDataService } from "./Interface/IDataService";
import { IAdaptableBlotter } from "../../Api/Interface/IAdaptableBlotter";
import { IDataChangedInfo } from "../../Api/Interface/IDataChangedInfo";
export declare class DataService implements IDataService {
    private blotter;
    constructor(blotter: IAdaptableBlotter);
    CreateDataSourcedChangedEvent(dataChangedEvent: IDataChangedInfo): void;
    CreateDataEvent(identifierValue: any, newValue: any, columnId: string, record: any): void;
    private _onDataSourceChanged;
    OnDataSourceChanged(): IEvent<IDataService, IDataChangedInfo>;
}
