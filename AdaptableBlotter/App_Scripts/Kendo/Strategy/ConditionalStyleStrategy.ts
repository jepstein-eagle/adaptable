import { ConditionalStyleState } from '../../Redux/ActionsReducers/Interface/IState';
import { IConditionalStyleStrategy } from '../../Core/Interface/IConditionalStyleStrategy';
import { MenuItemShowPopup } from '../../Core/MenuItem';
import { AdaptableStrategyBase } from '../../Core/AdaptableStrategyBase';
import * as StrategyIds from '../../Core/StrategyIds'
import { IMenuItem } from '../../Core/Interface/IStrategy';
import { ConditionalStyleScope, ColumnType, ConditionalStyleColour } from '../../Core/Enums';
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { IDataChangedEvent } from '../../Core/Services/Interface/IAuditService'
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import { ExpressionString } from '../../Core/Expression/ExpressionString';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { Helper, EnumEx } from '../../Core/Helper';



export class ConditionalStyleStrategy extends AdaptableStrategyBase implements IConditionalStyleStrategy {
    private menuItemConfig: IMenuItem;
    private ConditionalStyleState: ConditionalStyleState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ConditionalStyleStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Configure Conditional Style", this.Id, 'ConditionalStyleConfig', "plus-sign");
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitConditionalStyle())
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
        this.blotter.OnGridDataBound().Subscribe((sender, blotter) => this.handleGridDataBound(blotter))
    }

    private InitConditionalStyle() {
     let hasPreviousState: Boolean = this.ConditionalStyleState != null;

        if (this.ConditionalStyleState != this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle) {
            this.ConditionalStyleState = this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle;
            if (hasPreviousState) {
                this.removeExistingStyles();
            }
            this.addNewStyles();
        }
    }

    private handleGridDataBound(blotter: IAdaptableBlotter) {
        this.addNewStyles();
    }

    // this gets called for two reasons
    // 1.  If we have amended any conditional styles; rather than work out what has changed we remove all styles and then reapply
    // 2.  If the databound event is caleld - usually after a sort or a smartedit; again we remove and reapply.  Need to see if this is practical with large datasets.
    private removeExistingStyles(): void {
        alert("removing")
        this.blotter.removeCellStylesFromGrid(EnumEx.getNames(ConditionalStyleColour))
    }

    private addNewStyles(): void {
        alert("adding")
        let rowIds: string[] = this.blotter.getAllRowIds();
        rowIds.forEach(rowId => {
            this.ConditionalStyleState.ConditionalStyleConditions.forEach(c => {
                if (this.checkForExpression(c.Expression, rowId)) {
                    this.blotter.addCellStyle(rowId, c.ColumnId, ConditionalStyleColour[c.ConditionalStyleColour])
                }
            })
        })
    }

    private handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void {
        this.ConditionalStyleState.ConditionalStyleConditions.forEach(c => {
            if (this.checkForExpression(c.Expression, dataChangedEvent.IdentifierValue)) {
                this.blotter.addCellStyle(dataChangedEvent.IdentifierValue, c.ColumnId, ConditionalStyleColour[c.ConditionalStyleColour])
            }
            else {
                this.blotter.removeCellStyle(dataChangedEvent.IdentifierValue, c.ColumnId, ConditionalStyleColour[c.ConditionalStyleColour])
            }
        })
    }

    private checkForExpression(expressionString: ExpressionString, identifierValue: any): boolean {
        return (ExpressionHelper.IsSatisfied(expressionString,
            this.blotter.getRecordIsSatisfiedFunction(identifierValue, "getColumnValue"),
            this.blotter.getRecordIsSatisfiedFunction(identifierValue, "getDisplayColumnValue"),
            this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns))
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}


