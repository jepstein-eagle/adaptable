import { Expression } from '../../Expression';
import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
export interface IAdvancedSearch extends IAdaptableBlotterObject {
    Name: string;
    Expression: Expression;
}
