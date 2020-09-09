import { ConfigState } from './ConfigState';
import { QueryObject } from './Common/QueryObject';
import { AdaptableScope } from './Common/AdaptableScope';
import { AdaptablePredicate } from './Common/AdaptablePredicate';
import { TypeHint } from './Common/Types';

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
 *      Scope: {
 *          ColumnIds: ['InvoicedCost'],
 *        }
 *      MessageType: 'Warning',
 *      Predicate: {
 *          PredicateId: 'GreaterThan',
 *          Inputs: [2000],
 *        },
 *      AlertProperties: {
 *       ShowPopup: true,
 *      },
 *    },
 *    {
 *     Scope: {
 *         ColumnIds: ['ItemCount'],
 *      }
 *      MessageType: 'Info',
 *      Predicate: {
 *          PredicateId: 'PercentChange',
 *          Inputs: [100],
 *        },
 *      AlertProperties: {
 *       ShowPopup: false,
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
   * Where the `Alert` can be triggered - can be one, some or all Columns in the row
   *
   * Or can be all Colunns of a  given DataType(s)
   */
  Scope: AdaptableScope;

  /**
   * The logic to use for triggering an `Alert`.
   *
   * The Predicate will include a type (e.g. 'GreaterThan' and potentially inputs (e.g. '20'))
   *
   * Note that there is also an optional Expression / Shared Query that can be set.  This is to be used **in addition to the predicate** for more advanced scenarios
   *
   */
  Predicate?: AlertDefinitionPredicate;

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

export interface AlertDefinitionPredicate extends AdaptablePredicate {
  PredicateId: TypeHint<string, SystemAlertPredicateId>;
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

type SystemAlertPredicateId = 'Blanks' | 'NonBlanks';
