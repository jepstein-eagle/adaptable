import * as React from 'react';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { BaseEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { IColItem } from '../UIInterfaces';
import { ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';

import { EntityRowItem } from '../Components/EntityRowItem';
import { AccessLevel } from '../../PredefinedConfig/EntitlementState';

export interface ColumnFilterEntityRowProps<AdvancedSearchEntityRow>
  extends BaseEntityRowProps<AdvancedSearchEntityRow> {
  onClear: (columnFilter: ColumnFilter) => void;
  onSaveColumnFilterasUserFilter: (columnFilter: ColumnFilter) => void;
  ColumnFilter: ColumnFilter;
  AccessLevel: AccessLevel;
}

export class ColumnFilterEntityRow extends React.Component<
  ColumnFilterEntityRowProps<ColumnFilterEntityRow>,
  {}
> {
  render(): any {
    let colItems: IColItem[] = [].concat(this.props.colItems);
    colItems[0].Content = (
      <EntityRowItem
        Content={this.props.api.gridApi.getFriendlyNameFromColumnId(
          this.props.ColumnFilter.ColumnId
        )}
      />
    );
    colItems[1].Content = (
      <EntityRowItem
        Content={ExpressionHelper.ConvertExpressionToString(
          this.props.ColumnFilter.Filter,
          this.props.api.gridApi.getColumns(),
          this.props.api
        )}
      />
    );
    colItems[2].Content = (
      <>
        <ButtonSave
          onClick={() => this.props.onSaveColumnFilterasUserFilter(this.props.ColumnFilter)}
          tooltip="Save as User Filter"
          disabled={
            this.props.ColumnFilter == null ||
            ArrayExtensions.IsNotNullOrEmpty(this.props.ColumnFilter.Filter.FilterExpressions)
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
