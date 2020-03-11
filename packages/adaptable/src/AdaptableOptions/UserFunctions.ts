import { AdaptableComparerFunction } from '../PredefinedConfig/Common/AdaptableComparerFunction';
import { SelectedCellInfo, AdaptableFunctionName, AccessLevel, MenuInfo } from '../types';
import { ActionColumnRenderParams } from '../PredefinedConfig/ActionColumnState';

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

export type UserFunctions = UserFunction[];
