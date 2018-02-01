
import { IAuditService, IDataChangedEvent, IDataChangingEvent, IDataChangedInfo } from './Interface/IAuditService';
import { IEvent } from '../Interface/IEvent';
import { IAdaptableBlotter, IColumn } from '../Interface/IAdaptableBlotter';
import { EventDispatcher } from '../EventDispatcher'
import {  DataType, CellValidationMode, LeafExpressionOperator, SortOrder } from '../Enums';
import { CellValidationState } from '../../Redux/ActionsReducers/Interface/IState';
import { IRangeExpression } from '../Interface/IExpression';
import { ExpressionHelper } from '../Helpers/ExpressionHelper'
import { Helper } from '../Helpers/Helper'
import { ICellValidationRule } from '../../Strategy/Interface/ICellValidationStrategy';
import * as StrategyIds from '../StrategyIds'
import { StringExtensions } from '../../Core/Extensions';

/*
For now this is a very rough and ready Audit Service which will recieve notifications of changes in data - either via an event fired in the blotter or through other strategies.
This means that we are able to work out old and new values - though for the first pass its a bit brittle as we look at _pristineData via a method in the Blotter...
*/
export class AuditService implements IAuditService {
    private _columnDataValueList: Map<string, Map<any, IDataChangedInfo>>;

    constructor(private blotter: IAdaptableBlotter) {
        this._columnDataValueList = new Map();
    }

    //This is a bad idea as it duplicates all data but in the end that what getdirtyvalue was doing....
    //just need to refactor the whole lot. For now it's called only from aggrid and kendo
    Init(initialData: any): void {
        let colummns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        for (let record of initialData) {
            for (let prop in record) {
                if (record.hasOwnProperty(prop) && colummns.find(x=>x.ColumnId == prop)) {
                    let primaryKey = record[this.blotter.BlotterOptions.primaryKey]
                    var dataChangedEvent: IDataChangedEvent = { OldValue: null, NewValue: record[prop], ColumnId: prop, IdentifierValue: primaryKey, Timestamp: Date.now(), Record: record };
                    this.InitAddDataValuesToList(dataChangedEvent);
                }
            }
        }
    }

    //slightly optimized version of the AddDataValuesToList so we don't check for data already present
    private InitAddDataValuesToList(dataChangedEvent: IDataChangedEvent) {
       let myList = this.getDataEventsForColumn(dataChangedEvent.ColumnId);
let datechangedInfo: IDataChangedInfo = { OldValue: dataChangedEvent.OldValue, NewValue: dataChangedEvent.NewValue, Timestamp: dataChangedEvent.Timestamp };
        myList.set(dataChangedEvent.IdentifierValue, datechangedInfo)
    }


    public CreateAuditEvent(identifierValue: any, newValue: any, columnId: string, record: any): void {
        var dataChangedEvent: IDataChangedEvent = { OldValue: null, NewValue: newValue, ColumnId: columnId, IdentifierValue: identifierValue, Timestamp: Date.now(), Record: record };
        this.AddDataValuesToList(dataChangedEvent);
        if (dataChangedEvent.NewValue != dataChangedEvent.OldValue) {
            this._onDataSourceChanged.Dispatch(this, dataChangedEvent);
        }
    }

    private AddDataValuesToList(dataChangedEvent: IDataChangedEvent) {
        // add it to the list if not exist for that row - at the moment there is not maximum and no streaming...
        let myList = this.getDataEventsForColumn(dataChangedEvent.ColumnId);

        let localdatachangedInfo = myList.get(dataChangedEvent.IdentifierValue);
        if (localdatachangedInfo) {
            dataChangedEvent.OldValue = localdatachangedInfo.NewValue;
            localdatachangedInfo.OldValue = dataChangedEvent.OldValue
            localdatachangedInfo.NewValue = dataChangedEvent.NewValue
            localdatachangedInfo.Timestamp = dataChangedEvent.Timestamp
        }
        else { 
            let datechangedInfo: IDataChangedInfo = { OldValue: dataChangedEvent.OldValue, NewValue: dataChangedEvent.NewValue, Timestamp: dataChangedEvent.Timestamp };
            myList.set(dataChangedEvent.IdentifierValue, datechangedInfo)
        }
    }

    public getExistingDataValue(dataChangingEvent: IDataChangingEvent): any {
        let myList = this.getDataEventsForColumn(dataChangingEvent.ColumnId);
        let localdatachangedInfo = myList.get(dataChangingEvent.IdentifierValue);
        if (localdatachangedInfo) {
            return localdatachangedInfo.NewValue;
        }
        return null
    }

    private getDataEventsForColumn(columnId: string): Map<any, IDataChangedInfo> {
       
       // first check the list exists
        if (this._columnDataValueList.size == 0) {
            let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            columns.forEach(c => {
                this._columnDataValueList.set(c.ColumnId, new Map())
            })
        }
        // get the item
        let myList: Map<any, IDataChangedInfo> = this._columnDataValueList.get(columnId);
        //in case we created a new calculated column
        if (!myList) {
            myList = new Map()
            this._columnDataValueList.set(columnId, myList)
        }
        return myList;
    }
    private _onDataSourceChanged: EventDispatcher<IAuditService, IDataChangedEvent> = new EventDispatcher<IAuditService, IDataChangedEvent>();

    OnDataSourceChanged(): IEvent<IAuditService, IDataChangedEvent> {
        return this._onDataSourceChanged;
    }
}