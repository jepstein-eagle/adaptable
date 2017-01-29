import { IStrategy } from './IStrategy';
import { CellValidationAction, ColumnType } from '../Enums';
import { IDataChangedEvent } from '../Services/Interface/IAuditService'
import { IRangeExpression } from '../Interface/IExpression';
import { Expression } from '../Expression/Expression'


export interface ICellValidationStrategy extends IStrategy {
        ValidateCellChange(dataChangingEvent: IDataChangedEvent): boolean
        CreateEmptyCellValidationRule(): ICellValidationRule
}

export interface ICellValidationRule {
        ColumnId: string;
        RangeExpression: IRangeExpression,
        CellValidationAction: CellValidationAction;
        Description: string;
        ColumnType: ColumnType;
        HasOtherExpression: boolean;
        OtherExpression: Expression;
}
