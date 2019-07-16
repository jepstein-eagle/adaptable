import { ApiBase } from './ApiBase';
import { IEvent } from '../Utilities/Interface/IEvent';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { EventDispatcher } from '../Utilities/EventDispatcher';
import { SearchChangedEventArgs } from './Events/SearchChanged/SearchChangedEventArgs';
import {
  ThemeChangedEventArgs,
  AlertFiredEventArgs,
  ColumnStateChangedEventArgs,
  ActionColumnEventArgs,
} from './Events/BlotterEvents';
import { IEventApi } from './Interface/IEventApi';

export class EventApi extends ApiBase implements IEventApi {
  public _onSearchChanged: EventDispatcher<IAdaptableBlotter, SearchChangedEventArgs>;

  public _onThemeChanged: EventDispatcher<IAdaptableBlotter, ThemeChangedEventArgs>;

  public _onColumnStateChanged: EventDispatcher<IAdaptableBlotter, ColumnStateChangedEventArgs>;

  public _onAlertFired: EventDispatcher<IAdaptableBlotter, AlertFiredEventArgs>;

  public _onActionColumnClicked: EventDispatcher<IAdaptableBlotter, ActionColumnEventArgs>;

  constructor(blotter: IAdaptableBlotter) {
    super(blotter);

    this._onSearchChanged = new EventDispatcher<IAdaptableBlotter, SearchChangedEventArgs>();
    this._onThemeChanged = new EventDispatcher<IAdaptableBlotter, ThemeChangedEventArgs>();
    this._onColumnStateChanged = new EventDispatcher<
      IAdaptableBlotter,
      ColumnStateChangedEventArgs
    >();
    this._onAlertFired = new EventDispatcher<IAdaptableBlotter, AlertFiredEventArgs>();
    this._onActionColumnClicked = new EventDispatcher<IAdaptableBlotter, ActionColumnEventArgs>();
  }

  public onSearchChanged(): IEvent<IAdaptableBlotter, SearchChangedEventArgs> {
    return this._onSearchChanged;
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

  public onActionColumnClicked(): IEvent<IAdaptableBlotter, ActionColumnEventArgs> {
    return this._onActionColumnClicked;
  }
}
