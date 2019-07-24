/**
 * Options for managing Filters.
 *
 * Includes properties on how Filters should look and whether to use Adaptable Blotter or Vendor filters.
 *
 * ```ts
 * filterOptions = {
 *  indicateFilteredColumns: false,
 *  useAdaptableBlotterFilterForm: false,
 *  useAdaptableBlotterQuickFilter: false,
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
   * Whether to use the Adaptable Blotter filter form in the Column header menu.
   *
   * If false, the one supplied by the vendor grid will be used instead.
   *
   * Only applicable in DataGrids where the vendor offers a filter form.  If not then only the Adaptable Blotter form is used.
   *
   * **Default Value: true**
   */
  useAdaptableBlotterFilterForm?: boolean;
  /**
   * Whether to use the Adaptable Blotter quick filter row or the one supplied by the Vendor grid.
   *
   * If false, the one supplied by the vendor grid will be used instead.
   *
   * Note: this property is onky applicable in DataGrids where the vendor offers a quick / floating filter row.  If not, then NO quick filter is used.
   *
   * **Default Value: true**
   */
  useAdaptableBlotterQuickFilter?: boolean;
  /**
   * Whether to re-apply Adaptable Blotter filtering whenever the user edits data in the Grid.
   *
   * The choice is 'Always' (the default value), 'Never' or 'Throttle'
   *
   * If 'Throttle' is selected, then a 'ThrottleDelay' needs to be provided
   *
   * **Default Value: Always**
   */
  filterActionOnUserDataChange?: FilterActionOnDataChange;
  /**
   * Whether to to re-apply Adaptable Blotter filtering whenever data updates or ticks in the background (ie. not result of user action)
   *
   * The choice is 'Always', 'Never' (the default value) or 'Throttle'
   *
   * If 'Throttle' is selected, then a 'ThrottleDelay' needs to be provided
   *
   * **Default Value: Never**
   */
  filterActionOnExternalDataChange?: FilterActionOnDataChange;
}

/**
 * Used to determine when the Adaptable Blotter should re-apply filtering.
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
   * The delay used (when Filter is set to Throttle)
   */
  ThrottleDelay?: number;
}
