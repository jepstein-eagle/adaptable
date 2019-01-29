import { IRange } from "./IRange";
/**
 * Any ranges contained in the expression, grouped by column
 */
export interface IRangeExpression {
    ColumnId: string;
    Ranges: IRange[];
}
