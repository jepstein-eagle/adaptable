import { ApiBase } from './ApiBase';
import { PredicateApi } from '../PredicateApi';
import {
  PredicateDef,
  AdaptablePredicate,
  PredicateDefHandlerParams,
  SystemPredicateDefs,
  FunctionScope,
} from '../../PredefinedConfig/Common/AdaptablePredicate';
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

  public predicateToString(predicate: AdaptablePredicate): string | undefined {
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
    predicate: AdaptablePredicate,
    params: Omit<PredicateDefHandlerParams, 'api' | 'inputs'>,
    defaultReturn: boolean
  ) {
    const predicateDef = this.adaptable.api.predicateApi.getPredicateDefById(predicate.PredicateId);

    if (predicateDef === undefined) {
      return defaultReturn;
    }

    if (
      predicateDef.inputs?.some(
        (_, i) => predicate.Inputs?.[i] === undefined || predicate.Inputs?.[i] === ''
      )
    ) {
      return defaultReturn;
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
