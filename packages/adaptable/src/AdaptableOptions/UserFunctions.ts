import { AdaptableComparerFunction } from '../PredefinedConfig/Common/AdaptableComparerFunction';
import { SelectedCellInfo, AdaptableFunctionName, AccessLevel, MenuInfo } from '../types';
import { ActionColumnRenderParams } from '../PredefinedConfig/ActionColumnState';

/**
 * Header to text hopefully to appear at the top...
 */

/**
 * The actual implementations of functions that users reference in Predefined Config.
 *
 * Predefined Config is stored as JSON - and often remotely - which means that it is not possible to store function implementations (as they cannot be serialised).
 *
 * So, instead, in Predefined Config the **name** of the function is provided and the **code implementation** is in functionOptions in AdaptableOptions.
 *
 * All of these implementations are of type `UserFunction` which contains 3 properties:
 *
 * - the type of the function: this allows AdapTable to know which function is being provided; this is strongly typed for user convenience
 *
 * - the name of the function: this must be the same as the name of the function provided in Predefined Config
 *
 * - handler: the actual function implementation itself; this, of course, varies based on the type of the function.
 *
 */
export type UserFunction =
  | {
      type: 'CustomSort.ComparerFunction';
      name: string;
      handler: AdaptableComparerFunction;
    }
  | {
      type: 'CellSummary.OperationFunction';
      name: string;
      handler: (operationParam: {
        selectedCellInfo: SelectedCellInfo;
        allValues: any[];
        numericColumns: string[];
        numericValues: number[];
        distinctCount: number;
      }) => any;
    }
  | {
      type: 'ActionColumn.RenderFunction';
      name: string;
      handler: (params: ActionColumnRenderParams) => string;
    }
  | {
      type: 'ActionColumn.ShouldRenderPredicate';
      name: string;
      handler: (params: ActionColumnRenderParams) => boolean;
    }
  | {
      type: 'Entitlement.LookUpFunction';
      name: string;
      handler: (
        functionName: AdaptableFunctionName,
        userName: string,
        adaptableId: string
      ) => AccessLevel | undefined;
    }
  | {
      type: 'NamedFilter.FilterPredicate';
      name: string;
      handler: (record: any, columnId: string, cellValue: any) => boolean;
    }
  | {
      type: 'UserInterface.ContextMenuItemClickedFunction';
      name: string;
      handler: (menuInfo: MenuInfo) => void;
    }
  | {
      type: 'UserInterface.ColumnMenuItemClickedFunction';
      name: string;
      handler: (menuInfo: MenuInfo) => void;
    }
  | {
      type: 'UserInterface.ContextMenuItemShowPredicate';
      name: string;
      handler: (menuInfo: MenuInfo) => boolean;
    }
  | {
      type: 'UserInterface.ColumnMenuItemShowPredicate';
      name: string;
      handler: (menuInfo: MenuInfo) => boolean;
    };

/**
 * Type which wraps an array of `UserFunction`
 *
 */
export type UserFunctions = UserFunction[];
