import { ConditionalStyleState } from '../Redux/ActionsReducers/Interface/IState';
import { IConditionalStyleStrategy } from '../Core/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from './ConditionalStyleStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { ConditionalStyleScope, ColumnType } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { IConditionalStyleCondition } from '../Core/Interface/IConditionalStyleStrategy';
import { Expression } from '../Core/Expression/Expression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { Helper } from '../Core/Helper';
import { MenuType } from '../Core/Enums';
import { AdaptableBlotter } from '../Vendors/Hypergrid/AdaptableBlotter'

export class ConditionalStyleHypergridStrategy extends ConditionalStyleStrategy implements IConditionalStyleStrategy {
    constructor(private blotterBypass: AdaptableBlotter) {
        super(blotterBypass)
    }

    // Called when a single piece of data changes, ie. usually the result of an inline edit
    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void {
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        //here we don't call Repaint as we consider that we already are in the repaint loop
        let rowIndex = this.blotterBypass.getRowIndexHypergrid(dataChangedEvent.IdentifierValue)
        if (rowIndex >= 0) {
            for (var index = 0; index < columns.length; index++) {
                this.blotterBypass.removeCellStyleByIndex(index, rowIndex, 'csColumn')
                this.blotterBypass.removeCellStyleByIndex(index, rowIndex, 'csRow')
            }

            this.ConditionalStyleState.ConditionalStyleConditions.forEach((c, index) => {
                
                if (ExpressionHelper.checkForExpression(c.Expression, dataChangedEvent.IdentifierValue, columns, this.blotter)) {
                    if (c.ConditionalStyleScope == ConditionalStyleScope.Row) {

                        this.blotterBypass.addRowStyleHypergrid(dataChangedEvent.IdentifierValue, { csBackColorRow: c.BackColor, csForeColorRow: c.ForeColor })
                    }
                    else if (c.ConditionalStyleScope == ConditionalStyleScope.Column) {
                        let columnIndex: number = this.blotter.getColumnIndex(c.ColumnId);

                        this.blotterBypass.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, columnIndex, { csBackColorColumn: c.BackColor, csForeColorColumn: c.ForeColor })
                    }
                }
            })
        }
    }

    protected InitStyles(): void {
        //JO: temp fix
        if (!this.blotterBypass) {
            this.blotterBypass = this.blotter as AdaptableBlotter
        }
        let rowIds: string[] = this.blotter.getAllRowIds();
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        for (let rowId of rowIds) {
            let rowIndex = this.blotterBypass.getRowIndexHypergrid(rowId)
            if (rowIndex >= 0) {
                for (var index = 0; index < columns.length; index++) {
                    this.blotterBypass.removeCellStyleByIndex(index, rowIndex, 'csColumn')
                    this.blotterBypass.removeCellStyleByIndex(index, rowIndex, 'csRow')
                }
            }
        }

        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.ConditionalStyleState.ConditionalStyleConditions.length > 0) {


            let rowConditionalStyles = this.ConditionalStyleState.ConditionalStyleConditions
                .filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Row)

            //we add the Index of the column to the list so we do not need to reevaluate every row
            let columnConditionalStyles = this.ConditionalStyleState.ConditionalStyleConditions
                .filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Column)
                .map(cs => Object.assign({}, cs, { columnIndex: this.blotter.getColumnIndex(cs.ColumnId), collectionIndex: this.ConditionalStyleState.ConditionalStyleConditions.indexOf(cs) }))

            let columnConditionalStylesGroupedByColumn = Helper.groupBy(columnConditionalStyles, "ColumnId")

            rowIds.forEach(rowId => {

                //here we use the operator "in" on purpose as the GroupBy function that I wrote creates
                //an object with properties that have the name of the groupbykey
                for (let column in columnConditionalStylesGroupedByColumn) {
                    //we just need to find one that match....
                    for (let columnCS of columnConditionalStylesGroupedByColumn[column]) {
                        if (ExpressionHelper.checkForExpression(columnCS.Expression, rowId, columns, this.blotter)) {

                            this.blotterBypass.addCellStyleHypergrid(rowId, columnCS.columnIndex, { csBackColorColumn: columnCS.BackColor, csForeColorColumn: columnCS.ForeColor })
                            break
                        }
                    }
                }
                //we just need to find one that match....
                for (let rowCS of rowConditionalStyles) {
                    if (ExpressionHelper.checkForExpression(rowCS.Expression, rowId, columns, this.blotter)) {

                        this.blotterBypass.addRowStyleHypergrid(rowId, { csBackColorRow: rowCS.BackColor, csForeColorRow: rowCS.ForeColor })
                        break
                    }
                }
            })
        }
    }
}


