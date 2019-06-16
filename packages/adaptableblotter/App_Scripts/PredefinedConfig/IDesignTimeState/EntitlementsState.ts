import { IDesignTimeState } from './IDesignTimeState';

/**
 * DESIGN TIME STATE IMPLEMENTATIONS - Entitlement, UserInterface, SystemFilter, Application
 */
export interface EntitlementsState extends IDesignTimeState {
  FunctionEntitlements?: IEntitlement[];
}

export interface IEntitlement {
  FunctionName: string;
  AccessLevel: 'ReadOnly' | 'Hidden' | 'Full';
}
