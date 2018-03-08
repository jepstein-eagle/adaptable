import { IStrategy } from './IStrategy';
import { CellValidationMode } from '../../Core/Enums';
import { IRange } from '../../Core/Interface/IRange';
import { Expression } from '../../Core/Expression'
import { IAdaptableBlotterObject } from '../../Core/Interface/IAdaptableBlotter';
export interface ICellValidationStrategy extends IStrategy {
}

export interface ICellValidationRule extends IAdaptableBlotterObject {
        ColumnId: string;
        Range: IRange,
        CellValidationMode: CellValidationMode;
        Description: string;
        HasExpression: boolean;
        OtherExpression: Expression;
}
