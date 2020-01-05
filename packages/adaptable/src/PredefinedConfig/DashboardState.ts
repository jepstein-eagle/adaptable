import { RunTimeState } from './RunTimeState';
import { ButtonStyle, ToolbarButton } from './Common/ToolbarButton';
import { AdaptableDashboardToolbars, AdaptableFunctionButtons } from './Common/Types';

/**
 * The Predefined Configuration for the Dashboard function
 *
 * The Dashboard is the area above the grid which contains buttons, toolbars and dropdowns.
 *
 * It comprises the 'Home Toolbar' (which hosts Function buttons and various dropdowns) and a range of Function Toolbars.
 *
 * You use the Dashboard State to set which elements are availalbe (and visible) in the Home Toolbar and to select which Function Toolbars are available (and visible).
 *
 *  **Further Adaptable Help Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/dashboard/aggriddashboardtoolbarsdemo/) | [API](_api_dashboardapi_.dashboardapi.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029743092-Dashboard-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360030944511-Dashboard-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755177-Styling-Functions)
 *
 * **Dashboard Predefined Config Example**
 *
 * ```ts
 * export default {
 * Dashboard: {
 *   VisibleToolbars: ['Theme', 'Export', 'Layout', 'Chart'],
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
 *
 *  **Custom Toolbars**
 *
 * The Dashboard State can be supplied with custom toolbars that users can leverage in order populate with their own content.
 *
 * Each Custom Toolbar contains 2 divs (to cater for 2 different scenarios):
 *
 * - a div for you to **render any content that you want**; its your responsibilty to make sure that the div is populated and uses the correct styles.
 *
 * - a div which will **display any buttons that you provide** via the *ToolbarButtons* property of the Application state (see below).
 *
 *
 * **Rendering Bespoke Content**
 *
 * Adaptable provides the [dashboardAPI](_api_dashboardapi_.dasbhoardapi.html) **getCustomToolbarContentsDiv** method that returns the Div in which you should render the contents.
 *
 * You can listen to the **ToolbarVisibilityChanged** event published by Adaptable which provides the name of relevant toolbar and its new visibility.
 *
 * The list of potential values for the Toolbar name are: "AdvancedSearch", "Alert", "BulkUpdate", "CellSummary", "Chart", "ColumnFilter", "DataSource", "Export", "Layout", "SmartEdit", "QuickSearch" and "Theme"
 *
 * **Custom Toolbar Rendering Example** (Using React)
 *
 *  ```ts
 * adaptableApi.eventApi.on('ToolbarVisibilityChanged',
 *  (toolbarVisibilityChangedEventArgs: ToolbarVisibilityChangedEventArgs) => {
 * if (
 *   toolbarVisibilityChangedEventArgs.data[0].id.toolbar === 'myToolbar' &&
 *   toolbarVisibilityChangedEventArgs.data[0].id.visibility == 'Visible'
 * ) {
 *  let toolbarContents: any = (
 *      <div style={{ display: 'flex' }}>
 *       <button
 *          className="ab-SimpleButton ab-SimpleButton--variant-outlined"
 *          onClick={onNewTradeClicked}
 *          style={{ marginRight: '3px' }}
 *        >
 *        Create New Trade
 *        </button>
 *        <select className="ab-Dropdown" style={{ marginRight: '3px' }}>
 *          <option>Book 1</option>
 *          <option>Book 2</option>
 *          <option>Book 3</option>
 *        </select>
 *      </div>
 *    );
 *
 *  ReactDOM.render(
 *    toolbarContents,
 *    adaptableApi.dashboardApi.getCustomToolbarContentsDiv('myToolbar')
 *    );
 *  }
 * });
 *
 *  ......
 * function onNewTradeClicked() {
 *    // react as required...
 *  }
 * ```
 *
 * **Providing Custom Toolbars Through Predefined Config**
 *
 * When defining a Custom Toolbar you provide the name, the title, an (optional) Glyph and any Buttons that it should contain.
 *
 * When one of these buttons is clicked the **ToolbarButtonClicked** event will fire providing details of the button clicked so you can react as necessary.
 *
 * Note: in the intial implementation you can only provide a button name and caption (text that is displayed), but in future releases you will be able to provide images and also to control the rendering and other aspects of these buttons.
 *
 * **Custom Toolbar Predefined Config Example**
 *
 *  ```ts
 * export default {
 * Dashboard: {
 *   VisibleToolbars: ['Toolbar1', 'Layout', 'Toolbar2', 'Export'],
 *   VisibleButtons: ['BulkUpdate', 'CellValidation', 'ConditionalStyle', 'PercentBar'],
 *   CustomToolbars: [
 *     {
 *       Name: 'Toolbar1',
 *       Title: 'First Toolbar',
 *       Glyph: 'advanced-search',
 *       ToolbarButtons: [
 *         {
 *           Name: 'btnSuccess',
 *           Caption: 'Congrats',
 *           ButtonStyle: {
 *             Variant: 'text',
 *             Tone: 'success',
 *           },
 *         },
 *         {
 *           Name: 'btnToolbar1',
 *           Caption: 'Refresh Grid',
 *           ButtonStyle: {
 *             Variant: 'raised',
 *             Tone: 'accent',
 *           },
 *         },
 *       ],
 *     },
 *     {
 *       Name: 'Toolbar2',
 *       Title: 'Second Toolbar',
 *       ToolbarButtons: [
 *         {
 *           Name: 'btnWarning',
 *           Caption: 'Be Careful',
 *           ButtonStyle: {
 *             Variant: 'text',
 *             Tone: 'error',
 *           },
 *         },
 *       ],
 *     },
 *     {
 *       Name: 'Toolbar3',
 *       Title: 'Third Toolbar',
 *       Glyph: 'export',
 *       ToolbarButtons: [
 *         {
 *           Name: 'btnToolbar3',
 *           Caption: 'Send Message',
 *           ButtonStyle: {
 *             Variant: 'raised',
 *             Tone: 'neutral',
 *           },
 *         },
 *       ],
 *     },
 *   ],
 * },
 * } as PredefinedConfig;
 *
 *  ......
 *
 *  adaptableApi.eventApi.on('ToolbarButtonClicked', tolbarButtonClickedEventArgs)  => {
 *      // respond as appropriate - the button argument is the ToolbarButton we provided in the state
 *  });
 * ```
 *
 */
export interface DashboardState extends RunTimeState {
  /**
   * Which toolbars should be available for the user to select to see.
   *
   * Only those toolbars listed here will be selectable
   *
   * If you don't provide any value for this property, then ALL Adaptable toolbars will be available.
   *
   * **Default Value**:  Empty array
   */
  AvailableToolbars?: AdaptableDashboardToolbars;

  /**
   * Which toolbars should be visible in the Dasbhoard when the application first loads.
   *
   * Note: If the `AvailableToolbars` property has been set, then the visible toolbars listed here must also be included there.
   *
   * **Default Value**:  'QuickSearch', 'Layout', 'Export', 'ColumnFilter'
   */
  VisibleToolbars?: AdaptableDashboardToolbars | string[];

  /**
   * Which Function Buttons should be visible in the Home Toolbar Dasbhoard when the application loads.
   *
   * Each button is connected to a Function in Adaptable and opens the main popup screen for that Strategy.
   *
   * **Default Value**:  'Dashboard', 'SmartEdit', 'ColumnChooser', 'ConditionalStyle', ''
   */
  VisibleButtons?: AdaptableFunctionButtons;

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
   * It will also include an Options tab allowing you to see what your Adaptable Options are.
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
   * If no value is provided then the Home Toolbar will show the 'adaptableId' property in Adaptable Options
   *
   * **Default Value**:  `adaptableId` property in Adaptable Options
   */
  HomeToolbarTitle?: string;

  /**
   * How the Home Toolbar will appear (as a button) when Miminised
   *
   * **Default Value**:   `Variant`: 'outlined', `Tone`: 'neutral',
   */
  MinimisedHomeToolbarButtonStyle?: ButtonStyle;

  /**
   * Toolbars provided by the User
   *
   * Each Custom toolbar contains a Name (to identify it) and a Title.
   *
   * It can optionally also contain a Glyph and an array of `ToolbarButton`.
   */
  CustomToolbars?: CustomToolbar[];
}

export interface CustomToolbar {
  Name: string;
  Title: string;
  Glyph?: string;
  /**
   * An array of Toolbar Buttons - each of which is rendered as a button in a Custom Toolbar.
   *
   * When one of these buttons is clicked the on('ToolbarButtonClicked') event is fired.
   */
  ToolbarButtons?: ToolbarButton[];
}
