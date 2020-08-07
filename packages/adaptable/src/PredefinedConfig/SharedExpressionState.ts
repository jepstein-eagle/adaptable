import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';

export interface SharedExpressionState extends ConfigState {
  SharedExpressions?: SharedExpression[];
}

export interface SharedExpression extends AdaptableObject {
  Name: string;
  Expression: string;
}
