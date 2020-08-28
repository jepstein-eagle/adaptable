import { IConditionalStyleStrategy } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { ConditionalStyleStrategy } from '../../Strategy/ConditionalStyleStrategy';
import { Adaptable } from '../Adaptable';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { RowNode } from '@ag-grid-community/core';
import * as parser from '../../parser/src';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';

export class ConditionalStyleStrategyagGrid extends ConditionalStyleStrategy
  implements IConditionalStyleStrategy {
  constructor(adaptable: Adaptable) {
    super(adaptable);
  }

  // this initialises styles and creates the list of which columns have styles (will be used in onDataChanged)
  public initStyles(): void {
    // return;
    let columns = this.adaptable.api.columnApi.getColumns();
    let theadaptable = this.adaptable as Adaptable;

    let shouldRunStyle = this.shouldRunStyle;
    let isColumnInScope = this.isColumnInScope;
    let conditionalStyles: ConditionalStyle[] = this.adaptable.api.conditionalStyleApi.getAllConditionalStyle();

    if (
      ArrayExtensions.IsNotNullOrEmpty(columns) &&
      ArrayExtensions.IsNotNullOrEmpty(conditionalStyles)
    ) {
      for (let column of columns) {
        let cellClassRules: any = {};
        let rowClassRules: any = {};
        conditionalStyles.forEach(cs => {
          let styleName: string = StringExtensions.IsNullOrEmpty(cs.Style.ClassName)
            ? theadaptable.StyleService.CreateUniqueStyleName(
                StrategyConstants.ConditionalStyleStrategyId,
                cs
              )
            : cs.Style.ClassName;

          if (theadaptable.api.scopeApi.scopeIsAll(cs.Scope)) {
            // for the moment we assume that an undefined scope is all columns (i.e. whole row)
            rowClassRules[styleName] = (params: any) => {
              if (shouldRunStyle(cs, theadaptable, params.node)) {
                return this.evaluateExpression(cs, params.node.data);
              }
            };
            theadaptable.setRowClassRules(rowClassRules, 'ConditionalStyle');
          } else {
            cellClassRules[styleName] = (params: any) => {
              if (shouldRunStyle(cs, theadaptable, params.node)) {
                if (isColumnInScope(cs, theadaptable, column)) {
                  return this.evaluateExpression(cs, params.node.data);
                }
              }
            };
          }
        });
        theadaptable.setCellClassRules(cellClassRules, column.ColumnId, 'ConditionalStyle');
      }
    }
    // Redraw Adaptableto be on safe side (its rare use case)
    this.adaptable.redraw();
  }

  private evaluateExpression(conditionalStyle: ConditionalStyle, data: any): boolean {
    let expression: string = this.adaptable.api.queryApi.getExpressionForQueryObject(
      conditionalStyle
    );
    return parser.evaluate(expression, { data });
  }

  private isColumnInScope(
    conditionalStyle: ConditionalStyle,
    adaptable: IAdaptable,
    column: AdaptableColumn
  ): boolean {
    let shouldRun: boolean = adaptable.api.scopeApi.isColumnInScope(column, conditionalStyle.Scope);
    return shouldRun;
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
