import { ApiBase } from './ApiBase';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { DataType, CellValueType } from '../../PredefinedConfig/Common/Enums';
import { Layout, PercentBar } from '../../types';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { AG_GRID_GROUPED_COLUMN } from '../../Utilities/Constants/GeneralConstants';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import { ColumnApi } from '../ColumnApi';
import { GradientColumn } from '../../PredefinedConfig/GradientColumnState';

export class ColumnApiImpl extends ApiBase implements ColumnApi {
  public getColumns(): AdaptableColumn[] {
    return this.adaptable.api.gridApi.getGridState().Columns;
  }

  public getVisibleColumns(): AdaptableColumn[] {
    const layout: Layout = this.adaptable.api.layoutApi.getCurrentLayout();
    const visibleCols = layout.Columns.reduce((acc, colId) => {
      acc[colId] = true;
      return acc;
    }, {} as { [colId: string]: boolean });

    return this.getColumns().filter(c => visibleCols[c.ColumnId]);
  }

  public selectColumn(columnId: string): void {
    this.adaptable.selectColumn(columnId);
  }

  public selectAll(): void {
    this.adaptable.selectAll();
  }

  public selectColumns(columnIds: string[]): void {
    this.adaptable.selectColumns(columnIds);
  }

  public hideColumn(columnId: string): void {
    this.adaptable.hideColumn(columnId);
  }

  public showColumn(columnId: string): void {
    this.adaptable.showColumn(columnId);
  }

  public isRowGroupColumn(columnId: string): boolean {
    // put this here as there might be other indicators we are not aware of
    // perhaps with non auto groups ?
    //https://www.ag-grid.com/javascript-grid-grouping/
    return columnId === AG_GRID_GROUPED_COLUMN;
  }

  public isCalculatedColumn(columnId: string): boolean {
    return (
      this.adaptable.api.calculatedColumnApi
        .getAllCalculatedColumn()
        .find(cc => cc.ColumnId == columnId) != null
    );
  }

  public isFreeTextColumn(columnId: string): boolean {
    return (
      this.adaptable.api.freeTextColumnApi
        .getAllFreeTextColumn()
        .find(cc => cc.ColumnId == columnId) != null
    );
  }

  public isActionColumn(columnId: string): boolean {
    return (
      this.adaptable.api.actionColumnApi.getAllActionColumn().find(cc => cc.ColumnId == columnId) !=
      null
    );
  }

  public isSpecialRenderedColumn(columnId: string): boolean {
    const percentBars: PercentBar[] = this.adaptable.api.percentBarApi.getAllPercentBar();
    if (ArrayExtensions.IsNotNullOrEmpty(percentBars)) {
      return ArrayExtensions.ContainsItem(
        percentBars.map(pb => pb.ColumnId),
        columnId
      );
    }

    const gradientColumns: GradientColumn[] = this.adaptable.api.gradientColumnApi.getAllGradientColumn();
    if (ArrayExtensions.IsNotNullOrEmpty(gradientColumns)) {
      return ArrayExtensions.ContainsItem(
        percentBars.map(pb => pb.ColumnId),
        columnId
      );
    }
    return false;
  }

  public isNumericColumn(column: AdaptableColumn): boolean {
    return column.DataType == DataType.Number;
  }

  public getColumnDataTypeFromColumnId(
    columnId: string
  ): 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown' {
    return this.getColumns().find(c => c.ColumnId == columnId).DataType;
  }

  public getFriendlyNameFromColumn(columnId: string, column: AdaptableColumn): string {
    if (columnId.includes(GeneralConstants.MISSING_COLUMN)) {
      return columnId;
    }
    if (column) {
      return column.FriendlyName;
    }
    this.LogMissingColumnWarning(columnId);
    return columnId + GeneralConstants.MISSING_COLUMN;
  }

  public getFriendlyNameFromColumnId(columnId: string): string {
    const foundColumn: AdaptableColumn | undefined = this.getColumns().find(
      c => c.ColumnId == columnId
    );
    if (foundColumn) {
      return this.getFriendlyNameFromColumn(columnId, foundColumn);
    }
    let result = columnId + GeneralConstants.MISSING_COLUMN;
    const currentLayout = this.adaptable.api.layoutApi.getCurrentLayout();

    if (this.isRowGroupColumn(columnId) && currentLayout?.RowGroupedColumns) {
      result = `[Grouped column: ${currentLayout.RowGroupedColumns.join(', ')}]`;
    }
    this.LogMissingColumnWarning(columnId);
    return result;
  }

  public getFriendlyNamesFromColumnIds(columnIds: string[]): string[] {
    const friendlyNames: string[] = [];
    if (ArrayExtensions.IsNullOrEmpty(columnIds)) {
      return friendlyNames;
    }
    columnIds.forEach(c => {
      friendlyNames.push(this.getFriendlyNameFromColumnId(c));
    });
    return friendlyNames;
  }

  public getColumnIdFromFriendlyName(friendlyName: string): string {
    if (friendlyName.includes(GeneralConstants.MISSING_COLUMN)) {
      return friendlyName.replace(GeneralConstants.MISSING_COLUMN, ''); // Ids should stay "pure"
    }
    const foundColumn: AdaptableColumn | undefined = this.getColumns().find(
      c => c.FriendlyName == friendlyName
    );
    if (foundColumn) {
      return foundColumn.ColumnId;
    }
    this.LogMissingColumnWarning(friendlyName);
    return friendlyName + GeneralConstants.MISSING_COLUMN;
  }

  public getColumnIdsFromFriendlyNames(friendlyNames: string[]): string[] {
    const columnIds: string[] = [];
    if (ArrayExtensions.IsNullOrEmpty(friendlyNames)) {
      return columnIds;
    }
    friendlyNames.forEach(c => {
      columnIds.push(this.getColumnIdFromFriendlyName(c));
    });
    return columnIds;
  }

  public getColumnsFromFriendlyNames(friendlyNames: string[]): AdaptableColumn[] {
    // not sure if this is right as might ignore bad cols
    return friendlyNames.map(friendlyName =>
      this.getColumns().find(x => x.FriendlyName == friendlyName)
    );
  }

  public getColumnsFromIds(columnIds: string[], logWarning = true): AdaptableColumn[] {
    let returnCols: AdaptableColumn[] = [];
    columnIds.forEach(c => {
      returnCols.push(this.getColumnFromId(c, logWarning));
    });

    return returnCols;
  }

  public getColumnFromId(columnId: string, logWarning = true): AdaptableColumn {
    // just return null if no columns rather than logging a warning - otherwise get lots at startup
    if (ArrayExtensions.IsNullOrEmpty(this.getColumns())) {
      return null;
    }
    const foundColumn: AdaptableColumn = this.getColumns().find(c => c.ColumnId == columnId);
    if (foundColumn) {
      return foundColumn;
    }
    if (logWarning) {
      this.LogMissingColumnWarning(columnId);
    }
    return null;
  }

  public getColumnFromFriendlyName(columnName: string, logWarning = true): AdaptableColumn {
    // just return null if no columns rather than logging a warning - otherwise get lots at startup
    if (ArrayExtensions.IsNullOrEmpty(this.getColumns())) {
      return null;
    }
    const foundColumn: AdaptableColumn = this.getColumns().find(c => c.FriendlyName == columnName);
    if (foundColumn) {
      return foundColumn;
    }
    if (logWarning) {
      this.LogMissingColumnWarning(columnName);
    }
    return null;
  }

  public getColumnsOfType(dataType: DataType): AdaptableColumn[] {
    switch (dataType) {
      case DataType.All:
        return this.getColumns();
      case DataType.Boolean:
        return this.getBooleanColumns();
      case DataType.Date:
        return this.getDateColumns();
      case DataType.Number:
        return this.getNumericColumns();
      case DataType.NumberArray:
        return this.getNumericArrayColumns();
      case DataType.String:
        return this.getStringColumns();
      default:
        return this.getColumns();
    }
  }

  public getNumericColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Number);
  }

  public getNumericArrayColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.NumberArray);
  }

  public getStringColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.String);
  }

  public getDateColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Date);
  }

  public getBooleanColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Boolean);
  }

  public getSortableColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.Sortable);
  }

  public getGroupableColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.Groupable);
  }

  public getPivotableColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.Pivotable);
  }

  public getAggregetableColumns(): AdaptableColumn[] {
    return this.getColumns()
      .filter(c => c.Aggregatable)
      .filter(c => c.DataType == DataType.Number);
  }

  private LogMissingColumnWarning(columnId: string): void {
    if (
      this.adaptable.adaptableOptions.generalOptions.showMissingColumnsWarning &&
      this.adaptable.adaptableOptions.generalOptions.showMissingColumnsWarning === true
    ) {
      if (
        !this.isRowGroupColumn(columnId) &&
        !this.isCalculatedColumn(columnId) &&
        !this.isFreeTextColumn(columnId) &&
        !this.isActionColumn(columnId)
      ) {
        LoggingHelper.LogAdaptableWarning(`No column found named '${columnId}'`);
      }
    }
  }

  public getDistinctDisplayValuesForColumn(columnId: string): any[] {
    return this.adaptable.getDistinctValuesForColumn(columnId, CellValueType.DisplayValue, false);
    /*
     if (this.props.Adaptable.adaptableOptions.queryOptions.getColumnValues != null) {
        this.setState({ ShowWaitingMessage: true });
        this.props.Adaptable.adaptableOptions.queryOptions
          .getColumnValues(this.props.CurrentColumn.ColumnId)
          .then(result => {
            if (result == null) {
              // if nothing returned then default to normal
              distinctColumnValues = this.props.Adaptable.api.columnApi.getDistinctValuesForColumn(
                this.props.CurrentColumn.ColumnId
              );
              distinctColumnValues = ArrayExtensions.sortArrayWithProperty(
                SortOrder.Asc,
                distinctColumnValues,
               );
              this.setState({
                DistinctValues: distinctColumnValues,
                ShowWaitingMessage: false,
                DistinctCriteriaPairValue: CellValueType.DisplayValue,
                editedColumnFilter: existingColumnFilter,
              });
            } else {
              // get the distinct items and make sure within max items that can be displayed
              let distinctItems = ArrayExtensions.RetrieveDistinct(result.ColumnValues).slice(
                0,
                this.props.Adaptable.adaptableOptions.queryOptions.maxColumnValueItemsDisplayed
              );
              distinctItems.forEach(distinctItem => {
                let displayValue =
                  result.DistinctCriteriaPairValue == CellValueType.DisplayValue
                    ? this.props.Adaptable.getDisplayValueFromRawValue(
                        this.props.CurrentColumn.ColumnId,
                        distinctItem
                      )
                    : distinctItem;
                distinctColumnValues.push(displayValue );
              });
              let distinctCriteriaPairValue: CellValueType =
                result.DistinctCriteriaPairValue == CellValueType.RawValue
                  ? CellValueType.RawValue
                  : CellValueType.DisplayValue;
              this.setState({
                DistinctValues: distinctColumnValues,
                ShowWaitingMessage: false,
                DistinctCriteriaPairValue: distinctCriteriaPairValue,
                editedColumnFilter: existingColumnFilter,
              });
              // set the UIPermittedValues for this column to what has been sent
              this.props.Adaptable.api.userInterfaceApi.setColumnPermittedValues(
                this.props.CurrentColumn.ColumnId,
                distinctItems
              );
            }
          });
      } else {
        distinctColumnValues = this.props.Adaptable.getColumnValueDisplayValuePairDistinctList(
          this.props.CurrentColumn.ColumnId,
          false
        );
        distinctColumnValues = ArrayExtensions.sortArrayWithProperty(
          SortOrder.Asc,
          distinctColumnValues,
         );
        this.setState({
          DistinctValues: distinctColumnValues,
          ShowWaitingMessage: false,
          DistinctCriteriaPairValue: CellValueType.DisplayValue,
          editedColumnFilter: existingColumnFilter,
        });
      }
      */
  }
  public getDistinctVisibleDisplayValuesForColumn(columnId: string): any[] {
    return this.adaptable.getDistinctValuesForColumn(columnId, CellValueType.DisplayValue, true);
  }
  public getDistinctRawValuesForColumn(columnId: string): any[] {
    return this.adaptable.getDistinctValuesForColumn(columnId, CellValueType.RawValue, false);
  }
  public getDistinctVisibleRawValuesForColumn(columnId: string): any[] {
    return this.adaptable.getDistinctValuesForColumn(columnId, CellValueType.RawValue, true);
  }
}
