export interface LayoutOptions {
  /**
   * Whether layouts should include vendor grid related state
   * Defaults to false - only currently available in ag-Grid
   */
  includeVendorStateInLayouts?: boolean;
  /**
   * Whether layouts should save as soon as column order or sorts change
   * Defaults to false - user needs to click save to persist changes
   */
  autoSaveLayouts?: boolean;
}
