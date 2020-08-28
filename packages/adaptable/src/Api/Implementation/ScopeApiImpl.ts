import { ApiBase } from './ApiBase';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
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

  /*
    Scope A     | Scope B     | Result
    ===========================================================================
    All           *             true
    *             All           true
    DataTypes     DataTypes     all DataTypes from A should be in B
    ColumnIds     ColumnIds     all ColumnIds from A should be in B
    ColumnIds     DataTypes     all DataTypes of ColumnIds from A should be in B
    DataTypes     ColumnIds     false
  */
  public isScopeInScope(a: Scope, b: Scope): boolean {
    if ('All' in a || 'All' in b) {
      return true;
    }

    if (
      'DataTypes' in a &&
      'DataTypes' in b &&
      a.DataTypes.every(type => b.DataTypes.includes(type))
    ) {
      return true;
    }

    if (
      'ColumnIds' in a &&
      'ColumnIds' in b &&
      a.ColumnIds.every(columnId => b.ColumnIds.includes(columnId))
    ) {
      return true;
    }

    if (
      'ColumnIds' in a &&
      'DataTypes' in b &&
      a.ColumnIds.every(columnId =>
        b.DataTypes.includes(this.adaptable.api.columnApi.getColumnFromId(columnId).DataType as any)
      )
    ) {
      return true;
    }

    return false;
  }
}
