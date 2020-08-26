import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { Scope, ScopeDataType } from '../PredefinedConfig/Common/Scope';

/**
 * Provides access to a suite of functions related to the `Scope` object
 */
export interface ScopeApi {
  isColumnInScope(column: AdaptableColumn, scope: Scope): boolean;
  getColumnsForScope(scope: Scope): AdaptableColumn[];

  scopeIsEmpty(scope: Scope): boolean;
  scopeHasDataType(scope: Scope): boolean;
  scopeHasColumns(scope: Scope): boolean;
  getScopeToString(scope: Scope): string;

  isColumnInScopeColumns(column: AdaptableColumn, scope: Scope): boolean;

  getColumnIdsInScope(scope: Scope): string[] | undefined;
  getDataTypesInScope(scope: Scope): ScopeDataType[] | undefined;
}
