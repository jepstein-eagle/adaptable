/**
 * Options for managing Filters.
 *
 * Includes settings for how Filters should look and whether to use Adaptable or Vendor filters.
 *
 * ```ts
 * filterOptions = {
 *  indicateFilteredColumns: false,
 *  useAdaptableFilterForm: false,
 *  useVendorFilterFormStyle: true,
 *  useAdaptableQuickFilter: false,
 *  autoApplyFilter: false,
 *  clearFiltersOnStartUp: true,
 *  filterActionOnUserDataChange: {
 *   RunFilter: 'Throttle',
 *   ThrottleDelay: 50
 *  }
 *};
 * ```
 */
export interface FilterOptions {
  /**
   * Whether to make the font in the Column header for filtered columns to be bold and italicised.
   *
   * This makes it easier for users to see at a glance which columns are currently filtered
   *
   * **Default Value: true**
   */
  indicateFilteredColumns?: boolean;
  /**
   * Whether to use Adaptable's filter form in the Column header menu.
   *
   * If false, the one supplied by the vendor grid will be used instead.
   *
   * Only applicable in DataGrids where the vendor offers a filter form.  If not then only Adaptable's form is used.
   *
   * **Default Value: true**
   */
  useAdaptableFilterForm?: boolean;

  /**
   * Only applicable when Adaptable's filter form is being used.
   *
   * By default, the filter form will be styled to match Adaptable's styles. Setting this to `true` will style it to match the styling of the current vendor grid.
   *
   * **Default Value: false**
   */
  useVendorFilterFormStyle?: boolean;

  /**
   * Whether to use Adaptable's quick filter row or the one supplied by the Vendor grid.
   *
   * If false, the one supplied by the vendor grid will be used instead.
   *
   * Note: this property is onky applicable in DataGrids where the vendor offers a quick / floating filter row.  If not, then NO quick filter is used.
   *
   * **Default Value: true**
   */
  useAdaptableQuickFilter?: boolean;
  /**
   * Whether to re-apply filtering whenever the user edits data in the Grid.
   *
   * The choice is 'Always' (the default value), 'Never' or 'Throttle'
   *
   * If 'Throttle' is selected, then a 'ThrottleDelay' needs to be provided
   *
   * **Default Value: Always**
   */
  filterActionOnUserDataChange?: FilterActionOnDataChange;
  /**
   * Whether to re-apply filtering whenever data updates or ticks in the background (ie. not result of user action)
   *
   * The choice is 'Always', 'Never' (the default value) or 'Throttle'
   *
   * If 'Throttle' is selected, then a 'ThrottleDelay' needs to be provided
   *
   * **Default Value: Never**
   */
  filterActionOnExternalDataChange?: FilterActionOnDataChange;
  /**
   * Whether to apply selected filters in the Filter Form as soon as they are clicked
   *
   * If set to **true** (the default), clicking on a filter applies it immediately.
   *
   * If set to **false** then an Apply Filter button is placed at the bottom of the form, and filters are only applied when that button is clicked.
   *
   * **Default Value: true**
   */
  autoApplyFilter?: boolean;

  /**
   * Whether to clear all applied filters when AdapTable loads.
   *
   * Used in the rare scenario when the user wants no filtering to be re-applied at startup
   *
   * Note: a neater implementation would be to use the state management functions
   *
   * **Default Value: False**
   */
  clearFiltersOnStartUp?: boolean;
}

/**
 * Used to determine when Adaptable should re-apply filtering.
 *
 * It is set for both user cell edits and external (e.g. ticking) data edits.
 *
 * If the 'runFilter' value is 'Throttle' then the 'throttleDelay' property should be additionally set.
 */
export interface FilterActionOnDataChange {
  /**
   * When to re-apply Filters
   */
  RunFilter: 'Always' | 'Never' | 'Throttle';

  /**
   * The delay **in milliseconds** used (when Filter is set to Throttle)
   */
  ThrottleDelay?: number;
}
