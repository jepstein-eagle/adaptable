import { IAdaptableBlotter } from '../types';

/**
 * Advanced options section of Adaptable Blotter Options.
 *
 * Will contain properties required for more advanced scenarios.
 *
 * ```ts
 * advancedOptions = {
 * userFunctions: {
 *   namedFilterFunctions: [
 *   {
 *     name: 'USD Currency',
 *     func: (_record, _columnId, cellValue) => {
 *        return cellValue === 'USD';
 *     },
 *   },
 *   {
 *     name: 'Over 100',
 *     func: (_record, _columnId, cellValue) => {
 *       return cellValue > 100;
 *     },
 *   },
 *  ],
 * actionColumnFunctions: [
 * {
 *  name: 'RenderActionFunc',
 *   func: (params) => {
 *     return params.data.ItemCos > 75
 *       ? '<button class="doublebutton">Double</button>'
 *        : '<button class="treblebutton">Treble</button>';
 *    },
 *  },
 *  ],
 * },
 *};
 * ```
 */
export interface AdvancedOptions {
  /**
   * Functions which are provided by developers at design time
   *
   * The name of each function will match the Name property in the correponding State / Predefined Config.
   *
   * It is done this way because there is no totally safe, non-brittle way to store function definitions in JSON.
   */
  userFunctions?: {
    namedFilterFunctions?: NamedFilterFunction[];
    actionColumnFunctions?: ActionColumnFunction[];
  };
}

/**
 * Predicate functions provided at Design-Time for the Named Filter function.
 *
 * These predicates will be evaluated by the Adaptable Blotter when the filter is applied.
 *
 * **note:  the name in this function must match the PredicateName property provided in the NamedFilter state section of PredefinedConfig**
 */
export interface NamedFilterFunction {
  name: string;
  func: (record: any, columnId: string, cellValue: any) => boolean;
}

/**
 * Predicate functions provided at Design-Time for the Action Column function.
 *
 * These functions will be evaluated by the Adaptable Blotter when the Action button is rendered.
 *
 * This gives you complete control over the look and feel of the Button in your column.
 *
 * **note:  the name in this function must match the RenderFunctionName property provided in the ActionColumn state section of PredefinedConfig**
 */
export interface ActionColumnFunction {
  name: string;
  func: (params: any, blotter: IAdaptableBlotter) => string;
}
