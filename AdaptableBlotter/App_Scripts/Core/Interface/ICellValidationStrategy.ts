import { IStrategy } from './IStrategy';
import { CellChangeType, CellValidationAction } from '../Enums';
import { IDataChangedEvent } from '../Services/Interface/IAuditService'


export interface ICellValidationStrategy extends IStrategy {
        ValidateCellChange(dataChangingEvent: IDataChangedEvent): boolean
        CreateEmptyCellValidationRule(): ICellValidationRule
}

export interface ICellValidationRule {
        CellChangeRule: ICellChangeRule;
        CellValidationAction: CellValidationAction;
        Description: string;
}

export interface ICellChangeRule {
        ColumnId: string,
        CellChangeType: CellChangeType,
        ChangeValue: any,
}



