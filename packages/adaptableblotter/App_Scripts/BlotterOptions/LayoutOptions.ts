/**
 * Options for manging Layouts.
 *
 * Layouts (sometimes called views) are ways of managing Column visibility, order and - depending on the grid - grouping and width.
 *
 * Filters and search manage which rows are displayed; Layouts decide which Columns are displayed.
 *
 * ```ts
 * layoutOptions = {
 *  includeVendorStateInLayouts: true,
 *  autoSaveLayouts: false
 *};
 * ```
 */
export interface LayoutOptions {
  /**
   * Whether the Layout should include vendor grid related state.
   *
   * Currently only available in ag-Grid
   *
   * **Default Value: true**
   */
  includeVendorStateInLayouts?: boolean;
  /**
   * Whether layouts should save as soon as column order or sorts change.
   *
   * If set to false, the user needs to click save to persist changes to the layout.
   *
   * **Default Value: true**
   */
  autoSaveLayouts?: boolean;
}
