/**
 * Advanced options section of Adaptable Blotter Options.
 *
 */
export interface AdvancedOptions {
  userFunctions?: UserFunctionCollection;
}

export interface UserFunctionCollection {
  namedFilterFunctions?: NamedFilterFunction[];
  actionColumnFunctions?: ActionColumnFunction[];
}

export interface NamedFilterFunction {
  name: string;
  func: (record: any, columnId: string, cellValue: any) => boolean;
}

export interface ActionColumnFunction {
  name: string;
  func: () => void;
}
