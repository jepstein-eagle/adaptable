import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
import { Expression } from './Common/Expression';

/**
 *
 * The Predefined Configuration for Column Filters
 *
 *
 * --------------
 *
 * **Further AdapTable Help Resources**
 *
 * [Column Filter Demo](https://demo.adaptabletools.com/filters/aggridcolumnfiltersdemo/)
 *
 * {@link ColumnFilterApi|Column Filter API}
 *
 * [Column Filter Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/column-filter-function.md)
 *
 * [Adaptable Filtering Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md)
 *
 * --------------
 *
 *  As well as Column Filters, AdapTable offers 3 other types of Filters:
 *
 *  | Type                                   | Usage
 *  | -----------                                   | -----------
 *  | {@link UserFilterState|User}          | Columm Filters which are saved & named; can therefore be re-used in multiple Functions
 *  | {@link NamedFilterState|Named}        | Filters which are provided at design-time together with a predicate function that is called each time it needs to be evaluated
 *  | {@link SystemFilterState|System}      | A predefined list of Filters shipped with AdapTable (e.g. 'Yesterday', 'Positive')
 *
 * Read more at the [Adaptable Filtering Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md)
 *
 */
export interface ColumnFilterState extends ConfigState {
  ColumnFilters?: ColumnFilter[];
}

export interface ColumnFilter extends AdaptableObject {
  ColumnId: string;
  Filter: Expression;
}

/*


A collection of ColumnFilter object. Each ColumnFilter contains a single column Expression (see Expression Object Config). However, the Expression can contain as many criteria as you want.

*/
