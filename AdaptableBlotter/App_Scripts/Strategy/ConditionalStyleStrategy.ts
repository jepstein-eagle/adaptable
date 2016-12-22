import { ConditionalStyleState } from '../Redux/ActionsReducers/Interface/IState';
import { IConditionalStyleStrategy } from '../Core/Interface/IConditionalStyleStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { ConditionalStyleScope, ColumnType, CellStyle } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { IConditionalStyleCondition } from '../Core/Interface/IConditionalStyleStrategy';
import { Expression } from '../Core/Expression/Expression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { Helper } from '../Core/Helper';
import { MenuType } from '../Core/Enums';
import { IExpressionFilter } from '../Core/Interface/IExpression';



export class ConditionalStyleStrategy extends AdaptableStrategyBase implements IConditionalStyleStrategy {
    private ConsitionalStylePrefix = "Ab-ConditionalStyle-"
    private menuItemConfig: IMenuItem;
    private ConditionalStyleState: ConditionalStyleState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ConditionalStyleStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Conditional Styles", this.Id, 'ConditionalStyleConfig', MenuType.Configuration, "tint");
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
        this.blotter.OnGridDataBound().Subscribe((sender, blotter) => this.handleGridDataBound(blotter))
    }

    private InitState() {
        if (this.ConditionalStyleState != this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle) {
            this.ConditionalStyleState = this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle;

            this.InitStyles();
        }
    }

    // Called when a single piece of data changes, ie. usually the result of an inline edit
    private handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void {
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        this.ConditionalStyleState.ConditionalStyleConditions.forEach(c => {
            let columnIndex: number = this.blotter.getColumnIndex(c.ColumnId);

            if (ExpressionHelper.checkForExpression(c.Expression, dataChangedEvent.IdentifierValue, columns, this.blotter)) {
                if (c.ConditionalStyleScope == ConditionalStyleScope.Row) {
                    this.blotter.addRowStyle(dataChangedEvent.IdentifierValue, this.ConsitionalStylePrefix + CellStyle[c.CellStyle])
                }
                else if (c.ConditionalStyleScope == ConditionalStyleScope.Column) {
                    this.blotter.addCellStyle(dataChangedEvent.IdentifierValue, columnIndex, this.ConsitionalStylePrefix + CellStyle[c.CellStyle])
                }
            }
            else {
                if (c.ConditionalStyleScope == ConditionalStyleScope.Row) {
                    this.blotter.removeRowStyle(dataChangedEvent.IdentifierValue, this.ConsitionalStylePrefix + CellStyle[c.CellStyle])
                }
                else if (c.ConditionalStyleScope == ConditionalStyleScope.Column) {
                    this.blotter.removeCellStyle(dataChangedEvent.IdentifierValue, columnIndex, this.ConsitionalStylePrefix + CellStyle[c.CellStyle])
                }
            }
        })
    }

    // Called when we have re-bound the grid e.g. after sorting a column or even after a smart edit or plus / minus :(
    private handleGridDataBound(blotter: IAdaptableBlotter) {
        if (this.ConditionalStyleState != null && this.ConditionalStyleState.ConditionalStyleConditions.length > 0) {
            this.InitStyles();
        }
    }

    private InitStyles(): void {
        this.blotter.removeAllCellStylesWithRegex(new RegExp("^" + this.ConsitionalStylePrefix));
        this.blotter.removeAllRowStylesWithRegex(new RegExp("^" + this.ConsitionalStylePrefix));

        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.ConditionalStyleState.ConditionalStyleConditions.length > 0) {
            let rowIds: string[] = this.blotter.getAllRowIds();

            let rowConditionalStyles = this.ConditionalStyleState.ConditionalStyleConditions
                .filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Row)

            //we add the Index of the column to the list so we do not need to reevaluate every row
            let columnConditionalStyles = this.ConditionalStyleState.ConditionalStyleConditions
                .filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Column)
                .map(cs => Object.assign({}, cs, { columnIndex: this.blotter.getColumnIndex(cs.ColumnId) }))

            let columnConditionalStylesGroupedByColumn = Helper.groupBy(columnConditionalStyles, "ColumnId")

            rowIds.forEach(rowId => {

                //here we use the operator "in" on purpose as the GroupBy function that I wrote creates
                //an object with properties that have the name of the groupbykey
                for (let column in columnConditionalStylesGroupedByColumn) {
                    //we just need to find one that match....
                    for (let columnCS of columnConditionalStylesGroupedByColumn[column]) {
                        if (ExpressionHelper.checkForExpression(columnCS.Expression, rowId, columns, this.blotter)) {
                            this.blotter.addCellStyle(rowId, columnCS.columnIndex, this.ConsitionalStylePrefix + CellStyle[columnCS.CellStyle])
                            break
                        }
                    }
                }
                //we just need to find one that match....
                for (let rowCS of rowConditionalStyles) {
                    if (ExpressionHelper.checkForExpression(rowCS.Expression, rowId, columns, this.blotter)) {
                        this.blotter.addRowStyle(rowId, this.ConsitionalStylePrefix + CellStyle[rowCS.CellStyle])
                        break
                    }
                }
            })
        }
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}


