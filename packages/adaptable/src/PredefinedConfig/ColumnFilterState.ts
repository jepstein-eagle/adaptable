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
 *  AdapTable offers 4 types of Filters:
 *
 *  | Filter Type                                   | Usage
 *  | -----------                                   | -----------
 *  | {@link ColumnFilterState|Column Filters}      | Filter a single Column using either a list of Column Values or a Range
 *  | {@link UserFilterState|User Filters}          | Columm Filters which are saved and named and therefore able to be re-used in multiple Functions
 *  | {@link NamedFilterState|Named Filters}        | Filters which are provided at design-time together with a predicate function that is called each time it needs to be evaluated
 *  | {@link SystemFilterState|System Filters}      | A predefined list of Filters shipped with AdapTable (e.g. 'Yesterday', 'Positive')
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
