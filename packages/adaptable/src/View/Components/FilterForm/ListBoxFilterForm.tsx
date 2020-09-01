import * as React from 'react';
import { CellValueType } from '../../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import ListGroupItem from '../../../components/List/ListGroupItem';
import { ListGroupProps } from '../../../components/List/ListGroup';
import { Box } from 'rebass';

import CheckBox, { CheckBoxProps } from '../../../components/CheckBox';
import join from '../../../components/utils/join';
import { AdaptableFormControlTextClear } from '../Forms/AdaptableFormControlTextClear';
import GridList from '../../../components/List/GridList';

export interface ListBoxFilterFormProps extends ListGroupProps {
  currentColumn: AdaptableColumn;
  columns: AdaptableColumn[];
  useVendorStyle?: boolean;
  columnDistinctValues: any[];
  uiSelectedColumnValues: Array<string>;
  onColumnValueSelectedChange: (SelectedValues: Array<any>) => void;
  dataType: 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown';
}

export interface ListBoxFilterFormState extends React.ClassAttributes<ListBoxFilterForm> {
  UiSelectedColumnValues: Array<string>;
  FilterValue: string;
}

export class ListBoxFilterForm extends React.Component<
  ListBoxFilterFormProps,
  ListBoxFilterFormState
> {
  constructor(props: ListBoxFilterFormProps) {
    super(props);

    this.state = {
      UiSelectedColumnValues: this.props.uiSelectedColumnValues,
      FilterValue: '',
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps: ListBoxFilterFormProps, nextContext: any) {
    this.setState({
      UiSelectedColumnValues: nextProps.uiSelectedColumnValues,
      FilterValue: this.state.FilterValue,
    });
  }

  render() {
    let columnValuesItemsElements = this.props.columnDistinctValues.map((x, y) => {
      const isActive = this.state.UiSelectedColumnValues.indexOf(x) >= 0;
      const columnValue = x;
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
      <AdaptableFormControlTextClear
        autoFocus={true}
        type="text"
        placeholder="Search Column Values"
        value={this.state.FilterValue}
        OnTextChange={x => this.onUpdateFilterSearch(x)}
      />
    );

    return (
      <div
        className={join(
          `ab-ListBoxFilterForm`,
          this.props.useVendorStyle ? `ab-ListBoxFilterForm--vendor-style` : null
        )}
      >
        <Box mx={this.props.useVendorStyle ? 0 : '2px'} marginBottom={2}>
          {textClear}
        </Box>
        <GridList
          showZebraRows={false}
          className={!this.props.useVendorStyle ? 'ab-padding-horizontal-0' : ''}
        >
          {columnValuesItemsElements}
        </GridList>
      </div>
    );
  }

  private renderItemForVendorStyle = (props: CheckBoxProps): React.ReactNode => {
    return (
      <CheckBox
        {...props}
        variant="agGrid"
        fontSize="12px"
        marginTop={1}
        marginBottom={1}
        marginLeft={1}
        marginRight={1}
      />
    );
  };

  // Methods for getting column values or filters
  onUpdateFilterSearch(filterSearch: string) {
    this.setState({ FilterValue: filterSearch } as ListBoxFilterFormState);
  }

  raiseOnChangeColumnValues() {
    this.props.onColumnValueSelectedChange(this.state.UiSelectedColumnValues);
  }

  onClickItemColumnValue(item: string) {
    let index: number;
    index = this.state.UiSelectedColumnValues.indexOf(item);

    if (index >= 0) {
      let newArray = [...this.state.UiSelectedColumnValues];
      newArray.splice(index, 1);
      this.setState({ UiSelectedColumnValues: newArray } as ListBoxFilterFormState, () =>
        this.raiseOnChangeColumnValues()
      );
    } else {
      let newArray = [...this.state.UiSelectedColumnValues];
      newArray.push(item);
      this.setState({ UiSelectedColumnValues: newArray } as ListBoxFilterFormState, () =>
        this.raiseOnChangeColumnValues()
      );
    }
  }
}
