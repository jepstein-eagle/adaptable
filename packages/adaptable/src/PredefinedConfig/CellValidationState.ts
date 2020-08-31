import { ConfigState } from './ConfigState';
import { QueryObject } from './Common/QueryObject';
import { Predicate } from './Common/Predicate';
export interface CellValidationState extends ConfigState {
  CellValidations?: CellValidationRule[];
}

export interface CellValidationRule extends QueryObject {
  ColumnId: string;
  Predicate: Predicate;
  ActionMode: 'Warn User' | 'Stop Edit';
}
