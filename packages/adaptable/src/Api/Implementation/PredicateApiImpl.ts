import { ApiBase } from './ApiBase';
import { PredicateApi } from '../PredicateApi';
import {
  PredicateDef,
  Predicate,
  PredicateDefHandlerParams,
  SystemPredicateDefs,
} from '../../PredefinedConfig/Common/Predicate';
import { FunctionScope } from '../../PredefinedConfig/Common/Scope';
import { LogAdaptableWarning } from '../../Utilities/Helpers/LoggingHelper';

export class PredicateApiImpl extends ApiBase implements PredicateApi {
  public getPredicateDefs() {
    return [...this.getSystemPredicateDefs(), ...this.getCustomPredicateDefs()];
  }

  public getSystemPredicateDefs() {
    return SystemPredicateDefs;
  }

  public getCustomPredicateDefs() {
    return this.adaptable.adaptableOptions.customPredicateDefs;
  }

  public getPredicateDefsByFunctionScope(functionScope: FunctionScope): PredicateDef[] {
    return this.getPredicateDefs().filter(p => p.functionScope.includes(functionScope));
  }

  public getPredicateDefById(predicateId: string): PredicateDef {
    return (
      this.getSystemPredicateDefById(predicateId) ?? this.getCustomPredicateDefById(predicateId)
    );
  }

  public getSystemPredicateDefById(predicateId: string): PredicateDef {
    return this.getSystemPredicateDefs().find(predicateDef => predicateDef.id === predicateId);
  }

  public getCustomPredicateDefById(predicateId: string): PredicateDef {
    return this.getCustomPredicateDefs().find(predicateDef => predicateDef.id === predicateId);
  }

  public predicateToString(predicate: Predicate): string | undefined {
    const predicateDef = this.getPredicateDefById(predicate.PredicateId);
    if (!predicateDef) {
      LogAdaptableWarning('Cannot find Predicate with Id:' + predicate.PredicateId);
      return '[Predicate Not found]';
    }
    return predicateDef.hasOwnProperty('toString')
      ? predicateDef.toString({ inputs: predicate.Inputs })
      : predicateDef.label;
  }

  public handlePredicate(
    predicate: Predicate,
    params: Omit<PredicateDefHandlerParams, 'api' | 'inputs'>
  ) {
    const predicateDef = this.adaptable.api.predicateApi.getPredicateDefById(predicate.PredicateId);

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
      console.error(`Error in predicate ${predicateDef.label}`, error);
      return false;
    }
  }
}
