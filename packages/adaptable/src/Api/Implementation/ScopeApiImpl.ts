import { ApiBase } from './ApiBase';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { Scope, ScopeDataType } from '../../PredefinedConfig/Common/Scope';
import { ScopeApi } from '../ScopeApi';
import { LogAdaptableWarning } from '../../Utilities/Helpers/LoggingHelper';

export class ScopeApiImpl extends ApiBase implements ScopeApi {
  public isColumnInScope(column: AdaptableColumn, scope: Scope | undefined) {
    if (scope === undefined) {
      // keeping this for now but this should be removed once we update teh filter predicates...
      LogAdaptableWarning('we should update this to be ALL instead of using null..');
      return true;
    }

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

  public getColumnsForScope(scope: Scope): AdaptableColumn[] {
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

  public getScopeDescription(scope: Scope): string {
    if (scope === undefined) {
      return 'Nothing';
    }
    if ('All' in scope) {
      // do we need a true check here?
      return 'All';
    }

    if ('DataTypes' in scope) {
      return 'DataType(s): ' + scope.DataTypes.join(', ');
    }

    if ('ColumnIds' in scope) {
      return (
        'Columns(s): ' +
        scope.ColumnIds.map(c => this.adaptable.api.columnApi.getFriendlyNameFromColumnId(c)).join(
          ', '
        )
      );
    }
  }

  public scopeIsEmpty(scope: Scope): boolean {
    return scope === undefined;
  }
  public scopeIsAll(scope: Scope): boolean {
    return scope !== undefined && 'All' in scope;
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
    console.log('ab', a, b);

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
