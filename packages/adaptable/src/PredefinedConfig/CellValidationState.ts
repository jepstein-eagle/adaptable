import { ConfigState } from './ConfigState';
import { QueryObject } from './Common/QueryObject';
import { Predicate } from './Common/Predicate';
import { Scope } from '../types';
export interface CellValidationState extends ConfigState {
  CellValidations?: CellValidationRule[];
}

export interface CellValidationRule extends QueryObject {
  Scope: Scope;
  Predicate: Predicate;
  ActionMode: 'Warn User' | 'Stop Edit';
}
