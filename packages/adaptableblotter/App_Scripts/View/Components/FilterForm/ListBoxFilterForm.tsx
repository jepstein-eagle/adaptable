import * as React from 'react';
import {
  LeafExpressionOperator,
  DataType,
  DistinctCriteriaPairValue,
} from '../../../PredefinedConfig/Common/Enums';

import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ExpressionHelper } from '../../../Utilities/Helpers/ExpressionHelper';
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { AdaptableBlotterFormControlTextClear } from '../Forms/AdaptableBlotterFormControlTextClear';

import { UIHelper } from '../../UIHelper';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { QueryRange } from '../../../PredefinedConfig/Common/Expression/QueryRange';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import ListGroupItem from '../../../components/List/ListGroupItem';
import ListGroup, { ListGroupProps } from '../../../components/List/ListGroup';
import { Box, Flex } from 'rebass';
import Dropdown from '../../../components/Dropdown';
import DropdownButton from '../../../components/DropdownButton';
import Input from '../../../components/Input';
import { SyntheticEvent } from 'react';

export interface ListBoxFilterFormProps extends ListGroupProps {
  CurrentColumn: IColumn;
  Columns: IColumn[];
  ColumnValuePairs: Array<IRawValueDisplayValuePair>;
  UserFilters: Array<IRawValueDisplayValuePair>;
  UiSelectedColumnValues: Array<string>;
  UiSelectedUserFilters: Array<string>;
  UiSelectedRange: QueryRange;
  onColumnValueSelectedChange: (SelectedValues: Array<any>) => void;
  onUserFilterSelectedChange: (SelectedValues: Array<any>) => void;
  onCustomRangeExpressionChange: (rangeExpression: QueryRange) => void;
  Operators: Array<LeafExpressionOperator>;
  DataType: DataType;
  cssClassName: string;
  DistinctCriteriaPairValue: DistinctCriteriaPairValue;
}

export interface ListBoxFilterFormState extends React.ClassAttributes<ListBoxFilterForm> {
  UiSelectedColumnValues: Array<string>;
  UiSelectedUserFilters: Array<string>;
  UiSelectedRange: QueryRange;
  FilterValue: string;
  DistinctCriteriaPairValue: DistinctCriteriaPairValue;
}

export class ListBoxFilterForm extends React.Component<
  ListBoxFilterFormProps,
  ListBoxFilterFormState
> {
  constructor(props: ListBoxFilterFormProps) {
    super(props);

    this.state = {
      UiSelectedColumnValues: this.props.UiSelectedColumnValues,
      UiSelectedUserFilters: this.props.UiSelectedUserFilters,
      UiSelectedRange: this.props.UiSelectedRange,
      FilterValue: '',
      DistinctCriteriaPairValue: this.props.DistinctCriteriaPairValue,
    };
  }
  componentWillReceiveProps(nextProps: ListBoxFilterFormProps, nextContext: any) {
    this.setState({
      UiSelectedColumnValues: nextProps.UiSelectedColumnValues,
      UiSelectedUserFilters: nextProps.UiSelectedUserFilters,
      UiSelectedRange: nextProps.UiSelectedRange,
      FilterValue: this.state.FilterValue,
    });
  }

  render() {
    let userFiltersItemsElements = this.props.UserFilters.map((x, y) => {
      let isActive: boolean;
      isActive = this.state.UiSelectedUserFilters.indexOf(x.RawValue) >= 0;
      let display: string = x.DisplayValue;
      let value = x.RawValue;
      if (
        StringExtensions.IsNotEmpty(this.state.FilterValue) &&
        display.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0
      ) {
        return null;
      } else {
        return (
          <ListGroupItem
            key={'userFilter' + y}
            style={userFilterItemStyle}
            onClick={() => this.onClickItemUserFilter(x)}
            active={isActive}
            value={value}
          >
            {display}
          </ListGroupItem>
        );
      }
    });

    let columnValuesItemsElements = this.props.ColumnValuePairs.map((x, y) => {
      let isActive: boolean;
      let columnValue: string;
      if (this.props.DistinctCriteriaPairValue == DistinctCriteriaPairValue.DisplayValue) {
        isActive = this.state.UiSelectedColumnValues.indexOf(x.DisplayValue) >= 0;
        columnValue = x.DisplayValue;
      } else {
        isActive = this.state.UiSelectedColumnValues.indexOf(x.RawValue) >= 0;
        columnValue = x.RawValue;
      }
      if (
        StringExtensions.IsNotEmpty(this.state.FilterValue) &&
        columnValue.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0
      ) {
        return null;
      } else {
        return (
          <ListGroupItem
            key={'columnValue' + y}
            onClick={() => this.onClickItemColumnValue(x)}
            active={isActive}
            value={columnValue}
          >
            {columnValue}
          </ListGroupItem>
        );
      }
    });

    let textClear = (
      <AdaptableBlotterFormControlTextClear
        autoFocus={true}
        type="text"
        placeholder="Search Filters"
        value={this.state.FilterValue}
        OnTextChange={x => this.onUpdateFilterSearch(x)}
      />
    );

    let rangeOperandOptions: string[] = ['Value', 'Column'];
    let rangeMenuItemsOperand1 = rangeOperandOptions.map((rangeOperand: string, index: number) => {
      return {
        onClick: () => this.onRangeTypeChangedOperand1(rangeOperand),
        label: rangeOperand,
      };
    });

    let rangeMenuItemsOperand2 = rangeOperandOptions.map((rangeOperand: string, index: number) => {
      return {
        onClick: () => this.onRangeTypeChangedOperand2(rangeOperand),
        label: rangeOperand,
      };
    });

    let rangeForm = (
      <Flex flexDirection="column">
        <Dropdown
          placeholder="Select"
          value={this.state.UiSelectedRange.Operator}
          onChange={(x: LeafExpressionOperator) => this.onLeafExpressionOperatorChange(x)}
          options={this.props.Operators.map((operator: LeafExpressionOperator) => {
            return {
              label: ExpressionHelper.OperatorToLongFriendlyString(operator, this.props.DataType),
              value: operator.toString(),
            };
          })}
        ></Dropdown>

        {this.state.UiSelectedRange.Operator != LeafExpressionOperator.Unknown && (
          <Flex flexDirection="row" marginTop={2}>
            <DropdownButton columns={['label']} items={rangeMenuItemsOperand1} marginRight={2}>
              {this.state.UiSelectedRange.Operand1Type}
            </DropdownButton>

            {this.getOperand1FormControl()}
          </Flex>
        )}
        {this.state.UiSelectedRange.Operator == LeafExpressionOperator.Between && (
          <Flex flexDirection="row" marginTop={2}>
            <DropdownButton columns={['label']} items={rangeMenuItemsOperand2} marginRight={2}>
              {this.state.UiSelectedRange.Operand2Type}
            </DropdownButton>

            {this.getOperand2FormControl()}
          </Flex>
        )}

        <Box my={3}>
          <Box backgroundColor="darkgray" style={{ height: 1 }} />
        </Box>
      </Flex>
    );

    return (
      <div style={divStyle}>
        {rangeForm}
        <Box mx={'2px'} marginBottom={2}>
          {textClear}
        </Box>
        <ListGroup>
          {userFiltersItemsElements}
          {columnValuesItemsElements}
        </ListGroup>
      </div>
    );
  }

  // Methods for getting the range
  private onLeafExpressionOperatorChange(value: LeafExpressionOperator) {
    let editedRange: QueryRange = {
      Operand1Type: this.state.UiSelectedRange.Operand1Type,
      Operand2Type: this.state.UiSelectedRange.Operand2Type,
      Operator: value,
      Operand1: this.state.UiSelectedRange.Operand1,
      Operand2: this.state.UiSelectedRange.Operand2,
    };
    this.setState({ UiSelectedRange: editedRange } as ListBoxFilterFormState, () =>
      this.raiseOnChangeCustomExpression()
    );
  }

  private onRangeTypeChangedOperand1(rangeOperandType: any): any {
    let editedRange: QueryRange = {
      Operand1Type: rangeOperandType,
      Operand2Type: this.state.UiSelectedRange.Operand2Type,
      Operator: this.state.UiSelectedRange.Operator,
      Operand1: '',
      Operand2: this.state.UiSelectedRange.Operand2,
    };
    this.setState({ UiSelectedRange: editedRange } as ListBoxFilterFormState, () =>
      this.raiseOnChangeCustomExpression()
    );
  }

  private onRangeTypeChangedOperand2(rangeOperandType: any): any {
    let editedRange: QueryRange = {
      Operand1Type: this.state.UiSelectedRange.Operand1Type,
      Operand2Type: rangeOperandType,
      Operator: this.state.UiSelectedRange.Operator,
      Operand1: this.state.UiSelectedRange.Operand1,
      Operand2: '',
    };
    this.setState({ UiSelectedRange: editedRange } as ListBoxFilterFormState, () =>
      this.raiseOnChangeCustomExpression()
    );
  }

  private getOperand1FormControl(): any {
    if (this.state.UiSelectedRange.Operand1Type == 'Column') {
      let operand1 = StringExtensions.IsNotNullOrEmpty(this.state.UiSelectedRange.Operand1)
        ? ColumnHelper.getFriendlyNameFromColumnId(
            this.state.UiSelectedRange.Operand1,
            this.props.Columns
          )
        : 'Select a column';

      let availableColumns: any = this.props.Columns.filter(
        (c: IColumn) =>
          c != this.props.CurrentColumn && c.DataType == this.props.CurrentColumn.DataType
      ).map((column, index) => {
        return {
          onClick: () => this.onColumnOperand1SelectedChanged(column),
          label: column.FriendlyName,
        };
      });

      return (
        <DropdownButton
          style={{ flex: 1 }}
          columns={['label']}
          disabled={availableColumns.length == 0}
          className={this.props.cssClassName}
          items={availableColumns}
        >
          {operand1}
        </DropdownButton>
      );
    } else {
      return (
        <Input
          style={{ flex: 1 }}
          value={String(this.state.UiSelectedRange.Operand1)}
          type={UIHelper.getDescriptionForDataType(this.props.DataType)}
          placeholder={UIHelper.getPlaceHolderforDataType(this.props.DataType)}
          onChange={(e: SyntheticEvent) => this.onOperand1Edit(e)}
        />
      );
    }
  }

  private getOperand2FormControl(): any {
    if (this.state.UiSelectedRange.Operand2Type == 'Column') {
      let operand2 = StringExtensions.IsNotNullOrEmpty(this.state.UiSelectedRange.Operand2)
        ? ColumnHelper.getFriendlyNameFromColumnId(
            this.state.UiSelectedRange.Operand2,
            this.props.Columns
          )
        : 'Select a column';

      let availableColumns: any = this.props.Columns.filter(() => this.props.CurrentColumn).map(
        (column, index) => {
          return {
            onClick: () => this.onColumnOperand2SelectedChanged(column),
            label: column.FriendlyName,
          };
        }
      );

      return (
        <DropdownButton
          style={{ flex: 1 }}
          columns={['label']}
          disabled={availableColumns.length == 0}
          className={this.props.cssClassName}
          items={availableColumns}
        >
          {operand2}
        </DropdownButton>
      );
    } else {
      return (
        <Input
          style={{ flex: 1 }}
          value={String(this.state.UiSelectedRange.Operand2)}
          type={UIHelper.getDescriptionForDataType(this.props.DataType)}
          placeholder={UIHelper.getPlaceHolderforDataType(this.props.DataType)}
          onChange={(e: SyntheticEvent) => this.onOperand2Edit(e)}
        />
      );
    }
  }

  private onOperand1Edit(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let newRange: QueryRange = {
      Operand1Type: this.state.UiSelectedRange.Operand1Type,
      Operand2Type: this.state.UiSelectedRange.Operand2Type,
      Operator: this.state.UiSelectedRange.Operator,
      Operand1: e.value,
      Operand2: this.state.UiSelectedRange.Operand2,
    };
    this.setState({ UiSelectedRange: newRange } as ListBoxFilterFormState, () =>
      this.raiseOnChangeCustomExpression()
    );
  }

  private onOperand2Edit(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let newRange: QueryRange = {
      Operand1Type: this.state.UiSelectedRange.Operand1Type,
      Operand2Type: this.state.UiSelectedRange.Operand2Type,
      Operator: this.state.UiSelectedRange.Operator,
      Operand1: this.state.UiSelectedRange.Operand1,
      Operand2: e.value,
    };
    this.setState({ UiSelectedRange: newRange } as ListBoxFilterFormState, () =>
      this.raiseOnChangeCustomExpression()
    );
  }

  private onColumnOperand1SelectedChanged(column: IColumn) {
    let editedRange: QueryRange = {
      Operand1Type: this.state.UiSelectedRange.Operand1Type,
      Operand2Type: this.state.UiSelectedRange.Operand2Type,
      Operator: this.state.UiSelectedRange.Operator,
      Operand1: column.ColumnId,
      Operand2: this.state.UiSelectedRange.Operand2,
    };
    this.setState({ UiSelectedRange: editedRange } as ListBoxFilterFormState, () =>
      this.raiseOnChangeCustomExpression()
    );
  }

  private onColumnOperand2SelectedChanged(column: IColumn) {
    let editedRange: QueryRange = {
      Operand1Type: this.state.UiSelectedRange.Operand1Type,
      Operand2Type: this.state.UiSelectedRange.Operand2Type,
      Operator: this.state.UiSelectedRange.Operator,
      Operand1: this.state.UiSelectedRange.Operand1,
      Operand2: column.ColumnId,
    };
    this.setState({ UiSelectedRange: editedRange } as ListBoxFilterFormState, () =>
      this.raiseOnChangeCustomExpression()
    );
  }

  // Methods for getting column values or filters
  onUpdateFilterSearch(filterSearch: string) {
    this.setState({ FilterValue: filterSearch } as ListBoxFilterFormState);
  }

  raiseOnChangeColumnValues() {
    this.props.onColumnValueSelectedChange(this.state.UiSelectedColumnValues);
  }

  raiseOnChangeUserFilter() {
    this.props.onUserFilterSelectedChange(this.state.UiSelectedUserFilters);
  }

  raiseOnChangeCustomExpression() {
    let isValidRange: boolean = false;
    if (this.state.UiSelectedRange.Operator != LeafExpressionOperator.Unknown) {
      if (this.state.UiSelectedRange.Operator != LeafExpressionOperator.Between) {
        isValidRange = StringExtensions.IsNotNullOrEmpty(this.state.UiSelectedRange.Operand1);
      } else {
        isValidRange =
          StringExtensions.IsNotNullOrEmpty(this.state.UiSelectedRange.Operand1) &&
          StringExtensions.IsNotNullOrEmpty(this.state.UiSelectedRange.Operand2);
      }
    }
    if (isValidRange) {
      this.props.onCustomRangeExpressionChange(this.state.UiSelectedRange);
    }
  }

  onClickItemColumnValue(item: IRawValueDisplayValuePair) {
    let index: number;
    index = this.state.UiSelectedColumnValues.indexOf(item.DisplayValue);

    if (index >= 0) {
      let newArray = [...this.state.UiSelectedColumnValues];
      newArray.splice(index, 1);
      this.setState({ UiSelectedColumnValues: newArray } as ListBoxFilterFormState, () =>
        this.raiseOnChangeColumnValues()
      );
    } else {
      let newArray = [...this.state.UiSelectedColumnValues];
      newArray.push(item.DisplayValue);
      this.setState({ UiSelectedColumnValues: newArray } as ListBoxFilterFormState, () =>
        this.raiseOnChangeColumnValues()
      );
    }
  }

  onClickItemUserFilter(item: IRawValueDisplayValuePair) {
    let index = this.state.UiSelectedUserFilters.indexOf(item.RawValue);
    if (index >= 0) {
      let newArray = [...this.state.UiSelectedUserFilters];
      newArray.splice(index, 1);
      this.setState({ UiSelectedUserFilters: newArray } as ListBoxFilterFormState, () =>
        this.raiseOnChangeUserFilter()
      );
    } else {
      let newArray = [...this.state.UiSelectedUserFilters];
      newArray.push(item.RawValue);
      this.setState({ UiSelectedUserFilters: newArray } as ListBoxFilterFormState, () =>
        this.raiseOnChangeUserFilter()
      );
    }
  }
}

let divStyle: React.CSSProperties = {
  overflowY: 'auto',
  overflowX: 'hidden',
  // maxHeight: '40vh',
  marginBottom: '0',
};

let userFilterItemStyle: React.CSSProperties = {
  fontStyle: 'italic',
};
