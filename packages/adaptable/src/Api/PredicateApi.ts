import {
  PredicateDef,
  Predicate,
  PredicateDefHandlerParams,
} from '../PredefinedConfig/Common/Predicate';
import { FunctionScope } from '../PredefinedConfig/Common/Scope';

export interface PredicateApi {
  getPredicateDefs(): PredicateDef[];
  getSystemPredicateDefs(): PredicateDef[];
  getCustomPredicateDefs(): PredicateDef[];
  getPredicateDefsByFunctionScope(functionScope: FunctionScope): PredicateDef[];
  getPredicateDefById(predicateId: string): PredicateDef;
  getSystemPredicateDefById(predicateId: string): PredicateDef;
  getCustomPredicateDefById(predicateId: string): PredicateDef;
  predicateToString(predicate: Predicate): string;

  handlePredicate(
    predicate: Predicate,
    params: Omit<PredicateDefHandlerParams, 'api' | 'inputs'>
  ): boolean;
}
