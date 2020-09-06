import { ApiBase } from './ApiBase';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { AdaptableScope, ScopeDataType } from '../../PredefinedConfig/Common/AdaptableScope';
import { ScopeApi } from '../ScopeApi';

export class ScopeApiImpl extends ApiBase implements ScopeApi {
  public isColumnInScope(column: AdaptableColumn, scope: AdaptableScope | undefined) {
    if ('All' in scope) {
      // do we need a true check here?
      return true;
    }

    if ('DataTypes' in scope && scope.DataTypes.includes(column.DataType as any)) {
      return true;
    }

    if ('ColumnIds' in scope && scope.ColumnIds.includes(column.ColumnId)) {
      return true;
    }

    return false;
  }

  public getColumnsForScope(scope: AdaptableScope): AdaptableColumn[] {
    if (scope == undefined) {
      return [];
    }
    return this.adaptable.api.columnApi.getColumns().filter(c => {
      if ('All' in scope) {
        // do we need a true check here?
        return true;
      }

      if ('DataTypes' in scope && scope.DataTypes.includes(c.DataType as any)) {
        return true;
      }

      if ('ColumnIds' in scope && scope.ColumnIds.includes(c.ColumnId)) {
        return true;
      }
      return false;
    });
  }

  public getScopeDescription(scope: AdaptableScope): string {
    if (scope === undefined) {
      return 'Nothing';
    }
    if ('All' in scope) {
      // do we need a true check here?
      return 'All';
    }

    if ('DataTypes' in scope) {
      return (
        (scope.DataTypes.length > 0 ? 'DataTypes' : 'DataType') + ': ' + scope.DataTypes.join(', ')
      );
    }

    if ('ColumnIds' in scope) {
      return (
        (scope.ColumnIds.length > 0 ? 'Columns' : 'Column') +
        ': ' +
        this.adaptable.api.columnApi.getFriendlyNamesFromColumnIds(scope.ColumnIds).join(', ')
      );
    }
  }

  public scopeIsEmpty(scope: AdaptableScope): boolean {
    return scope === undefined;
  }
  public scopeIsAll(scope: AdaptableScope): boolean {
    return scope !== undefined && 'All' in scope;
  }
  public scopeHasDataType(scope: AdaptableScope): boolean {
    return scope !== undefined && 'DataTypes' in scope;
  }
  public scopeHasColumns(scope: AdaptableScope): boolean {
    return scope !== undefined && 'ColumnIds' in scope;
  }

  public isColumnInScopeColumns(column: AdaptableColumn, scope: AdaptableScope): boolean {
    return this.scopeHasColumns(scope) && this.isColumnInScope(column, scope);
  }

  public getScopeToString(scope: AdaptableScope): string {
    if ('All' in scope) {
      return 'All';
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

  public getColumnIdsInScope(scope: AdaptableScope): string[] | undefined {
    if (scope !== undefined && 'ColumnIds' in scope) {
      return scope.ColumnIds;
    }
    return undefined;
  }

  public getDataTypesInScope(scope: AdaptableScope): ScopeDataType[] | undefined {
    if (scope !== undefined && 'DataTypes' in scope) {
      return scope.DataTypes;
    }
    return undefined;
  }

  public isColumnInNumericScope(column: AdaptableColumn, scope: AdaptableScope): boolean {
    // if column is not even numeric then return false
    if (column == null || column == undefined || column.DataType !== 'Number') {
      return false;
    }

    // if no scope then return false
    if (scope == undefined) {
      return false;
    }

    // check if the scope has ColumnIds and whether this column is contained
    if ('ColumnIds' in scope && scope.ColumnIds.includes(column.ColumnId)) {
      return true;
    }

    // check if the scope has ColumnIds and whether this column is contained
    if ('DataTypes' in scope && scope.DataTypes.includes('Number')) {
      return true;
    }

    return false;
  }

  public isColumnInDateScope(column: AdaptableColumn, scope: AdaptableScope): boolean {
    // if column is not even numeric then return false
    if (column == null || column == undefined || column.DataType !== 'Date') {
      return false;
    }

    // if no scope then return false
    if (scope == undefined) {
      return false;
    }

    // check if the scope has ColumnIds and whether this column is contained
    if ('ColumnIds' in scope && scope.ColumnIds.includes(column.ColumnId)) {
      return true;
    }

    // check if the scope has ColumnIds and whether this column is contained
    if ('DataTypes' in scope && scope.DataTypes.includes('Date')) {
      return true;
    }

    return false;
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
  public isScopeInScope(a: AdaptableScope, b: AdaptableScope): boolean {
    if ('All' in b) {
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
