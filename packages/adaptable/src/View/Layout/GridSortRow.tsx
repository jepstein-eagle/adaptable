import * as React from 'react';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { SelectionMode, SortOrder } from '../../PredefinedConfig/Common/Enums';
import { ColumnSelector } from '../Components/Selectors/ColumnSelector';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import Dropdown from '../../components/Dropdown';
import { ColumnSort } from '../../PredefinedConfig/Common/ColumnSort';

export interface GridSortRowProps<GridSortRow> extends SharedEntityRowProps<GridSortRow> {
  ColumnSort: ColumnSort;
  onColumnSortColumnChanged: (column: AdaptableColumn) => void;
  onColumnSortOrderChanged: (sortOrder: SortOrder) => void;
  onDeleteColumnSort: () => void;
}

export class GridSortRow extends React.Component<GridSortRowProps<GridSortRow>, {}> {
  render(): any {
    let colItems: IColItem[] = [].concat(this.props.colItems);

    let sortOrders = EnumExtensions.getNames(SortOrder).map(enumName => {
      return {
        value: enumName,
        label: enumName,
      };
    });

    colItems[0].Content = (
      <ColumnSelector
        SelectedColumnIds={[this.props.ColumnSort.Column]}
        ColumnList={this.props.api.gridApi.getColumns().filter(c => c.Sortable)}
        onColumnChange={columns => this.onColumnSelectedChanged(columns)}
        SelectionMode={SelectionMode.Single}
      />
    );

    colItems[1].Content = (
      <Dropdown
        placeholder="select"
        showEmptyItem={false}
        showClearButton={false}
        value={this.props.ColumnSort.SortOrder}
        onChange={(x: any) => this.onSortOrderChanged(x)}
        options={sortOrders}
      ></Dropdown>
    );

    let deleteButton = (
      <ButtonDelete
        disabled={false}
        tooltip={'Delete Sort'}
        ConfirmAction={null}
        ConfirmationMsg={''}
        ConfirmationTitle={''}
        onClickAction={() => this.props.onDeleteColumnSort()}
        AccessLevel={'Full'} // only here if in wizard...
      />
    );

    colItems[2].Content = deleteButton;

    return <AdaptableObjectRow colItems={colItems} />;
  }

  private onColumnSelectedChanged(columns: AdaptableColumn[]): any {
    let column: AdaptableColumn = columns[0];

    this.props.onColumnSortColumnChanged(column);
  }

  private onSortOrderChanged(value: any) {
    this.props.onColumnSortOrderChanged(value as SortOrder);
  }
}
