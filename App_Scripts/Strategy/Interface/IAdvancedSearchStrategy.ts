import { IStrategy } from './IStrategy';
import { Expression } from '../../Core/Expression';
import { IAdaptableBlotterObject } from '../../Core/Interface/Interfaces';

export interface IAdvancedSearchStrategy extends IStrategy {
}

export interface IAdvancedSearch extends IAdaptableBlotterObject {
 // Uid: string,
  Name: string,
  Expression: Expression,
}

