import { IConditionalStyleStrategy } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from '../../Strategy/ConditionalStyleStrategy';
import { ConditionalStyleScope } from '../../Utilities/Enums';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { AdaptableBlotter } from '../AdaptableBlotter'
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { StyleHelper } from '../../Utilities/Helpers/StyleHelper';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { IColumnCategory } from '../../Api/Interface/Interfaces';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { IDataChangedInfo } from '../../Api/Interface/IDataChangedInfo';

export class ConditionalStyleagGridStrategy extends ConditionalStyleStrategy implements IConditionalStyleStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
    }

    protected handleDataSourceChanged(dataChangedEvent: IDataChangedInfo): void {
        //we refresh all columns that need to be refreshed
        //this method needs to be optimised and probably cached as well. Will do when doing perf monitor
        let listOfColumns: Array<string> = []
        this.ConditionalStyleState.ConditionalStyles.forEach(x => {
            let colList = ExpressionHelper.GetColumnListFromExpression(x.Expression)
            if (colList.indexOf(dataChangedEvent.ColumnId) > -1) {
                if (x.ConditionalStyleScope == ConditionalStyleScope.Row) {
                    listOfColumns.push(...this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.map(c => c.ColumnId))
                } else if (x.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory) {
                    let columnCategory: IColumnCategory = this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnCategory.ColumnCategories.find(lc => lc.ColumnCategoryId == x.ColumnCategoryId)
                    if (columnCategory) {
                        listOfColumns.push(...columnCategory.ColumnIds);
                    }
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
                        StyleHelper.CreateIndexedStyleName(StrategyConstants.ConditionalStyleStrategyId, index, this.blotter) :
                        cs.Style.ClassName;


                    if (cs.ConditionalStyleScope == ConditionalStyleScope.Column && cs.ColumnId == column.ColumnId) {
                        cellClassRules[styleName] = function (params: any) {
                            return ExpressionHelper.checkForExpressionFromRecord(cs.Expression, params.node, columns, theBlotter)
                        }
                    } else if (cs.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory) {
                        let columnCategory: IColumnCategory= this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnCategory.ColumnCategories.find(lc => lc.ColumnCategoryId == cs.ColumnCategoryId)
                        if (columnCategory) {
                            if (ArrayExtensions.ContainsItem(columnCategory.ColumnIds, column.ColumnId)) {
                                cellClassRules[styleName] = function (params: any) {
                                    return ExpressionHelper.checkForExpressionFromRecord(cs.Expression, params.node, columns, theBlotter)
                                }
                            }
                        }
                    } else if (cs.ConditionalStyleScope == ConditionalStyleScope.Row) {
                        cellClassRules[styleName] = function (params: any) {
                            return ExpressionHelper.checkForExpressionFromRecord(cs.Expression, params.node, columns, theBlotter)
                        }
                    }
                })
                theBlotter.setCellClassRules(cellClassRules, column.ColumnId, "ConditionalStyle");
            }
        }

        this.blotter.redraw()
    }
}
