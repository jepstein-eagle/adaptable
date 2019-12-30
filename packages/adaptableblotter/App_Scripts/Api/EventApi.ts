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
 * The Adaptable publishes a large number of events to which users can subscribe as required.
 *
 * These are:
 *
 * - **SearchChanged** - fired when the state changes in any of the Search-related functions (e.g. Advanced Search, Quick Search, Filters, Data Source etc.)
 *
 * - **SelectionChanged** - fired whenever the user changes the Cell or Rows selection
 *
 * - **ThemeChanged** - fired when the Theme in the Blotter changes
 *
 * - **AlertFired** - fired whenever an alert is triggered in the Adaptable
 *
 * - **ActionColumnClicked** - fired when the button in an Action Column has been clicked
 *
 * - **ColumnStateChanged** - fired when the Column visibility or order changes
 *
 * - **ToolbarButtonClicked** - when a button is clicked in a Custom Toolbar
 *
 * - **ToolbarVisibilityChanged** - when a toolbar comes into view (useful for rendering Custom toolbars)
 *
 * - **AdaptableReady** - fired whenever the Adaptable is initialised and ready for use (has no Args class)
 *
 * Note: The Adaptable uses the [FDC3 Standard for messaging](https://fdc3.finos.org/docs/1.0/context-intro) so to get hold of the data packaged in the event, you will need to access the xxxArgs.data[0].id property.
 *
 * This means that each event contains an *xxxEventArgs* object that wraps relevant information for the event as *xxxInfo* and that object packages the actual data relevant to the event.
 *
 * So, for example, the `AlertFired` event contains an [AlertFiredEventArgs object](https://api.adaptableblotter.com/interfaces/_api_events_alertfired_.alertfiredeventargs.html) which itself contains an [AlertFiredInfo object](https://api.adaptableblotter.com/interfaces/_api_events_alertfired_.alertfiredinfo.html) object.  And that `AlertFiredInfo` object will contain the actual `AdaptableAlert` that was triggered.
 *
 *  ```ts
 *  const alertFiredInfo: AlertFiredInfo = alertFiredArgs.data[0].id;
 *  const triggeredAlert: AdaptableAlert = alertFiredInfo.alert;
 *  ```
 *
 * *Note: The previous **onStateChanged** event has been removed as that is now accessible by the more comprehensive onAuditStateChanged event* - see [AuditStateChanged](/interfaces/_api_auditeventapi_.auditeventapi.html#onauditstatechanged).
 *
 * There way to subscribe to these events is as follows:
 *
 *  ```ts
 * api.eventApi.on('ActionColumnClicked', (args: ActionColumnClickedEventArgs) => {
 *        onActionColumnClickedListener(actionColumnEventArgs.data[0].id)
 *    }
 *  );
 * ```
 *
 */
export interface EventApi {
  /**
   * Event fired whenever **search criteria in the Adaptable changes**
   *
   * @param eventName SearchChanged - use as: api.eventApi.on('SearchChanged', (args: SearchChangedEventArgs) => { .....[do stuff]...})
   *
   * @param callback SearchChangedEventArgs which includes full details of what triggered the change and the current state of all Search and Filter related functions.
   */
  on(
    eventName: 'SearchChanged',
    callback: (searchChangedEventArgs: SearchChangedEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever the **Selection in the Adaptable changes**.
   *
   * @param eventName SelectionChanged - use as: adaptableApi.eventApi.on('SelectionChanged', (args: SelectionChangedEventArgs) => { .....[do stuff]...})
   *
   * @param callback SelectionChangedEventArgs which contains information of any cells or rows that are selected.
   */
  on(
    eventName: 'SelectionChanged',
    callback: (selectionChangedEventArgs: SelectionChangedEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever the **selected theme of the Adaptable is changed**.
   *
   * @param eventName ThemeChanged- use as: adaptableApi.eventApi.on('ThemeChanged', (args: ThemeChangedEventArgs) => { .....[do stuff]...})
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
   * @param eventName AlertFired - use as: adaptableApi.eventApi.on('AlertFired', (args: AlertFiredEventArgs) => { .....[do stuff]...})
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
   * @param eventName ActionColumnClicked - use as: adaptableApi.eventApi.on('ActionColumnClicked', (args: ActionColumnClickedEventArgs) => { .....[do stuff]...})
   *
   * @param callback ActionColumnClickedEventArgs which includes details of the ActionColumn
   */
  on(
    eventName: 'ActionColumnClicked',
    callback: (actionColumnClickedEventArgs: ActionColumnClickedEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever **column order, visibility and sorts are changed in the Adaptable**.
   *
   * @param eventName ColumnStateChanged - use as: adaptableApi.eventApi.on('ColumnStateChanged', (args: ColumnStateChangedEventArgs) => { .....[do stuff]...})
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
   * @param eventName ToolbarButtonClicked - use as: adaptableApi.eventApi.on('ToolbarButtonClicked', (args: ToolbarButtonClickedEventArgs) => { .....[do stuff]...})
   *
   * @param callback  ToolbarButtonClickedEventArgs which provides details of the button that was clicked.
   */
  on(
    eventName: 'ToolbarButtonClicked',
    callback: (toolbarButtonClickedEventArgs: ToolbarButtonClickedEventArgs) => void
  ): () => void;

  /**
   * Event fired whenever **a toolbar in the Adaptable becomes visible**
   *
   * Primarily used for rendering Custom toolbars.
   *
   * @param eventName ToolbarVisibilityChanged - use as: adaptableApi.eventApi.on('ToolbarVisibilityChanged', (args: ToolbarVisibilityChangedEventArgs) => { .....[do stuff]...})
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
   * @param eventName AdaptableReady
   *
   * @param callback (none)
   */
  on(eventName: 'AdaptableReady', callback: () => void): () => void;

  emit(
    eventName:
      | 'SelectionChanged'
      | 'SearchChanged'
      | 'ActionColumnClicked'
      | 'ThemeChanged'
      | 'AlertFired'
      | 'ColumnStateChanged'
      | 'ToolbarButtonClicked'
      | 'ToolbarVisibilityChanged'
      | 'LiveReportUpdated'
      | 'AdaptableReady',
    data?: any
  ): Promise<any>;
}
