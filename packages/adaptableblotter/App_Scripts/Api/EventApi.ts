import { ApiBase } from './ApiBase';
import { IEvent } from '../Utilities/Interface/IEvent';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { EventDispatcher } from '../Utilities/EventDispatcher';
import { SearchChangedEventArgs } from './Events/SearchChanged/SearchChangedEventArgs';
import {
  ThemeChangedEventArgs,
  AlertFiredEventArgs,
  ColumnStateChangedEventArgs,
  ActionColumnClickedEventArgs,
  SelectionChangedEventArgs,
} from './Events/BlotterEvents';
import { IEventApi } from './Interface/IEventApi';
import LoggingHelper from '../Utilities/Helpers/LoggingHelper';

export class EventApi extends ApiBase implements IEventApi {
  public _onSearchChanged: EventDispatcher<IAdaptableBlotter, SearchChangedEventArgs>;
  public _onThemeChanged: EventDispatcher<IAdaptableBlotter, ThemeChangedEventArgs>;
  public _onColumnStateChanged: EventDispatcher<IAdaptableBlotter, ColumnStateChangedEventArgs>;
  public _onAlertFired: EventDispatcher<IAdaptableBlotter, AlertFiredEventArgs>;
  public _onActionColumnClicked: EventDispatcher<IAdaptableBlotter, ActionColumnClickedEventArgs>;
  public _onSelectionChanged: EventDispatcher<IAdaptableBlotter, SelectionChangedEventArgs>;

  constructor(blotter: IAdaptableBlotter) {
    super(blotter);

    this._onSearchChanged = new EventDispatcher<IAdaptableBlotter, SearchChangedEventArgs>();
    this._onThemeChanged = new EventDispatcher<IAdaptableBlotter, ThemeChangedEventArgs>();
    this._onColumnStateChanged = new EventDispatcher<
      IAdaptableBlotter,
      ColumnStateChangedEventArgs
    >();
    this._onAlertFired = new EventDispatcher<IAdaptableBlotter, AlertFiredEventArgs>();
    this._onActionColumnClicked = new EventDispatcher<
      IAdaptableBlotter,
      ActionColumnClickedEventArgs
    >();
    this._onSelectionChanged = new EventDispatcher<IAdaptableBlotter, SelectionChangedEventArgs>();
  }

  public onSearchChanged(): IEvent<IAdaptableBlotter, SearchChangedEventArgs> {
    LoggingHelper.LogAdaptableBlotterWarning(
      'The onSearchChanged event in the Event API is deprecated - please use the On("SearchChanged") event instead.'
    );
    return this._onSearchChanged;
  }

  public onThemeChanged(): IEvent<IAdaptableBlotter, ThemeChangedEventArgs> {
    LoggingHelper.LogAdaptableBlotterWarning(
      'The onThemeChanged event in the Event API is deprecated - please use the On("ThemeChanged") event instead.'
    );
    return this._onThemeChanged;
  }

  public onColumnStateChanged(): IEvent<IAdaptableBlotter, ColumnStateChangedEventArgs> {
    LoggingHelper.LogAdaptableBlotterWarning(
      'The onColumnStateChanged event in the Event API is deprecated - please use the On("ColumnStateChanged") event instead.'
    );
    return this._onColumnStateChanged;
  }

  public onAlertFired(): IEvent<IAdaptableBlotter, AlertFiredEventArgs> {
    LoggingHelper.LogAdaptableBlotterWarning(
      'The onAlertFired event in the Event API is deprecated - please use the On("AlertFired") event instead.'
    );
    return this._onAlertFired;
  }

  public onActionColumnClicked(): IEvent<IAdaptableBlotter, ActionColumnClickedEventArgs> {
    LoggingHelper.LogAdaptableBlotterWarning(
      'The onActionColumnClicked event in the Event API is deprecated - please use the On("ActionColumnClicked") event instead.'
    );
    return this._onActionColumnClicked;
  }
  public onSelectionChanged(): IEvent<IAdaptableBlotter, SelectionChangedEventArgs> {
    LoggingHelper.LogAdaptableBlotterWarning(
      'The onSelectionChanged event in the Event API is deprecated - please use the On("SelectionChanged") event instead.'
    );
    return this._onSelectionChanged;
  }
}
