
import { IAuditService, IDataChangedEvent, IColumnDataValueList, ICellDataValueList, IDataChangedInfo } from './Interface/IAuditService';
import { IEvent } from '../Interface/IEvent';
import { IAdaptableBlotter } from '../Interface/IAdaptableBlotter';
import { EventDispatcher } from '../EventDispatcher'


/*
For now this is a very rough and ready Audit Service which will recieve notifications of changes in data - either via an event fired in the blotter or through other strategies.
This means that we are able to work out old and new values - though for the first pass its a bit brittle as we look at _pristineData via a method in the Blotter...
*/
export class AuditService implements IAuditService {

    private _columnDataValueList: IColumnDataValueList[];

    constructor(private blotter: IAdaptableBlotter) {

        this._columnDataValueList = [];
    }

    public CreateAuditEvent(identifierValue: any, newValue: any, columnName: string, forceDispatch?: boolean): void {
        var dataChangedEvent: IDataChangedEvent = { OldValue: null, NewValue: newValue, ColumnName: columnName, IdentifierValue: identifierValue, Timestamp: Date.now() };
        this.AddDataValuesToList(dataChangedEvent);
        // not sure why this is being called twice but we can prevent duplicate identical events at least
        if (dataChangedEvent.NewValue != dataChangedEvent.OldValue || forceDispatch) {
            this._onDataSourceChanged.Dispatch(this, dataChangedEvent);
        }
    }


    private AddDataValuesToList(dataChangedEvent: IDataChangedEvent) {
        if (this._columnDataValueList.length == 0) {

            let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            columns.forEach(c => {
                this._columnDataValueList.push({ ColumnName: c.ColumnId, CellDataValueList: [] })
            })
        }

        // add it to the list if not exist for that row - at the moment there is not maximum and no streaming...
        let columnName = dataChangedEvent.ColumnName;
        let myList = this._columnDataValueList.find(c => c.ColumnName == columnName);
        let cellDataValueList: ICellDataValueList = myList.CellDataValueList.find(d => d.IdentifierValue == dataChangedEvent.IdentifierValue);
        if (cellDataValueList != null) {
            dataChangedEvent.OldValue = cellDataValueList.DataChangedInfos[cellDataValueList.DataChangedInfos.length-1].NewValue;
            let datachangedInfo: IDataChangedInfo = { OldValue: dataChangedEvent.OldValue, NewValue: dataChangedEvent.NewValue, Timestamp: dataChangedEvent.Timestamp };
            cellDataValueList.DataChangedInfos.push(datachangedInfo);
        }
        else { // this is the first time we have updated this cell so lets see if we can at least try to get the value from the grid...
            dataChangedEvent.OldValue = this.blotter.GetDirtyValueForColumnFromDataSource(dataChangedEvent.ColumnName, dataChangedEvent.IdentifierValue);;
            let datechangedInfo: IDataChangedInfo = { OldValue: dataChangedEvent.OldValue, NewValue: dataChangedEvent.NewValue, Timestamp: dataChangedEvent.Timestamp };
            cellDataValueList = { IdentifierValue: dataChangedEvent.IdentifierValue, DataChangedInfos:  [datechangedInfo]}
            myList.CellDataValueList.push( cellDataValueList);
        }
    }

    private _onDataSourceChanged: EventDispatcher<IAuditService, IDataChangedEvent> = new EventDispatcher<IAuditService, IDataChangedEvent>();

    OnDataSourceChanged(): IEvent<IAuditService, IDataChangedEvent> {
        return this._onDataSourceChanged;
    }



}
