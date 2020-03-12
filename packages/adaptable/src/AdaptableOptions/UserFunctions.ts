import { AdaptableComparerFunction } from '../PredefinedConfig/Common/AdaptableComparerFunction';
import { SelectedCellInfo, AdaptableFunctionName, AccessLevel, MenuInfo } from '../types';
import {
  ActionColumnRenderFunction,
  ActionColumnShouldRenderPredicate,
} from '../PredefinedConfig/ActionColumnState';
import { CustomSortCompareFunction } from '../PredefinedConfig/CustomSortState';
import { CellSummaryOperationFunction } from '../PredefinedConfig/CellSummaryState';
import { EntitlementLookUpFunction } from '../PredefinedConfig/EntitlementState';

/**
 * The actual implementations of functions that users reference in Predefined Config.
 *
 * Predefined Config is stored as JSON - and often remotely - which means that it is not possible to store function implementations (as they cannot be serialised).
 *
 * So, instead, in Predefined Config the **name** of the function is provided and the **code implementation** is in functionOptions in AdaptableOptions.
 *
 * All of these implementations are of type `UserFunction` which contains 3 properties:
 *
 * 1.  the **type** of the function: this allows AdapTable to know which function is being provided; this is strongly typed for user convenience
 *
 * 2.  the **name** of the function: must be the same as the function name provided in Predefined Config
 *
 * 3.  the function **handler**: the actual function implementation itself; this varies based on the type of the function.
 *
 * The types supported are:
 *
 * - `CustomSort.ComparerFunction`
 *
 * - `CellSummaryOperationFunction`
 *
 * - `ActionColumn.RenderFunction`
 *
 * - `ActionColumn.ShouldRenderPredicate`
 *
 * - `EntitlementLookUpFunction`
 *
 * - `NamedFilter.FilterPredicate`
 *
 * - `ContextMenuItemClickedFunction`
 *
 * - `ColumnMenuItemClickedFunction`
 *
 * - `ContextMenuItemShowPredicate`
 *
 * - `ColumnMenuItemShowPredicate`
 *
 *
 */
export type UserFunction =
  | CustomSortCompareFunction
  | CellSummaryOperationFunction
  | ActionColumnRenderFunction
  | ActionColumnShouldRenderPredicate
  | EntitlementLookUpFunction
  | NamedFilterPredicate
  | ContextMenuItemClickedFunction
  | ColumnMenuItemClickedFunction
  | ContextMenuItemShowPredicate
  | ColumnMenuItemShowPredicate;

/**
 * Type which wraps an array of `UserFunction`
 *
 */
export type UserFunctions = UserFunction[];

export interface NamedFilterPredicate extends BaseUserFunction {
  type: 'NamedFilterPredicate';
  name: string;
  handler: (record: any, columnId: string, cellValue: any) => boolean;
}
export interface ContextMenuItemClickedFunction extends BaseUserFunction {
  type: 'ContextMenuItemClickedFunction';
  name: string;
  handler: (menuInfo: MenuInfo) => void;
}
export interface ColumnMenuItemClickedFunction extends BaseUserFunction {
  type: 'ColumnMenuItemClickedFunction';
  name: string;
  handler: (menuInfo: MenuInfo) => void;
}
export interface ContextMenuItemShowPredicate extends BaseUserFunction {
  type: 'ContextMenuItemShowPredicate';
  name: string;
  handler: (menuInfo: MenuInfo) => boolean;
}
export interface ColumnMenuItemShowPredicate extends BaseUserFunction {
  type: 'ColumnMenuItemShowPredicate';
  name: string;
  handler: (menuInfo: MenuInfo) => void;
}

/**
 * The Base User Function that all User Functions extend
 */
export interface BaseUserFunction {
  type:
    | 'CustomSortComparerFunction'
    | 'CellSummaryOperationFunction'
    | 'ActionColumn.RenderFunction'
    | 'ActionColumn.ShouldRenderPredicate'
    | 'EntitlementLookUpFunction'
    | 'NamedFilterPredicate'
    | 'ContextMenuItemClickedFunction'
    | 'ColumnMenuItemClickedFunction'
    | 'ContextMenuItemShowPredicate'
    | 'ColumnMenuItemShowPredicate';
  name: string;
  handler: any;
}
