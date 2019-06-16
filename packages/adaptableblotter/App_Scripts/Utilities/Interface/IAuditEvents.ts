import { IState } from '../../PredefinedConfig/Interfaces/IState';
import { IFDC3Schema, IAdaptableBlotterEventData } from './IBlotterEvents';
import { IAuditLogEntry } from './IAuditLogEntry';
import { IAdaptableBlotterObject } from '../../PredefinedConfig/IAdaptableBlotterObject';

export interface IAuditLogEventArgs extends IFDC3Schema {
  data: IAuditLogEventData[];
}

export interface IAuditLogEventData extends IAdaptableBlotterEventData {
  id: IAuditLogEntry;
}

export interface IStateChangedDetails {
  name: string;
  actionType: any;
  state: IState;
  diffInfo: any;
}

export interface IStatePropertyChangedDetails extends IStateChangedDetails {
  propertyName: string;
  oldValue: string;
  newValue: string;
}

export interface IStateObjectChangedDetails extends IStateChangedDetails {
  objectChanged: IAdaptableBlotterObject;
  stateObjectChangeType: StateObjectChangeType;
}

export enum StateObjectChangeType {
  Created = 'Created',
  Updated = 'Updated',
  Deleted = 'Deleted',
}

export interface IFunctionAppliedDetails {
  name: string;
  action: string;
  info?: string;
  data?: any;
}

export interface ICellEditDetails {
  primarykey_column_value: string;
  primarykey_column_id: string;
  column_id: string;
  previous_value: string;
  new_value: string;
}
