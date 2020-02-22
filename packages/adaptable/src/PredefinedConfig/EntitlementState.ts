import { DesignTimeState } from './DesignTimeState';
import { AdaptableFunctionName } from './Common/Types';

/**
 *
 * The Predefined Configuration for Entitlements
 *
 * The Entitlement section of Adaptable State allows you to manage which functions are available for which user and in which form.
 *
 * Each Entitlement has 3 potential values:
 *
 * - **Full** the function is fully visible and editable
 *
 * - **ReadOnly** the function is visible and preconfigured items can be used but they cannot be edited, nor new ones created
 *
 * - **Hidden** the function is completely hidden from the user - it does not appear in any menus, toolbars, tool panels etc.
 *
 * By default every function has the Entitlement of <i>Full</i>, however you can change this behaviour through setting the `DefaultAccessLevel` property.
 *
 *
 *  *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/admin/aggridentitlementsdemo/) | [Entitlements API](_api_entitlementsapi_.entitlementsapi.html)
 *
 * There are 2 ways to provide Entitlements:
 *
 * - a 'hard-coded' list provided via the `FunctionEntitlements` property
 *
 * - a function which will be called each time an Entitlement is checked, provided via the `EntitlementLookUpFunction` property
 *
 * **Entitlements Predefined Config Example using `FunctionEntitlements` property**
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
 *
 * **Entitlements Predefined Config Example using `EntitlementLookUpFunction` property**
 *
 * ```ts
 * export default {
 * Entitlements: {
 *   EntitlementLookUpFunction: (functionName: AdaptableFunctionName, userName: string, adaptableId, string) => {
 *      switch (functionName) {
 *        case 'BulkUpdate':
 *        case 'CellValidation':
 *        case 'PlusMinus':
 *        case 'SmartEdit':
 *        case 'Shortcut':
 *          return 'Hidden';
 *
 *      case 'AdvancedSearch':
 *        case 'ColumnFilter':
 *        case 'UserFilter':
 *        case 'DataSource':
 *        case 'QuickSearch':
 *          return getPermissionServerResult(functionName, userName, adaptableId);
 *      }
 *   },
 *  },
 * } as PredefinedConfig;
 * ```
 * In this example we have set:
 *
 * - All Ediiting functions to be Hidden (e.g. we have a ReadOnly grid)
 *
 * - The Searching functions to be permissioned based on the results from an Entitlements Server we call.
 *
 *  - All other functions to be 'Full' (as we have not set the `DefaultAccessLevel` property)
 */
export interface EntitlementState extends DesignTimeState {
  /**
   * A collection of `Entitlement` objects.
   */
  FunctionEntitlements?: Entitlement[];

  /**
   * Function to run instead of providing a full list of Entitlements
   *
   * Allows you to call a Permission Service externally
   */
  EntitlementLookUpFunction?: (
    functionName: AdaptableFunctionName,
    userName: string,
    adaptableId: string
  ) => AccessLevel | undefined;

  /**
   * The AccessLevel to use for any Entitlement when its not explicitly set.
   *
   * If this property is not set then any non-specified Entitlements will be 'Full'
   *
   * **Default Value: 'Full'**
   */
  DefaultAccessLevel?: AccessLevel;
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
  AccessLevel: AccessLevel;
}

export type AccessLevel = 'ReadOnly' | 'Hidden' | 'Full';
