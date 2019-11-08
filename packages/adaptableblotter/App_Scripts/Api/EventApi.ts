import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { EventDispatcher } from '../Utilities/EventDispatcher';
import { SearchChangedEventArgs } from './Events/SearchChanged/SearchChangedEventArgs';
import {
  ThemeChangedEventArgs,
  ColumnStateChangedEventArgs,
  AlertFiredEventArgs,
  ActionColumnClickedEventArgs,
  SelectionChangedEventArgs,
  ToolbarVisibilityChangedEventArgs,
  ApplicationToolbarButtonClickedEventArgs,
} from './Events/BlotterEvents';
import { IEvent } from '../Utilities/Interface/IEvent';
import {
  SELECTION_CHANGED_EVENT,
  BLOTTER_READY_EVENT,
  APPLICATION_TOOLBAR_BUTTON_CLICKED_EVENT,
  TOOLBAR_VISIBILITY_CHANGED_EVENT,
  SEARCH_CHANGED_EVENT,
  THEME_CHANGED_EVENT,
  COLUMN_STATE_CHANGED_EVENT,
  ALERT_FIRED_EVENT,
  ACTION_COLUMN_CLICKED_EVENT,
} from '../Utilities/Constants/GeneralConstants';
import { ApplicationToolbarButton } from '../PredefinedConfig/DesignTimeState/ApplicationState';

/**
 * The Adaptable Blotter publishes a large number of events to which users can subscribe as required.
 *
 * These are:
 *
 * - **SearchChanged** - fired when the state changes in any of the Search-related functions (e.g. Advanced Search, Quick Search, Filters, Data Source etc.)
 *
 * - **SelectionChanged** - fired whenever the user changes the Cell or Rows selection
 *
 * - **ThemeChanged** - fired when the Theme in the Blotter changes
 *
 * - **AlertFired** - fired whenever an alert is triggered in the Adaptable Blotter
 *
 * - **ActionColumnClicked** - fired when the button in an Action Column has been clicked
 *
 * - **ColumnStateChanged** - fired when the Column visibility or order changes
 *
 * - **ApplicationToolbarButtonClicked** - when a button is clicked in the Application toolbar
 *
 * - **ToolbarVisibilityChanged** - when a toolbar comes into view (useful for rendering the Application toolbar)
 *
 * - **BlotterReady** - fired whenever the Blotter is initialised and ready for use
 *
 * Each event contains the Adaptable Blotter and an EventArgs object that contains relevant information for the event.
 *
 * *Note: The previous **onStateChanged** event has been removed as that is now accessible by the more comprehensive onAuditStateChanged event* - see [AuditStateChanged](/interfaces/_api_auditeventapi_.auditeventapi.html#onauditstatechanged).
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
export interface EventApi {
  /**
   * Event fired whenever **search criteria in the Adaptable Blotter changes**
   *
   * @param eventName SearchChanged - use as: adaptableblotter.api.eventApi.on('SearchChanged', (args: SearchChangedEventArgs) => { .....[do stuff]...})
   *
   * @param callback SearchChangedEventArgs which includes full details of what triggered the change and the current state of all Search and Filter related functions.
   */
  on(
    eventName: 'SearchChanged',
    callback: (searchChangedEventArgs: SearchChangedEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever the **Selection in the Adaptable Blotter changes**.
   *
   * @param eventName SelectionChanged - use as: adaptableblotter.api.eventApi.on('SelectionChanged', (args: SelectionChangedEventArgs) => { .....[do stuff]...})
   *
   * @param callback SelectionChangedEventArgs which contains information of any cells or rows that are selected.
   */
  on(
    eventName: 'SelectionChanged',
    callback: (selectionChangedEventArgs: SelectionChangedEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever the **selected theme of the Adaptable Blotter is changed**.
   *
   * @param eventName ThemeChanged- use as: adaptableblotter.api.eventApi.on('ThemeChanged', (args: ThemeChangedEventArgs) => { .....[do stuff]...})
   *
   * @param callback ThemeChangedEventArgs which just contains the name of the current Theme
   */
  on(
    eventName: 'ThemeChanged',
    callback: (themeChangedEventArgs: ThemeChangedEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever an **Alert is triggered**.
   *
   * @param eventName AlertFired - use as: adaptableblotter.api.eventApi.on('AlertFired', (args: AlertFiredEventArgs) => { .....[do stuff]...})
   *
   * @param callback AlertFiredEventArgs which wrap the Alert that was fired
   */
  on(
    eventName: 'AlertFired',
    callback: (alertFiredEventArgs: AlertFiredEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever the **Button in an Action Column is clicked**.
   *
   * @param eventName ActionColumnClicked - use as: adaptableblotter.api.eventApi.on('ActionColumnClicked', (args: ActionColumnClickedEventArgs) => { .....[do stuff]...})
   *
   * @param callback ActionColumnClickedEventArgs which includes details of the ActionColumn
   */
  on(
    eventName: 'ActionColumnClicked',
    callback: (actionColumnClickedEventArgs: ActionColumnClickedEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever **column order, visibility and sorts are changed in the Adaptable Blotter**.
   *
   * @param eventName ColumnStateChanged - use as: adaptableblotter.api.eventApi.on('ColumnStateChanged', (args: ColumnStateChangedEventArgs) => { .....[do stuff]...})
   *
   * @param callback ColumnStateChangedEventArgs which includes just the name of the currently selected Layout.
   */
  on(
    eventName: 'ColumnStateChanged',
    callback: (columnStateChangedEventArgs: ColumnStateChangedEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever **when a button in the Application Toolbar is clicked**
   *
   * Used when the Application State contains an ApplicationToolbarButton that has been clicked.
   *
   * @param eventName ApplicationToolbarButtonClicked - use as: adaptableblotter.api.eventApi.on('ApplicationToolbarButtonClicked', (args: ApplicationToolbarButtonClickedEventArgs) => { .....[do stuff]...})
   *
   * @param callback  ApplicationToolbarButtonClickedEventArgs which provides details of the button that was clicked.
   */
  on(
    eventName: 'ApplicationToolbarButtonClicked',
    callback: (
      applicationToolbarButtonClickedEventArgs: ApplicationToolbarButtonClickedEventArgs
    ) => void
  ): () => void;

  /**
   * Event fired whenever **a toolbar in the Adaptable Blotter becomes visible**
   *
   * Primarily used for rendering the Application toolbar (which is deliberately created empty for this purpose).
   *
   * @param eventName ToolbarVisibilityChanged - use as: adaptableblotter.api.eventApi.on('ToolbarVisibilityChanged', (args: ToolbarVisibilityChangedEventArgs) => { .....[do stuff]...})
   *
   * @param callback ToolbarVisibilityChangedEventArgs which includes just the name of the toolbar that has become visible.
   */
  on(
    eventName: 'ToolbarVisibilityChanged',
    callback: (toolbarVisibilityChangedEventArgs: ToolbarVisibilityChangedEventArgs) => void
  ): () => void;

  /**
   * Fired when the Blotter is up and running - has no arguments.
   *
   * @param eventName BlotterReady
   *
   * @param callback (none)
   */
  on(eventName: 'BlotterReady', callback: () => void): () => void;

  /**
   * **This event is deprecated - please use the new on('SearchChanged') event instead which returns the same SearchChangedEventArgs**
   */
  onSearchChanged(): IEvent<IAdaptableBlotter, SearchChangedEventArgs>;

  /**
   * **This event is deprecated - please use the new on('ThemeChanged') event instead which returns the same ThemeChangedEventArgs**
   */
  onThemeChanged(): IEvent<IAdaptableBlotter, ThemeChangedEventArgs>;

  /**
   * **This event is deprecated - please use the new on('ColumnStateChanged') event instead which returns the same ColumnStateChangedEventArgs**
   */
  onColumnStateChanged(): IEvent<IAdaptableBlotter, ColumnStateChangedEventArgs>;

  /**
   * **This event is deprecated - please use the new on('AlertFired') event instead which returns the same AlertFiredEventArgs**
   */
  onAlertFired(): IEvent<IAdaptableBlotter, AlertFiredEventArgs>;

  /**
   * **This event is deprecated - please use the new on('ActionColumnClicked') event instead which returns the same ActionColumnClickedEventArgs**
   */
  onActionColumnClicked(): IEvent<IAdaptableBlotter, ActionColumnClickedEventArgs>;

  /**
   * **This event is deprecated - please use the new on('SelectionChangedEventArgs') event instead which returns the same SelectionChangedEventArgs**
   */
  onSelectionChanged(): IEvent<IAdaptableBlotter, SelectionChangedEventArgs>;

  _onSearchChanged: EventDispatcher<IAdaptableBlotter, SearchChangedEventArgs>;
  _onThemeChanged: EventDispatcher<IAdaptableBlotter, ThemeChangedEventArgs>;
  _onColumnStateChanged: EventDispatcher<IAdaptableBlotter, ColumnStateChangedEventArgs>;
  _onAlertFired: EventDispatcher<IAdaptableBlotter, AlertFiredEventArgs>;
  _onActionColumnClicked: EventDispatcher<IAdaptableBlotter, ActionColumnClickedEventArgs>;
  _onSelectionChanged: EventDispatcher<IAdaptableBlotter, SelectionChangedEventArgs>;

  emit(
    eventName:
      | SELECTION_CHANGED_EVENT
      | SEARCH_CHANGED_EVENT
      | ACTION_COLUMN_CLICKED_EVENT
      | THEME_CHANGED_EVENT
      | ALERT_FIRED_EVENT
      | ACTION_COLUMN_CLICKED_EVENT
      | COLUMN_STATE_CHANGED_EVENT
      | APPLICATION_TOOLBAR_BUTTON_CLICKED_EVENT
      | TOOLBAR_VISIBILITY_CHANGED_EVENT
      | BLOTTER_READY_EVENT,
    data?: any
  ): Promise<any>;
}
