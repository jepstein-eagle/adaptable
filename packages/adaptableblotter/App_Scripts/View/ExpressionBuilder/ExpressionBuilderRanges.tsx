import * as React from 'react';
import { AdaptableBlotterColumn } from '../../PredefinedConfig/Common/AdaptableBlotterColumn';

import ExpressionHelper from '../../Utilities/Helpers/ExpressionHelper';
import {
  LeafExpressionOperator,
  RangeOperandType,
  SelectionMode,
} from '../../PredefinedConfig/Common/Enums';
import EnumExtensions from '../../Utilities/Extensions/EnumExtensions';
import { ColumnSelector } from '../Components/Selectors/ColumnSelector';
import UIHelper from '../UIHelper';
import ObjectFactory from '../../Utilities/ObjectFactory';
import SimpleButton from '../../components/SimpleButton';
import DropdownButton from '../../components/DropdownButton';
import Dropdown from '../../components/Dropdown';
import { Box, Flex } from 'rebass';
import FieldWrap from '../../components/FieldWrap';
import Input from '../../components/Input';
import Panel from '../../components/Panel';
import DropdownButtonItem from '../../components/DropdownButton/DropdownButtonItem';
import { QueryRange } from '../../PredefinedConfig/Common/Expression';

export interface ExpressionBuilderRangesPropsExpressionBuilderRanges
  extends React.ClassAttributes<ExpressionBuilderRanges> {
  SelectedColumn: AdaptableBlotterColumn;
  Ranges: Array<QueryRange>;
  Columns: Array<AdaptableBlotterColumn>;
  onRangesChange: (Ranges: Array<QueryRange>) => void;
}

export class ExpressionBuilderRanges extends React.Component<
  ExpressionBuilderRangesPropsExpressionBuilderRanges,
  {}
> {
  render() {
    let selectedColumnDataType = this.props.SelectedColumn.DataType;
    let addButton = (
      <SimpleButton margin={2} icon="plus" variant="text" onClick={() => this.addRange()}>
        Add Range
      </SimpleButton>
    );

    let rangesElement: JSX.Element[] = this.props.Ranges.map((range, index) => {
      let optionLeafOperators = ExpressionHelper.GetOperatorsForDataType(
        selectedColumnDataType
      ).map((operator: LeafExpressionOperator) => {
        return {
          label: ExpressionHelper.OperatorToLongFriendlyString(operator, selectedColumnDataType),
          value: operator,
        };
      });

      let rangeMenuItemsOperand1 = EnumExtensions.getNames(RangeOperandType).map(
        (rangeOperand: RangeOperandType): DropdownButtonItem => {
          return {
            label: rangeOperand,
            onClick: () => this.onRangeTypeChangedOperand1(index, rangeOperand),
          };
        }
      );

      let rangeMenuItemsOperand2 = EnumExtensions.getNames(RangeOperandType).map(
        (rangeOperand: RangeOperandType): DropdownButtonItem => {
          return {
            label: rangeOperand,
            onClick: () => this.onRangeTypeChangedOperand2(index, rangeOperand),
          };
        }
      );

      return (
        <Box padding={2} style={betweenDivStyle} key={index}>
          <FieldWrap marginBottom={1}>
            <Dropdown
              placeholder="Select Operator"
              style={{ maxWidth: 'none' }}
              value={range.Operator}
              showClearButton={false}
              onChange={(x: any) => this.onLeafExpressionOperatorChanged(index, x)}
              options={optionLeafOperators}
            />
            <SimpleButton
              tooltip="Delete"
              icon="trash"
              variant="text"
              onClick={() => this.onRangeDelete(index)}
            ></SimpleButton>
          </FieldWrap>

          <Flex flexDirection="row">
            <DropdownButton
              marginRight={1}
              variant="raised"
              columns={['label']}
              items={rangeMenuItemsOperand1}
            >
              {range.Operand1Type}
            </DropdownButton>

            {range.Operand1Type == RangeOperandType.Column ? (
              <ColumnSelector
                SelectedColumnIds={[range.Operand1]}
                ColumnList={this.props.Columns.filter(
                  c =>
                    c.DataType == selectedColumnDataType &&
                    c.ColumnId != this.props.SelectedColumn.ColumnId
                )}
                onColumnChange={columns => this.onColumnOperand1SelectedChanged(index, columns)}
                SelectionMode={SelectionMode.Single}
              />
            ) : (
              this.getOperand1FormControl(index, range)
            )}
          </Flex>

          {range.Operator == LeafExpressionOperator.Between && (
            <Flex flexDirection="row" marginTop={1}>
              <DropdownButton
                columns={['label']}
                marginRight={1}
                style={rangeOperatorStyle}
                variant="raised"
                items={rangeMenuItemsOperand2}
              >
                {range.Operand2Type}
              </DropdownButton>

              {range.Operand2Type == RangeOperandType.Column ? (
                <ColumnSelector
                  SelectedColumnIds={[range.Operand2]}
                  ColumnList={this.props.Columns.filter(
                    c =>
                      c.DataType == selectedColumnDataType &&
                      c.ColumnId != this.props.SelectedColumn.ColumnId
                  )}
                  onColumnChange={columns => this.onColumnOperand2SelectedChanged(index, columns)}
                  SelectionMode={SelectionMode.Single}
                />
              ) : (
                this.getOperand2FormControl(index, range)
              )}
            </Flex>
          )}
        </Box>
      );
    });

    return (
      <Panel style={{ flex: 1 }} bodyScroll>
        {addButton}
        {rangesElement}
      </Panel>
    );
  }

  getOperand1FormControl(index: number, range: QueryRange): any {
    return (
      <Input
        style={operandStyle}
        value={String(range.Operand1)}
        type={UIHelper.getDescriptionForDataType(this.props.SelectedColumn.DataType)}
        placeholder={UIHelper.getPlaceHolderforDataType(this.props.SelectedColumn.DataType)}
        onChange={(e: any) => this.onOperand1Edit(index, e)}
      />
    );
  }

  getOperand2FormControl(index: number, range: QueryRange): any {
    return (
      <Input
        style={operandStyle}
        value={String(range.Operand2)}
        type={UIHelper.getDescriptionForDataType(this.props.SelectedColumn.DataType)}
        placeholder={UIHelper.getPlaceHolderforDataType(this.props.SelectedColumn.DataType)}
        onChange={(e: any) => this.onOperand2Edit(index, e)}
      />
    );
  }

  onRangeDelete(index: number) {
    let newCol = [].concat(this.props.Ranges);
    newCol.splice(index, 1);
    this.props.onRangesChange(newCol);
  }

  private addRange() {
    this.props.onRangesChange([].concat(this.props.Ranges, ObjectFactory.CreateEmptyRange()));
  }

  private onLeafExpressionOperatorChanged(index: number, Operator: string) {
    let rangeCol: Array<QueryRange> = [].concat(this.props.Ranges);
    let range = this.props.Ranges[index];
    rangeCol[index] = Object.assign({}, range, { Operator });
    this.props.onRangesChange(rangeCol);
  }

  private onRangeTypeChangedOperand1(index: number, rangeOperandType: RangeOperandType): any {
    let rangeCol: Array<QueryRange> = [].concat(this.props.Ranges);
    let range = this.props.Ranges[index];
    rangeCol[index] = Object.assign({}, range, { Operand1Type: rangeOperandType });
    this.props.onRangesChange(rangeCol);
  }

  private onRangeTypeChangedOperand2(index: number, rangeOperandType: RangeOperandType): any {
    let rangeCol: Array<QueryRange> = [].concat(this.props.Ranges);
    let range = this.props.Ranges[index];
    rangeCol[index] = Object.assign({}, range, { Operand2Type: rangeOperandType });
    this.props.onRangesChange(rangeCol);
  }

  private onOperand1Edit(index: number, x: React.FormEvent<any>) {
    let e = x.target as HTMLInputElement;
    let rangeCol: Array<QueryRange> = [].concat(this.props.Ranges);
    let range = this.props.Ranges[index];
    rangeCol[index] = Object.assign({}, range, { Operand1: e.value });
    this.props.onRangesChange(rangeCol);
  }

  private onOperand2Edit(index: number, x: React.FormEvent<any>) {
    let e = x.target as HTMLInputElement;
    let rangeCol: Array<QueryRange> = [].concat(this.props.Ranges);
    let range = this.props.Ranges[index];
    rangeCol[index] = Object.assign({}, range, { Operand2: e.value });
    this.props.onRangesChange(rangeCol);
  }

  private onColumnOperand1SelectedChanged(index: number, columns: AdaptableBlotterColumn[]) {
    let rangeCol: Array<QueryRange> = [].concat(this.props.Ranges);
    let range = this.props.Ranges[index];
    let selectedColumn: string = columns.length > 0 ? columns[0].ColumnId : '';
    rangeCol[index] = Object.assign({}, range, { Operand1: selectedColumn });
    this.props.onRangesChange(rangeCol);
  }

  private onColumnOperand2SelectedChanged(index: number, columns: AdaptableBlotterColumn[]) {
    let rangeCol: Array<QueryRange> = [].concat(this.props.Ranges);
    let range = this.props.Ranges[index];
    let selectedColumn: string = columns.length > 0 ? columns[0].ColumnId : '';
    rangeCol[index] = Object.assign({}, range, { Operand2: selectedColumn });
    this.props.onRangesChange(rangeCol);
  }
}

let divStyle: React.CSSProperties = {
  overflowY: 'auto',
  overflowX: 'hidden',
  height: '350px',
};

let betweenDivStyle: React.CSSProperties = {
  marginBottom: 'var(--ab-space-2)',
};

let operandStyle = {
  flex: 1,
};

let rangeOperatorStyle = {};
