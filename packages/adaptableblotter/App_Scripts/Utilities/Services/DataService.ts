import { EventDispatcher } from "../EventDispatcher";
import { IDataService, ChangeDirection } from "./Interface/IDataService";
import { IAdaptableBlotter } from "../../Api/Interface/IAdaptableBlotter";
import { IDataChangedInfo } from "../../Api/Interface/IDataChangedInfo";
import { IEvent } from "../Interface/IEvent";

// Used to be the Audit Service - now much reduced
// Doesnt store any data (other than for flashing cell) - simply responsible for publishing DataChanged Events

export class DataService implements IDataService {

    private _columnValueList: Map<string, Map<any, number>>;

    constructor(private blotter: IAdaptableBlotter) {
        // create the _columnValueList - will be empty - used currrently only for flashing cell
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

    public GetPreviousColumnValue(columnId: string, identifierValue: any, newValue: number, changeDirection: ChangeDirection): number {
        let columnValueList: Map<any, number> = this.getCellValuesForColumn(columnId);

        let oldValue: number = columnValueList.get(identifierValue);
        // this horrible code is for dealing with ag-Grid because it comes in twice for Flashing Cell and we only want to return (and save!) a value if its the correct direction
        if (oldValue) {
            switch (changeDirection) {
                case ChangeDirection.Up:
                    if (oldValue >= newValue) {
                        return null;
                    }
                    break;
                case ChangeDirection.Down:
                    if (oldValue <= newValue) {
                        return null;
                    }
                    break;
                case ChangeDirection.Ignore:
                    // do nothing
                    break;
            }
        }
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