import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { Expression } from '../Common/Expression/Expression';
import { QueryRange } from '../Common/Expression/QueryRange';

/**
 * The Predefined Configuration for the Alert function
 *
 * Alerts will notify you when something changes that you do need to be notified about (based on an Alert Definition).
 *
 * This can be either the result of an edit the user makes, or it can be ticking data.
 *
 * You can select the type of the Alert (e.g. Success, Warning, Error etc.) and where it appears.
 *
 * **Further Resources**
 *
 * [Alert Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895731-Alerts-Videos)
 *
 * [Alert Demo](https://demo.adaptableblotter.com/alertsmessages/aggridalertdemo/)
 *
 * [Alert API](_api_interface_ialertapi_.ialertapi.html)
 *
 * [Alert FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895931-Alert-Functions-FAQ)
 *
 * [Alert Help](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755197-Grid-Functions)
 *
 * **Alert Predefined Config Example**
 *
 * ```ts
 * export default {
 * Alert: {
 *    MaxAlertsInStore: 10,
 *    AlertDefinitions: [
 *    {
 *      ColumnId: 'InvoicedCost',
 *      MessageType: 'Warning',
 *      Range: {
 *        Operand1: '2000',
 *        Operand1Type: 'Value',
 *        Operand2: '',
 *        Operand2Type: 'Value',
 *        Operator: 'GreaterThan',
 *      },
 *      AlertProperties: {
 *       ShowPopup: true,
 *      },
 *    },
 *    {
 *      ColumnId: 'ItemCount',
 *      MessageType: 'Info',
 *      Range: {
 *        Operand1: '100',
 *        Operand1Type: 'Value',
 *        Operand2: '',
 *        Operand2Type: 'Value',
 *        Operator: 'PercentChange',
 *      },
 *      AlertProperties: {
 *       ShowPopup: true,
 *      },
 *     },
 *   ],
 * },
 * } as PredefinedConfig;
 * ```
 * In this example we have created 2 Alert Definitions:
 *
 * - On the *InvoicedCost* column which will **warn** (and show a popup) when the value is > 2000 (and display a popup).
 *
 * - On the *ItemCount* column which will show **info** alert (but not show a popup) if the new value is more than double (i.e. has percent change > 100).
 */
export interface AlertState extends RunTimeState {
  /**
   * A collection of Alert Definitions - which will trigger Alerts when their condition is met
   *
   * **Default Value**:  Empty array
   */
  AlertDefinitions?: AlertDefinition[];

  /**
   * How many alerts to hold in the State at any one time.  If you reacch this limit then we remove the oldest alert each time a new one is triggered.
   *
   * **Default Value**:  20
   *
   */
  MaxAlertsInStore?: number;

  /**
   * The name of the *div* in which you want the alerts to display.
   *
   * Leave blank if you want them to show using the main Adaptable Blotter popup.
   *
   * **This property is only used if the Alert itself has ShowPopup set to true**.
   *
   * **Default Value**:  Empty string
   */
  AlertPopupDiv?: string;
}

/**
 * The Alert Definition object used in the Alert function.
 */
export interface AlertDefinition extends AdaptableBlotterObject {
  /**
   * The Id (fieldname) of the column whose change will trigger the alert
   */
  ColumnId: string;

  /**
   * The QueryRange of the Alert (see Expression Object Config for more information on Ranges).
   */
  Range: QueryRange;

  /**
   * An (optional) Expression (or Query).
   *
   * If set, then this Expression also needs to be satisfied before the Alert can be triggered.
   *
   * See Expression Object Config for more information.
   */
  Expression?: Expression;

  /**
   * The type of the Alert - will influence how the Alert is logged and also the colour and icon displayed.
   */
  MessageType: 'Success' | 'Info' | 'Warning' | 'Error';

  /**
   * Whether to show the Alert when it is triggered as a popup.  All alerts will display in the Alerts toolbar.
   */
  AlertProperties?: AlertProperties;
}

export interface AlertProperties {
  ShowPopup?: boolean;
  HighlightCell?: boolean;
  JumpToCell?: boolean;
}
