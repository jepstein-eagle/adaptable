import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { Flex } from 'rebass';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';

import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';

import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { Expression } from '../../PredefinedConfig/Common/Expression/Expression';
import { UserFilter } from '../../PredefinedConfig/RunTimeState/UserFilterState';
import {
  QueryTab,
  LeafExpressionOperator,
  RangeOperandType,
} from '../../PredefinedConfig/Common/Enums';
import ExpressionHelper from '../../Utilities/Helpers/ExpressionHelper';

import ButtonPreviewDelete from '../Components/Buttons/ButtonPreviewDelete';
import ColumnHelper from '../../Utilities/Helpers/ColumnHelper';
import { QueryRange } from '../../PredefinedConfig/Common/Expression/QueryRange';
import { ColumnValueExpression } from '../../PredefinedConfig/Common/Expression/ColumnValueExpression';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import { FilterExpression } from '../../PredefinedConfig/Common/Expression/FilterExpression';
import { RangeExpression } from '../../PredefinedConfig/Common/Expression/RangeExpression';

import ListGroupItem from '../../components/List/ListGroupItem';
import ListGroup from '../../components/List/ListGroup';
import SimpleButton from '../../components/SimpleButton';

//I removed the OnClick from the ListGroupItem as React is rendering a button and it causes a warning
// since html cannot render a button within a button.
// https://github.com/react-bootstrap/react-bootstrap/issues/1445
// I've put the cursor to show that the item is clickable but we are loosing the hover color and stuff
// but I can live with that for now. We could add the class "btn btn-default" to the ListGroupItem but then it looks bad
// JW - 22/2/18: Ive added an underline to the column name.  Not perfect solution but think it makes it more obvious its clickable

export interface ExpressionBuilderPreviewProps
  extends React.ClassAttributes<ExpressionBuilderPreview> {
  Expression: Expression;
  UserFilters: UserFilter[];
  onSelectedColumnChange: (ColumnId: string, tab: QueryTab) => void;
  ColumnsList: Array<IColumn>;
  DeleteRange: (ColumnId: string, index: number) => void;
  DeleteUserFilterExpression: (ColumnId: string, index: number) => void;
  DeleteColumnValue: (ColumnId: string, ColumnValue: any) => void;
  DeleteAllColumnExpression: (ColumnId: string) => void;
  ShowPanel: boolean; // currently ALWAYS true!
  ReadOnlyMode?: boolean;
  cssClassName: string;
}

export class ExpressionBuilderPreview extends React.Component<ExpressionBuilderPreviewProps, {}> {
  componentWillReceiveProps(nextProps: ExpressionBuilderPreviewProps, nextContext: any) {
    //       this.ensureSelectedColumnVisible(nextProps.SelectedColumnId)
  }
  render() {
    let cssClassName: string = this.props.cssClassName + '__querypreview';
    let columnList = ExpressionHelper.GetColumnListFromExpression(this.props.Expression);
    let previewLists = columnList.map(columnId => {
      // First lets do the column values
      let columnValues: ColumnValueExpression = null;
      if (ArrayExtensions.IsNotNullOrEmpty(this.props.Expression.ColumnValueExpressions)) {
        columnValues = this.props.Expression.ColumnValueExpressions.find(
          colValues => colValues.ColumnId == columnId
        );
      }
      let columnValuesListgroupItems: JSX.Element[];
      if (columnValues) {
        columnValuesListgroupItems = columnValues.ColumnDisplayValues.map(y => {
          //I removed the OnClick from the ListGroupItem as React is rendering a button and it causes a warning
          // since html cannot render a button within a button.
          // https://github.com/react-bootstrap/react-bootstrap/issues/1445
          // I've put the cursor to show that the item is clickable but we are loosing the hover color and stuff
          // but I can live with that for now. We could add the class "btn btn-default" to the ListGroupItem but then it looks like bad
          return (
            <ListGroupItem
              key={y}
              style={previewListBoxItemStyle}
              onClick={() => this.props.onSelectedColumnChange(columnId, QueryTab.ColumnValue)}
            >
              <div style={{ flex: 1 }}>{y}</div>
              <ButtonPreviewDelete
                as="div"
                className={cssClassName}
                onClick={(e: React.SyntheticEvent) => {
                  e.stopPropagation();
                  this.props.DeleteColumnValue(columnId, y);
                }}
              />
            </ListGroupItem>
          );
        });
      }

      // Next do the user filter expressions

      let columnUserFilterExpression: FilterExpression = null;

      if (ArrayExtensions.IsNotNullOrEmpty(this.props.Expression.FilterExpressions)) {
        columnUserFilterExpression = this.props.Expression.FilterExpressions.find(
          ne => ne.ColumnId == columnId
        );
      }
      let columnUserFilterExpressionsListgroupItems: JSX.Element[];
      if (columnUserFilterExpression) {
        columnUserFilterExpressionsListgroupItems = columnUserFilterExpression.Filters.map(
          (filter, index) => {
            return (
              <ListGroupItem
                key={filter}
                style={previewListBoxItemStyle}
                onClick={() => this.props.onSelectedColumnChange(columnId, QueryTab.Filter)}
                className="ab_div_like_button"
              >
                <div style={{ flex: 1 }}>{filter}</div>
                <ButtonPreviewDelete
                  as="div"
                  className={cssClassName}
                  onClick={(e: React.SyntheticEvent) => {
                    this.props.DeleteUserFilterExpression(columnId, index);
                    e.stopPropagation();
                  }}
                  disabled={false}
                />
              </ListGroupItem>
            );
          }
        );
      }
      // Finally do the column ranges
      let columnRange: RangeExpression = null;

      if (ArrayExtensions.IsNotNullOrEmpty(this.props.Expression.RangeExpressions)) {
        columnRange = this.props.Expression.RangeExpressions.find(
          colValues => colValues.ColumnId == columnId
        );
      }
      let columnRangesListgroupItems: JSX.Element[];
      /* Note: these used to say:  this.props.DeleteRange(columnId, index); if (!this.props.ShowPanel) { e.stopPropagation();  - do we need that? */

      if (columnRange) {
        columnRangesListgroupItems = columnRange.Ranges.map((y, index) => {
          let operator: LeafExpressionOperator = y.Operator as LeafExpressionOperator;
          if (operator == LeafExpressionOperator.Between) {
            if (StringExtensions.IsEmpty(y.Operand1) || StringExtensions.IsEmpty(y.Operand2)) {
              return (
                <ListGroupItem
                  key={columnId + index}
                  style={{
                    ...previewListBoxItemStyle,
                    ...dangerStyle,
                  }}
                  className="ab_div_like_button"
                  onClick={() => this.props.onSelectedColumnChange(columnId, QueryTab.QueryRange)}
                >
                  <div style={{ flex: 1 }}>
                    {ExpressionHelper.OperatorToShortFriendlyString(operator)}{' '}
                    {this.getOperand1Value(y)} And {this.getOperand2Value(y)}
                  </div>
                  <ButtonPreviewDelete
                    as="div"
                    className={cssClassName}
                    onClick={(e: React.SyntheticEvent) => {
                      this.props.DeleteRange(columnId, index);
                      e.stopPropagation();
                    }}
                  />
                </ListGroupItem>
              );
            } else {
              return (
                <ListGroupItem
                  key={columnId + index}
                  style={previewListBoxItemStyle}
                  className="ab_div_like_button"
                  onClick={() => this.props.onSelectedColumnChange(columnId, QueryTab.QueryRange)}
                >
                  <div style={{ flex: 1 }}>
                    {ExpressionHelper.OperatorToShortFriendlyString(operator)}{' '}
                    {this.getOperand1Value(y)} And {this.getOperand2Value(y)}
                  </div>
                  <ButtonPreviewDelete
                    as="div"
                    className={cssClassName}
                    onClick={(e: React.SyntheticEvent) => {
                      this.props.DeleteRange(columnId, index);
                      e.stopPropagation();
                    }}
                  />
                </ListGroupItem>
              );
            }
          } else {
            if (StringExtensions.IsEmpty(y.Operand1) || y.Operator == LeafExpressionOperator.None) {
              return (
                <ListGroupItem
                  key={columnId + index}
                  style={{
                    ...previewListBoxItemStyle,
                    ...dangerStyle,
                  }}
                  className="ab_div_like_button"
                  onClick={() => this.props.onSelectedColumnChange(columnId, QueryTab.QueryRange)}
                >
                  <div style={{ flex: 1 }}>
                    {ExpressionHelper.OperatorToShortFriendlyString(operator)}{' '}
                    {this.getOperand1Value(y)}
                  </div>
                  <ButtonPreviewDelete
                    as="div"
                    className={cssClassName}
                    onClick={(e: React.SyntheticEvent) => {
                      this.props.DeleteRange(columnId, index);
                      e.stopPropagation();
                    }}
                  />
                </ListGroupItem>
              );
            } else {
              return (
                <ListGroupItem
                  key={columnId + index}
                  style={previewListBoxItemStyle}
                  className="ab_div_like_button"
                  onClick={() => this.props.onSelectedColumnChange(columnId, QueryTab.QueryRange)}
                >
                  <div style={{ flex: 1 }}>
                    {ExpressionHelper.OperatorToShortFriendlyString(operator)}{' '}
                    {this.getOperand1Value(y)}
                  </div>
                  <ButtonPreviewDelete
                    as="div"
                    className={cssClassName}
                    onClick={(e: React.SyntheticEvent) => {
                      this.props.DeleteRange(columnId, index);
                      e.stopPropagation();
                    }}
                  />
                </ListGroupItem>
              );
            }
          }
        });
      }

      let columnFriendlyName = ColumnHelper.getFriendlyNameFromColumnId(
        columnId,
        this.props.ColumnsList
      );

      return (
        <div
          key={columnId + '--div'}
          className={this.props.ReadOnlyMode ? GeneralConstants.READ_ONLY_STYLE : ''}
          style={{ marginBottom: 'var(--ab-space-2)' }}
        >
          <Flex flexDirection="row">
            <SimpleButton
              className={cssClassName + StyleConstants.PREVIEW_HEADER_BUTTON}
              style={{ flex: 1 }}
              tone="accent"
              variant="raised"
              key={columnId + 'header'}
              onClick={() => this.onColumnHeaderSelected(columnId)}
            >
              <u>{columnFriendlyName}</u>
            </SimpleButton>

            <SimpleButton
              className={cssClassName + StyleConstants.PREVIEW_DELETE_COLUMN_BUTTON}
              style={{ marginLeft: 'var(--ab-space-2)' }}
              key={columnId + 'headerx'}
              onClick={() => this.props.DeleteAllColumnExpression(columnId)}
              icon="trash"
              variant="text"
            ></SimpleButton>
          </Flex>

          <ListGroup style={{ marginTop: ' var(--ab-space-2)' }}>
            {columnValuesListgroupItems}
            {columnUserFilterExpressionsListgroupItems}
            {columnRangesListgroupItems}
          </ListGroup>
        </div>
      );
    });
    return (
      <Flex style={{ flex: '1 0 0%' }} flexDirection="column">
        {this.props.ShowPanel && (
          <PanelWithButton
            variant="default"
            style={{ flex: 1 }}
            cssClassName={cssClassName}
            bodyProps={{
              padding: 0,
              paddingTop: 2,
            }}
            button={
              <SimpleButton style={{ visibility: 'hidden' }} variant="text">
                {'\u00a0'}
              </SimpleButton>
            } //whitespace
            headerText="Preview"
          >
            <div style={{ overflowY: 'auto', overflowX: 'hidden' }}>{previewLists}</div>
          </PanelWithButton>
        )}

        {!this.props.ShowPanel && <div>{previewLists}</div>}
      </Flex>
    );
  }

  onColumnHeaderSelected(columnId: string): void {
    let columnValues = this.props.Expression.ColumnValueExpressions.find(
      colValues => colValues.ColumnId == columnId
    );
    if (columnValues) {
      this.props.onSelectedColumnChange(columnId, QueryTab.ColumnValue);
      return;
    }
    let columnUserFilterExpressions = this.props.Expression.FilterExpressions.find(
      ne => ne.ColumnId == columnId
    );
    if (columnUserFilterExpressions) {
      this.props.onSelectedColumnChange(columnId, QueryTab.Filter);
      return;
    }
    this.props.onSelectedColumnChange(columnId, QueryTab.QueryRange);
  }

  ensureSelectedColumnVisible(columnId: string) {
    var itemComponent = this.refs[columnId];
    if (itemComponent) {
      var domNode = ReactDOM.findDOMNode(itemComponent) as HTMLElement;
      domNode.scrollIntoView(true);
    }
  }

  private getOperand1Value(range: QueryRange): string {
    if (range.Operand1Type == RangeOperandType.Column) {
      let col: IColumn = this.props.ColumnsList.find(c => c.ColumnId == range.Operand1);
      return col ? '[' + col.FriendlyName + ']' : '';
    } else {
      return range.Operand1;
    }
  }

  private getOperand2Value(range: QueryRange): string {
    if (range.Operand2Type == RangeOperandType.Column) {
      let col: IColumn = this.props.ColumnsList.find(c => c.ColumnId == range.Operand2);
      return col ? '[' + col.FriendlyName + ']' : '';
    } else {
      return range.Operand2;
    }
  }
}

let previewListBoxItemStyle: React.CSSProperties = {
  paddingTop: 0,
  paddingBottom: 0,
  paddingRight: 0,
};

let dangerStyle = {
  background: 'var(--ab-color-errorlight)',
  color: 'var(--ab-color-error)',
};
