import { EventDispatcher } from "../EventDispatcher";
import { IEvent } from "../../Api/Interface/IEvent";
import { IDataService } from "./Interface/IDataService";
import { IAdaptableBlotter } from "../../Api/Interface/IAdaptableBlotter";
import { IDataChangedInfo } from "../../Api/Interface/IDataChangedInfo";


export class DataService implements IDataService {

    private _columnValueList: Map<string, Map<any, number>>;


    constructor(private blotter: IAdaptableBlotter) {
        // create the _columnValueList - will be empty - used primarily for flashing cell
        this._columnValueList = new Map();

    }

    public CreateDataChangedEvent(dataChangedInfo: IDataChangedInfo): void {
        if (dataChangedInfo.NewValue != dataChangedInfo.OldValue) {
            this._onDataSourceChanged.Dispatch(this, dataChangedInfo);
        }
    }


    private _onDataSourceChanged: EventDispatcher<IDataService, IDataChangedInfo> = new EventDispatcher<IDataService, IDataChangedInfo>();

    OnDataSourceChanged(): IEvent<IDataService, IDataChangedInfo> {
        return this._onDataSourceChanged;
    }




    private clearFlashingCellMap(): void {
        this._columnValueList.clear();
    }

    public GetPreviousColumnValue(columnId: string, identifierValue: any, newValue: number): number {
        let columnValueList: Map<any, number> = this.getCellValuesForColumn(columnId);

        let oldValue: number = columnValueList.get(identifierValue);
        columnValueList.set(identifierValue, newValue);
        return (oldValue) ? oldValue : newValue;
    }

    private getCellValuesForColumn(columnId: string): Map<any, number> {
        // first check the list exists; if not, then create it
        if (this._columnValueList.size == 0) {
            this._columnValueList.set(columnId, new Map())
        }
        // get the item
        let returnList: Map<any, number> = this._columnValueList.get(columnId);
        //in case we created a new calculated column  - need to worry about this?
        if (!returnList) {
            returnList = new Map()
            this._columnValueList.set(columnId, returnList)
        }
        return returnList;
    }



}