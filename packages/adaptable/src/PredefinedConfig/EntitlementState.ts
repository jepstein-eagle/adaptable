import { ConfigState } from './ConfigState';
import { AdaptableFunctionName } from './Common/Types';
import { BaseUserFunction } from '../AdaptableOptions/UserFunctions';

/**
 *
 * The Predefined Configuration for Entitlements
 *
 * The Entitlement section of Adaptable State allows you to manage permissions in AdapTable, i.e. which AdaptableFunctions are available for which user and in which form.
 *
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/admin/aggridentitlementsdemo/) | [Entitlements Api](_src_api_entitlementsapi_.entitlementsapi.html)
 *
 *  Entitlements work at the `AdaptableFunction Level`.  Each Entitlement has 3 potential `AccessLevel` values:
 *
 * - **Full** - the AdaptableFunction is fully visible and editable
 *
 * - **Hidden** - the function is completely hidden from the user - it does not appear in any menus, toolbars, tool panels etc.
 *
 * - **ReadOnly** - the function is visible and preconfigured items can be used but they cannot be edited, nor new ones created.
 *
 * > *ReadOnly* is designed for when you want to let users use the reports or layouts you have pre-configured but not to be allowed to create their own.  As a result it is typically used for AdaptableFunctions which can pre-load objects like 'AdavancedSearch', 'Export', 'ConditionalStyle' etc.)
 *
 * Note:  By default every AdaptableFunction has the Entitlement of <b>Full</b>.  However you can change this behaviour through setting the `DefaultAccessLevel` property.  e.g. you can set it to 'Hidden' and then only AdaptableFunctions explicity permissioned in Entitlements will be available.
 *
 * There are 2 ways to provide Entitlements:
 *
 * 1. a 'hard-coded' list provided via the `FunctionEntitlements` property
 *
 * 2. via a function which you reference in Predefined Config and provide the implementation in userOptions section of Adaptable Options.
 *
 * This funtion will be called each time an Entitlement is checked, provided via the `EntitlementLookUpFunction` property
 *
 *  --------------
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
 * - **2 Hidden Entitlements**: Column Category and Advanced Search.  This means that these AdaptableFunctions wont be available in any menus, and nor will any associated toolbars and tool panel elements.
 *
 * --------------
 *
 * **Entitlements Predefined Config Example using `EntitlementLookUpFunction` property**
 *
 * ```ts
 * // Predefined Config
 * export default {
 *  Entitlements: {
 *    DefaultAccessLevel: 'Full',
 *    EntitlementLookUpFunction: 'serverLookUp',
 *   },
 *  },
 * } as PredefinedConfig;
 *
 *
 * // Adaptable Options
 * const adaptableOptions: AdaptableOptions = {
 * ......
 *  userFunctions: [
 *     {
 *        name: 'EntitlementLookUpFunction',
 *        type: 'serverLookUp',
 *        handler(functionName: AdaptableFunctionName, userName: string, adaptableId: string) {
 *          switch (funcName) {
 *              case 'BulkUpdate':
 *              case 'CellValidation':
 *              case 'PlusMinus':
 *              case 'SmartEdit':
 *              case 'Shortcut':
 *                return 'Hidden';
 *
 *              case 'AdvancedSearch':
 *              case 'Filter':
 *              case 'UserFilter':
 *              case 'DataSource':
 *              case 'QuickSearch':
 *                return getPermissionServerResult(funcName, userName, adaptableId);
 *          }
 *      },
 *    ],
 * ```
 * In this example we have set:
 *
 * - All Ediiting-related AdaptableFunctions to be Hidden (e.g. we have a ReadOnly grid)
 *
 * - The Searching-related AdaptableFunctions to be permissioned based on the results from an Entitlements Server we call.
 *
 * - All other AdaptableFunctions to be 'Full' (as we have not set the `DefaultAccessLevel` property)
 *
 * --------------
 */
export interface EntitlementState extends ConfigState {
  /**
   * A collection of `Entitlement` objects.
   */
  FunctionEntitlements?: Entitlement[];

  /**
   * A function which will be run to get Entitlements (rather than providing a full list of Entitlements)
   *
   * Allows you to call a Permission Service externally
   */
  EntitlementLookUpFunction?: string;

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
 * The object used in the [Entitlement](_src_predefinedconfig_entitlementstate_.entitlementstate.html) section of Predefined Config.
 */
export interface Entitlement {
  /**
   * The name of AdaptableFunction that has the Entitlement applied.
   *
   * The property is of type `AdaptableFunctionName` which provides a strongly typed list of all available AdaptableFunctions.
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

/**
 * Type used for managing Entitlements
 *
 * Has 3 possible values:
 *
 * - 'Full' : the AdaptableFunction is fully available
 *
 * - 'Hidden' : the AdaptableFunction is completely invisible to the User
 *
 * - 'ReadOnly' : the AdaptableFunction is visible but only those objects provided in PredefinedConfig can be used (and are not editable)
 */
export type AccessLevel = 'ReadOnly' | 'Hidden' | 'Full';

export interface EntitlementLookUpFunction extends BaseUserFunction {
  type: 'EntitlementLookUpFunction';
  name: string;
  handler: (
    functionName: AdaptableFunctionName,
    userName: string,
    adaptableId: string
  ) => AccessLevel | undefined;
}
