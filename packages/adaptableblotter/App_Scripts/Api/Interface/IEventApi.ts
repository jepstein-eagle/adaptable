import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import { EventDispatcher } from '../../Utilities/EventDispatcher';
import { SearchChangedEventArgs } from '../Events/SearchChanged/SearchChangedEventArgs';
import {
  ThemeChangedEventArgs,
  ColumnStateChangedEventArgs,
  AlertFiredEventArgs,
  ActionColumnClickedEventArgs,
  SelectionChangedEventArgs,
} from '../Events/BlotterEvents';
import { IEvent } from '../../Utilities/Interface/IEvent';

/**
 * The Adaptable Blotter publishes 5 events that users can subscribe to as required.
 *
 * Each event contains the Adaptable Blotter and an EventArgs object that contains relevant information for the event.
 *
 * The way to subscribe to the events is as follows:
 *
 * ```ts
 * adaptableblotter.api.eventApi
 *    .onActionColumnClicked()
 *    .Subscribe((sender, actionColumnEventArgs) =>
 *        onActionColumnClicked(actionColumnEventArgs)
 *  );
 * ```
 */
export interface IEventApi {
  /**
   * Event fired whenever search criteria in the Blotter changes, providing full coverage of what triggered the change and the current Search and Filter state.
   *
   * Used in association with server searching.
   *
   * @returns IEvent<IAdaptableBlotter, SearchChangedEventArgs>
   */
  onSearchChanged(): IEvent<IAdaptableBlotter, SearchChangedEventArgs>;

  /**
   * Event fired whenever the theme of the Blotter has been changed
   *
   * @returns IEvent<IAdaptableBlotter, ThemeChangedEventArgs>
   */
  onThemeChanged(): IEvent<IAdaptableBlotter, ThemeChangedEventArgs>;

  /**
   * Event fired whenever column order, visibility and sorts are changed in the Blotter.
   *
   * The event only fires when in a user (as opposed to the default) layout.
   *
   * @returns Column State Changed args - which at present just return the name of the current layout.
   */
  onColumnStateChanged(): IEvent<IAdaptableBlotter, ColumnStateChangedEventArgs>;

  /**
   * Event fired whenever an Alert is raised.
   *
   * Contains the full Alert itself.
   *
   * @returns IEvent<IAdaptableBlotter, IAlertFiredEventArgs>
   */
  onAlertFired(): IEvent<IAdaptableBlotter, AlertFiredEventArgs>;

  /**
   * Event fired whenever the Button in an Action Column is clicked.
   *
   * The EventArgs contain the column that has been clicked and the rowData for that row.
   *
   * @returns IEvent<IAdaptableBlotter, ActionColumnClickedEventArgs>
   */
  onActionColumnClicked(): IEvent<IAdaptableBlotter, ActionColumnClickedEventArgs>;

  /**
   * Event fired whenever the Selection in the Adaptable Blotter changes.
   *
   * The EventArgs contain both cell and row selection information.
   *
   * @returns IEvent<IAdaptableBlotter, SelectionChangedEventArgs>
   */
  onSelectionChanged(): IEvent<IAdaptableBlotter, SelectionChangedEventArgs>;

  _onSearchChanged: EventDispatcher<IAdaptableBlotter, SearchChangedEventArgs>;
  _onThemeChanged: EventDispatcher<IAdaptableBlotter, ThemeChangedEventArgs>;
  _onColumnStateChanged: EventDispatcher<IAdaptableBlotter, ColumnStateChangedEventArgs>;
  _onAlertFired: EventDispatcher<IAdaptableBlotter, AlertFiredEventArgs>;
  _onActionColumnClicked: EventDispatcher<IAdaptableBlotter, ActionColumnClickedEventArgs>;
  _onSelectionChanged: EventDispatcher<IAdaptableBlotter, SelectionChangedEventArgs>;
}
