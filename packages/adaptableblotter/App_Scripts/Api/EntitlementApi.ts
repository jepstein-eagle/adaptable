import {
  EntitlementsState,
  Entitlement,
} from '../PredefinedConfig/DesignTimeState/EntitlementsState';

export interface EntitlementApi {
  getEntitlementState(): EntitlementsState;
  getAllEntitlement(): Entitlement[];
  getEntitlementByFunction(functionName: string): Entitlement;
  getEntitlementAccessLevelForFunction(functionName: string): string;
  addEntitlement(functionName: string, accessLevel: 'ReadOnly' | 'Hidden' | 'Full'): void;
  editEntitlement(functionName: string, accessLevel: 'ReadOnly' | 'Hidden' | 'Full'): void;
  deleteEntitlement(functionName: string): void;
}
