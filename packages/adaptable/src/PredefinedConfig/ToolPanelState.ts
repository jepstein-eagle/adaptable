import { RunTimeState } from './RunTimeState';
import { AdaptableToolPanels, AdaptableFunctionButtons } from './Common/Types';

export interface ToolPanelState extends RunTimeState {
  /**
   * Which of the ToolPanels should be available to the User to choose to select.
   *
   * The Current ToolPanels that Adaptable offers are:
   *
   * - AdvancedSearch
   * - Alert
   * - BulkUpdate
   * - CellSummary
   * - Chart (if using Charting Plugin)
   * - ColumnFilter
   * - Dashboard
   * - Export
   * - Layout
   * - QuickSearch
   * - SmartEdit
   * - SystemStatus
   * - Theme
   *
   * Only those ToolPanels listed here will be selectable
   *
   * If you don't provide any value for this property, then ALL Adaptable ToolPanels will be available.
   *
   * **Default Value**: Empty array
   */
  AvailableToolPanels?: AdaptableToolPanels;

  /**
   * Which ToolPanels should be visible in the Adaptable ToolPanel when your application first loads.
   *
   * Note: If the `AvailableToolPanels` property has been set, then the visible toolbars listed here must also be included there.
   *
   * **Default Value**: All ToolPanels
   */
  VisibleToolPanels?: AdaptableToolPanels;

  /**
   * Which Function Buttons should be visible in the Adaptable ToolPanel when your application first loads.
   *
   * Each button is connected to a Function in Adaptable and opens the relevant popup screen.
   *
   * **Default Value**: [Empty Array]
   */
  VisibleButtons?: AdaptableFunctionButtons;

  /**
   * Whether to show the Grid Info button in the Adaptable ToolPanel.
   *
   * If 'true' then the button will be visible; clicking the button will open the GridInfo screen giving details of the Current Grid, version, row count etc.
   *
   * The GridInfo screen also a tab allowing you to see the currently selected set of Adaptable Options.
   *
   * **Default Value**: true
   */
  ShowGridInfoButton?: boolean;

  /**
   * Whether to show the Functions dropdown in the Adaptable ToolPanel.
   *
   * If 'true' then the dropdown will be visible as the first item (with a 'house' icon).
   *
   * Clicking the button will open a dropdown listing all the Functions that your `Entitlements` allows.
   *
   * Selecting a menu item in the dropdown will open the popup for that Function.
   *
   * **Default Value**: true
   */
  ShowFunctionsDropdown?: boolean;

  /**
   * Whether to show the Columns dropdown in the Adaptable ToolPanel.
   *
   * If 'true' then the dropdown will be visible as the penultimate item.
   *
   * Clicking the button will open a dropdown listing all the Columns in your grid.  You can click the checkbox to show / hide the column.
   *
   * Note: if you want to move Columns in your Grid then you need to use the `Column Chooser` Function.
   *
   * **Default Value**:  true
   */
  ShowColumnsDropdown?: boolean;

  /**
   * Whether to show the ToolPanels dropdown in the Adaptable ToolPanel.
   *
   * If 'true' then the dropdown will be visible as the last item.
   *
   * Clicking the button will open a dropdown listing all the ToolPanels available (see the `AvailableToolPanels` property).  You can click the checkbox to show / hide the ToolPanel.
   *
   * Note: if you want to move / reposition the ToolPanels in the Adaptable ToolPanel then you need to open the ToolPanel Configuration popup (via the configure button).
   *
   * **Default Value**:  true
   */
  ShowToolPanelsDropdown?: boolean;

  // wasnt possible to use as we create the sidebar BEFORE we load state unfortunately
  // ToolPanelTitle?: string;
}
