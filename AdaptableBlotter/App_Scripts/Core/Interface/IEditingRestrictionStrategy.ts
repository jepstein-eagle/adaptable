import { IStrategy } from './IStrategy';
import { EditingRestrictionAction, ColumnType } from '../Enums';
import { IDataChangedEvent } from '../Services/Interface/IAuditService'
import { IRangeExpression } from '../Interface/IExpression';
import { Expression } from '../Expression/Expression'
import { IColumn } from '../Interface/IAdaptableBlotter';


export interface IEditingRestrictionStrategy extends IStrategy {
        CreateEmptyEditingRestriction(): IEditingRestriction
        CreateEditingRestrictionMessage(editingRestriction: IEditingRestriction): string 
}

export interface IEditingRestriction {
        ColumnId: string;
        RangeExpression: IRangeExpression,
        EditingRestrictionAction: EditingRestrictionAction;
        Description: string;
        HasExpression: boolean;
        OtherExpression: Expression;
}
