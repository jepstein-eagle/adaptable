import * as React from 'react';

import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { SelectionMode, SortOrder } from '../../../PredefinedConfig/Common/Enums';
import { AdaptableBlotterColumn } from '../../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import Dropdown from '../../../components/Dropdown';

export interface ColumnSelectorProps extends React.HTMLProps<ColumnSelector> {
  ColumnList: AdaptableBlotterColumn[];
  SelectedColumnIds: string[];
  onColumnChange: (SelectedColumns: AdaptableBlotterColumn[]) => void;
  SelectionMode: SelectionMode;
  className?: string;
  placeHolder?: string;
  showClearButton?: boolean;
}

export class ColumnSelector extends React.Component<ColumnSelectorProps, {}> {
  render() {
    const sortedColumns = ArrayExtensions.sortArrayWithProperty(
      SortOrder.Ascending,
      this.props.ColumnList,
      'FriendlyName'
    );
    const selectedColumnIds = this.props.SelectedColumnIds.filter(x =>
      StringExtensions.IsNotNullOrEmpty(x)
    );

    const placeHolder: string = StringExtensions.IsNotNullOrEmpty(this.props.placeHolder)
      ? this.props.placeHolder.toString()
      : this.props.SelectionMode == SelectionMode.Single
      ? 'Select a column'
      : 'Select columns';

    const isEmptySelectedColumnIds: boolean =
      this.props.SelectedColumnIds.filter(x => StringExtensions.IsNotNullOrEmpty(x)).length == 0;

    return (
      <div style={{ flex: 1, ...this.props.style }}>
        <Dropdown
          style={{ maxWidth: 'none' }}
          showClearButton={this.props.showClearButton}
          placeholder={placeHolder}
          multiple={this.props.SelectionMode == SelectionMode.Multi}
          options={sortedColumns.map(c => ({
            value: c.ColumnId,
            label: c.FriendlyName,
          }))}
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
  }

  onColumnChange(selected: AdaptableBlotterColumn[], isEmptySelection: boolean) {
    if (selected.length == 0 && isEmptySelection) {
      return; // must be a nicer way but we want to avoid ridiculous amounts of prop calls
    }

    this.props.onColumnChange(selected);
  }
}
