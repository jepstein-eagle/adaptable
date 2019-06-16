import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';

import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { Helper } from '../../Utilities/Helpers/Helper';
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
import { ListGroupItem, InputGroup, Button, Glyphicon, ListGroup } from 'react-bootstrap';
import { AdaptableBlotterForm } from '../Components/Forms/AdaptableBlotterForm';
import { ButtonPreviewDelete } from '../Components/Buttons/ButtonPreviewDelete';
import ColumnHelper from '../../Utilities/Helpers/ColumnHelper';
import { IRange } from '../../PredefinedConfig/Common/Expression/IRange';

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
      let columnValues = this.props.Expression.ColumnValueExpressions.find(
        colValues => colValues.ColumnId == columnId
      );
      let columnValuesListgroupItems: JSX.Element[];
      if (columnValues) {
        columnValuesListgroupItems = columnValues.ColumnDisplayValues.map(y => {
          //I removed the OnClick from the ListGroupItem as React is rendering a button and it causes a warning
          // since html cannot render a button within a button.
          // https://github.com/react-bootstrap/react-bootstrap/issues/1445
          // I've put the cursor to show that the item is clickable but we are loosing the hover color and stuff
          // but I can live with that for now. We could add the class "btn btn-default" to the ListGroupItem but then it looks like bad
          return (
            <ListGroupItem bsSize={'xsmall'} key={y} style={previewListBoxItemStyle}>
              <div
                className="ab_div_like_button"
                onClick={() => this.props.onSelectedColumnChange(columnId, QueryTab.ColumnValue)}
                style={{ cursor: 'pointer', fontSize: 'small' }}
              >
                <AdaptableBlotterForm inline>
                  {y}
                  <ButtonPreviewDelete
                    cssClassName={cssClassName}
                    bsStyle={'default'}
                    style={{ float: 'right' }}
                    onClick={() => this.props.DeleteColumnValue(columnId, y)}
                    size="xsmall"
                    overrideDisableButton={false}
                    DisplayMode="Glyph"
                  />
                </AdaptableBlotterForm>
              </div>
            </ListGroupItem>
          );
        });
      }

      // Next do the user filter expressions

      let columnUserFilterExpressions = this.props.Expression.FilterExpressions.find(
        ne => ne.ColumnId == columnId
      );
      let columnUserFilterExpressionsListgroupItems: JSX.Element[];
      if (columnUserFilterExpressions) {
        columnUserFilterExpressionsListgroupItems = columnUserFilterExpressions.Filters.map(
          (filter, index) => {
            return (
              <ListGroupItem key={filter} style={previewListBoxItemStyle}>
                <div
                  className="ab_div_like_button"
                  onClick={() => this.props.onSelectedColumnChange(columnId, QueryTab.Filter)}
                  style={{ cursor: 'pointer' }}
                >
                  <AdaptableBlotterForm inline>
                    {filter}
                    <ButtonPreviewDelete
                      cssClassName={cssClassName}
                      bsStyle={'default'}
                      style={{ float: 'right' }}
                      onClick={() => this.props.DeleteUserFilterExpression(columnId, index)}
                      size="xsmall"
                      overrideDisableButton={false}
                      DisplayMode="Glyph"
                    />
                  </AdaptableBlotterForm>
                </div>
              </ListGroupItem>
            );
          }
        );
      }
      // Finally do the column ranges
      let columnRanges = this.props.Expression.RangeExpressions.find(
        colValues => colValues.ColumnId == columnId
      );
      let columnRangesListgroupItems: JSX.Element[];
      /* Note: these used to say:  this.props.DeleteRange(columnId, index); if (!this.props.ShowPanel) { e.stopPropagation();  - do we need that? */

      if (columnRanges) {
        columnRangesListgroupItems = columnRanges.Ranges.map((y, index) => {
          let operator: LeafExpressionOperator = y.Operator as LeafExpressionOperator;
          if (operator == LeafExpressionOperator.Between) {
            if (StringExtensions.IsEmpty(y.Operand1) || StringExtensions.IsEmpty(y.Operand2)) {
              return (
                <ListGroupItem
                  key={columnId + index}
                  bsStyle={StyleConstants.DANGER_BSSTYLE}
                  style={previewListBoxItemStyle}
                >
                  <div
                    className="ab_div_like_button"
                    onClick={() => this.props.onSelectedColumnChange(columnId, QueryTab.Range)}
                    style={{ cursor: 'pointer' }}
                  >
                    <AdaptableBlotterForm inline>
                      {ExpressionHelper.OperatorToShortFriendlyString(operator)}{' '}
                      {this.getOperand1Value(y)} And {this.getOperand2Value(y)}
                      <ButtonPreviewDelete
                        cssClassName={cssClassName}
                        bsStyle={'default'}
                        style={{ float: 'right' }}
                        onClick={() => this.props.DeleteRange(columnId, index)}
                        size="xsmall"
                        overrideDisableButton={false}
                        DisplayMode="Glyph"
                      />
                    </AdaptableBlotterForm>
                  </div>
                </ListGroupItem>
              );
            } else {
              return (
                <ListGroupItem key={columnId + index} style={previewListBoxItemStyle}>
                  <div
                    className="ab_div_like_button"
                    onClick={() => this.props.onSelectedColumnChange(columnId, QueryTab.Range)}
                    style={{ cursor: 'pointer' }}
                  >
                    <AdaptableBlotterForm inline>
                      {ExpressionHelper.OperatorToShortFriendlyString(operator)}{' '}
                      {this.getOperand1Value(y)} And {this.getOperand2Value(y)}
                      <ButtonPreviewDelete
                        cssClassName={cssClassName}
                        bsStyle={'default'}
                        style={{ float: 'right' }}
                        onClick={() => this.props.DeleteRange(columnId, index)}
                        size="xsmall"
                        overrideDisableButton={false}
                        DisplayMode="Glyph"
                      />
                    </AdaptableBlotterForm>
                  </div>
                </ListGroupItem>
              );
            }
          } else {
            if (
              StringExtensions.IsEmpty(y.Operand1) ||
              y.Operator == LeafExpressionOperator.Unknown
            ) {
              return (
                <ListGroupItem
                  key={columnId + index}
                  bsStyle={StyleConstants.DANGER_BSSTYLE}
                  style={previewListBoxItemStyle}
                >
                  <div
                    className="ab_div_like_button"
                    onClick={() => this.props.onSelectedColumnChange(columnId, QueryTab.Range)}
                    style={{ cursor: 'pointer' }}
                  >
                    <AdaptableBlotterForm inline>
                      {ExpressionHelper.OperatorToShortFriendlyString(operator)}{' '}
                      {this.getOperand1Value(y)}
                      <ButtonPreviewDelete
                        cssClassName={cssClassName}
                        bsStyle={'default'}
                        style={{ float: 'right' }}
                        onClick={() => this.props.DeleteRange(columnId, index)}
                        size="xsmall"
                        overrideDisableButton={false}
                        DisplayMode="Glyph"
                      />
                    </AdaptableBlotterForm>
                  </div>
                </ListGroupItem>
              );
            } else {
              return (
                <ListGroupItem key={columnId + index} style={previewListBoxItemStyle}>
                  <div
                    className="ab_div_like_button"
                    onClick={() => this.props.onSelectedColumnChange(columnId, QueryTab.Range)}
                    style={{ cursor: 'pointer' }}
                  >
                    <AdaptableBlotterForm inline>
                      {ExpressionHelper.OperatorToShortFriendlyString(operator)}{' '}
                      {this.getOperand1Value(y)}
                      <ButtonPreviewDelete
                        cssClassName={cssClassName}
                        bsStyle={'default'}
                        style={{ float: 'right' }}
                        onClick={() => this.props.DeleteRange(columnId, index)}
                        size="xsmall"
                        overrideDisableButton={false}
                        DisplayMode="Glyph"
                      />
                    </AdaptableBlotterForm>
                  </div>
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
          key={columnId + 'div'}
          className={this.props.ReadOnlyMode ? GeneralConstants.READ_ONLY_STYLE : ''}
        >
          <InputGroup>
            <InputGroup.Button>
              <Button
                block
                className={cssClassName + StyleConstants.PREVIEW_HEADER_BUTTON}
                style={{ width: '250px' }}
                bsStyle="success"
                bsSize="small"
                key={columnId + 'header'}
                ref={columnId}
                onClick={() => this.onColumnHeaderSelected(columnId)}
              >
                <u>{columnFriendlyName}</u>
              </Button>
            </InputGroup.Button>
            <InputGroup.Button>
              <Button
                block
                className={cssClassName + StyleConstants.PREVIEW_DELETE_COLUMN_BUTTON}
                style={{ width: '40px' }}
                bsStyle="success"
                bsSize="small"
                key={columnId + 'headerx'}
                ref={columnId}
                onClick={() => this.props.DeleteAllColumnExpression(columnId)}
              >
                <Glyphicon glyph={'trash'} />
              </Button>
            </InputGroup.Button>
          </InputGroup>

          <ListGroup style={{ overflowY: 'hidden' }}>
            {columnValuesListgroupItems}
            {columnUserFilterExpressionsListgroupItems}
            {columnRangesListgroupItems}
          </ListGroup>
        </div>
      );
    });
    return (
      <div>
        {this.props.ShowPanel && (
          <PanelWithButton cssClassName={cssClassName} headerText="Preview" bsStyle="info">
            <div style={{ height: '385px', overflowY: 'auto', overflowX: 'hidden' }}>
              {previewLists}
            </div>
          </PanelWithButton>
        )}

        {!this.props.ShowPanel && <div>{previewLists}</div>}
      </div>
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
    this.props.onSelectedColumnChange(columnId, QueryTab.Range);
  }

  ensureSelectedColumnVisible(columnId: string) {
    var itemComponent = this.refs[columnId];
    if (itemComponent) {
      var domNode = ReactDOM.findDOMNode(itemComponent) as HTMLElement;
      domNode.scrollIntoView(true);
    }
  }

  private getOperand1Value(range: IRange): string {
    if (range.Operand1Type == RangeOperandType.Column) {
      let col: IColumn = this.props.ColumnsList.find(c => c.ColumnId == range.Operand1);
      return col ? '[' + col.FriendlyName + ']' : '';
    } else {
      return range.Operand1;
    }
  }

  private getOperand2Value(range: IRange): string {
    if (range.Operand2Type == RangeOperandType.Column) {
      let col: IColumn = this.props.ColumnsList.find(c => c.ColumnId == range.Operand2);
      return col ? '[' + col.FriendlyName + ']' : '';
    } else {
      return range.Operand2;
    }
  }
}

let previewListBoxItemStyle: React.CSSProperties = {
  fontSize: 'xsmall',
  padding: '7px',
  margin: 0,
};
