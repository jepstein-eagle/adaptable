import { IStrategy } from './IStrategy';
import { CellValidationMode, ColumnType } from '../Enums';
import { IRangeExpression } from '../Interface/IExpression';
import { Expression } from '../Expression/Expression'
import { IColumn } from '../Interface/IAdaptableBlotter';
import { IConfigEntity } from './IAdaptableBlotter'

export interface ICellValidationStrategy extends IStrategy {
}

export interface ICellValidationRule extends IConfigEntity {
        ColumnId: string;
        RangeExpression: IRangeExpression,
        CellValidationMode: CellValidationMode;
        Description: string;
        HasExpression: boolean;
        OtherExpression: Expression;
}
