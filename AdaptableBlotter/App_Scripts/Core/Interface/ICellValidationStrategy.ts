import { IStrategy } from './IStrategy';
import { CellValidationMode, ColumnType } from '../Enums';
import { IRangeExpression } from '../Interface/IExpression';
import { Expression } from '../Expression/Expression'
import { IColumn } from '../Interface/IAdaptableBlotter';


export interface ICellValidationStrategy extends IStrategy {
}

export interface ICellValidationRule {
        ColumnId: string;
        RangeExpression: IRangeExpression,
        CellValidationMode: CellValidationMode;
        Description: string;
        HasExpression: boolean;
        OtherExpression: Expression;
}
