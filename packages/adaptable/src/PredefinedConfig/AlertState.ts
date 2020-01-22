import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
import { Expression, QueryRange } from './Common/Expression';

/**
 * The Predefined Configuration for the Alert function
 *
 * Alerts will notify you when something changes that you do need to be notified about (based on an Alert Definition).
 *
 * This can be either the result of an edit the user makes, or it can be ticking data.
 *
 * You can select the type of the Alert (e.g. Success, Warning, Error etc.) and where it appears.
 *
 * **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/alertsmessages/aggridalertdemo/) | [API](_api_alertapi_.alertapi.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895931-Alert-Functions-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895731-Alerts-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755197-Grid-Functions)
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
   * The name of a *<div>* in which you want alerts to display.
   *
   * Leave unset if you want them never to show in a <div>.
   *
   * **This property is only used if the Alert itself being displayed has <i>ShowInDiv</i> set to true**.
   *
   * **Default Value**:  Empty string
   */
  AlertDisplayDiv?: string;
}

/**
 * The Alert Definition object used in the Alert function.
 */
export interface AlertDefinition extends AdaptableObject {
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

/**
 * Additional properties that describe how / where an Alert will display
 *
 * Note: All Alerts will display in the Alert Dasbhoard Toolbar and the Alert ToolPanel, and be sent to the Console.
 *
 * These provide **additional** options for you to use.
 */
export interface AlertProperties {
  /**
   * Displays a popup in the middle of the screen
   */
  ShowPopup?: boolean;
  /**
   * If a cell change triggered tthe Alert it will colour that cell
   *
   * The Colour used will vary accoriding to the `MessageType` property of the triggering Alert Definitition
   *
   * e.g. if the Alert Derfinition has a `MessageType` of 'Success' then the cell will be coloured green.
   */
  HighlightCell?: boolean;

  /**
   * Whether the Grid should 'jump' to show tell which triggered the Alert (if it was the result of a cell change).
   */
  JumpToCell?: boolean;

  /**
   * Whether to show the text of the Alert in whichever <div> you specificed for the `AlertDisplayDiv` property of the Alert State.
   *
   * If this property is not set, then the `ShowInDiv` is ignored.
   */
  ShowInDiv?: boolean;
}
