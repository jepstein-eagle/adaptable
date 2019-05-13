import { IFDC3Schema, IStateEventData } from '../IStateEvents';
export interface IStateChangedEventArgs extends IFDC3Schema {
  data: IStateEventData[];
}

export interface IStateChangedDetails {}
