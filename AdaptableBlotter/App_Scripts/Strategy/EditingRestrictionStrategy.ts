import { IEditingRestrictionStrategy, ICellValidationRule } from '../Core/Interface/IEditingRestrictionStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType, ColumnType, EditingRestrictionAction, LeafExpressionOperator } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { CellValidationState } from '../Redux/ActionsReducers/Interface/IState';
import { IRangeExpression } from '../Core/Interface/IExpression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper'


export class EditingRestrictionStrategy extends AdaptableStrategyBase implements IEditingRestrictionStrategy {
    private menuItemConfig: IMenuItem;
    private EditingRestrictions: ICellValidationRule[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.EditingRestrictionStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Cell Validation", this.Id, 'EditingRestrictionConfig', MenuType.Configuration, "flag");
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
        //          this.blotter.OnGridSave().Subscribe((sender, gridSaveInfo) => this.CheckGridSaveInfo(gridSaveInfo))
    }

    InitState() {
        if (this.EditingRestrictions != this.GetCellValidationState().CellValidations) {
            this.EditingRestrictions = this.GetCellValidationState().CellValidations;
        }
    }

    public CreateEditingRestrictionMessage(editingRestriction: ICellValidationRule): string {
       let intro: string = "The following Cell Validation Rule was broken:"
        let columns: IColumn[] = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let columnFriendlyName: string = columns.find(c => c.ColumnId == editingRestriction.ColumnId).FriendlyName;
        let expressionDescription: string = (editingRestriction.HasExpression) ?
            " when " + ExpressionHelper.ConvertExpressionToString(editingRestriction.OtherExpression, columns, this.blotter) :
            "";
        return (intro + "\nColumn: '" + columnFriendlyName + "'\nCell Validation Rule: " + editingRestriction.Description + expressionDescription);
    }

    public CreateEmptyEditingRestriction(): ICellValidationRule {
        let newEditingRestriction: ICellValidationRule = {
            EditingRestrictionAction: EditingRestrictionAction.Prevent,
            ColumnId: "select",
            RangeExpression: this.createEmptyRangeExpression(),
            HasExpression: false,
            OtherExpression: ExpressionHelper.CreateEmptyExpression(),
            Description: ""
        }
        return newEditingRestriction;
    }

    private createEmptyRangeExpression(): IRangeExpression {
        let newRangeExpression: IRangeExpression = {
            Operator: LeafExpressionOperator.None,
            Operand1: "",
            Operand2: ""
        }
        return newRangeExpression;
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

    private GetCellValidationState(): CellValidationState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().CellValidation;
    }
}


