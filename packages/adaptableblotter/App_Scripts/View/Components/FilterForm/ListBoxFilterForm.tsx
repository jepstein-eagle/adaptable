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
import { AdaptableBlotterColumn } from '../../../Utilities/Interface/AdaptableBlotterColumn';
import { QueryRange } from '../../../PredefinedConfig/Common/Expression/QueryRange';

import ListGroupItem from '../../../components/List/ListGroupItem';
import ListGroup, { ListGroupProps } from '../../../components/List/ListGroup';
import { Box, Flex } from 'rebass';
import Dropdown from '../../../components/Dropdown';

import Input from '../../../components/Input';
import { SyntheticEvent } from 'react';
import CheckBox, { CheckBoxProps } from '../../../components/CheckBox';
import join from '../../../components/utils/join';

export interface ListBoxFilterFormProps extends ListGroupProps {
  CurrentColumn: AdaptableBlotterColumn;
  Columns: AdaptableBlotterColumn[];
  useVendorStyle?: boolean;
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
  DistinctCriteriaPairValue: DistinctCriteriaPairValue;
}

export interface ListBoxFilterFormState extends React.ClassAttributes<ListBoxFilterForm> {
  UiSelectedColumnValues: Array<string>;
  UiSelectedUserFilters: Array<string>;
  UiSelectedRange: QueryRange;
  FilterValue: string;
  DistinctCriteriaPairValue: DistinctCriteriaPairValue;
}

const ddStyle = {
  minWidth: 'auto',
  flex: 1,
};

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
  UNSAFE_componentWillReceiveProps(nextProps: ListBoxFilterFormProps, nextContext: any) {
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
        StringExtensions.IsNotNullOrEmpty(this.state.FilterValue) &&
        display.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0
      ) {
        return null;
      }

      if (this.props.useVendorStyle) {
        return this.renderItemForVendorStyle({
          key: 'userFilter' + y,
          children: display,
          checked: isActive,
          style: userFilterItemStyle,
          onChange: () => this.onClickItemUserFilter(x),
        });
      }
      return (
        <ListGroupItem
          key={'userFilter' + y}
          style={userFilterItemStyle}
          noZebra={this.props.useVendorStyle}
          onClick={() => this.onClickItemUserFilter(x)}
          active={isActive}
          value={value}
        >
          {display}
        </ListGroupItem>
      );
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
      if (StringExtensions.IsNullOrEmpty(columnValue)) {
        return null;
      }
      if (
        StringExtensions.IsNotNullOrEmpty(this.state.FilterValue) &&
        columnValue.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0
      ) {
        return null;
      }

      if (this.props.useVendorStyle) {
        return this.renderItemForVendorStyle({
          key: 'columnValue' + y,
          children: columnValue,
          checked: isActive,
          onChange: () => this.onClickItemColumnValue(x),
        });
      }
      return (
        <ListGroupItem
          noZebra={this.props.useVendorStyle}
          key={'columnValue' + y}
          onClick={() => this.onClickItemColumnValue(x)}
          active={isActive}
          value={columnValue}
        >
          {columnValue}
        </ListGroupItem>
      );
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
    let rangeMenuItemsOperand1 = rangeOperandOptions.map((rangeOperand: 'Value' | 'Column') => {
      return {
        value: rangeOperand,
        label: rangeOperand,
      };
    });

    let rangeMenuItemsOperand2 = rangeOperandOptions.map((rangeOperand: string, index: number) => {
      return {
        value: rangeOperand,
        label: rangeOperand,
      };
    });

    let rangeForm = (
      <Flex flexDirection="column">
        <Dropdown
          placeholder="Select an Operator"
          style={ddStyle}
          value={this.state.UiSelectedRange.Operator}
          onChange={(x: LeafExpressionOperator) => this.onLeafExpressionOperatorChange(x)}
          options={this.props.Operators.map((operator: LeafExpressionOperator) => {
            return {
              label: ExpressionHelper.OperatorToLongFriendlyString(operator, this.props.DataType),
              value: operator.toString(),
            };
          })}
        ></Dropdown>

        {this.state.UiSelectedRange.Operator != null &&
          this.state.UiSelectedRange.Operator != LeafExpressionOperator.None && (
            <Flex flex={1} flexDirection="row" marginTop={2}>
              <Dropdown
                placeholder="testing"
                showEmptyItem={false}
                showClearButton={false}
                style={ddStyle}
                value={this.state.UiSelectedRange.Operand1Type}
                onChange={this.onRangeTypeChangedOperand1}
                options={rangeMenuItemsOperand1}
                marginRight={2}
              ></Dropdown>

              {this.getOperand1FormControl()}
            </Flex>
          )}
        {this.state.UiSelectedRange.Operator == LeafExpressionOperator.Between && (
          <Flex flex={1} flexDirection="row" marginTop={2}>
            <Dropdown
              style={ddStyle}
              placeholder="Please select"
              showClearButton={false}
              onChange={this.onRangeTypeChangedOperand2}
              options={rangeMenuItemsOperand2}
              value={this.state.UiSelectedRange.Operand2Type}
              marginRight={2}
            ></Dropdown>

            {this.getOperand2FormControl()}
          </Flex>
        )}

        <Box my={1}>
          <Box style={{ background: 'var(--ab-color-text-on-defaultbackground)', height: 1 }} />
        </Box>
      </Flex>
    );

    return (
      <div
        className={join(
          `ab-ListBoxFilterForm`,
          this.props.useVendorStyle ? `ab-ListBoxFilterForm--vendor-style` : null
        )}
      >
        {rangeForm}
        <Box mx={this.props.useVendorStyle ? 0 : '2px'} marginBottom={2}>
          {textClear}
        </Box>
        <ListGroup>
          {userFiltersItemsElements}
          {columnValuesItemsElements}
        </ListGroup>
      </div>
    );
  }

  private renderItemForVendorStyle = (props: CheckBoxProps): React.ReactNode => {
    return <CheckBox {...props} variant="agGrid" fontSize="12px" marginTop={1} />;
  };

  // Methods for getting the range
  private onLeafExpressionOperatorChange(value: LeafExpressionOperator) {
    if (value === null || value === LeafExpressionOperator.None) {
      this.props.onCustomRangeExpressionChange(null);
      return;
    }

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

  private onRangeTypeChangedOperand1 = (rangeOperandType: 'Value' | 'Column') => {
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
  };

  private onRangeTypeChangedOperand2 = (rangeOperandType: any): any => {
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
  };

  private getOperand1FormControl(): any {
    if (this.state.UiSelectedRange.Operand1Type == 'Column') {
      let availableColumns: any = this.props.Columns.filter(
        (c: AdaptableBlotterColumn) =>
          c != this.props.CurrentColumn && c.DataType == this.props.CurrentColumn.DataType
      ).map((column, index) => {
        return {
          value: column.ColumnId,
          label: column.FriendlyName,
        };
      });

      return (
        <Dropdown
          style={ddStyle}
          placeholder="Select"
          disabled={availableColumns.length == 0}
          options={availableColumns}
          value={this.state.UiSelectedRange.Operand1}
          onChange={this.onColumnOperand1SelectedChanged}
        ></Dropdown>
      );
    } else {
      return (
        <Input
          style={{ flex: 1, width: '100%' }}
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
      let availableColumns: any = this.props.Columns.filter(() => this.props.CurrentColumn).map(
        (column, index) => {
          return {
            value: column.ColumnId,

            label: column.FriendlyName,
          };
        }
      );

      return (
        <Dropdown
          placeholder="Select a column"
          style={ddStyle}
          disabled={availableColumns.length == 0}
          options={availableColumns}
          value={this.state.UiSelectedRange.Operand2}
          onChange={this.onColumnOperand2SelectedChanged}
        ></Dropdown>
      );
    } else {
      return (
        <Input
          style={{ flex: 1, width: '100%' }}
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

  private onColumnOperand1SelectedChanged = (columnId: string) => {
    let editedRange: QueryRange = {
      Operand1Type: this.state.UiSelectedRange.Operand1Type,
      Operand2Type: this.state.UiSelectedRange.Operand2Type,
      Operator: this.state.UiSelectedRange.Operator,
      Operand1: columnId,
      Operand2: this.state.UiSelectedRange.Operand2,
    };
    this.setState({ UiSelectedRange: editedRange } as ListBoxFilterFormState, () =>
      this.raiseOnChangeCustomExpression()
    );
  };

  private onColumnOperand2SelectedChanged = (columnId: string) => {
    let editedRange: QueryRange = {
      Operand1Type: this.state.UiSelectedRange.Operand1Type,
      Operand2Type: this.state.UiSelectedRange.Operand2Type,
      Operator: this.state.UiSelectedRange.Operator,
      Operand1: this.state.UiSelectedRange.Operand1,
      Operand2: columnId,
    };
    this.setState({ UiSelectedRange: editedRange } as ListBoxFilterFormState, () =>
      this.raiseOnChangeCustomExpression()
    );
  };

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
    let isValidRange: boolean = true;
    if (this.state.UiSelectedRange.Operator != LeafExpressionOperator.None) {
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

let userFilterItemStyle: React.CSSProperties = {
  fontStyle: 'italic',
};
