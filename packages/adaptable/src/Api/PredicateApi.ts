import {
  PredicateDef,
  AdaptablePredicate,
  PredicateDefHandlerParams,
  FunctionScope,
} from '../PredefinedConfig/Common/AdaptablePredicate';

export interface PredicateApi {
  getPredicateDefs(): PredicateDef[];
  getSystemPredicateDefs(): PredicateDef[];
  getCustomPredicateDefs(): PredicateDef[];
  getPredicateDefsByFunctionScope(functionScope: FunctionScope): PredicateDef[];
  getPredicateDefById(predicateId: string): PredicateDef;
  getSystemPredicateDefById(predicateId: string): PredicateDef;
  getCustomPredicateDefById(predicateId: string): PredicateDef;
  predicateToString(predicate: AdaptablePredicate): string;

  handlePredicate(
    predicate: AdaptablePredicate,
    params: Omit<PredicateDefHandlerParams, 'api' | 'inputs'>,
    defaultReturn: boolean
  ): boolean;
}
