import { ApiBase } from "./ApiBase";
import { IEvent } from '../Utilities/Interface/IEvent';
import { IAdaptableBlotter } from './Interface/IAdaptableBlotter';
import { ISearchChangedEventArgs, IStateChangedEventArgs, IColumnStateChangedEventArgs } from './Interface/IStateEvents';
import { IEventApi } from "./Interface/IEventApi";



export class EventApi extends ApiBase implements IEventApi {

  public onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs> {
    return this.blotter.SearchedChanged;
  }

  public onStateChanged(): IEvent<IAdaptableBlotter, IStateChangedEventArgs> {
    return this.blotter.StateChanged;
  }

  public onColumnStateChanged(): IEvent<IAdaptableBlotter, IColumnStateChangedEventArgs> {
    return this.blotter.ColumnStateChanged;
  }

}