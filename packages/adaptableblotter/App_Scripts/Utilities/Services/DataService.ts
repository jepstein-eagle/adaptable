import { EventDispatcher } from '../EventDispatcher';
import { IDataService, ChangeDirection } from './Interface/IDataService';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import { DataChangedInfo } from '../../BlotterOptions/CommonObjects/DataChangedInfo';
import { IEvent } from '../Interface/IEvent';
import ArrayExtensions from '../Extensions/ArrayExtensions';

// Used to be the Audit Service - now much reduced
// Doesnt store any data (other than for flashing cell) - simply responsible for publishing DataChanged Events

export class DataService implements IDataService {
  private _columnValueList: Map<string, Map<any, number>>;

  constructor(private blotter: IAdaptableBlotter) {
    this.blotter = blotter;
    // create the _columnValueList - will be empty - used currrently only for flashing cell
    this._columnValueList = new Map();
  }

  public CreateDataChangedEvent(dataChangedInfo: DataChangedInfo): void {
    //console.log(dataChangedInfo.ColumnId);
    if (dataChangedInfo.NewValue != dataChangedInfo.OldValue) {
      this._onDataSourceChanged.Dispatch(this, dataChangedInfo);
    }
  }

  private _onDataSourceChanged: EventDispatcher<
    IDataService,
    DataChangedInfo
  > = new EventDispatcher<IDataService, DataChangedInfo>();

  OnDataSourceChanged(): IEvent<IDataService, DataChangedInfo> {
    return this._onDataSourceChanged;
  }

  public GetPreviousColumnValue(
    columnId: string,
    identifierValue: any,
    newValue: number,
    changeDirection: ChangeDirection
  ): number {
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
        case ChangeDirection.Neutral:
          // do nothing
          break;
      }
    }
    if (oldValue == newValue) {
      return null;
    }

    columnValueList.set(identifierValue, newValue);
    if (oldValue != null) {
      return oldValue;
    } else {
      return newValue;
    }
  }

  private getCellValuesForColumn(columnId: string): Map<any, number> {
    // first check the list exists; if not, then create it
    if (this._columnValueList.size == 0) {
      this._columnValueList.set(columnId, new Map());
    }
    // get the item
    let returnList: Map<any, number> = this._columnValueList.get(columnId);
    //in case we created a new calculated column  - need to worry about this?
    if (!returnList) {
      returnList = new Map();
      this._columnValueList.set(columnId, returnList);
    }
    return returnList;
  }
}
