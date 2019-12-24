import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { EventDispatcher } from '../Utilities/EventDispatcher';

import { IEvent } from '../Utilities/Interface/IEvent';
import {
  SELECTION_CHANGED_EVENT,
  BLOTTER_READY_EVENT,
  TOOLBAR_VISIBILITY_CHANGED_EVENT,
  SEARCH_CHANGED_EVENT,
  THEME_CHANGED_EVENT,
  COLUMN_STATE_CHANGED_EVENT,
  ALERT_FIRED_EVENT,
  ACTION_COLUMN_CLICKED_EVENT,
  LIVE_REPORT_UPDATED_EVENT,
  TOOLBAR_BUTTON_CLICKED_EVENT,
} from '../Utilities/Constants/GeneralConstants';

import { SelectionChangedEventArgs } from './Events/SelectionChanged';
import { ActionColumnClickedEventArgs } from './Events/ActionColumnClicked';
import { LiveReportUpdatedEventArgs } from './Events/LiveReportUpdated';
import { ToolbarVisibilityChangedEventArgs } from './Events/ToolbarVisibilityChanged';
import { ToolbarButtonClickedEventArgs } from './Events/ToolbarButtonClicked';
import { ThemeChangedEventArgs } from './Events/ThemeChanged';
import { AlertFiredEventArgs } from './Events/AlertFired';
import { ColumnStateChangedEventArgs } from './Events/ColumnStateChanged';
import { SearchChangedEventArgs } from './Events/SearchChanged';

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
 * - **ToolbarButtonClicked** - when a button is clicked in a Custom Toolbar
 *
 * - **ToolbarVisibilityChanged** - when a toolbar comes into view (useful for rendering Custom toolbars)
 *
 * - **BlotterReady** - fired whenever the Blotter is initialised and ready for use (has no Args class)
 *
 * Each event contains an *xxxEventArgs* object that wraps relevant information for the event.
 *
 * The Adaptable Blotter uses **FDC3 Standard for messaging** so to get hold of the data packaged in the event, you will need to access the xxxArgs.data[0].id property e.g.:
 *
 *   ```ts
 *  const firedAlert: Alert = alertFiredArgs.data[0].id.alert
 *  ```
 *
 * *Note: The previous **onStateChanged** event has been removed as that is now accessible by the more comprehensive onAuditStateChanged event* - see [AuditStateChanged](/interfaces/_api_auditeventapi_.auditeventapi.html#onauditstatechanged).
 *
 * There are currently 2 ways to subscribe to these events.
 *
 * The preferred way is as follows:
 *
 *  ```ts
 * blotterApi.eventApi
 *    .on('ActionColumnClicked', (actionColumnEventArgs: ActionColumnClickedEventArgs) => {
 *        onActionColumnClickedListener(actionColumnEventArgs.data[0].id)
 *    }
 *  );
 * ```
 *
 * However we also have an older, now deprecated, way of listening to the events as follows;
 *
 * **note: this event model will be removed in Adaptable Blotter v.6**
 *
 * ```ts
 * blotterApi.eventApi
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
   * @param eventName SearchChanged - use as: blotterApieventApi.on('SearchChanged', (args: SearchChangedEventArgs) => { .....[do stuff]...})
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
   * @param eventName SelectionChanged - use as: blotterApi.eventApi.on('SelectionChanged', (args: SelectionChangedEventArgs) => { .....[do stuff]...})
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
   * @param eventName ThemeChanged- use as: blotterApi.eventApi.on('ThemeChanged', (args: ThemeChangedEventArgs) => { .....[do stuff]...})
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
   * @param eventName AlertFired - use as: blotterApi.eventApi.on('AlertFired', (args: AlertFiredEventArgs) => { .....[do stuff]...})
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
   * @param eventName ActionColumnClicked - use as: blotterApi.eventApi.on('ActionColumnClicked', (args: ActionColumnClickedEventArgs) => { .....[do stuff]...})
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
   * @param eventName ColumnStateChanged - use as: blotterApi.eventApi.on('ColumnStateChanged', (args: ColumnStateChangedEventArgs) => { .....[do stuff]...})
   *
   * @param callback ColumnStateChangedEventArgs which includes just the name of the currently selected Layout.
   */
  on(
    eventName: 'ColumnStateChanged',
    callback: (columnStateChangedEventArgs: ColumnStateChangedEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever **when a button in a Custom Toolbar is clicked**
   *
   * @param eventName ToolbarButtonClicked - use as: blotterApi.eventApi.on('ToolbarButtonClicked', (args: ToolbarButtonClickedEventArgs) => { .....[do stuff]...})
   *
   * @param callback  ToolbarButtonClickedEventArgs which provides details of the button that was clicked.
   */
  on(
    eventName: 'ToolbarButtonClicked',
    callback: (toolbarButtonClickedEventArgs: ToolbarButtonClickedEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever **a toolbar in the Adaptable Blotter becomes visible**
   *
   * Primarily used for rendering Custom toolbars.
   *
   * @param eventName ToolbarVisibilityChanged - use as: blotterApi.eventApi.on('ToolbarVisibilityChanged', (args: ToolbarVisibilityChangedEventArgs) => { .....[do stuff]...})
   *
   * @param callback ToolbarVisibilityChangedEventArgs which includes just the name of the toolbar that has become visible.
   */
  on(
    eventName: 'ToolbarVisibilityChanged',
    callback: (toolbarVisibilityChangedEventArgs: ToolbarVisibilityChangedEventArgs) => void
  ): () => void;

  on(
    eventName: 'LiveReportUpdated',
    callback: (liveReportpdatedEventArgs: LiveReportUpdatedEventArgs) => void
  ): () => void;

  /**
   * Fired when the Blotter is up and running - has no arguments.
   *
   * @param eventName BlotterReady
   *
   * @param callback (none)
   */
  on(eventName: 'BlotterReady', callback: () => void): () => void;

  emit(
    eventName:
      | SELECTION_CHANGED_EVENT
      | SEARCH_CHANGED_EVENT
      | ACTION_COLUMN_CLICKED_EVENT
      | THEME_CHANGED_EVENT
      | ALERT_FIRED_EVENT
      | ACTION_COLUMN_CLICKED_EVENT
      | COLUMN_STATE_CHANGED_EVENT
      | TOOLBAR_BUTTON_CLICKED_EVENT
      | TOOLBAR_VISIBILITY_CHANGED_EVENT
      | LIVE_REPORT_UPDATED_EVENT
      | BLOTTER_READY_EVENT,
    data?: any
  ): Promise<any>;
}
