import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
import { Expression, QueryRange } from './Common/Expression';
import { QueryObject } from './Common/QueryObject';
import { Scope } from './Common/Scope';
import { AdaptableColumn, AdaptableApi } from '../types';
import { keyBy } from 'lodash';

/**
 * The Predefined Configuration for the Alert function
 *
 * Alerts will notify you when something changes that you do need to be notified about (based on an Alert Definition).
 *
 * This can be either the result of an edit the user makes, or it can be ticking data.
 *
 * You can select the type of the Alert (e.g. Success, Warning, Error etc.) and where it appears.
 *
 * --------------
 *
 *  ### Further AdapTable Help Resources
 *
 * - [Alert Demo](https://demo.adaptabletools.com/alertsmessages/aggridalertdemo)
 *
 * - {@link AlertApi|Alert Api}
 *
 * - [Alert Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/alert-function.md)
 *
 * --------------
 *
 *  ### Alert Predefined Config Example
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
export interface AlertState extends ConfigState {
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
   * The name of a *div* in which you want alerts to display.
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
 *
 * See {@link AlertState|Alert State} for how to use this object.
 */
export interface AlertDefinition extends QueryObject {
  /**
   * The Id (fieldname) of the column whose change will trigger the alert
   */
  ColumnId?: string;

  Predicate?: AlertPredicate;

  /**
   * An (optional) Expression (or Query).
   *
   * If set, then this Expression also needs to be satisfied before the Alert can be triggered.
   *
   * See Expression Object Config for more information.
   */
  //Expression?: Expression;

  /**
   * The type of the Alert - will influence how the Alert is logged and also the colour and icon displayed.
   *
   * Available values are 'Info', 'Success', 'Warning' and'Error';
   */
  MessageType: 'Success' | 'Info' | 'Warning' | 'Error';

  /**
   * A series of properties which set what should happen when the Alert is triggered.
   */
  AlertProperties?: AlertProperties;
}

/**
 * Additional properties that describe how / where an Alert will display
 *
 * Note: All Alerts will display in the Alert Dasbhoard Toolbar and the Alert ToolPanel, and be sent to the Console.
 *
 * These provide **additional** options for Users following the triggering of an Alert.
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

export interface AlertPredicate {
  Id: string;
  Inputs?: any[];
}

export interface AlertPredicateDef {
  id: string;
  name: string;
  scope: Scope;
  inputs?: AlertPredicateDefInput[];
  handler: (params: AlertPredicateDefHandlerParams) => boolean;
  toString: (params: AlertPredicateDefToStringParams) => string;
}

export interface AlertPredicateDefInput {
  type: 'number' | 'text' | 'date';
  defaultValue?: any;
}

export interface AlertPredicateDefHandlerParams {
  newValue: any;
  oldValue: any;
  inputs: any[];
  column: AdaptableColumn;
  api: AdaptableApi;
}

export interface AlertPredicateDefToStringParams {
  alert: AlertDefinition;
  column: AdaptableColumn;
}

export const AlertPredicatesDefs: AlertPredicateDef[] = [
  {
    id: 'Any',
    name: 'Any Change',
    scope: { All: true },
    handler: ({ newValue, oldValue }) => newValue !== oldValue,
    toString: ({ column }) => `${column.FriendlyName} Changed`,
  },
  {
    id: 'PercentChange',
    name: 'Percent Change',
    scope: { DataTypes: ['Number'] },
    inputs: [{ type: 'number' }],
    handler: ({ newValue, oldValue, inputs }) =>
      (Math.abs(Number(newValue) - Number(oldValue)) / Number(newValue)) * 100 > Number(inputs[0]),
    toString: ({ alert, column }) =>
      `${column.FriendlyName} Changed by > ${alert.Predicate.Inputs[0]}%`,
  },
];

export const AlertPredicatesDefsById = keyBy(AlertPredicatesDefs, 'id');
export const AlertPredicatesDefsIdList = AlertPredicatesDefs.map(p => p.id);
