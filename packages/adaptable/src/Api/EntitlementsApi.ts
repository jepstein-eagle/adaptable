import { EntitlementState, Entitlement, AccessLevel } from '../PredefinedConfig/EntitlementState';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';

/**
 * Provides access to the **Entitlements** section of Adaptable State.
 *
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/admin/aggridentitlementsdemo/) | [Entitlements State](_src_predefinedconfig_entitlementstate_.entitlementstate.html)
 *
 */
export interface EntitlementsApi {
  /**
   * Returns everything in the Entitlement section of AdapTable state
   */
  getEntitlementState(): EntitlementState;

  /**
   * Returns true if give function has an `AccessLevel` of 'Hidden'
   *
   * Will check the Entitlement section of AdapTable state.
   *
   * First it will call the `EntitlementLookUpFunction` if that has been provided
   *
   * If there is no function then it will get the value from `FunctionEntitlements`
   *
   * @param adaptableFunctionName the name of the function to check
   */
  isFunctionHiddenEntitlement(adaptableFunctionName: AdaptableFunctionName): boolean;

  /**
   * Returns true if give function has an `AccessLevel` of 'Full'
   *
   * Will check the Entitlement section of AdapTable state.
   *
   * First it will call the `EntitlementLookUpFunction` if that has been provided
   *
   * If there is no function then it will get the value from `FunctionEntitlements`
   *
   * @param adaptableFunctionName the name of the function to check
   */
  isFunctionFullEntitlement(adaptableFunctionName: AdaptableFunctionName): boolean;

  /**
   * Returns true if give function has an `AccessLevel` of 'ReadOnly'
   *
   * Will check the Entitlement section of AdapTable state.
   *
   * First it will call the `EntitlementLookUpFunction` if that has been provided
   *
   * If there is no function then it will get the value from `FunctionEntitlements`
   *
   * @param adaptableFunctionName the name of the function to check
   */
  isFunctionReadOnlyEntitlement(adaptableFunctionName: AdaptableFunctionName): boolean;

  /**
   * Retrieves the Entitlement Access Level for a given Adaptable Function
   * @param adaptableFunctionName Adaptable Function for which to get the Entitlement Access Level
   */
  getEntitlementAccessLevelByAdaptableFunctionName(
    adaptableFunctionName: AdaptableFunctionName
  ): AccessLevel;

  /**
   * Adds an array of Entitlements to the Entitlement section of Adaptable State
   *
   * @param entitlements the Entitlements to add
   */
  addEntitlements(entitlements: Entitlement[]): void;

  /**
   * Adds a new Entitlement to the Entitlement section of Adaptable State
   *
   * @param entitlement the Entitlement to add
   */
  addEntitlement(entitlement: Entitlement): void;

  /**
   * Creates a new Entitlement and adds it to the Entitlement section of Adaptable State
   *
   * @param adaptableFunctionName Adaptable Function for which to add the Entitlement
   * @param accessLevel the Access Level for the new Entitlement
   */
  createEntitlement(
    adaptableFunctionName: AdaptableFunctionName,
    accessLevel: 'ReadOnly' | 'Hidden' | 'Full'
  ): void;

  /**
   * Edits an existing Entitlement
   * @param adaptableFunctionName Adaptable Function for which the Entitlement is being edited
   * @param accessLevel the new Access Level for the Entitlement
   */
  editEntitlement(
    adaptableFunctionName: AdaptableFunctionName,
    accessLevel: 'ReadOnly' | 'Hidden' | 'Full'
  ): void;

  /**
   * Deletes an existing Entitlement
   * @param adaptableFunctionName Adaptable Function for which the Entitlement is being removed
   */
  deleteEntitlement(adaptableFunctionName: AdaptableFunctionName): void;
}
