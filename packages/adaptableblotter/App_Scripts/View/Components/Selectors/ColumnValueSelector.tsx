import * as React from 'react';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { SortOrder, DistinctCriteriaPairValue } from '../../../PredefinedConfig/Common/Enums';
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { IAdaptableBlotter } from '../../../Utilities/Interface/IAdaptableBlotter';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import Dropdown from '../../../components/Dropdown';
import FieldWrap from '../../../components/FieldWrap';
import DropdownButton, { DropdownButtonProps } from '../../../components/DropdownButton';
import Input from '../../../components/Input';
import LoggingHelper from '../../../Utilities/Helpers/LoggingHelper';

export interface ColumnValueSelectorProps extends React.HTMLProps<ColumnValueSelector> {
  SelectedColumn: IColumn;
  SelectedColumnValue: string;
  onColumnValueChange: (columnvalue: any) => void;
  Blotter: IAdaptableBlotter;
  AllowNew?: boolean; // defaults to true if not provided
  bsSize?: 'large' | 'lg' | 'small' | 'sm';
  cssClassName?: string;
  style?: React.CSSProperties;
  newLabel?: string;
  existingLabel?: string;
  dropdownButtonProps?: DropdownButtonProps;
}

enum NEW_OR_EXISTING {
  existing = 'Existing value',
  new = 'New value',
}
export class ColumnValueSelector extends React.Component<
  ColumnValueSelectorProps,
  { newOrExisting: NEW_OR_EXISTING }
> {
  static defaultProps = {
    newLabel: 'New value',
    existingLabel: 'Existing value',
  };
  constructor(props: ColumnValueSelectorProps) {
    super(props);

    this.state = {
      newOrExisting: NEW_OR_EXISTING.existing,
    };
  }
  componentWillReceiveProps(nextProps: ColumnValueSelectorProps, nextContext: any) {
    if (
      StringExtensions.IsNullOrEmpty(this.props.SelectedColumnValue) &&
      StringExtensions.IsNullOrEmpty(nextProps.SelectedColumnValue)
    ) {
      let typeahed: any = this.refs.typeahead as any;
      if (typeahed) {
        typeahed.getInstance().clear();
      }
    }
  }
  render() {
    let sortedColumnValues: IRawValueDisplayValuePair[] = [];

    let placeholderText = 'Select value';
    let allowNew = this.props.AllowNew != null ? this.props.AllowNew : true;
    if (allowNew) {
      // placeholderText += ' or enter free text';
    }

    const fieldWidth = 150;
    const dd = (
      <Dropdown
        style={{ maxWidth: 'inherit', width: fieldWidth }}
        placeholder={placeholderText}
        showClearButton={false}
        value={this.props.SelectedColumnValue}
        onChange={(selected: any) => {
          this.onSelectedValueChange([{ RawValue: selected }]);
        }}
        options={() => {
          LoggingHelper.LogInfo(
            'Opening and woudl like to get values for ' + this.props.SelectedColumn
          );

          if (
            this.props.SelectedColumn != null &&
            this.props.Blotter != null &&
            this.props.Blotter.getColumnValueDisplayValuePairDistinctList != null
          ) {
            console.log('getting distinct values for ' + this.props.SelectedColumn.FriendlyName);
            let columnDisplayValuePairs: IRawValueDisplayValuePair[] = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(
              this.props.SelectedColumn.ColumnId,
              DistinctCriteriaPairValue.DisplayValue,
              false
            );

            sortedColumnValues = ArrayExtensions.sortArrayWithProperty(
              SortOrder.Ascending,
              columnDisplayValuePairs,
              'RawValue'
            );
            return sortedColumnValues.map(v => ({
              label: v.DisplayValue,
              value: v.RawValue,
            }));
          }
          return [];
        }}
        disabled={this.props.disabled}
      />
    );

    const input = (
      <Input
        type="text"
        autoFocus
        style={{ width: fieldWidth }}
        value={this.props.SelectedColumnValue}
        onChange={(e: React.SyntheticEvent) => {
          this.onSelectedValueChange([
            { customOption: true, DisplayValue: (e.target as any).value },
          ]);
        }}
      />
    );
    return (
      <FieldWrap style={{ ...this.props.style, overflow: 'visible' }}>
        {this.state.newOrExisting === NEW_OR_EXISTING.existing ? dd : input}
        <DropdownButton
          variant="raised"
          tone="neutral"
          columns={['label']}
          style={{
            color: 'var(--ab-color-white)',
            background: 'var(--ab-cmp-dashboardpanel__fill)',
          }}
          marginRight={1}
          items={[
            {
              label: NEW_OR_EXISTING.existing,
              onClick: () => {
                this.setState({
                  newOrExisting: NEW_OR_EXISTING.existing,
                });
                this.onSelectedValueChange([]);
              },
            },
            {
              label: NEW_OR_EXISTING.new,
              onClick: () => {
                this.setState({
                  newOrExisting: NEW_OR_EXISTING.new,
                });
                this.onSelectedValueChange([]);
              },
            },
          ]}
          {...this.props.dropdownButtonProps}
        >
          {this.state.newOrExisting === NEW_OR_EXISTING.existing
            ? this.props.existingLabel
            : this.props.newLabel}
        </DropdownButton>
      </FieldWrap>
    );
  }

  onSelectedValueChange(selected: any[]) {
    if (
      ArrayExtensions.IsEmpty(selected) &&
      StringExtensions.IsNullOrEmpty(this.props.SelectedColumnValue)
    ) {
      return; // must be a nicer way but we want to avoid ridiculous amounts of prop calls
    }
    if (ArrayExtensions.IsEmpty(selected)) {
      this.props.onColumnValueChange('');
    } else {
      if (selected[0].customOption) {
        this.props.onColumnValueChange(selected[0].DisplayValue);
      } else {
        let pair: IRawValueDisplayValuePair = selected[0];
        this.props.onColumnValueChange(pair.RawValue);
      }
    }
  }
}
