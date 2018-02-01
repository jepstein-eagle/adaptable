import { ConditionalStyleState } from '../Redux/ActionsReducers/Interface/IState';
import { IConditionalStyleStrategy } from '../Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from './ConditionalStyleStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IMenuItem } from '../Strategy/Interface/IStrategy';
import { ConditionalStyleScope } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { IConditionalStyleCondition } from '../Strategy/Interface/IConditionalStyleStrategy';
import { Expression } from '../Core/Expression';
import { ExpressionHelper } from '../Core/Helpers/ExpressionHelper';
import { Helper } from '../Core/Helpers/Helper';
import { AdaptableBlotter } from '../Vendors/agGrid/AdaptableBlotter'
import * as StyleConstants from '../Core/StyleConstants'

export class ConditionalStyleagGridStrategy extends ConditionalStyleStrategy implements IConditionalStyleStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
    }

    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void {
        //we refresh all columns that need to be refreshed
        //this method needs to be optimised and probably cached as well. Will do when doing perf monitor
        let listOfColumns: Array<string> = []
        this.ConditionalStyleState.ConditionalStyleConditions.forEach(x => {
            let colList = ExpressionHelper.GetColumnListFromExpression(x.Expression)
            if (colList.indexOf(dataChangedEvent.ColumnId) > -1) {
                if (x.ConditionalStyleScope == ConditionalStyleScope.Row) {
                    listOfColumns.push(...this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.map(c => c.ColumnId))
                }
                else if (x.ConditionalStyleScope == ConditionalStyleScope.Column) {
                    listOfColumns.push(x.ColumnId)
                }
            }

        });
        let listOfColumnsToRefresh = Array.from(new Set(listOfColumns))
        let index: number = listOfColumnsToRefresh.indexOf(dataChangedEvent.ColumnId);
        if (index !== -1) {
            listOfColumnsToRefresh.splice(index, 1);
        }
        if (listOfColumnsToRefresh.length > 0) {
            let theBlotter = this.blotter as AdaptableBlotter
            theBlotter.refreshCells(dataChangedEvent.Record, listOfColumnsToRefresh);
        }
    }

    protected InitStyles(): void {

        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let theBlotter = this.blotter as AdaptableBlotter

        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.ConditionalStyleState.ConditionalStyleConditions.length > 0) {

            for (let column of columns) {
                let cellClassRules: any = {};
                this.ConditionalStyleState.ConditionalStyleConditions.forEach((cs, index) => {
                    if (cs.ConditionalStyleScope == ConditionalStyleScope.Column && cs.ColumnId == column.ColumnId) {
                        cellClassRules[StyleConstants.CONDITIONAL_STYLE_STYLE + index] = function (params: any) {
                            return ExpressionHelper.checkForExpressionFromRecord(cs.Expression, params.node, columns, theBlotter)
                        }
                    }
                    else if (cs.ConditionalStyleScope == ConditionalStyleScope.Row) {
                        cellClassRules[StyleConstants.CONDITIONAL_STYLE_STYLE + index] = function (params: any) {
                            return ExpressionHelper.checkForExpressionFromRecord(cs.Expression, params.node, columns, theBlotter)
                        }
                    }
                })
                theBlotter.setCellClassRules(cellClassRules, column.ColumnId, "ConditionalStyle");
            }
        }

        theBlotter.redrawRows();
    }
}
