import { IColumn } from './IAdaptableBlotter';
import { IStrategy } from './IStrategy';
import { Expression } from '../Expression/Expression';
import { IConfigEntity } from './IAdaptableBlotter'

export interface IAdvancedSearchStrategy extends IStrategy {
}

export interface IAdvancedSearch extends IConfigEntity {
  Uid: string,
  Name: string,
  Expression: Expression,
}

