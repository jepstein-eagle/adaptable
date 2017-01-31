import { IStrategy } from './IStrategy';
import { EditingRestrictionAction, ColumnType } from '../Enums';
import { IRangeExpression } from '../Interface/IExpression';
import { Expression } from '../Expression/Expression'
import { IColumn } from '../Interface/IAdaptableBlotter';


export interface IEditingRestrictionStrategy extends IStrategy {
        CreateEmptyEditingRestriction(): ICellValidationRule
        CreateEditingRestrictionMessage(editingRestriction: ICellValidationRule): string 
}

export interface ICellValidationRule {
        ColumnId: string;
        RangeExpression: IRangeExpression,
        EditingRestrictionAction: EditingRestrictionAction;
        Description: string;
        HasExpression: boolean;
        OtherExpression: Expression;
}
