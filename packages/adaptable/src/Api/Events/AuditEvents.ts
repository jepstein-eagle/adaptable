import { AdaptableEventData, AdaptableEventArgs } from './AdaptableEvents';
import { AuditLogEntry } from '../../Utilities/Interface/AuditLogEntry';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { ConfigState } from '../../PredefinedConfig/ConfigState';
import { AdaptableFunctionName } from '../../types';

export interface AuditLogEventData extends AdaptableEventData {
  id: AuditLogEntry;
}

export interface AuditLogEventArgs extends AdaptableEventArgs {
  data: AuditLogEventData[];
}

export interface StateChangedDetails {
  name: string;
  actionType: any;
  state: ConfigState;
  diffInfo: any;
}

export interface StatePropertyChangedDetails extends StateChangedDetails {
  propertyName: string;
  oldValue: string;
  newValue: string;
}

export interface StateObjectChangedDetails extends StateChangedDetails {
  objectChanged: AdaptableObject;
  stateObjectChangeType: StateObjectChangeType;
}

export enum StateObjectChangeType {
  Created = 'Created',
  Updated = 'Updated',
  Deleted = 'Deleted',
}

export interface FunctionAppliedDetails {
  name: AdaptableFunctionName;
  action: string;
  info?: string;
  data?: any;
}

export interface DataChangedDetails {
  primarykey_column_value: string;
  primarykey_column_id: string;
  column_id: string;
  previous_value: string;
  new_value: string;
  row_data: any;
}
