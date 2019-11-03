import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import { EventDispatcher } from '../../Utilities/EventDispatcher';
import { SearchChangedEventArgs } from '../Events/SearchChanged/SearchChangedEventArgs';
import {
  ThemeChangedEventArgs,
  ColumnStateChangedEventArgs,
  AlertFiredEventArgs,
  ActionColumnClickedEventArgs,
  SelectionChangedEventArgs,
  ToolbarVisibilityChangedEventArgs,
  ApplicationToolbarButtonClickedEventArgs,
} from '../Events/BlotterEvents';
import { IEvent } from '../../Utilities/Interface/IEvent';
import {
  SELECTION_CHANGED_EVENT,
  BLOTTER_READY_EVENT,
  APPLICATION_TOOLBAR_BUTTON_CLICKED_EVENT,
  TOOLBAR_VISIBLE_EVENT,
  SEARCH_CHANGED_EVENT,
  THEME_CHANGED_EVENT,
  COLUMN_STATE_CHANGED_EVENT,
  ALERT_FIRED_EVENT,
  ACTION_COLUMN_CLICKED_EVENT,
} from '../../Utilities/Constants/GeneralConstants';
import { ApplicationToolbarButton } from '../../PredefinedConfig/DesignTimeState/ApplicationState';

/**
 * The Adaptable Blotter publishes a large number of events to which users can subscribe as required.
 *
 * These are:
 *
 * - **SearchChanged** - fired when the state changes in any of the Search-related functions (e.g. Advanced Search, Quick Search, Filters, Data Source etc.)
 *
 * - **ThemeChanged** - fired when the Theme in the Blotter changes
 *
 * - **ColumnStateChanged** - fired when the Column visibility or order changes
 *
 * - **AlertFired** - fired whenever an alert is triggered in the Adaptable Blotter
 *
 * - **ActionColumnClicked** - fired when the button in an Action Column has been clicked
 *
 * - **SelectionChanged** - fired whenever the user changes the Cell or Rows selection
 *
 * - **BlotterReady** - fired whenever the Blotter is initialised and ready for use
 *
 * - **ApplicationToolbarButtonClicked** - when a button is clicked in the Application toolbar
 *
 * - **ToolbarVisible** - when a toolbar comes into view (useful for rendering the Application toolbar)
 *
 * Each event contains the Adaptable Blotter and an EventArgs object that contains relevant information for the event.
 *
 * *Note: The previous **onStateChanged** event has been removed as that is now accessible by the more comprehensive onAuditStateChanged event* - see [AuditStateChanged](/interfaces/_api_interface_iauditeventapi_.iauditeventapi.html#onauditstatechanged).
 *
 * There are currently 2 ways to subscribe to these events.
 *
 * The preferred way is as follows:
 *
 *  ```ts
 * adaptableblotter.api.eventApi
 *    .on('ActionColumnClicked', (actionColumnEventArgs: ActionColumnClickedEventArgs) => {
 *        onActionColumnClickedListener(actionColumnEventArgs)
 *    }
 *  );
 * ```
 *
 * However we also have an older, now deprecated, way of listening to the events as follows;
 *
 * **note: this event model will be removed in Adaptable Blotter v.6**
 *
 * ```ts
 * adaptableblotter.api.eventApi
 *    .onActionColumnClicked()
 *    .Subscribe((sender, actionColumnEventArgs) =>
 *        onActionColumnClickedListener(actionColumnEventArgs)
 *  );
 * ```
 */
export interface IEventApi {
  /**
   * This is the general event
   * @param eventName
   * @param callback
   */

  /**
   * Fired when the Blotter is up and running - has no arguments.
   * @param eventName BlotterReady
   * @param callback (none)
   */
  on(eventName: BLOTTER_READY_EVENT, callback: () => void): () => void;

  /**
   * Event fired whenever **when a button in the Application Toolbar is clicked**
   *
   * Used when the Application State contains an ApplicationToolbarButton that has been clicked.
   *
   * @param eventName ApplicationToolbarButtonClicked
   * @param callback The ApplicationToolbarButtonClickedEventArgs which provides details of the button that was clicked.
   */
  on(
    eventName: APPLICATION_TOOLBAR_BUTTON_CLICKED_EVENT,
    callback: (
      applicationToolbarButtonClickedEventArgs: ApplicationToolbarButtonClickedEventArgs
    ) => void
  ): () => void;

  /**
   * Event fired whenever **a toolbar in the Adaptable Blotter becomes visible**
   *
   * The event provides the nae of the toolbar that is visible.
   *
   * Primarily used for rendering the Application toolbar (which is deliberately created empty for this purpose).
   *
   * @returns ToolbarVisibilityChangedEventArgs containing the name of the toolbar which has become visible
   */

  /**
   * Event fired whenever **a toolbar in the Adaptable Blotter becomes visible**
   *
   * Primarily used for rendering the Application toolbar (which is deliberately created empty for this purpose).
   *
   * @param eventName ToolbarVisible
   *
   * @param callback ToolbarVisibilityChangedEventArgs which includes just the name of the toolbar that has become visible.
   */
  on(
    eventName: TOOLBAR_VISIBLE_EVENT,
    callback: (toolbarVisibilityChangedEventArgs: ToolbarVisibilityChangedEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever **search criteria in the Adaptable Blotter changes**
   *
   * The event provides full details of what triggered the change and the current state of all Search and Filter related functions.
   *
   * Used in association with server searching.
   *
   * @returns SearchChangedEventArgs
   */

  /**
   *
   * @param eventName
   * @param callback
   */
  on(
    eventName: SEARCH_CHANGED_EVENT,
    callback: (searchChangedEventArgs: SearchChangedEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever the **selected theme of the Adaptable Blotter is changed**.
   *
   * @returns ThemeChangedEventArgs
   */
  on(
    eventName: THEME_CHANGED_EVENT,
    callback: (themeChangedEventArgs: ThemeChangedEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever **column order, visibility and sorts are changed in the Adaptable Blotter**.
   *
   * The event only fires when in a user (as opposed to the default) layout.
   *
   * @returns ColumnStateChangedEventArgs - which at present just return the name of the current layout.
   */
  on(
    eventName: COLUMN_STATE_CHANGED_EVENT,
    callback: (columnStateChangedEventArgs: ColumnStateChangedEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever an **Alert is triggered**.
   *
   * Contains the full Alert itself.
   *
   * @returns IAlertFiredEventArgs
   */

  /**
   * Just this
   */
  on(
    eventName: ALERT_FIRED_EVENT,
    callback: (alertFiredEventArgs: AlertFiredEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever the **Button in an Action Column is clicked**.
   *
   * The EventArgs contain the column that has been clicked and the rowData for that row.
   *
   * @returns ActionColumnClickedEventArgs
   */
  on(
    eventName: ACTION_COLUMN_CLICKED_EVENT,
    callback: (actionColumnClickedEventArgs: ActionColumnClickedEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever the **Selection in the Adaptable Blotter changes**.
   *
   * The EventArgs contain both cell and row selection information.
   *
   * @returns SelectionChangedEventArgs
   */
  on(
    eventName: SELECTION_CHANGED_EVENT,
    callback: (selectionChangedEventArgs: SelectionChangedEventArgs) => void
  ): () => void;

  /**
   * **This event is deprecated - please use the new On('SearchChanged') event instead which returns the same SearchChangedEventArgs**
   */
  onSearchChanged(): IEvent<IAdaptableBlotter, SearchChangedEventArgs>;

  /**
   * **This event is deprecated - please use the new On('ThemeChanged') event instead which returns the same ThemeChangedEventArgs**
   */
  onThemeChanged(): IEvent<IAdaptableBlotter, ThemeChangedEventArgs>;

  /**
   * **This event is deprecated - please use the new On('ColumnStateChanged') event instead which returns the same ColumnStateChangedEventArgs**
   */
  onColumnStateChanged(): IEvent<IAdaptableBlotter, ColumnStateChangedEventArgs>;

  /**
   * **This event is deprecated - please use the new On('AlertFired') event instead which returns the same AlertFiredEventArgs**
   */
  onAlertFired(): IEvent<IAdaptableBlotter, AlertFiredEventArgs>;

  /**
   * **This event is deprecated - please use the new On('ActionColumnClicked') event instead which returns the same ActionColumnClickedEventArgs**
   */
  onActionColumnClicked(): IEvent<IAdaptableBlotter, ActionColumnClickedEventArgs>;

  /**
   * **This event is deprecated - please use the new On('SelectionChangedEventArgs') event instead which returns the same SelectionChangedEventArgs**
   */
  onSelectionChanged(): IEvent<IAdaptableBlotter, SelectionChangedEventArgs>;

  _onSearchChanged: EventDispatcher<IAdaptableBlotter, SearchChangedEventArgs>;
  _onThemeChanged: EventDispatcher<IAdaptableBlotter, ThemeChangedEventArgs>;
  _onColumnStateChanged: EventDispatcher<IAdaptableBlotter, ColumnStateChangedEventArgs>;
  _onAlertFired: EventDispatcher<IAdaptableBlotter, AlertFiredEventArgs>;
  _onActionColumnClicked: EventDispatcher<IAdaptableBlotter, ActionColumnClickedEventArgs>;
  _onSelectionChanged: EventDispatcher<IAdaptableBlotter, SelectionChangedEventArgs>;

  emit(eventName: string, data?: any): Promise<any>;
}
