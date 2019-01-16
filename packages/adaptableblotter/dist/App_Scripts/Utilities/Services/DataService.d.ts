import { IEvent } from "../../Api/Interface/IEvent";
import { IDataService } from "./Interface/IDataService";
import { IAdaptableBlotter } from "../../Api/Interface/IAdaptableBlotter";
import { IDataChangedInfo } from "../../Api/Interface/IDataChangedInfo";
export declare class DataService implements IDataService {
    private blotter;
    private _columnValueList;
    constructor(blotter: IAdaptableBlotter);
    CreateDataChangedEvent(dataChangedInfo: IDataChangedInfo): void;
    private _onDataSourceChanged;
    OnDataSourceChanged(): IEvent<IDataService, IDataChangedInfo>;
    private clearFlashingCellMap;
    GetPreviousColumnValue(columnId: string, identifierValue: any, newValue: number): number;
    private getCellValuesForColumn;
}
