import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';

export interface QueryState extends ConfigState {
  SharedQueries?: SharedQuery[];
  CurrentQuery?: string; // can it be a type?  perhaps it should be both?
}

export interface SharedQuery extends AdaptableObject {
  Name: string;
  Expression: string;
}
