import {
  PredicateDef,
  Predicate,
  PredicateDefHandlerParams,
} from '../PredefinedConfig/Common/Predicate';
import { FunctionScope } from '../PredefinedConfig/Common/Scope';

export interface PredicateApi {
  getPredicateDefs(): PredicateDef[];
  getPredicateDefsByFunctionScope(functionScope: FunctionScope): PredicateDef[];
  getPredicateDefById(predicateId: string): PredicateDef;

  handlePredicate(
    predicate: Predicate,
    params: Omit<PredicateDefHandlerParams, 'api' | 'inputs'>
  ): boolean;
}
