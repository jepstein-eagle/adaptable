import { AdaptableComparerFunction } from '../PredefinedConfig/Common/AdaptableComparerFunction';
import { SelectedCellInfo, AdaptableFunctionName, AccessLevel, MenuInfo } from '../types';
import { ActionColumnRenderParams } from '../PredefinedConfig/ActionColumnState';

export interface UserFunctions {
  CustomSort?: {
    comparerFunctions?: {
      [key: string]: AdaptableComparerFunction;
    };
  };
  CellSummary?: {
    operationFunctions?: {
      [key: string]: (operationParam: {
        selectedCellInfo: SelectedCellInfo;
        allValues: any[];
        numericColumns: string[];
        numericValues: number[];
        distinctCount: number;
      }) => any;
    };
  };
  ActionColumn?: {
    renderFunctions?: {
      [key: string]: (params: ActionColumnRenderParams) => string;
    };
    shouldRenderPredicates?: {
      [key: string]: (params: ActionColumnRenderParams) => boolean;
    };
  };
  Entitlement?: {
    lookUpFunctions?: {
      [key: string]: (
        functionName: AdaptableFunctionName,
        userName: string,
        adaptableId: string
      ) => AccessLevel | undefined;
    };
  };
  NamedFilter?: {
    filterPredicates?: {
      [key: string]: (record: any, columnId: string, cellValue: any) => boolean;
    };
  };
  UserInterface?: {
    contextMenuItemClickedFunctions?: {
      [key: string]: (menuInfo: MenuInfo) => void;
    };
    contextMenuItemShowPredicates?: {
      [key: string]: (menuInfo: MenuInfo) => boolean;
    };
    columnMenuItemClickedFunctions?: {
      [key: string]: (menuInfo: MenuInfo) => void;
    };
    columnMenuItemShowPredicates?: {
      [key: string]: (menuInfo: MenuInfo) => boolean;
    };
  };
}
