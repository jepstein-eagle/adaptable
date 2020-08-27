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
import { DashboardButtonClickedEventArgs } from './Events/DashboardButtonClicked';
import { CustomToolbarConfiguredEventArgs } from './Events/CustomToolbarConfigured';

/**
 * AdapTable publishes a large number of events to which users can subscribe as required.
 *
 * Note: these are in addition to the [Audit Events](_src_api_auditeventapi_.auditeventapi.html) which are only published if Audit Log has been enabled.
 *
 * **AdapTable Events**
 *
 * - **SearchChanged** - fired when the state changes in any of the Search-related functions (e.g. Current Query, Quick Search, Filters, Data Source etc.)
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
 * - **ToolbarButtonClicked** - when a button is clicked inside a Custom Toolbar
 *
 * - **DashboardButtonClicked** - when a custom button is clicked in the Dashboard
 *
 * - **CustomToolbarConfigured** - when the 'configure' button is clicked in a Custom Toolbar
 *
 * - **ToolbarVisibilityChanged** - when a toolbar comes into view (useful for rendering Custom toolbars)
 *
 * - **LiveDataChanged** - when something happens related to the various 'live reports' that AdapTable offers
 *
 * - **AdaptableReady** - fired whenever Adaptable is initialised and ready for use (has no Args class)
 *
 * *Note: The previous **onStateChanged** event has been removed as that is now accessible by the more comprehensive onAuditStateChanged event* - see [AuditStateChanged](/interfaces/_src_api_auditeventapi_.auditeventapi.html#onauditstatechanged).
 *
 * **Subscribing to an AdapTable Event**
 *
 * AdapTable uses the [FDC3 Standard for messaging](https://fdc3.finos.org/docs/1.0/context-intro) so to get hold of the data packaged in the event, you need to access the [event]args.data[0].id property.
 *
 * Each event contains an *[EventName]EventArgs* object that wraps relevant information for the event as *[EventName]Info* and that object packages the actual data relevant to the event.
 *
 * So, for example, the `AlertFired` event contains an [AlertFiredEventArgs object](https://api.adaptabletools.com/interfaces/_src_api_events_alertfired_.alertfiredeventargs.html) which itself contains an [AlertFiredInfo object](https://api.adaptabletools.com/interfaces/_src_api_events_alertfired_.alertfiredinfo.html) object.
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
 *    (eventArgs: ActionColumnClickedEventArgs) => {
 *      const eventInfo: ActionColumnClickedInfo = eventArgs.data[0].id;
 *      const actionColumn: ActionColumn = eventInfo.actionColumn;
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
   * Unsubscribe from SearchChanged
   *
   * @param eventName SearchChanged
   * @param callback
   */
  off(
    eventName: 'SearchChanged',
    callback: (searchChangedEventArgs: SearchChangedEventArgs) => void
  ): void;

  /**
   * Event fired whenever the Cell or Row **Selection in AdapTable changes**.
   *
   * @param eventName SelectionChanged - use as: adaptableApi.eventApi.on('SelectionChanged', (args: SelectionChangedEventArgs) => { .....[do stuff]...})
   *
   * @param callback SelectionChangedEventArgs which contains information of any cells or rows that are selected.
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  on(
    eventName: 'SelectionChanged',
    callback: (selectionChangedEventArgs: SelectionChangedEventArgs) => void
  ): () => void;

  /**
   * Unsubscribe from SelectionChanged
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  off(
    eventName: 'SelectionChanged',
    callback: (selectionChangedEventArgs: SelectionChangedEventArgs) => void
  ): void;

  /**
   * Event fired whenever the **selected theme of AdapTable is changed**.
   *
   * @param eventName ThemeChanged- use as: adaptableApi.eventApi.on('ThemeChanged', (args: ThemeChangedEventArgs) => { .....[do stuff]...})
   *
   * @param callback ThemeChangedEventArgs which just contains the name of the current Theme
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  on(
    eventName: 'ThemeChanged',
    callback: (themeChangedEventArgs: ThemeChangedEventArgs) => void
  ): () => void;

  /**
   * Unsubscribe from ThemeChanged
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  off(
    eventName: 'ThemeChanged',
    callback: (themeChangedEventArgs: ThemeChangedEventArgs) => void
  ): void;

  /**
   * Event fired whenever an **Alert is triggered** in AdapTable.
   *
   * @param eventName AlertFired - use as: adaptableApi.eventApi.on('AlertFired', (args: AlertFiredEventArgs) => { .....[do stuff]...})
   *
   * @param callback AlertFiredEventArgs which wrap the Alert that was fired
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  on(
    eventName: 'AlertFired',
    callback: (alertFiredEventArgs: AlertFiredEventArgs) => void
  ): () => void;

  /**
   * Unsubscribe from AlertFired
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  off(eventName: 'AlertFired', callback: (alertFiredEventArgs: AlertFiredEventArgs) => void): void;

  /**
   * Event fired whenever the **Button in an Action Column is clicked**.
   *
   * @param eventName ActionColumnClicked - use as: adaptableApi.eventApi.on('ActionColumnClicked', (args: ActionColumnClickedEventArgs) => { .....[do stuff]...})
   *
   * @param callback ActionColumnClickedEventArgs which includes details of the ActionColumn
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  on(
    eventName: 'ActionColumnClicked',
    callback: (actionColumnClickedEventArgs: ActionColumnClickedEventArgs) => void
  ): () => void;

  /**
   * Unsubscribe from ActionColumnClicked
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  off(
    eventName: 'ActionColumnClicked',
    callback: (actionColumnClickedEventArgs: ActionColumnClickedEventArgs) => void
  ): void;

  /**
   * Event fired whenever **column order, visibility and sorts are changed in AdapTable**.
   *
   * @param eventName ColumnStateChanged - use as: adaptableApi.eventApi.on('ColumnStateChanged', (args: ColumnStateChangedEventArgs) => { .....[do stuff]...})
   *
   * @param callback ColumnStateChangedEventArgs which includes just the name of the currently selected Layout.
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  on(
    eventName: 'ColumnStateChanged',
    callback: (columnStateChangedEventArgs: ColumnStateChangedEventArgs) => void
  ): () => void;

  /**
   * Unsubscribe from ColumnStateChanged
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  off(
    eventName: 'ColumnStateChanged',
    callback: (columnStateChangedEventArgs: ColumnStateChangedEventArgs) => void
  ): void;

  /**
   * Event fired whenever **when a button in a Custom Toolbar is clicked**
   *
   * @param eventName ToolbarButtonClicked - use as: adaptableApi.eventApi.on('ToolbarButtonClicked', (args: ToolbarButtonClickedEventArgs) => { .....[do stuff]...})
   *
   * @param callback  ToolbarButtonClickedEventArgs which provides details of the button that was clicked.
   */

  // tslint:disable-next-line: adjacent-overload-signatures
  on(
    eventName: 'ToolbarButtonClicked',
    callback: (toolbarButtonClickedEventArgs: ToolbarButtonClickedEventArgs) => void
  ): () => void;

  /**
   * Ubsubscribe from ToolbarButtonClicked
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  off(
    eventName: 'ToolbarButtonClicked',
    callback: (toolbarButtonClickedEventArgs: ToolbarButtonClickedEventArgs) => void
  ): void;

  /**
   * Event fired whenever **when a Custom Button in the Dashboard is clicked**
   *
   * @param eventName DashboardButtonClicked - use as: adaptableApi.eventApi.on('DashboardButtonClicked', (args: DashboardButtonClickedEventArgs) => { .....[do stuff]...})
   *
   * @param callback  DashboardButtonClickedEventArgs which provides details of the button that was clicked.
   */

  // tslint:disable-next-line: adjacent-overload-signatures
  on(
    eventName: 'DashboardButtonClicked',
    callback: (dashboardButtonClickedEventArgs: DashboardButtonClickedEventArgs) => void
  ): () => void;

  /**
   * Ubsubscribe from DashboardButtonClicked
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  off(
    eventName: 'DashboardButtonClicked',
    callback: (dashboardButtonClickedEventArgs: DashboardButtonClickedEventArgs) => void
  ): void;

  // tslint:disable-next-line: adjacent-overload-signatures
  on(
    eventName: 'CustomToolbarConfigured',
    callback: (customToolbarConfiguredEventArgs: CustomToolbarConfiguredEventArgs) => void
  ): () => void;

  /**
   * Ubsubscribe from DashboardButtonClicked
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  off(
    eventName: 'CustomToolbarConfigured',
    callback: (customToolbarConfiguredEventArgs: CustomToolbarConfiguredEventArgs) => void
  ): void;

  /**
   * Event fired whenever **a toolbar in AdapTable becomes visible**
   *
   * Primarily used for rendering Custom toolbars.
   *
   * @param eventName ToolbarVisibilityChanged - use as: adaptableApi.eventApi.on('ToolbarVisibilityChanged', (args: ToolbarVisibilityChangedEventArgs) => { .....[do stuff]...})
   *
   * @param callback ToolbarVisibilityChangedEventArgs which includes the name of the toolbar (and the parent Tab) that has become visible.
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  on(
    eventName: 'ToolbarVisibilityChanged',
    callback: (toolbarVisibilityChangedEventArgs: ToolbarVisibilityChangedEventArgs) => void
  ): () => void;

  /**
   * Unsubscribe from ToolbarVisibilityChanged
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  off(
    eventName: 'ToolbarVisibilityChanged',
    callback: (toolbarVisibilityChangedEventArgs: ToolbarVisibilityChangedEventArgs) => void
  ): void;

  /**
   * Event fired whenever **a change occurs relating to live reports / data**
   *
   * Used in conjunction with AdapTable's partners OpenFin, ipushpull or Glue42
   *
   * @param eventName LiveDataChanged - use as: adaptableApi.eventApi.on('LiveDataChanged', (args: LiveDataChangedEventArgs) => { .....[do stuff]...})
   *
   * @param callback LiveDataChangedEventArgs which includes details of what triggered the event and the live report which is affected.
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  on(
    eventName: 'LiveDataChanged',
    callback: (liveDataChangedEventArgs: LiveDataChangedEventArgs) => void
  ): () => void;

  /**
   * Unsubscribe from LiveDataChanged
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  off(
    eventName: 'LiveDataChanged',
    callback: (liveDataChangedEventArgs: LiveDataChangedEventArgs) => void
  ): void;

  /**
   * Fired when Adaptable is up and running - has no arguments.
   * @param eventName AdaptableReady - use as: adaptableApi.eventApi.on('AdaptableReady', (adaptableReadyInfo: AdaptableReadyInfo) => { .....[do stuff]...})
   *
   * @param callback An `AdaptableReadyInfo` object which contains the adaptableApi and the vendorGrid
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  on(
    eventName: 'AdaptableReady',
    callback: (adaptableReadyInfo: AdaptableReadyInfo) => void
  ): () => void;

  /**
   * Unsubscribe from AdaptableReady
   */
  // tslint:disable-next-line: adjacent-overload-signatures
  off(
    eventName: 'AdaptableReady',
    callback: (adaptableReadyInfo: AdaptableReadyInfo) => void
  ): void;

  emit(
    eventName:
      | 'SelectionChanged'
      | 'SearchChanged'
      | 'ActionColumnClicked'
      | 'ThemeChanged'
      | 'AlertFired'
      | 'ColumnStateChanged'
      | 'ToolbarButtonClicked'
      | 'DashboardButtonClicked'
      | 'CustomToolbarConfigured'
      | 'ToolbarVisibilityChanged'
      | 'LiveDataChanged'
      | 'AdaptableReady',
    data?: any
  ): Promise<any>;
}
