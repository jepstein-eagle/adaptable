import { DesignTimeState } from './DesignTimeState';

/**
 *
 * The Predefined Configuration for Entitlements
 *
 * By default every function has the Entitlement of 'Full', so only set those which you want to be different to that default.
 *
 * ```ts
 * export default {
 * Entitlement: {
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
export interface EntitlementsState extends DesignTimeState {
  /**
   * A collection of Entitlement objects.
   */
  FunctionEntitlements?: IEntitlement[];
}

export interface IEntitlement {
  /**
   * The name of the function that has the Entitlement applied
   *
   * **Default Value**:  Empty array
   */
  FunctionName: string;

  /**
   * What type of Access Level the Entitlement has.
   *
   * **Full** - Complete Read / Write Access
   *
   * **ReadOnly** - Users can run existing objects for the Function (e.g Searches, Layouts, Reports) but cannot add, edit or delete.
   *
   * **Hidden** - The Function is invisible to the User.
   */
  AccessLevel: 'ReadOnly' | 'Hidden' | 'Full';
}
