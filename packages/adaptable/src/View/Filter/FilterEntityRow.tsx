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
  columnFilter: ColumnFilter;
  accessLevel: AccessLevel;
}

export class FilterEntityRow extends React.Component<FilterEntityRowProps<FilterEntityRow>, {}> {
  render(): any {
    let colItems: IColItem[] = [].concat(this.props.colItems);
    colItems[0].Content = (
      <EntityRowItem
        Content={this.props.api.columnApi.getFriendlyNameFromColumnId(
          this.props.columnFilter.ColumnId
        )}
      />
    );
    colItems[1].Content = (
      <EntityRowItem
        Content={this.props.api.filterApi.columnFilterToString(this.props.columnFilter)}
      />
    );
    colItems[2].Content = (
      <>
        <ButtonSave
          onClick={() => this.props.onSaveColumnFilterasUserFilter(this.props.columnFilter)}
          tooltip="Save as User Filter"
          disabled={
            this.props.columnFilter == null || this.props.columnFilter.Predicate === undefined
          }
          accessLevel={this.props.accessLevel}
        />
        <ButtonClear
          onClick={() => this.props.onClear(this.props.columnFilter)}
          tooltip="Clear Filter"
          disabled={this.props.columnFilter == null}
          accessLevel={this.props.accessLevel}
        />
      </>
    );

    return <AdaptableObjectRow colItems={colItems} key={this.props.columnFilter.Uuid} />;
  }
}
