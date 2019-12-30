import { EntitlementState, Entitlement } from '../PredefinedConfig/EntitlementState';
import { AdaptableFunctionName } from '../PredefinedConfig/Common/Types';

/**
 * Provides access to the **Entitlements** section of the Adaptable State.
 *
 *  **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/admin/aggridentitlementsdemo/) | [Entitlements State](_predefinedconfig_entitlementstate_.entitlementstate.html)
 *
 */
export interface EntitlementsApi {
  /**
   * Retrieves the Entitlements section from the Adaptable State
   */
  getEntitlementsState(): EntitlementState;

  /**
   * Retrieves all the Entitlements in the Entitlement state
   */
  getAllEntitlements(): Entitlement[];

  /**
   * Retrieves the Entitlement for a given Adaptable Function
   * @param adaptableFunctionName the Adaptable Function for which to get the Entitlement
   */
  getEntitlementByAdaptableFunctionName(adaptableFunctionName: AdaptableFunctionName): Entitlement;

  /**
   * Retrieves the Entitlement Access Level for a given Adaptable Function
   * @param adaptableFunctionName the Adaptable Function for which to get the Entitlement Access Level
   */
  getEntitlementAccessLevelForAdaptableFunctionName(
    adaptableFunctionName: AdaptableFunctionName
  ): string;

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
   * @param adaptableFunctionName the Adaptable Function for which to add the Entitlement
   * @param accessLevel the Access Level for the new Entitlement
   */
  createEntitlement(
    adaptableFunctionName: AdaptableFunctionName,
    accessLevel: 'ReadOnly' | 'Hidden' | 'Full'
  ): void;

  /**
   * Edits an existing Entitlement
   * @param adaptableFunctionName the Adaptable Function for which the Entitlement is being edited
   * @param accessLevel the new Access Level for the Entitlement
   */
  editEntitlement(
    adaptableFunctionName: AdaptableFunctionName,
    accessLevel: 'ReadOnly' | 'Hidden' | 'Full'
  ): void;

  /**
   * Deletes an existing Entitlement
   * @param adaptableFunctionName the Adaptable Function for which the Entitlement is being removed
   */
  deleteEntitlement(adaptableFunctionName: AdaptableFunctionName): void;
}
