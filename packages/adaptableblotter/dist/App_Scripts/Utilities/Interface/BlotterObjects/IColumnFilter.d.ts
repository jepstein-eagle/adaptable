import { Expression } from '../../Expression';
import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
export interface IColumnFilter extends IAdaptableBlotterObject {
    ColumnId: string;
    Filter: Expression;
}
