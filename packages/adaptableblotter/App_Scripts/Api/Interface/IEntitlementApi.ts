import {
  EntitlementsState,
  IEntitlement,
} from '../../PredefinedConfig/DesignTimeState/EntitlementsState';

export interface IEntitlementApi {
  getEntitlementState(): EntitlementsState;
  getAllEntitlement(): IEntitlement[];
  getEntitlementByFunction(functionName: string): IEntitlement;
  getEntitlementAccessLevelForFunction(functionName: string): string;
  addEntitlement(functionName: string, accessLevel: 'ReadOnly' | 'Hidden' | 'Full'): void;
  editEntitlement(functionName: string, accessLevel: 'ReadOnly' | 'Hidden' | 'Full'): void;
  deleteEntitlement(functionName: string): void;
}
