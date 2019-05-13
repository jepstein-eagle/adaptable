import { ApiBase } from './ApiBase';
import { IEvent } from '../Utilities/Interface/IEvent';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import {
  ISearchChangedEventArgs,
  IColumnStateChangedEventArgs,
  IThemeChangedEventArgs,
  IAlertFiredEventArgs,
} from '../Utilities/Interface/IStateEvents';
import { IStateChangedEventArgs } from '../Utilities/Interface/StateChanged/IStateChangedEventArgs';
import { IEventApi } from './Interface/IEventApi';
import { EventDispatcher } from '../Utilities/EventDispatcher';

export class EventApi extends ApiBase implements IEventApi {
  public _onSearchedChanged: EventDispatcher<IAdaptableBlotter, ISearchChangedEventArgs>;

  public _onThemeChanged: EventDispatcher<IAdaptableBlotter, IThemeChangedEventArgs>;

  public _onStateChanged: EventDispatcher<IAdaptableBlotter, IStateChangedEventArgs>;

  public _onColumnStateChanged: EventDispatcher<IAdaptableBlotter, IColumnStateChangedEventArgs>;

  public _onAlertFired: EventDispatcher<IAdaptableBlotter, IAlertFiredEventArgs>;

  constructor(blotter: IAdaptableBlotter) {
    super(blotter);

    this._onSearchedChanged = new EventDispatcher<IAdaptableBlotter, ISearchChangedEventArgs>();
    this._onStateChanged = new EventDispatcher<IAdaptableBlotter, IStateChangedEventArgs>();
    this._onThemeChanged = new EventDispatcher<IAdaptableBlotter, IThemeChangedEventArgs>();
    this._onColumnStateChanged = new EventDispatcher<
      IAdaptableBlotter,
      IColumnStateChangedEventArgs
    >();
    this._onAlertFired = new EventDispatcher<IAdaptableBlotter, IAlertFiredEventArgs>();
  }

  public onSearchedChanged(): IEvent<IAdaptableBlotter, ISearchChangedEventArgs> {
    return this._onSearchedChanged;
  }

  public onThemeChanged(): IEvent<IAdaptableBlotter, IThemeChangedEventArgs> {
    return this._onThemeChanged;
  }

  public onStateChanged(): IEvent<IAdaptableBlotter, IStateChangedEventArgs> {
    return this._onStateChanged;
  }

  public onColumnStateChanged(): IEvent<IAdaptableBlotter, IColumnStateChangedEventArgs> {
    return this._onColumnStateChanged;
  }

  public onAlertFired(): IEvent<IAdaptableBlotter, IAlertFiredEventArgs> {
    return this._onAlertFired;
  }
}
