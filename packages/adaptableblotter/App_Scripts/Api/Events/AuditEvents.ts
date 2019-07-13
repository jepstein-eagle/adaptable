import { FDC3Schema, AdaptableBlotterEventData } from './BlotterEvents';
import { AuditLogEntry } from '../../Utilities/Interface/AuditLogEntry';
import { AdaptableBlotterObject } from '../../PredefinedConfig/AdaptableBlotterObject';
import { ConfigState } from '../../PredefinedConfig/ConfigState';

export interface AuditLogEventArgs extends FDC3Schema {
  data: AuditLogEventData[];
}

export interface AuditLogEventData extends AdaptableBlotterEventData {
  id: AuditLogEntry;
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
  objectChanged: AdaptableBlotterObject;
  stateObjectChangeType: StateObjectChangeType;
}

export enum StateObjectChangeType {
  Created = 'Created',
  Updated = 'Updated',
  Deleted = 'Deleted',
}

export interface FunctionAppliedDetails {
  name: string;
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
