import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
import { DesignTimeState } from '../DesignTimeState/DesignTimeState';
import { Scope } from '../Common/Scope';

/**
 * Named Filters are filters provided at run-time together with a Predicate Function that will be evaluated each time the Filter runs.
 *
 * The Predicate Function will be given 3 params:
 *
 * a. *record* - the row where the Named Filter will be applied
 *
 * b. *columnId* - the column which contains the Named Filter
 *
 * c.  *cellValue* - the value being tested
 */
export interface NamedFilterState extends DesignTimeState {
  /**
   * A collection of Named Filters
   */
  NamedFilters?: NamedFilter[];
}

//export interface NamedFilterPredicate {
//  (record: any, columnId: string, cellValue: any): boolean;
//}

/**
 * A Named Filter is a filter provided at design-time together with a Predicate Function that is evaluated each time the filter is run.
 */
export interface NamedFilter extends AdaptableBlotterObject {
  /**
   * The name of the Named Filter that will be applied.
   *
   * This value will be shown everywhere the filter appears (e.g. in Column menu or in the Query Builder screen).
   */
  Name: string;

  /**
   * Where the Named Filter will be applied
   *
   * You can choose to run the Named Filter for particular columns, for a given DataType (e.g. Date, Numeric), or for given Column Categories.
   */
  Scope: Scope;

  /**
   * The name of the Predicate Function that will be run each time the Named Filter is applied.
   *
   * **Note**:  You do not provide the actual function here (as it cannot be stored with JSON).  Instead you provide it in the **userFunctions** property of [Advanced Options](../interfaces/_blotteroptions_advancedoptions_.advancedoptions.html)
   */
  PredicateName: string;
}
