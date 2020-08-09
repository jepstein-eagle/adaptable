import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';

export interface SharedQueryState extends ConfigState {
  SharedQueries?: SharedQuery[];
}

export interface SharedQuery extends AdaptableObject {
  Name: string;
  Expression: string;
}
