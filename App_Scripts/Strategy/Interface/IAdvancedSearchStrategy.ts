import { IAdaptableBlotterObject } from '../../Core/Interface/IAdaptableBlotter';
import { IStrategy } from './IStrategy';
import { Expression } from '../../Core/Expression';

export interface IAdvancedSearchStrategy extends IStrategy {
}

export interface IAdvancedSearch extends IAdaptableBlotterObject {
 // Uid: string,
  Name: string,
  Expression: Expression,
}

