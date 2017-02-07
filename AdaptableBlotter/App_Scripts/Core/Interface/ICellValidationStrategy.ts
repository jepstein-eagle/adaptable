import { IStrategy } from './IStrategy';
import { CellValidationAction, ColumnType } from '../Enums';
import { IRangeExpression } from '../Interface/IExpression';
import { Expression } from '../Expression/Expression'
import { IColumn } from '../Interface/IAdaptableBlotter';


export interface ICellValidationStrategy extends IStrategy {
        CreateCellValidationMessage(cellValidationRule: ICellValidationRule): string 
}

export interface ICellValidationRule {
        ColumnId: string;
        RangeExpression: IRangeExpression,
        CellValidationAction: CellValidationAction;
        Description: string;
        HasExpression: boolean;
        OtherExpression: Expression;
}
