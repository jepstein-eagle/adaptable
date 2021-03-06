import * as React from 'react';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import { SortOrder, CellValueType } from '../../../PredefinedConfig/Common/Enums';
import { IRawValueDisplayValuePair } from '../../UIInterfaces';
import { IAdaptable } from '../../../AdaptableInterfaces/IAdaptable';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import Dropdown from '../../../components/Dropdown';
import FieldWrap from '../../../components/FieldWrap';
import DropdownButton, { DropdownButtonProps } from '../../../components/DropdownButton';
import Input from '../../../components/Input';
import { AdaptableApi } from '../../../Api/AdaptableApi';
import UIHelper from '../../UIHelper';

export interface ColumnValueSelectorProps extends React.HTMLProps<ColumnValueSelector> {
  selectedColumn: AdaptableColumn;
  selectedColumnValue: string;
  onColumnValueChange: (columnvalue: any) => void;
  api: AdaptableApi;
  allowNew?: boolean; // defaults to true if not provided
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
  UNSAFE_componentWillReceiveProps(nextProps: ColumnValueSelectorProps, nextContext: any) {
    if (
      StringExtensions.IsNullOrEmpty(this.props.selectedColumnValue) &&
      StringExtensions.IsNullOrEmpty(nextProps.selectedColumnValue)
    ) {
      let typeahed: any = this.refs.typeahead as any;
      if (typeahed) {
        typeahed.getInstance().clear();
      }
    }
  }
  render() {
    let sortedColumnValues: any[] = [];

    let placeholderText = 'Select value';
    let allowNew = this.props.allowNew != null ? this.props.allowNew : true;
    if (allowNew) {
      // placeholderText += ' or enter free text';
    }

    const fieldWidth = 150;
    const dd = (
      <Dropdown
        disabled={this.props.disabled}
        style={{ maxWidth: 'inherit', width: fieldWidth, border: 'none' }}
        placeholder={placeholderText}
        showClearButton={false}
        value={this.props.selectedColumnValue}
        onChange={(selected: any) => {
          this.onSelectedValueChange([{ RawValue: selected }]);
        }}
        options={() => {
          //  let adaptable: IAdaptable = this.props.api.internalApi.getAdaptableInstance();
          if (this.props.selectedColumn != null) {
            let columnDisplayValuePairs: any[] = this.props.api.columnApi.getDistinctDisplayValuesForColumn(
              this.props.selectedColumn.ColumnId
            );

            sortedColumnValues = ArrayExtensions.sortArray(columnDisplayValuePairs, SortOrder.Asc);
            return sortedColumnValues.map(v => ({
              label: v,
              value: v,
            }));
          }
          return [];
        }}
      />
    );

    const input = (
      <Input
        type={UIHelper.getDescriptionForDataType(this.props.selectedColumn.DataType)}
        placeholder={UIHelper.getPlaceHolderforDataType(this.props.selectedColumn.DataType)}
        autoFocus
        disabled={this.props.disabled}
        style={{ width: fieldWidth }}
        value={this.props.selectedColumnValue}
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
            boxShadow: 'none',
            color: 'var(--ab-cmp-dashboardpanel__fill)',
            background: 'var(--ab-color-defaultbackground)',
          }}
          disabled={this.props.disabled}
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
      StringExtensions.IsNullOrEmpty(this.props.selectedColumnValue)
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
