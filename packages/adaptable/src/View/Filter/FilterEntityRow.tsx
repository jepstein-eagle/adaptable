import * as React from 'react';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { BaseEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { IColItem } from '../UIInterfaces';
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { EntityRowItem } from '../Components/EntityRowItem';
import { AccessLevel } from '../../PredefinedConfig/EntitlementState';
import { ColumnFilter } from '../../PredefinedConfig/FilterState';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';

export interface FilterEntityRowProps<FilterEntityRow> extends BaseEntityRowProps<FilterEntityRow> {
  onClear: (columnFilter: ColumnFilter) => void;
  onSaveColumnFilterasUserFilter: (columnFilter: ColumnFilter) => void;
  ColumnFilter: ColumnFilter;
  AccessLevel: AccessLevel;
}

export class FilterEntityRow extends React.Component<FilterEntityRowProps<FilterEntityRow>, {}> {
  render(): any {
    let colItems: IColItem[] = [].concat(this.props.colItems);
    colItems[0].Content = (
      <EntityRowItem
        Content={this.props.api.columnApi.getFriendlyNameFromColumnId(
          this.props.ColumnFilter.ColumnId
        )}
      />
    );
    colItems[1].Content = (
      <EntityRowItem
        Content={this.props.api.filterApi.convertColumnFilterToString(this.props.ColumnFilter)}
      />
    );
    colItems[2].Content = (
      <>
        <ButtonSave
          onClick={() => this.props.onSaveColumnFilterasUserFilter(this.props.ColumnFilter)}
          tooltip="Save as User Filter"
          disabled={
            this.props.ColumnFilter == null ||
            StringExtensions.IsNotNullOrEmpty(this.props.ColumnFilter.PredicateId)
          }
          AccessLevel={this.props.AccessLevel}
        />
        <ButtonClear
          onClick={() => this.props.onClear(this.props.ColumnFilter)}
          tooltip="Clear Column Filter"
          disabled={this.props.ColumnFilter == null}
          AccessLevel={this.props.AccessLevel}
        />
      </>
    );

    return <AdaptableObjectRow colItems={colItems} key={this.props.ColumnFilter.Uuid} />;
  }
}
