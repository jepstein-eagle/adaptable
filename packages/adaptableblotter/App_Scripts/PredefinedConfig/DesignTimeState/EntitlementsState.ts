import { DesignTimeState } from './DesignTimeState';

/**
 * DESIGN TIME STATE IMPLEMENTATIONS - Entitlement, UserInterface, SystemFilter, Application
 */
export interface EntitlementsState extends DesignTimeState {
  FunctionEntitlements?: IEntitlement[];
}

export interface IEntitlement {
  FunctionName: string;
  AccessLevel: 'ReadOnly' | 'Hidden' | 'Full';
}
