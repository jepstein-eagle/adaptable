import { InternalState } from './InternalState';
import { AdaptableObject } from './Common/AdaptableObject';
import { AdaptableFunctionName } from '../types';

/**
 * The Predefined Configuration for the Team Sharing function
 *
 * Team sharing allows users to share part of their own configuration data with other users (e.g. if one user wants to share a "Pricing View" Layout which has been created with another user).
 *
 * As soon as new Adaptable Objects are created, they can be instantly shared with team members.
 *
 * To share an item click the share button that appears at the end of the row and this will put the Adaptable Object into a storage location where it can then be downloaded by other team members via the Team Sharing popup.
 *
 * **Note**: Team Sharing is only available if the Configuration Storage mode is Remote Storage; If the mode is set to Local Storage, Team Sharing is disabled.
 */
export interface TeamSharingState extends InternalState {
  SharedEntities: SharedEntity[];
}

export interface SharedEntity extends AdaptableObject {
  Entity: AdaptableObject;
  FunctionName: AdaptableFunctionName;
  Timestamp: number;
  UserName: string;
  Description: string;
}
