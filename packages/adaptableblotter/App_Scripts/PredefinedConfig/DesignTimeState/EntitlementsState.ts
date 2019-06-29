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

/*

Only list the functions that you wish to be hidden or readonly. IEntitlement contains 2 properties: 

FunctionName: a string representing the function name. Must be a valid value (the list is in the Appendix).

AccessLevel: must be one of ReadOnly, Hidden or Default. ReadOnly means the function is visible and working but properties cannot be changed and items cannot be added. Hidden means that the function is not available at all. Default means both available and fully editable.
*/
