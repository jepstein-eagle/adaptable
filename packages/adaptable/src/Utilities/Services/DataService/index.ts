import { IDataService, ChangeDirection } from './../Interface/IDataService';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import { DataChangedInfo } from '../../../PredefinedConfig/Common/DataChangedInfo';
import Emitter, { EmitterCallback } from '../../../Utilities/Emitter';

// Used to be the Audit Service - now much reduced
// Doesnt store any data (other than for flashing cell) - simply responsible for publishing DataChanged Events

/**
 * has it changed or not over a point/period of time?
 * how many times has changed?
 *
 * alertOptions: {
 *    historicAlerts?: {
 *      columns!: true//, [] | (eachColumn) => true/false,
 *      cacheDuration? (in minutes): 10*60,
 *      clearAt? (defaults to midnight): () =>
 *    }
 * }
 *
 */

export class DataService implements IDataService {
  private _columnValueList: Map<string, Map<any, number>>;
  private emitter: Emitter;

  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
    // create the _columnValueList - will be empty - used currrently only for flashing cell
    this._columnValueList = new Map();

    this.emitter = new Emitter();

    // adaptable.api.alertApi.getAlertState();
  }

  on = (eventName: string, callback: EmitterCallback): (() => void) =>
    this.emitter.on(eventName, callback);

  public emit = (eventName: string, data?: any): Promise<any> => this.emitter.emit(eventName, data);

  public CreateDataChangedEvent(dataChangedInfo: DataChangedInfo): void {
    if (dataChangedInfo.NewValue != dataChangedInfo.OldValue) {
      this.emitter.emit('DataChanged', dataChangedInfo);
    }
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
