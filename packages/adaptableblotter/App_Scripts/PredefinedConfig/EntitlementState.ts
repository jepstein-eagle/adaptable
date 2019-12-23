import { DesignTimeState } from './DesignTimeState';
import { AdaptableFunctionName } from './Common/Types';

/**
 *
 * The Predefined Configuration for Entitlements
 *
 * This lets you manage which functions are available for which user and in which form.
 *
 * By default every function has the Entitlement of <i>Full</i>, so only set those which you want to be different to that default.
 *
 * ```ts
 * export default {
 * Entitlements: {
 *   FunctionEntitlements: [
 *     {
 *       FunctionName: 'ColumnCategory',
 *       AccessLevel: 'Hidden',
 *    },
 *    {
 *        FunctionName: 'AdvancedSearch',
 *        AccessLevel: 'Hidden',
 *      },
 *      {
 *        FunctionName: 'Layout',
 *        AccessLevel: 'ReadOnly',
 *     },
 *    ],
 *  },
 * } as PredefinedConfig;
 * ```
 */
export interface EntitlementState extends DesignTimeState {
  /**
   * A collection of Entitlement objects.
   */
  FunctionEntitlements?: Entitlement[];
}

export interface Entitlement {
  /**
   * The name of the function that has the Entitlement applied
   *
   * You can see a full list of function names in the [Help Appendix](https://adaptabletools.zendesk.com/hc/en-us/articles/360024889311-Appendix).
   *
   * **Default Value**:  Empty array
   */
  FunctionName: AdaptableFunctionName;

  /**
   * What type of Access Level the Entitlement provides.  The options are:
   *
   * **Full** - Complete Read / Write Access
   *
   * **ReadOnly** - Users can run existing objects for the Function (e.g Searches, Layouts, Reports) but cannot add, edit or delete.
   *
   * **Hidden** - The Function is invisible to the User.
   */
  AccessLevel: 'ReadOnly' | 'Hidden' | 'Full';
}
