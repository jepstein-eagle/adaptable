import { AdaptableApi } from '../Api/AdaptableApi';
import { Scope } from '../PredefinedConfig/Common/Scope';

export interface FilterPredicate {
  name: string;
  handler: (value: any, ...inputs: any[]) => boolean;
  inputs?: FilterPredicateInput[];
  scope?: Scope;
}

export interface FilterPredicateInput {
  type: 'number' | 'text' | 'date';
  default?: any;
}
