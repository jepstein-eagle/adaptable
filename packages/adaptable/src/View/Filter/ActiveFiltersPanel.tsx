import * as React from 'react';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { IColItem } from '../UIInterfaces';
import { Helper } from '../../Utilities/Helpers/Helper';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';
import { Flex } from 'rebass';
import { AccessLevel } from '../../PredefinedConfig/EntitlementState';
import { AdaptableApi } from '../../Api/AdaptableApi';
import { ColumnFilter } from '../../PredefinedConfig/FilterState';

export interface ActiveFiltersPanelProps extends React.ClassAttributes<ActiveFiltersPanel> {
  columnFilters: ColumnFilter[];
  columns: AdaptableColumn[];
  api: AdaptableApi;
  accessLevel: AccessLevel;
  onClear: (columnFilter: ColumnFilter) => void;
  onSaveColumnFilterasUserFilter: (columnFilter: ColumnFilter) => void;
}

const stopPropagation = (e: React.SyntheticEvent) => {
  e.stopPropagation();
};

export class ActiveFiltersPanel extends React.Component<ActiveFiltersPanelProps, {}> {
  render(): any {
    let colItems: IColItem[] = [
      { Content: 'Column', Size: 4 },
      { Content: 'Filter', Size: 5 },
      { Content: '', Size: 3 },
    ];

    let rowElements: any[] = [];
    this.props.columnFilters.forEach((columnFilter: ColumnFilter, index: number) => {
      rowElements.push(this.createRow(colItems, columnFilter));
    });

    return (
      <div>
        <PanelWithRow colItems={colItems} />
        <div>{rowElements}</div>
      </div>
    );
  }

  private createRow(colItems: IColItem[], columnFilter: ColumnFilter): any {
    let rowColItems: IColItem[] = Helper.cloneObject(colItems);
    rowColItems[0].Content = this.props.api.columnApi.getFriendlyNameFromColumnId(
      columnFilter.ColumnId
    );
    rowColItems[1].Content = this.props.api.filterApi.convertColumnFilterToString(columnFilter);

    rowColItems[2].Content = (
      <Flex justifyContent="center" margin={0} padding={0} onClick={stopPropagation}>
        <ButtonSave
          onClick={() => this.props.onSaveColumnFilterasUserFilter(columnFilter)}
          tooltip="Save as User Filter"
          disabled={columnFilter == null || columnFilter.Predicate === undefined}
          AccessLevel={this.props.accessLevel}
        />{' '}
        <ButtonClear
          onClick={() => this.props.onClear(columnFilter)}
          tooltip="Clear Column Filter"
          disabled={columnFilter == null}
          AccessLevel={this.props.accessLevel}
        />
      </Flex>
    );

    let rowElement = <AdaptableObjectRow key={columnFilter.ColumnId} colItems={rowColItems} />;
    return rowElement;
  }
}
