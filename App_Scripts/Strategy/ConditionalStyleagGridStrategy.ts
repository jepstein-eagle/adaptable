import { IConditionalStyleStrategy } from '../Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from './ConditionalStyleStrategy';
import { ConditionalStyleScope } from '../Core/Enums';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { ExpressionHelper } from '../Core/Helpers/ExpressionHelper';
import { AdaptableBlotter } from '../Vendors/agGrid/AdaptableBlotter'
import * as StyleConstants from '../Core/Constants/StyleConstants'
import { StringExtensions } from '../Core/Extensions/StringExtensions';
import { StyleHelper } from '../Core/Helpers/StyleHelper';
import * as StrategyIds from '../Core/Constants/StrategyIds'

export class ConditionalStyleagGridStrategy extends ConditionalStyleStrategy implements IConditionalStyleStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
    }

    protected handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void {
        //we refresh all columns that need to be refreshed
        //this method needs to be optimised and probably cached as well. Will do when doing perf monitor
        let listOfColumns: Array<string> = []
        this.ConditionalStyleState.ConditionalStyles.forEach(x => {
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

    public InitStyles(): void {

        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        let theBlotter = this.blotter as AdaptableBlotter

        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.ConditionalStyleState != null && this.ConditionalStyleState.ConditionalStyles.length > 0) {

            for (let column of columns) {
                let cellClassRules: any = {};
                this.ConditionalStyleState.ConditionalStyles.forEach((cs, index) => {
                    let styleName: string = (StringExtensions.IsNullOrEmpty(cs.Style.ClassName)) ?
                        StyleHelper.CreateIndexedStyleName(StrategyIds.ConditionalStyleStrategyId, index, this.blotter) :
                        cs.Style.ClassName;


                    if (cs.ConditionalStyleScope == ConditionalStyleScope.Column && cs.ColumnId == column.ColumnId) {
                        cellClassRules[styleName] = function (params: any) {
                            return ExpressionHelper.checkForExpressionFromRecord(cs.Expression, params.node, columns, theBlotter)
                        }
                    }
                    else if (cs.ConditionalStyleScope == ConditionalStyleScope.Row) {
                        cellClassRules[styleName] = function (params: any) {
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
