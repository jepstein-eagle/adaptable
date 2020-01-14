import { DesignTimeState } from './DesignTimeState';
import { AdaptableFunctionName } from './Common/Types';

/**
 *
 * The Predefined Configuration for Entitlements
 *
 * The Entitlement section of Adaptable State allows you to manage which functions are available for which user and in which form.
 *
 * By default every function has the Entitlement of <i>Full</i>, so only set those which you want to be different to that default.
 *
 *  *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/admin/aggridentitlementsdemo/) | [Entitlements API](_api_entitlementsapi_.entitlementsapi.html)
 *
 * **Entitlements Predefined Config Example**
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
 *      {
 *        FunctionName: 'Export',
 *        AccessLevel: 'ReadOnly',
 *     },
 *    ],
 *  },
 * } as PredefinedConfig;
 * ```
 * In this example we have set:
 *
 * - **2 ReadOnly Entitlements**: Export and Layout.  This means that users can access any existing layouts and reports but cannot add / edit / delete their own.
 *
 * - **2 Hidden Entitlements**: Column Category and Advanced Search.  This means that these functions wont be available in any menus, and nor will any associcated toolbars and tool panel elements.
 */
export interface EntitlementState extends DesignTimeState {
  /**
   * A collection of `Entitlement` objects.
   */
  FunctionEntitlements?: Entitlement[];
}

/**
 * The object used in the [Entitlement](_predefinedconfig_entitlementstate_.entitlementstate.html) section of Predefined Config.
 */
export interface Entitlement {
  /**
   * The name of Adaptable Function that has the Entitlement applied.
   *
   * The property is of type `AdaptableFunctionName` which provides a strongly typed list of all available Functions.
   */
  FunctionName: AdaptableFunctionName;

  /**
   * What type of Access Level the Entitlement provides.
   *
   * The options are:
   *
   * - **Full** - Complete Read / Write Access
   *
   * - **ReadOnly** - Users can access existing objects related to the Function (e.g Searches, Layouts, Reports) but cannot add, edit or delete them.
   *
   * - **Hidden** - The Function is invisible to the User.
   */
  AccessLevel: 'ReadOnly' | 'Hidden' | 'Full';
}
