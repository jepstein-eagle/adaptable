import * as React from 'react';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { IColumn } from '../../Utilities/Interface/IColumn';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { IColumnFilter } from '../../Utilities/Interface/BlotterObjects/IColumnFilter';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { ButtonSave } from '../Components/Buttons/ButtonSave';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { AccessLevel } from '../../Utilities/Enums';
import { IColItem } from '../UIInterfaces';
import { Helper } from '../../Utilities/Helpers/Helper';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { PanelWithRow } from '../Components/Panels/PanelWithRow';

export interface ActiveFiltersPanelProps extends React.ClassAttributes<ActiveFiltersPanel> {
  ColumnFilters: IColumnFilter[];
  Columns: IColumn[];
  cssClassName: string;
  AccessLevel: AccessLevel;
  onClear: (columnFilter: IColumnFilter) => void;
  onSaveColumnFilterasUserFilter: (columnFilter: IColumnFilter) => void;
}

export class ActiveFiltersPanel extends React.Component<ActiveFiltersPanelProps, {}> {
  render(): any {
    let cssClassName: string = this.props.cssClassName + StyleConstants.ACTIVE_FILTERS;

    let colItems: IColItem[] = [
      { Content: 'Column', Size: 4 },
      { Content: 'Filter', Size: 5 },
      { Content: '', Size: 3 },
    ];

    let rowElements: any[] = [];
    this.props.ColumnFilters.forEach((columnFilter: IColumnFilter, index: number) => {
      rowElements.push(this.createRow(colItems, columnFilter, cssClassName));
    });

    return (
      <div className={cssClassName}>
        <PanelWithRow cssClassName={cssClassName} colItems={colItems} bsStyle="info" />
        <div className={cssClassName + StyleConstants.ITEMS_TABLE_BODY}>{rowElements}</div>
      </div>
    );
  }

  private createRow(colItems: IColItem[], columnFilter: IColumnFilter, cssClassName: string): any {
    let rowColItems: IColItem[] = Helper.cloneObject(colItems);
    rowColItems[0].Content = ColumnHelper.getFriendlyNameFromColumnId(
      columnFilter.ColumnId,
      this.props.Columns
    );
    rowColItems[1].Content = ExpressionHelper.ConvertExpressionToString(
      columnFilter.Filter,
      this.props.Columns,
      false
    );
    rowColItems[2].Content = (
      <span style={{ alignContent: 'right' }}>
        <ButtonSave
          cssClassName={this.props.cssClassName}
          onClick={() => this.props.onSaveColumnFilterasUserFilter(columnFilter)}
          overrideTooltip="Save as User Filter"
          bsStyle={'primary'}
          DisplayMode="Glyph"
          size={'xsmall'}
          overrideDisableButton={
            columnFilter == null ||
            ArrayExtensions.IsNotNullOrEmpty(columnFilter.Filter.FilterExpressions)
          }
          AccessLevel={this.props.AccessLevel}
        />{' '}
        <ButtonClear
          cssClassName={this.props.cssClassName}
          onClick={() => this.props.onClear(columnFilter)}
          overrideTooltip="Clear Column Filter"
          bsStyle={StyleConstants.DEFAULT_BSSTYLE}
          DisplayMode="Glyph"
          size={'xs'}
          overrideDisableButton={columnFilter == null}
          AccessLevel={this.props.AccessLevel}
        />
      </span>
    );

    let rowElement = (
      <AdaptableObjectRow
        cssClassName={cssClassName}
        key={columnFilter.ColumnId}
        colItems={rowColItems}
      />
    );
    return rowElement;
  }
}
