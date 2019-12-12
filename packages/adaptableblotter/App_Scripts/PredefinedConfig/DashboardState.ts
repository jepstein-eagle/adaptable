import { RunTimeState } from './RunTimeState';
import { ButtonStyle } from './Common/ButtonStyle';

/**
 * The Adaptable Blotter Toolbar collection
 *
 * When setting the `AvailableToolbars` or `VisibleToolbars` properties in Dashboard state, only the Toolbars listed here can be included.
 */
export type AdaptableBlotterDashboardToolbars = AdaptableBlotterDashboardToolbar[];

/**
 * List of all the Toolbars that the Adaptable Blotter provides
 */
export type AdaptableBlotterDashboardToolbar =
  | 'AdvancedSearch'
  | 'Alert'
  | 'Application'
  | 'BulkUpdate'
  | 'CellSummary'
  | 'Chart'
  | 'ColumnFilter'
  | 'Export'
  | 'Layout'
  | 'SmartEdit'
  | 'QuickSearch'
  | 'SystemStatus'
  | 'Theme';

/**
 * The Adaptable Blotter Function Button collection
 *
 * When setting the VisibleButtons` properties in Dashboard state, only the Function Buttons listed here can be included.
 */
export type AdaptableBlotterFunctionButtons = AdaptableBlotterFunctionButton[];

/**
 * List of all the Function button that the Adaptable Blotter provides.
 *
 * Essentially it is a list of all the Functions in the Adaptable Blotter as each Function has a popup for which this is a shortcut button.
 */
export type AdaptableBlotterFunctionButton =
  | 'AdvancedSearch'
  | 'Alert'
  | 'Application'
  | 'BulkUpdate'
  | 'CalculatedColumn'
  | 'Calendar'
  | 'CellSummary'
  | 'CellValidation'
  | 'Chart'
  | 'ColumnCategory'
  | 'ColumnChooser'
  | 'ColumnFilter'
  | 'ColumnInfo'
  | 'ConditionalStyle'
  | 'CustomSort'
  | 'Dashboard'
  | 'DataSource'
  | 'Export'
  | 'FlashingCells'
  | 'FormatColumn'
  | 'FreeTextColumn'
  | 'Home'
  | 'Layout'
  | 'PercentBar'
  | 'PieChart'
  | 'PlusMinus'
  | 'QuickSearch'
  | 'Reminder'
  | 'Shortcut'
  | 'SmartEdit'
  | 'SparklineColumn'
  | 'Sparkline'
  | 'StateManagement'
  | 'SystemStatus'
  | 'TeamSharing'
  | 'Theme'
  | 'UpdatedRow'
  | 'UserFilter';

/**
 * The Predefined Configuration for the Dashboard function
 *
 * The Dashboard is the area above the grid which contains buttons, toolbars and dropdowns.
 *
 * It comprises the 'Home Toolbar' (which hosts Function buttons and various dropdowns) and a range of Function Toolbars.
 *
 * You use the Dashboard State to set which elements are availalbe (and visible) in the Home Toolbar and to select which Function Toolbars are available (and visible).
 *
 *  **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/dashboard/aggriddashboardtoolbarsdemo/) | [API](_api_dashboardapi_.dashboardapi.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029743092-Dashboard-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360030944511-Dashboard-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755177-Styling-Functions)
 *
 * **Dashboard Predefined Config Example**
 *
 * ```ts
 * export default {
 * Dashboard: {
 *   VisibleToolbars: ['Theme', 'Export', 'Layout', 'Chart', 'Application'],
 *   VisibleButtons: ['BulkUpdate', 'CellValidation', 'ConditionalStyle', 'PercentBar'],
 *   ShowGridInfoButton: false,
 *   ShowToolbarsDropdown: false,
 *   DashboardVisibility: 'Minimised',
 *   MinimisedHomeToolbarButtonStyle: {
 *     Variant: 'raised',
 *     Tone: 'accent',
 *   },
 *  }
 * } as PredefinedConfig;
 * ```
 * In this example we have:
 *
 * - set 5 Toolbars to be visible
 *
 * - set 4 Function Buttons to be visible
 *
 * - hidden the GridInfo button
 *
 * - hidden the Toolbars dropdown
 *
 * - set the Dashboard to be minimised at start-up
 *
 * - set how the Home Toolbar minimised button will render
 */
export interface DashboardState extends RunTimeState {
  /**
   * Which toolbars should be available for the user to select to see.
   *
   * Only those toolbars listed here will be selectable
   *
   * If you don't provide any value for this property, then ALL Adaptable Blotter toolbars will be available.
   *
   * **Default Value**:  Empty array
   */
  AvailableToolbars?: AdaptableBlotterDashboardToolbars;

  /**
   * Which toolbars should be visible in the Dasbhoard when the application first loads.
   *
   * Note: If the `AvailableToolbars` property has been set, then the visible toolbars listed here must also be included there.
   *
   * **Default Value**:  'QuickSearch', 'Layout', 'Export', 'ColumnFilter'
   */
  VisibleToolbars?: AdaptableBlotterDashboardToolbars;

  /**
   * Which Function Buttons should be visible in the Home Toolbar Dasbhoard when the application loads.
   *
   * Each button is connected to a Function in the Adaptable Blotter and opens the main popup screen for that Strategy.
   *
   * **Default Value**:  'Dashboard', 'SmartEdit', 'ColumnChooser', 'ConditionalStyle', ''
   */
  VisibleButtons?: AdaptableBlotterFunctionButtons;

  /**
   * How the Dashboard will appear.
   *
   * You can Show / Minimise the Dashboard through the carat button in the top corner of the Home Dashboard.
   *
   * If you want to hide the Dashboard altogether then select 'Hide Dashboard' from the Column Header menu (or 'Show Dashboard' to put it back).
   *
   * **Default Value**:  'Visible'
   */
  DashboardVisibility?: 'Minimised' | 'Visible' | 'Hidden';

  /**
   * Whether to show the System Status button in the Home Toolbar.
   *
   * If 'true' then the button will be visible; clicking the button will open the System Status popup showing any System Status messages.
   *
   * The colour of the button will reflect the `StatusType` of the last System Status message received.
   *
   * **Default Value**:  true
   */
  ShowSystemStatusButton?: boolean;

  /**
   * Whether to show the Grid Info button in the Home Toolbar.
   *
   * If 'true' then the button will be visible; clicking the button will open a Dialog giving details of the Current Grid, version, row count etc.
   *
   * It will also include an Options tab allowing you to see what your Blotter Options are.
   *
   * **Default Value**:  true
   */
  ShowGridInfoButton?: boolean;

  /**
   * Whether to show the Functions dropdown in the Home Toolbar.
   *
   * If 'true' then the dropdown will be visible as the first item (with a 'house' icon).
   *
   * Clicking the button will open a Dropdown listing all the Functions in your `Entitlements`.  Clicking a menu item will open the popup for that Function.
   *
   * **Default Value**:  true
   */
  ShowFunctionsDropdown?: boolean;

  /**
   * Whether to show the Columns dropdown in the Home Toolbar.
   *
   * If 'true' then the dropdown will be visible as the penultimate item in the Home Toolbar.
   *
   * Clicking the button will open a Dropdown listing all the Columns in your grid.  You can click the checkbox to show / hide the column.
   *
   * Note: if you want to move Columns in your Grid then you need to use the `Column Chooser` Function.
   *
   * **Default Value**:  true
   */
  ShowColumnsDropdown?: boolean;

  /**
   * Whether to show the Toolbars dropdown in the Home Toolbar.
   *
   * If 'true' then the dropdown will be visible as the last item in the Home Toolbar.
   *
   * Clicking the button will open a Dropdown listing all the Toolbars available (see the `AvailableToolbars` property).  You can click the checkbox to show / hide the toolbar.
   *
   * Note: if you want to move / reposition the Toolbars in the Dashboard then you need to open the Dashboard Configuration popup.
   *
   * **Default Value**:  true
   */
  ShowToolbarsDropdown?: boolean;

  /**
   * The title of the Home Toolbar - the first toolbar visible.
   *
   * If no value is provided then the Home Toolbar will show the 'blotterId' property in Blotter Options
   *
   * **Default Value**:  'blotterId' property in Blotter Options
   */
  HomeToolbarTitle?: string;

  /**
   * How the Home Toolbar will appear (as a button) when Miminised
   *
   * **Default Value**:   `Variant`: 'outlined', `Tone`: 'neutral',
   */
  MinimisedHomeToolbarButtonStyle?: ButtonStyle;

  /**
   * Sets the title of the Application Toolbar
   *
   * **note: this property is deprecated**  Please use the `ApplicationToolbarTitle` property of Application State instead.
   */
  ApplicationToolbarTitle?: string;
}
