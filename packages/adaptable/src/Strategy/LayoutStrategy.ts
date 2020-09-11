import { ILayoutStrategy } from './Interface/ILayoutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { LayoutState, Layout } from '../PredefinedConfig/LayoutState';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import * as LayoutRedux from '../Redux/ActionsReducers/LayoutRedux';
import { TeamSharingImportInfo } from '../PredefinedConfig/TeamSharingState';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';

export class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
  public CurrentLayout: string;
  protected LayoutState: LayoutState;

  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.LayoutStrategyId,
      StrategyConstants.LayoutStrategyFriendlyName,
      StrategyConstants.LayoutGlyph,
      ScreenPopups.LayoutPopup,
      adaptable
    );
  }

  public tidyOldConfig(): void {
    /*
     * This transitions from v6 to v7 layouts
     *
     *  I. ColumnSorts had {Column, SortOrder='Ascending'|'Descending'} but are now
     *   {ColumnId, SortOrder='Asc'|'Desc'}
     *  II. GroupedColumns is now RowGroupedColumns
     *  III. PivotDetails was flattened into AggregationColumns and PivotColumns
     */
    this.adaptable.api.layoutApi.getAllLayout().forEach(layout => {
      let updateColumnSorts = false;
      let columnSorts;
      // see I. above
      if (layout.ColumnSorts) {
        columnSorts = layout.ColumnSorts.map(columnSort => {
          const sortOrder: string = (columnSort as any).SortOrder;

          if (
            sortOrder === 'Ascending' ||
            sortOrder === 'Descending' ||
            (columnSort as any).Column
          ) {
            updateColumnSorts = true;
            columnSort = {
              SortOrder: sortOrder === 'Ascending' ? 'Asc' : 'Desc',
              ColumnId: columnSort.ColumnId ?? (columnSort as any).Column,
            };
          }
          return columnSort;
        });
      }

      // see II. above
      const rowGroupedColumns = (layout as any).GroupedColumns;

      // see III. above
      const PivotDetails: {
        AggregationColumns?: string[];
        PivotColumns?: string[];
      } = (layout as any).PivotDetails;

      let newAggregationColumns: Record<string, true>;
      let newPivotColumns: string[] = PivotDetails?.PivotColumns;

      if (PivotDetails) {
        if (PivotDetails.AggregationColumns && PivotDetails.AggregationColumns.length) {
          newAggregationColumns = PivotDetails.AggregationColumns.reduce((acc, colId) => {
            acc[colId] = true;
            return acc;
          }, {} as Record<string, true>);
        }
      }

      if (newAggregationColumns || newPivotColumns || updateColumnSorts || rowGroupedColumns) {
        layout = { ...layout };
        if (updateColumnSorts) {
          layout.ColumnSorts = columnSorts;
        }
        if (rowGroupedColumns) {
          layout.RowGroupedColumns = rowGroupedColumns;
        }
        if (newAggregationColumns) {
          layout.AggregationColumns = newAggregationColumns;
        }
        if (newPivotColumns) {
          layout.PivotColumns = newPivotColumns;
          layout.EnablePivot = true;
        }

        // if any of the above has changed, save the updated layout
        this.adaptable.api.layoutApi.saveLayout(layout);
      }
    });
  }

  public addColumnMenuItems(column: AdaptableColumn): AdaptableMenuItem[] | undefined {
    let returnColumnMenuItems: AdaptableMenuItem[] = [];
    if (this.canCreateMenuItem('Full')) {
      returnColumnMenuItems.push(
        this.createColumnMenuItemShowPopup(
          'Edit Layout',
          ScreenPopups.LayoutPopup,
          StrategyConstants.LayoutGlyph,
          {
            action: 'Edit',
            source: 'ColumnMenu',
          }
        )
      );
      returnColumnMenuItems.push(
        this.createColumnMenuItemClickFunction('Select Column', 'tab-unselected', () => {
          this.adaptable.api.columnApi.selectColumn(column.ColumnId);
        })
      );
      returnColumnMenuItems.push(
        this.createColumnMenuItemClickFunction('Select Whole Grid', 'tab-unselected', () => {
          this.adaptable.api.columnApi.selectAll();
        })
      );
      if (this.canCreateMenuItem('Full') && column.Hideable) {
        returnColumnMenuItems.push(
          this.createColumnMenuItemClickFunction('Hide Column', 'hide-column', () => {
            this.adaptable.api.columnApi.hideColumn(column.ColumnId);
          })
        );
      }
    }

    return returnColumnMenuItems;
  }

  public getTeamSharingAction(): TeamSharingImportInfo<Layout> {
    return {
      FunctionEntities: this.adaptable.api.layoutApi.getAllLayout(),
      AddAction: LayoutRedux.LayoutAdd,
      EditAction: LayoutRedux.LayoutSave,
    };
  }

  public getSpecialColumnReferences(specialColumnId: string, references: string[]): void {
    let layouts: Layout[] = this.adaptable.api.layoutApi
      .getAllLayout()
      .filter((layout: Layout) => layout.Columns.includes(specialColumnId));

    if (ArrayExtensions.IsNotNullOrEmpty(layouts)) {
      references.push(
        'Layouts: ' +
          layouts
            .map(l => {
              return l.Name;
            })
            .join(',')
      );
    }
  }
}
