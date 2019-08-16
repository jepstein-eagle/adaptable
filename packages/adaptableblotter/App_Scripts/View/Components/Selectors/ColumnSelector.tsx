import * as React from 'react';

import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { SelectionMode, SortOrder } from '../../../PredefinedConfig/Common/Enums';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import Dropdown from '../../../components/Dropdown';

export interface ColumnSelectorProps extends React.HTMLProps<ColumnSelector> {
  ColumnList: IColumn[];
  SelectedColumnIds: string[];
  onColumnChange: (SelectedColumns: IColumn[]) => void;
  SelectionMode: SelectionMode;
  className?: string;
  placeHolder?: string;
}

export class ColumnSelector extends React.Component<ColumnSelectorProps, {}> {
  UNSAFE_componentWillReceiveProps(nextProps: ColumnSelectorProps, nextContext: any) {
    //if there was a selected column and parent unset the column we then clear the component
    // otherwise it's correctly unselected but the input still have the previsous selected column text
    let propsSelectedColumnIds: string[] = this.props.SelectedColumnIds.filter(x =>
      StringExtensions.IsNotNullOrEmpty(x)
    );
    let nextPropsSelectedColumnIds: string[] = nextProps.SelectedColumnIds.filter(x =>
      StringExtensions.IsNotNullOrEmpty(x)
    );

    if (
      propsSelectedColumnIds.length == 0 &&
      nextPropsSelectedColumnIds.length == 0 &&
      this.refs.typeahead
    ) {
      (this.refs.typeahead as any).getInstance().clear();
    }
  }

  render() {
    let sortedColumns = ArrayExtensions.sortArrayWithProperty(
      SortOrder.Ascending,
      this.props.ColumnList,
      'FriendlyName'
    );
    let selectedColumnIds = this.props.SelectedColumnIds.filter(x =>
      StringExtensions.IsNotNullOrEmpty(x)
    );

    let placeHolder: string = StringExtensions.IsNotNullOrEmpty(this.props.placeHolder)
      ? this.props.placeHolder.toString()
      : this.props.SelectionMode == SelectionMode.Single
      ? 'Select a column'
      : 'Select columns';

    let isEmptySelectedColumnIds: boolean =
      this.props.SelectedColumnIds.filter(x => StringExtensions.IsNotNullOrEmpty(x)).length == 0;

    return (
      <div style={{ flex: 1 }}>
        <Dropdown
          style={{ maxWidth: 'none' }}
          placeholder={placeHolder}
          multiple={this.props.SelectionMode == SelectionMode.Multi}
          options={sortedColumns.map(c => {
            return {
              value: c.ColumnId,
              label: c.FriendlyName,
            };
          })}
          disabled={this.props.disabled}
          value={selectedColumnIds[0] || null}
          onChange={(value: any) => {
            const selected = sortedColumns.filter(c => c.ColumnId === value);
            if (!selected.length) {
              this.onClearButton();
            } else {
              this.onColumnChange(selected, isEmptySelectedColumnIds);
            }
          }}
        />
      </div>
    );
  }

  onClearButton() {
    this.props.onColumnChange([]);
    if (this.refs.typeahead) {
      (this.refs.typeahead as any).getInstance().clear();
    }
  }

  onColumnChange(selected: IColumn[], isEmptySelection: boolean) {
    if (selected.length == 0 && isEmptySelection) {
      return; // must be a nicer way but we want to avoid ridiculous amounts of prop calls
    }

    this.props.onColumnChange(selected);
  }
}
