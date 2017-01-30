import { IEditingRestrictionStrategy, IEditingRestriction } from '../Core/Interface/IEditingRestrictionStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType, ColumnType, EditingRestrictionAction, LeafExpressionOperator } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { EditingRestrictionState } from '../Redux/ActionsReducers/Interface/IState';
import { IRangeExpression } from '../Core/Interface/IExpression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper'


export class EditingRestrictionStrategy extends AdaptableStrategyBase implements IEditingRestrictionStrategy {
    private menuItemConfig: IMenuItem;
    private EditingRestrictions: IEditingRestriction[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.EditingRestrictionStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Edit Restrictions", this.Id, 'EditingRestrictionConfig', MenuType.Configuration, "flag");
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
        //          this.blotter.OnGridSave().Subscribe((sender, gridSaveInfo) => this.CheckGridSaveInfo(gridSaveInfo))
    }

    InitState() {
        if (this.EditingRestrictions != this.GetEditingRestrictionState().EditingRestrictions) {
            this.EditingRestrictions = this.GetEditingRestrictionState().EditingRestrictions;
        }
    }

    public CreateEditingRestrictionMessage(editingRestriction: IEditingRestriction): string {
       let intro: string = "The following Editing Restriction was triggered:"
        let columns: IColumn[] = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let columnFriendlyName: string = columns.find(c => c.ColumnId == editingRestriction.ColumnId).FriendlyName;
        let expressionDescription: string = (editingRestriction.HasExpression) ?
            " when " + ExpressionHelper.ConvertExpressionToString(editingRestriction.OtherExpression, columns, this.blotter) :
            "";
        return (intro + "\nColumn: '" + columnFriendlyName + "'\nRestriction: " + editingRestriction.Description + expressionDescription);
    }

    public CreateEmptyEditingRestriction(): IEditingRestriction {
        let newEditingRestriction: IEditingRestriction = {
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
            Operator: LeafExpressionOperator.All,
            Operand1: "",
            Operand2: ""
        }
        return newRangeExpression;
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

    private GetEditingRestrictionState(): EditingRestrictionState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().EditingRestriction;
    }
}


