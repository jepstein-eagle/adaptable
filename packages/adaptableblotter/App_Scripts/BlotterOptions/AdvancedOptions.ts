import { ActionColumnRenderParams } from '../PredefinedConfig/ActionColumnState';

/**
 * Advanced options section of Adaptable Blotter Options.
 *
 * **The properties here are all deprecated and should not be used**
 */
export interface AdvancedOptions {
  userFunctions?: {
    namedFilterFunctions?: NamedFilterFunction[];
    actionColumnFunctions?: ActionColumnFunction[];
  };
}

export interface NamedFilterFunction {
  name: string;
  func: (record: any, columnId: string, cellValue: any) => boolean;
}

export interface ActionColumnFunction {
  name: string;
  func: (params: ActionColumnRenderParams) => string;
}
