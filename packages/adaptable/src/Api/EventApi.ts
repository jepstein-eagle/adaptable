import { SelectionChangedEventArgs } from './Events/SelectionChanged';
import { ActionColumnClickedEventArgs } from './Events/ActionColumnClicked';
import { LiveDataChangedEventArgs } from './Events/LiveDataChanged';
import { ToolbarVisibilityChangedEventArgs } from './Events/ToolbarVisibilityChanged';
import { ToolbarButtonClickedEventArgs } from './Events/ToolbarButtonClicked';
import { ThemeChangedEventArgs } from './Events/ThemeChanged';
import { AlertFiredEventArgs } from './Events/AlertFired';
import { ColumnStateChangedEventArgs } from './Events/ColumnStateChanged';
import { SearchChangedEventArgs } from './Events/SearchChanged';

import { AdaptableReadyInfo } from './Events/AdaptableReady';

/**
 * AdapTable publishes a large number of events to which users can subscribe as required.
 *
 * Note: these are in addition to the [Audit Events](_api_auditeventapi_.auditeventapi.html) which are only published if Audit Log has been enabled.
 *
 * **AdapTable Events**
 *
 * - **SearchChanged** - fired when the state changes in any of the Search-related functions (e.g. Advanced Search, Quick Search, Filters, Data Source etc.)
 *
 * - **SelectionChanged** - fired whenever the user changes the Cell or Rows selection
 *
 * - **ThemeChanged** - fired when the Theme in Adaptable changes
 *
 * - **AlertFired** - fired whenever an alert is triggered in Adaptable
 *
 * - **ActionColumnClicked** - fired when the button in an Action Column has been clicked
 *
 * - **ColumnStateChanged** - fired when the Column visibility or order changes
 *
 * - **ToolbarButtonClicked** - when a button is clicked in a Custom Toolbar
 *
 * - **ToolbarVisibilityChanged** - when a toolbar comes into view (useful for rendering Custom toolbars)
 *
 * - **LiveDataChanged** - when something happens related to the various 'live reports' that AdapTable offers
 *
 * - **AdaptableReady** - fired whenever Adaptable is initialised and ready for use (has no Args class)
 *
 * *Note: The previous **onStateChanged** event has been removed as that is now accessible by the more comprehensive onAuditStateChanged event* - see [AuditStateChanged](/interfaces/_api_auditeventapi_.auditeventapi.html#onauditstatechanged).
 *
 * **Subscribing to an AdapTable Event**
 *
 * AdapTable uses the [FDC3 Standard for messaging](https://fdc3.finos.org/docs/1.0/context-intro) so to get hold of the data packaged in the event, you need to access the [event]args.data[0].id property.
 *
 * Each event contains an *[EventName]EventArgs* object that wraps relevant information for the event as *[EventName]Info* and that object packages the actual data relevant to the event.
 *
 * So, for example, the `AlertFired` event contains an [AlertFiredEventArgs object](https://api.adaptableblotter.com/interfaces/_api_events_alertfired_.alertfiredeventargs.html) which itself contains an [AlertFiredInfo object](https://api.adaptableblotter.com/interfaces/_api_events_alertfired_.alertfiredinfo.html) object.
 *
 * And that `AlertFiredInfo` object will contain the actual `AdaptableAlert` that was triggered.
 *
 *  ```ts
 *  const alertFiredInfo: AlertFiredInfo = alertFiredEventArgs.data[0].id;
 *  const triggeredAlert: AdaptableAlert = alertFiredInfo.alert;
 *  ```
 *
 * So the way to subscribe to these events is as follows:
 *
 *  ```ts
 * adaptableApi.eventApi.on(
 *    'ActionColumnClicked',
 *    (actionColumnEventArgs: ActionColumnClickedEventArgs) => {
 *      const actionColumnClickedInfo: ActionColumnClickedInfo = actionColumnEventArgs.data[0].id;
 *      const actionColumn: ActionColumn = actionColumnClickedInfo.actionColumn;
 *      // do stuff with the column ...
 *    }
 *  );
 * ```
 *
 */
export interface EventApi {
  /**
   * Event fired whenever **search criteria in AdapTable changes**
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
   * Event fired whenever the Cell or Row **Selection in AdapTable changes**.
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
   * Event fired whenever the **selected theme of AdapTable is changed**.
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
   * Event fired whenever an **Alert is triggered** in AdapTable.
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
   * Event fired whenever **column order, visibility and sorts are changed in AdapTable**.
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
   * Event fired whenever **a toolbar in AdapTable becomes visible**
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

  /**
   * Event fired whenever **a change occurs relating to live reports / data**
   *
   * Used in conjunction with AdapTable's partners OpenFin, iPushPull or Glue42
   *
   * @param eventName LiveDataChanged - use as: adaptableApi.eventApi.on('LiveDataChanged', (args: LiveDataChangedEventArgs) => { .....[do stuff]...})
   *
   * @param callback LiveDataChangedEventArgs which includes details of what triggered the event and the live report which is affected.
   */
  on(
    eventName: 'LiveDataChanged',
    callback: (liveDataChangedEventArgs: LiveDataChangedEventArgs) => void
  ): () => void;

  /**
   * Fired when Adaptable is up and running - has no arguments.
   * @param eventName AdaptableReady - use as: adaptableApi.eventApi.on('AdaptableReady', (adaptableReadyInfo: AdaptableReadyInfo) => { .....[do stuff]...})
   *
   * @param callback An `AdaptableReadyInfo` object which contains the adaptableApi and the vendorGrid
   */
  on(
    eventName: 'AdaptableReady',
    callback: (adaptableReadyInfo: AdaptableReadyInfo) => void
  ): () => void;

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
      | 'LiveDataChanged'
      | 'AdaptableReady',
    data?: any
  ): Promise<any>;
}
