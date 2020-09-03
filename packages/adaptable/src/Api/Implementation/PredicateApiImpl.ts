import { ApiBase } from './ApiBase';
import { PredicateApi } from '../PredicateApi';
import {
  SystemPredicateDefsById,
  PredicateDef,
  Predicate,
  PredicateDefHandlerParams,
  SystemPredicateDefs,
} from '../../PredefinedConfig/Common/Predicate';
import { FunctionScope } from '../../PredefinedConfig/Common/Scope';

export class PredicateApiImpl extends ApiBase implements PredicateApi {
  public getPredicateDefs() {
    return SystemPredicateDefs;
  }

  public getPredicateDefsByFunctionScope(functionScope: FunctionScope): PredicateDef[] {
    return this.getPredicateDefs().filter(p => p.functionScope.includes(functionScope));
  }

  public getPredicateDefById(predicateId: string): PredicateDef {
    return SystemPredicateDefsById[predicateId];
  }

  public predicateToString(predicate: Predicate): string {
    const predicateDef = this.getPredicateDefById(predicate.Id);
    return predicateDef.toString({ inputs: predicate.Inputs });
  }

  public handlePredicate(
    predicate: Predicate,
    params: Omit<PredicateDefHandlerParams, 'api' | 'inputs'>
  ) {
    const predicateDef = this.adaptable.api.predicateApi.getPredicateDefById(predicate.Id);

    if (predicateDef === undefined) {
      return true;
    }

    if (predicate.Inputs?.some(Input => Input === '')) {
      return true;
    }

    try {
      return predicateDef.handler({
        api: this.adaptable.api,
        inputs: predicate.Inputs,
        ...params,
      });
    } catch (error) {
      console.error(`Error in predicate ${predicateDef.name}`, error);
      return false;
    }
  }
}
