import { IStrategy } from './IStrategy';
import { CellValidationMode } from '../../Core/Enums';
import { IRangeExpression } from '../../Core/Interface/IExpression';
import { Expression } from '../../Core/Expression'
//import { IColumn } from '../Interface/IAdaptableBlotter';
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
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
