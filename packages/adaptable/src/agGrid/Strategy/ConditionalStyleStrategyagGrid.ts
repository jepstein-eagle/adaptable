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
import { CellValueType } from '../../PredefinedConfig/Common/Enums';

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

    // first do rows
    let rowClassRules: any = {};
    this.adaptable.api.conditionalStyleApi.getRowConditionalStyles().forEach(cs => {
      let styleName: string = this.getNameForStyle(cs);
      rowClassRules[styleName] = (params: any) => {
        if (shouldRunStyle(cs, theadaptable, params.node)) {
          return this.evaluateExpression(cs, params.node);
        }
      };
    });
    theadaptable.setRowClassRules(rowClassRules);

    // now do columns
    if (ArrayExtensions.IsNotNullOrEmpty(columns)) {
      for (let column of columns) {
        let cellClassRules: any = {};

        let conditionalStylesForColumn:
          | ConditionalStyle[]
          | undefined = this.adaptable.api.conditionalStyleApi.getConditionalStylesForColumn(
          column
        );

        conditionalStylesForColumn.forEach((conditionalStyleForColumn: ConditionalStyle) => {
          if (conditionalStyleForColumn) {
            let styleName: string = this.getNameForStyle(conditionalStyleForColumn);

            cellClassRules[styleName] = (params: any) => {
              if (shouldRunStyle(conditionalStyleForColumn, theadaptable, params.node)) {
                // first run the predicate
                if (
                  conditionalStyleForColumn.Predicate &&
                  conditionalStyleForColumn.Predicate.PredicateId
                ) {
                  if (
                    this.evaluatePredicate(
                      conditionalStyleForColumn,
                      column,
                      params.value,
                      params.node
                    )
                  ) {
                    return true;
                  }
                } else if (
                  StringExtensions.IsNotNullOrEmpty(conditionalStyleForColumn.Expression) ||
                  StringExtensions.IsNotNullOrEmpty(conditionalStyleForColumn.SharedQueryId)
                ) {
                  if (this.evaluateExpression(conditionalStyleForColumn, params.node)) {
                    return true;
                  }
                }
                // nothing has passed then return false
                return false;
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

  private evaluatePredicate(
    conditionalStyle: ConditionalStyle,
    column: AdaptableColumn,
    value: any,
    node: any
  ): boolean {
    return this.adaptable.api.predicateApi.handlePredicate(
      conditionalStyle.Predicate,
      {
        value: value,
        oldValue: null,
        displayValue: this.adaptable.getValueFromRowNode(
          node,
          column.ColumnId,
          CellValueType.DisplayValue
        ),
        node: node,
        column: column,
      },
      false
    );
  }

  private evaluateExpression(conditionalStyle: ConditionalStyle, node: RowNode): boolean {
    let expression: string = this.adaptable.api.queryApi.QueryObjectToString(conditionalStyle);
    return parser.evaluate(expression, { node: node, api: this.adaptable.api });
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

  private getNameForStyle(conditionalStyle: ConditionalStyle): string {
    return StringExtensions.IsNullOrEmpty(conditionalStyle.Style.ClassName)
      ? this.adaptable.StyleService.CreateUniqueStyleName(
          StrategyConstants.ConditionalStyleStrategyId,
          conditionalStyle
        )
      : conditionalStyle.Style.ClassName;
  }
}
