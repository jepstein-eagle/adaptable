import * as React from 'react';
import { SortOrder } from '../../../PredefinedConfig/Common/Enums';
import SimpleButton from '../../../components/SimpleButton';
import Input from '../../../components/Input';
import { Flex } from 'rebass';
import styled from 'styled-components';

export interface ListBoxFilterSortComponentProps
  extends React.ClassAttributes<ListBoxFilterSortComponent> {
  FilterValue: string;
  SortOrder: SortOrder;
  handleChangeFilterValue: (value: string) => void;
  sortColumnValues: () => void;
  DisableSort: boolean;
}

const MyFlex = styled(Flex)({
  border: '1px solid var(--ab-color-lightgray)',
  borderRadius: 'var(--ab-space-1)',
  overflow: 'hidden',
  '&:focus-within': {
    outline: 'var(--ab-focus__outline)',
  },
});

export class ListBoxFilterSortComponent extends React.Component<
  ListBoxFilterSortComponentProps,
  {}
> {
  render() {
    return (
      <MyFlex>
        <Input
          value={this.props.FilterValue}
          placeholder="Search"
          style={{ flex: 1, border: 'none', outline: 'none' }}
          onChange={(e: any) => this.handleChangeFilterValue(e)}
        />
        <SimpleButton onClick={() => this.clearFilter()} icon="trash" variant="text"></SimpleButton>

        {this.props.SortOrder == SortOrder.Ascending ? (
          <SimpleButton
            disabled={this.props.DisableSort}
            onClick={() => this.props.sortColumnValues()}
            icon="sort-asc"
            variant="text"
          ></SimpleButton>
        ) : (
          <SimpleButton
            disabled={this.props.DisableSort}
            onClick={() => this.props.sortColumnValues()}
            icon="sort-desc"
            variant="text"
          ></SimpleButton>
        )}
      </MyFlex>
    );
  }

  handleChangeFilterValue(x: React.FormEvent<any>) {
    let e = x.target as HTMLInputElement;
    this.props.handleChangeFilterValue(e.value);
  }

  clearFilter() {
    this.props.handleChangeFilterValue('');
  }
}
