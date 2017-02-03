import { ICellValidationStrategy, ICellValidationRule } from '../Core/Interface/ICellValidationStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType, ColumnType, CellValidationAction, LeafExpressionOperator } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { CellValidationState } from '../Redux/ActionsReducers/Interface/IState';
import { IRangeExpression } from '../Core/Interface/IExpression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper'


export class CellValidationStrategy extends AdaptableStrategyBase implements ICellValidationStrategy {
    private menuItemConfig: IMenuItem;

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CellValidationStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Cell Validation", this.Id, 'CellValidationConfig', MenuType.Configuration, "flag");
    }

    public CreateCellValidationMessage(CellValidation: ICellValidationRule): string {
       let intro: string = "The following Cell Validation Rule was broken:"
        let columns: IColumn[] = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let columnFriendlyName: string = columns.find(c => c.ColumnId == CellValidation.ColumnId).FriendlyName;
        let expressionDescription: string = (CellValidation.HasExpression) ?
            " when " + ExpressionHelper.ConvertExpressionToString(CellValidation.OtherExpression, columns, this.blotter) :
            "";
        return (intro + "\nColumn: '" + columnFriendlyName + "'\nCell Validation Rule: " + CellValidation.Description + expressionDescription);
    }

    public CreateEmptyCellValidation(): ICellValidationRule {
        let newCellValidation: ICellValidationRule = {
            CellValidationAction: CellValidationAction.Prevent,
            ColumnId:"",
            RangeExpression: this.createEmptyRangeExpression(),
            HasExpression: false,
            OtherExpression: ExpressionHelper.CreateEmptyExpression(),
            Description: ""
        }
        return newCellValidation;
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

}


