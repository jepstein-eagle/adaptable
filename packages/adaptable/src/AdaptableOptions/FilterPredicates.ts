import { AdaptableApi } from '../Api/AdaptableApi';
import { Scope } from '../PredefinedConfig/Common/Scope';

export interface FilterPredicate {
  id: string;
  label: string;
  scope?: Scope;
  inputs?: FilterPredicateInput[];
  handler: FilterPredicateHandler;
}

export interface FilterPredicateInput {
  type: 'number' | 'text' | 'date';
  default?: any;
}

export interface FilterPredicateHandler {
  (params: FilterPredicateParams): boolean;
}

export interface FilterPredicateParams {
  value: any;
  inputs: any[];
  api: AdaptableApi;
}
