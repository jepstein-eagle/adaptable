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
 * The Adaptable Blotter publishes 6 events that users can subscribe to as required.
 *
 * These are:
 *
 * - **onSearchChanged** - fired when the state changes in any of the Search-related functions (e.g. Advanced Search, Quick Search, Filters, Data Source etc.)
 *
 * - **onThemeChanged** - fired when the Theme in the Blotter changes
 *
 * - **onColumnStateChanged** - fired when the Column visibility or order changes
 *
 * - **onAlertFired** - fired whenever an alert is triggered in the Adaptable Blotter
 *
 * - **onActionColumnClicked** - fired when the button in an Action Column has been clicked
 *
 * - **onSelectionChanged** - fired whenever the user changes the Cell or Rows seletion
 *
 * Each event contains the Adaptable Blotter and an EventArgs object that contains relevant information for the event.
 *
 * *Note: The previous **onStateChanged** event has been removed as that is now accessible by the more comprehensive onAuditStateChanged event* - see [AuditStateChanged](/interfaces/_api_interface_iauditeventapi_.iauditeventapi.html#onauditstatechanged).
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
   * Event fired whenever **search criteria in the Adaptable Blotter changes**
   *
   * The event provides full details of what triggered the change and the current state of all Search and Filter related functions.
   *
   * Used in association with server searching.
   *
   * @returns IEvent<IAdaptableBlotter, SearchChangedEventArgs>
   *
   * **This event is deprecated - please use the new On('SearchChanged') event instead which returns the same SearchChangedEventArgs**
   */
  onSearchChanged(): IEvent<IAdaptableBlotter, SearchChangedEventArgs>;

  /**
   * Event fired whenever the **selected theme of the Adaptable Blotter is changed**.
   *
   * @returns IEvent<IAdaptableBlotter, ThemeChangedEventArgs>
   *
   * **This event is deprecated - please use the new On('ThemeChanged') event instead which returns the same ThemeChangedEventArgs**
   */
  onThemeChanged(): IEvent<IAdaptableBlotter, ThemeChangedEventArgs>;

  /**
   * Event fired whenever **column order, visibility and sorts are changed in the Adaptable Blotter**.
   *
   * The event only fires when in a user (as opposed to the default) layout.
   *
   * @returns Column State Changed args - which at present just return the name of the current layout.
   *
   * **This event is deprecated - please use the new On('ColumnStateChanged') event instead which returns the same ColumnStateChangedEventArgs**
   */
  onColumnStateChanged(): IEvent<IAdaptableBlotter, ColumnStateChangedEventArgs>;

  /**
   * Event fired whenever an **Alert is triggered**.
   *
   * Contains the full Alert itself.
   *
   * @returns IEvent<IAdaptableBlotter, IAlertFiredEventArgs>
   *
   * **This event is deprecated - please use the new On('AlertFired') event instead which returns the same AlertFiredEventArgs**
   */
  onAlertFired(): IEvent<IAdaptableBlotter, AlertFiredEventArgs>;

  /**
   * Event fired whenever the **Button in an Action Column is clicked**.
   *
   * The EventArgs contain the column that has been clicked and the rowData for that row.
   *
   * @returns IEvent<IAdaptableBlotter, ActionColumnClickedEventArgs>
   *
   * **This event is deprecated - please use the new On('ActionColumnClicked') event instead which returns the same ActionColumnClickedEventArgs**
   */
  onActionColumnClicked(): IEvent<IAdaptableBlotter, ActionColumnClickedEventArgs>;

  /**
   * Event fired whenever the **Selection in the Adaptable Blotter changes**.
   *
   * The EventArgs contain both cell and row selection information.
   *
   * @returns IEvent<IAdaptableBlotter, SelectionChangedEventArgs>
   *
   * **This event is deprecated - please use the new On('SelectionChangedEventArgs') event instead which returns the same SelectionChangedEventArgs**
   */
  onSelectionChanged(): IEvent<IAdaptableBlotter, SelectionChangedEventArgs>;

  _onSearchChanged: EventDispatcher<IAdaptableBlotter, SearchChangedEventArgs>;
  _onThemeChanged: EventDispatcher<IAdaptableBlotter, ThemeChangedEventArgs>;
  _onColumnStateChanged: EventDispatcher<IAdaptableBlotter, ColumnStateChangedEventArgs>;
  _onAlertFired: EventDispatcher<IAdaptableBlotter, AlertFiredEventArgs>;
  _onActionColumnClicked: EventDispatcher<IAdaptableBlotter, ActionColumnClickedEventArgs>;
  _onSelectionChanged: EventDispatcher<IAdaptableBlotter, SelectionChangedEventArgs>;
}
