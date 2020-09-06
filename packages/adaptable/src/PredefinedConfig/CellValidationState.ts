import { ConfigState } from './ConfigState';
import { QueryObject } from './Common/QueryObject';
import { AdaptablePredicate } from './Common/AdaptablePredicate';
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

export interface CellValidationRulePredicate extends AdaptablePredicate {
  PredicateId: TypeHint<string, SystemValidationPredicateId>;
}

type SystemValidationPredicateId = 'Blanks' | 'NonBlanks';
