import { ApiBase } from './ApiBase';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { DataType, CellValueType, SortOrder } from '../../PredefinedConfig/Common/Enums';
import { Layout, PercentBar } from '../../types';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { AG_GRID_GROUPED_COLUMN } from '../../Utilities/Constants/GeneralConstants';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import { ColumnApi } from '../ColumnApi';
import { GradientColumn } from '../../PredefinedConfig/GradientColumnState';
import { Scope, ScopeDataType } from '../../PredefinedConfig/Common/Scope';
import { ScopeApi } from '../ScopeApi';

export class ScopeApiImpl extends ApiBase implements ScopeApi {
  public isColumnInScope(column: AdaptableColumn, scope: Scope | undefined) {
    if (scope === undefined) {
      // keeping this for now ...
      return true;
    }

    if ('DataTypes' in scope && scope.DataTypes.includes(column.DataType as any)) {
      return true;
    }

    if ('ColumnIds' in scope && scope.ColumnIds.includes(column.ColumnId)) {
      //   console.log('match', column.ColumnId);
      return true;
    }

    return false;
  }

  public getColumnsForScope(scope: Scope): AdaptableColumn[] {
    return this.adaptable.api.columnApi.getColumns().filter(c => {
      this.isColumnInScope(c, scope);
    });
  }

  public scopeIsEmpty(scope: Scope): boolean {
    return scope === undefined;
  }
  public scopeHasDataType(scope: Scope): boolean {
    return scope !== undefined && 'DataTypes' in scope;
  }
  public scopeHasColumns(scope: Scope): boolean {
    return scope !== undefined && 'ColumnIds' in scope;
  }

  public isColumnInScopeColumns(column: AdaptableColumn, scope: Scope): boolean {
    return this.scopeHasColumns(scope) && this.isColumnInScope(column, scope);
  }

  public getScopeToString(scope: Scope): string {
    if (scope == undefined) {
      return 'All (row)';
    }
    if ('DataTypes' in scope) {
      return 'DataTypes: ' + scope.DataTypes.join(',');
    }
    if ('ColumnIds' in scope) {
      return (
        'Columns: ' +
        this.adaptable.api.columnApi.getFriendlyNamesFromColumnIds(scope.ColumnIds).join(',')
      );
    }
  }

  public getColumnIdsInScope(scope: Scope): string[] | undefined {
    if (scope !== undefined && 'ColumnIds' in scope) {
      return scope.ColumnIds;
    }
    return undefined;
  }

  public getDataTypesInScope(scope: Scope): ScopeDataType[] | undefined {
    if (scope !== undefined && 'DataTypes' in scope) {
      return scope.DataTypes;
    }
    return undefined;
  }
}
