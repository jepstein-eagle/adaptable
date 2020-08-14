import { IConditionalStyleStrategy } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from '../../Strategy/ConditionalStyleStrategy';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { Adaptable } from '../Adaptable';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { DataChangedInfo } from '../../PredefinedConfig/Common/DataChangedInfo';
import { ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
import { TypeUuid } from '../../PredefinedConfig/Uuid';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { RowNode } from '@ag-grid-community/core';
import * as parser from '../../parser/src';

export class ConditionalStyleStrategyagGrid extends ConditionalStyleStrategy
  implements IConditionalStyleStrategy {
  constructor(adaptable: Adaptable) {
    super(adaptable);
    this.conditionalStyleColumnIds = [];
    this.columnsForConditionalStyles = new Map<TypeUuid, string[]>();
  }

  private conditionalStyleColumnIds: string[];
  private columnsForConditionalStyles: Map<TypeUuid, string[]>;

  // The sole purpose that i can see for this method is to tell Adaptable to refresh the row or other columns in the case where the Grid would not automtically do it
  // and we need to tell the grid that the whole row has changed and not just this column
  // Note that we can have Col A changing when Col B updates so need to look at all 3 but should make it as quick as possible: in and out.
  protected handleDataSourceChanged(dataChangedEvent: DataChangedInfo): void {
    let conditionalStyles: ConditionalStyle[] = this.adaptable.api.conditionalStyleApi.getAllConditionalStyle();
    if (ArrayExtensions.IsNotNullOrEmpty(conditionalStyles)) {
      if (ArrayExtensions.ContainsItem(this.conditionalStyleColumnIds, dataChangedEvent.ColumnId)) {
        let colsToRefresh: Array<string> = [];
        conditionalStyles.forEach(cs => {
          let colList = this.columnsForConditionalStyles.get(cs.Uuid);
          if (ArrayExtensions.ContainsItem(colList, dataChangedEvent.ColumnId)) {
            switch (cs.ConditionalStyleScope) {
              case 'Row':
                colsToRefresh.push(...this.adaptable.api.gridApi.getColumns().map(c => c.ColumnId));
                break;

              case 'ColumnCategory':
                let columnCategory: ColumnCategory = this.adaptable.api.columnCategoryApi
                  .getAllColumnCategory()
                  .find(lc => lc.ColumnCategoryId == cs.ColumnCategoryId);
                if (columnCategory) {
                  colsToRefresh.push(...columnCategory.ColumnIds);
                }
                break;

              case 'Column':
                colsToRefresh.push(cs.ColumnId);
                break;
            }
          }
        });
        if (ArrayExtensions.IsNotNullOrEmpty(colsToRefresh)) {
          let listOfColumnsToRefresh = Array.from(new Set(colsToRefresh));

          // we dont want to refresh the actual column as that has been updated
          let index: number = listOfColumnsToRefresh.indexOf(dataChangedEvent.ColumnId);
          if (index !== -1) {
            listOfColumnsToRefresh.splice(index, 1);
          }
          if (listOfColumnsToRefresh.length > 0) {
            let theadaptable = this.adaptable as Adaptable;
            theadaptable.refreshCells([dataChangedEvent.RowNode], listOfColumnsToRefresh);
          }
        }
      }
    }
  }

  private evaluateExpression(conditionalStyle: ConditionalStyle, data: any) {
    let expression: string = this.adaptable.api.sharedQueryApi.getExpressionForQueryObject(
      conditionalStyle
    );
    return parser.evaluate(expression, { data });
  }

  // this initialises styles and creates the list of which columns have styles (will be used in onDataChanged)
  public initStyles(): void {
    let columns = this.adaptable.api.gridApi.getColumns();
    let theadaptable = this.adaptable as Adaptable;
    let shouldRunStyle = this.shouldRunStyle;
    let conditionalStyles: ConditionalStyle[] = this.adaptable.api.conditionalStyleApi.getAllConditionalStyle();
    this.conditionalStyleColumnIds = [];
    this.columnsForConditionalStyles.clear();

    if (
      ArrayExtensions.IsNotNullOrEmpty(columns) &&
      ArrayExtensions.IsNotNullOrEmpty(conditionalStyles)
    ) {
      for (let column of columns) {
        let cellClassRules: any = {};
        let rowClassRules: any = {};
        conditionalStyles.forEach((cs, index) => {
          let styleName: string = StringExtensions.IsNullOrEmpty(cs.Style.ClassName)
            ? theadaptable.StyleService.CreateUniqueStyleName(
                StrategyConstants.ConditionalStyleStrategyId,
                cs
              )
            : cs.Style.ClassName;
          if (cs.ConditionalStyleScope == 'Column' && cs.ColumnId == column.ColumnId) {
            cellClassRules[styleName] = (params: any) => {
              if (shouldRunStyle(cs, theadaptable, params.node)) {
                return this.evaluateExpression(cs, params.node.data);
                // return ExpressionHelper.checkForExpressionFromRowNode(
                //   cs.Expression,
                //   params.node,
                //   columns,
                //   theadaptable
                // );
              }
            };
          } else if (cs.ConditionalStyleScope == 'ColumnCategory') {
            let columnCategory: ColumnCategory = this.adaptable.api.columnCategoryApi
              .getAllColumnCategory()
              .find(lc => lc.ColumnCategoryId == cs.ColumnCategoryId);
            if (columnCategory) {
              if (ArrayExtensions.ContainsItem(columnCategory.ColumnIds, column.ColumnId)) {
                cellClassRules[styleName] = (params: any) => {
                  if (shouldRunStyle(cs, theadaptable, params.node)) {
                    return this.evaluateExpression(cs, params.node.data);
                    // return ExpressionHelper.checkForExpressionFromRowNode(
                    //   cs.Expression,
                    //   params.node,
                    //   columns,
                    //   theadaptable
                    // );
                  }
                };
              }
            }
            /*
          } else if (cs.ConditionalStyleScope == 'DataType') {
            let dataType: 'String' | 'Number' | 'Boolean' | 'Date' = cs.DataType;

            if (dataType) {
              if (column.DataType == dataType) {
                cellClassRules[styleName] = function(params: any) {
                  return ExpressionHelper.checkForExpressionFromRowNode(
                    cs.Expression,
                    params.node,
                    columns,
                    theadaptable
                  );
                };
              }
            }
            */
          } else if (cs.ConditionalStyleScope == 'Row') {
            rowClassRules[styleName] = (params: any) => {
              if (shouldRunStyle(cs, theadaptable, params.node)) {
                return this.evaluateExpression(cs, params.node.data);
                // return ExpressionHelper.checkForExpressionFromRowNode(
                //   cs.Expression,
                //   params.node,
                //   columns,
                //   theadaptable
                // );
              }
            };
            theadaptable.setRowClassRules(rowClassRules, 'ConditionalStyle');
          }
        });
        theadaptable.setCellClassRules(cellClassRules, column.ColumnId, 'ConditionalStyle');
      }
    }

    //  create the list of columns that are in Expressions here so that we dont need to do it each time data updates
    let colList: string[] = [];
    conditionalStyles.forEach(x => {
      let colsForCS: string[] = [];
      // let colsForCS: string[] = ExpressionHelper.GetColumnListFromExpression(x.Expression);
      colList.push(...colsForCS);
      this.columnsForConditionalStyles.set(x.Uuid, colsForCS);
    });

    this.conditionalStyleColumnIds = [...new Set(colList)];

    // Redraw Adaptableto be on safe side (its rare use case)
    this.adaptable.redraw();
  }
  private shouldRunStyle(
    conditionalStyle: ConditionalStyle,
    adaptable: IAdaptable,
    node: RowNode
  ): boolean {
    if (conditionalStyle.ExcludeGroupedRows && adaptable.isGroupRowNode(node)) {
      return false;
    }
    return true;
  }
}
