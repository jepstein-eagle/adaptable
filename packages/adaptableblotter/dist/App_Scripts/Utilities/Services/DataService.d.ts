import { IDataService, ChangeDirection } from "./Interface/IDataService";
import { IAdaptableBlotter } from "../Interface/IAdaptableBlotter";
import { IDataChangedInfo } from "../../Api/Interface/IDataChangedInfo";
import { IEvent } from "../Interface/IEvent";
export declare class DataService implements IDataService {
    private blotter;
    private _columnValueList;
    constructor(blotter: IAdaptableBlotter);
    CreateDataChangedEvent(dataChangedInfo: IDataChangedInfo): void;
    private _onDataSourceChanged;
    OnDataSourceChanged(): IEvent<IDataService, IDataChangedInfo>;
    GetPreviousColumnValue(columnId: string, identifierValue: any, newValue: number, changeDirection: ChangeDirection): number;
    private getCellValuesForColumn;
}
