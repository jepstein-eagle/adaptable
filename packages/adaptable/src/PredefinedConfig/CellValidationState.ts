import { ConfigState } from './ConfigState';
import { QueryObject } from './Common/QueryObject';
import { Predicate } from './Common/Predicate';
import { Scope } from '../types';
import { TypeHint } from './Common/Types';
export interface CellValidationState extends ConfigState {
  CellValidations?: CellValidationRule[];
}

export interface CellValidationRule extends QueryObject {
  Scope: Scope;
  Predicate: CellValidationRulePredicate;
  ActionMode: 'Warn User' | 'Stop Edit';
}

export interface CellValidationRulePredicate extends Predicate {
  PredicateId: TypeHint<string, SystemValidationPredicateId>;
}

type SystemValidationPredicateId = 'Blanks' | 'NonBlanks';
