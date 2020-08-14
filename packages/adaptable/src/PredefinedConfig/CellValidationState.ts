import { ConfigState } from './ConfigState';
import { QueryRange } from './Common/Expression';
import { QueryObject } from './Common/QueryObject';
export interface CellValidationState extends ConfigState {
  CellValidations?: CellValidationRule[];
}

export interface CellValidationRule extends QueryObject {
  ColumnId: string;
  Range: QueryRange;
  ActionMode: 'Warn User' | 'Stop Edit';
}
