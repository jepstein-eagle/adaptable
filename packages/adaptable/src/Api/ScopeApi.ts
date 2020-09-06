import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { AdaptableScope, ScopeDataType } from '../PredefinedConfig/Common/AdaptableScope';

/**
 * Provides access to a suite of functions related to the `Scope` object
 */
export interface ScopeApi {
  isColumnInScope(column: AdaptableColumn, scope: AdaptableScope): boolean;
  getColumnsForScope(scope: AdaptableScope): AdaptableColumn[];

  scopeIsEmpty(scope: AdaptableScope): boolean;
  scopeIsAll(scope: AdaptableScope): boolean;
  scopeHasDataType(scope: AdaptableScope): boolean;
  scopeHasColumns(scope: AdaptableScope): boolean;
  getScopeToString(scope: AdaptableScope): string;

  isColumnInScopeColumns(column: AdaptableColumn, scope: AdaptableScope): boolean;

  getColumnIdsInScope(scope: AdaptableScope): string[] | undefined;
  getDataTypesInScope(scope: AdaptableScope): ScopeDataType[] | undefined;

  isColumnInNumericScope(column: AdaptableColumn, scope: AdaptableScope): boolean;
  isColumnInDateScope(column: AdaptableColumn, scope: AdaptableScope): boolean;

  isScopeInScope(a: AdaptableScope, b: AdaptableScope): boolean;

  getScopeDescription(scope: AdaptableScope): string;
}
