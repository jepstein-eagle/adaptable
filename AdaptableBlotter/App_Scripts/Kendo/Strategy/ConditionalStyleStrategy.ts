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
        let oldState: ConditionalStyleState = this.ConditionalStyleState;

        if (this.ConditionalStyleState != this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle) {
            this.ConditionalStyleState = this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle;

            // only remove existing styles if we know there are some - this is still a bit rubbish and can be better
            if (oldState != null && oldState.ConditionalStyleConditions.length > 0) {
                this.removeExistingStyles(oldState);
            }
            this.addNewStyles();
        }
    }

    private handleGridDataBound(blotter: IAdaptableBlotter) {
        this.addNewStyles();
    }

    /*
        This is the worst bit at the moment.  Painting the styles is very quick but removing them takes ages with a large row set
        We only call this method now when updating Conditional Styles so its not the end of the world and we can have some sort of wait message
        But it would clearly be better to avoid removing all the styles every time and instead remove just those which have changed.
        So we would need to compare state with new state and then work out which ones are different
        In the meantime its a bit better in that we only remove columns and styles that were in the previous state
    */
    
    private removeExistingStyles(oldState: ConditionalStyleState): void {
        alert("removing")
        // get the styles currently in action
        let existingStyles: string[] = oldState.ConditionalStyleConditions.map(c => ConditionalStyleColour[c.ConditionalStyleColour])
        let existingColumns: string[] = oldState.ConditionalStyleConditions.map(c => c.ColumnId)
        // get the columns currently affected - doesnt work with row styles if we do them :(
        this.blotter.removeCellStylesFromGrid(existingStyles, existingColumns);
    }

    private addNewStyles(): void {
        if (this.ConditionalStyleState.ConditionalStyleConditions.length > 0) {
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


