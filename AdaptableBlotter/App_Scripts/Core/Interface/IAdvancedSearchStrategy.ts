import { IColumn } from './IAdaptableBlotter';
import { IStrategy } from './IStrategy';
import { Expression } from '../Expression/Expression';

export interface IAdvancedSearchStrategy extends IStrategy {
}

export interface IAdvancedSearch {
  Uid: string,
  Name: string,
  Expression: Expression,
}

