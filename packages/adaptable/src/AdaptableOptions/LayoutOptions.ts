/**
 * Options for manging Layouts.
 *
 * Layouts (sometimes called views) are ways of managing Column visibility, order and - depending on the grid - grouping and width.
 *
 * Filters and search manage which **Rows** are displayed; Layouts decide which **Columns** are displayed.
 *
 * ```ts
 * layoutOptions = {
 *  autoSaveLayouts: false
 *};
 * ```
 */
export interface LayoutOptions {
  /**
   * Whether layouts should include details of which grouped rows are expanded when they save.
   *
   * If set to true, when the Load next loads it will automatically open those grouped rows which were open when it was last displayed
   *
   * **Default Value: false**
   */
  includeExpandedRowGroups?: boolean;

  /**
   * Whether layouts should save whenever the Grid's column order or sort information changes.
   *
   * If set to false (the default is true), the user needs to click the save button to persist changes to the layout.
   *
   * **Default Value: true**
   */
  autoSaveLayouts?: boolean;

  /**
   * Whether columns should be auto-sized when a Layout loads for the first time
   *
   * Note: in ag-Grid if you have the GridOptions *suppressColumnVirtualisation* property set to true, then **only the visible columns will be auto sized**.
   *
   * **Default Value: false**
   */
  autoSizeColumnsInLayout?: boolean;

  /**
   * Whether columns should be auto-sized in the Default Layout
   *
   * This is the Layout created by AdapTable based on the initial column definition.
   *
   * **Default Value: true**
   */
  autoSizeColumnsInDefaultLayout?: boolean; //TODO remove

  /**
   * Whether columns should be auto-sized when a Pivot-based Layout loads for the first time
   *
   * **Default Value: false**
   */
  autoSizeColumnsInPivotLayout?: boolean;
}
