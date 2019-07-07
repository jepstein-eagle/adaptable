import * as React from 'react';
import { SortOrder } from '../../../PredefinedConfig/Common/Enums';
import SimpleButton from '../../../components/SimpleButton';
import Input from '../../../components/Input';
import FieldWrap from '../../../components/FieldWrap';

export interface ListBoxFilterSortComponentProps
  extends React.ClassAttributes<ListBoxFilterSortComponent> {
  FilterValue: string;
  SortOrder: SortOrder;
  handleChangeFilterValue: (value: string) => void;
  sortColumnValues: () => void;
  DisableSort: boolean;
}

export class ListBoxFilterSortComponent extends React.Component<
  ListBoxFilterSortComponentProps,
  {}
> {
  render() {
    return (
      <FieldWrap>
        <Input
          value={this.props.FilterValue}
          placeholder="Search"
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
      </FieldWrap>
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
