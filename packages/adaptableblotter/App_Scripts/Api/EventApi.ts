import { ApiBase } from './ApiBase';
import { IEvent } from '../Utilities/Interface/IEvent';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { EventDispatcher } from '../Utilities/EventDispatcher';
import { SearchChangedEventArgs } from './Events/SearchChanged/SearchChangedEventArgs';
import {
  ThemeChangedEventArgs,
  AlertFiredEventArgs,
  ColumnStateChangedEventArgs,
} from './Events/BlotterEvents';
import { IEventApi } from './Interface/IEventApi';

export class EventApi extends ApiBase implements IEventApi {
  public _onSearchedChanged: EventDispatcher<IAdaptableBlotter, SearchChangedEventArgs>;

  public _onThemeChanged: EventDispatcher<IAdaptableBlotter, ThemeChangedEventArgs>;

  public _onColumnStateChanged: EventDispatcher<IAdaptableBlotter, ColumnStateChangedEventArgs>;

  public _onAlertFired: EventDispatcher<IAdaptableBlotter, AlertFiredEventArgs>;

  constructor(blotter: IAdaptableBlotter) {
    super(blotter);

    this._onSearchedChanged = new EventDispatcher<IAdaptableBlotter, SearchChangedEventArgs>();
    this._onThemeChanged = new EventDispatcher<IAdaptableBlotter, ThemeChangedEventArgs>();
    this._onColumnStateChanged = new EventDispatcher<
      IAdaptableBlotter,
      ColumnStateChangedEventArgs
    >();
    this._onAlertFired = new EventDispatcher<IAdaptableBlotter, AlertFiredEventArgs>();
  }

  public onSearchedChanged(): IEvent<IAdaptableBlotter, SearchChangedEventArgs> {
    return this._onSearchedChanged;
  }

  public onThemeChanged(): IEvent<IAdaptableBlotter, ThemeChangedEventArgs> {
    return this._onThemeChanged;
  }

  public onColumnStateChanged(): IEvent<IAdaptableBlotter, ColumnStateChangedEventArgs> {
    return this._onColumnStateChanged;
  }

  public onAlertFired(): IEvent<IAdaptableBlotter, AlertFiredEventArgs> {
    return this._onAlertFired;
  }
}
