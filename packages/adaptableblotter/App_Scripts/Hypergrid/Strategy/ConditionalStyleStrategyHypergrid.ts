import { IConditionalStyleStrategy } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from '../../Strategy/ConditionalStyleStrategy';
import { ConditionalStyleScope } from '../../Utilities/Enums';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { Helper } from '../../Utilities/Helpers/Helper';
import { AdaptableBlotter } from '../AdaptableBlotter'
import { IColumnCategory } from "../../Utilities/Interface/BlotterObjects/IColumnCategory";
import { IConditionalStyle } from "../../Utilities/Interface/BlotterObjects/IConditionalStyle";
import { IDataChangedInfo } from '../../Api/Interface/IDataChangedInfo';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';

export class ConditionalStyleStrategyHypergrid extends ConditionalStyleStrategy implements IConditionalStyleStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
    }

    // Called when a single piece of data changes, ie. usually the result of an inline edit
    protected handleDataSourceChanged(dataChangedEvent: IDataChangedInfo): void {
        if (ArrayExtensions.IsNotEmpty(this.ConditionalStyleState.ConditionalStyles)) {

            let theBlotter = this.blotter as AdaptableBlotter
            let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
             //here we don't call Repaint as we consider that we already are in the repaint loop
            for (let column of columns) {
                theBlotter.removeCellStyleHypergrid(dataChangedEvent.IdentifierValue, column.ColumnId, 'csColumn')
                theBlotter.removeCellStyleHypergrid(dataChangedEvent.IdentifierValue, column.ColumnId, 'csRow')
            }

            this.ConditionalStyleState.ConditionalStyles.forEach((c, index) => {
                if (c.Expression) {
                    if (dataChangedEvent.Record) {
                        if (ExpressionHelper.checkForExpressionFromRecord(c.Expression, dataChangedEvent.Record, columns, this.blotter)) {
                            if (c.ConditionalStyleScope == ConditionalStyleScope.Row) {
                                theBlotter.addRowStyleHypergrid(dataChangedEvent.IdentifierValue, { conditionalStyleRow: c.Style })
                            } else if (c.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory) {
                                let columnCategory: IColumnCategory = this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnCategory.ColumnCategories.find(lc => lc.ColumnCategoryId == c.ColumnCategoryId)
                                columnCategory.ColumnIds.forEach(cc => {
                                    theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, cc, { conditionalStyleColumn: c.Style })
                                })
                            } else if (c.ConditionalStyleScope == ConditionalStyleScope.Column) {
                                theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, c.ColumnId, { conditionalStyleColumn: c.Style })
                            }
                        }
                    }
                    else {
                        if (ExpressionHelper.checkForExpression(c.Expression, dataChangedEvent.IdentifierValue, columns, this.blotter)) {
                            if (c.ConditionalStyleScope == ConditionalStyleScope.Row) {
                                theBlotter.addRowStyleHypergrid(dataChangedEvent.IdentifierValue, { conditionalStyleRow: c.Style })
                            } else if (c.ConditionalStyleScope == ConditionalStyleScope.ColumnCategory) {
                                let columnCategory: IColumnCategory = this.blotter.AdaptableBlotterStore.TheStore.getState().ColumnCategory.ColumnCategories.find(lc => lc.ColumnCategoryId == c.ColumnCategoryId)
                                columnCategory.ColumnIds.forEach(cc => {
                                    theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, cc, { conditionalStyleColumn: c.Style })
                                })
                            } else if (c.ConditionalStyleScope == ConditionalStyleScope.Column) {
                                theBlotter.addCellStyleHypergrid(dataChangedEvent.IdentifierValue, c.ColumnId, { conditionalStyleColumn: c.Style })
                            }
                        }
                    }
                }
            })
        }
    }


    public InitStyles(): void {
        let theBlotter = this.blotter as AdaptableBlotter
        let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        theBlotter.removeAllCellStyleHypergrid('csColumn')
        theBlotter.removeAllCellStyleHypergrid('csRow')

        // adding this check as things can get mixed up during 'clean user data'
        if (columns.length > 0 && this.ConditionalStyleState.ConditionalStyles.length > 0) {

            let rowConditionalStyles = this.ConditionalStyleState.ConditionalStyles
                .filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Row)

            let columnConditionalStyles = this.ConditionalStyleState.ConditionalStyles
                .filter(x => x.ConditionalStyleScope == ConditionalStyleScope.Column)
                .map(cs => cs)

            let columnConditionalStylesGroupedByColumn = ArrayExtensions.groupArrayBy(columnConditionalStyles, "ColumnId")
            theBlotter.forAllRecordsDo((row: any) => {
                //here we use the operator "in" on purpose as the GroupBy function that I wrote creates
                //an object with properties that have the name of the groupbykey
                for (let column in columnConditionalStylesGroupedByColumn) {
                    //we just need to find one that match....
                    for (let columnCS of columnConditionalStylesGroupedByColumn[column]) {
                        let localCS: IConditionalStyle = columnCS
                        if (ExpressionHelper.checkForExpressionFromRecord(localCS.Expression, row, columns, this.blotter)) {
                            theBlotter.addCellStyleHypergrid(theBlotter.getPrimaryKeyValueFromRecord(row), localCS.ColumnId, { conditionalStyleColumn: localCS.Style })
                            break
                        }
                    }
                }
                //we just need to find one that match....
                for (let rowCS of rowConditionalStyles) {
                    if (ExpressionHelper.checkForExpressionFromRecord(rowCS.Expression, row, columns, this.blotter)) {
                        theBlotter.addRowStyleHypergrid(theBlotter.getPrimaryKeyValueFromRecord(row), { conditionalStyleRow: rowCS.Style })
                        break
                    }
                }
            })
        }
        theBlotter.ReindexAndRepaint();
    }
}


