import {
  AdaptablePredicateDef,
  AdaptablePredicate,
  PredicateDefHandlerParams,
  FunctionScope,
} from '../PredefinedConfig/Common/AdaptablePredicate';

export interface PredicateApi {
  getPredicateDefs(): AdaptablePredicateDef[];
  getSystemPredicateDefs(): AdaptablePredicateDef[];
  getCustomPredicateDefs(): AdaptablePredicateDef[];
  getPredicateDefsByFunctionScope(functionScope: FunctionScope): AdaptablePredicateDef[];
  getPredicateDefById(predicateId: string): AdaptablePredicateDef;
  getSystemPredicateDefById(predicateId: string): AdaptablePredicateDef;
  getCustomPredicateDefById(predicateId: string): AdaptablePredicateDef;
  predicateToString(predicate: AdaptablePredicate): string;

  handlePredicate(
    predicate: AdaptablePredicate,
    params: Omit<PredicateDefHandlerParams, 'api' | 'inputs'>,
    defaultReturn: boolean
  ): boolean;
}
