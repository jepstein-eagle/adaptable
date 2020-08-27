import { ConfigState } from './ConfigState';
import { ButtonStyle, ToolbarButton } from './Common/ToolbarButton';
import { AdaptableDashboardToolbars, AdaptableFunctionButtons } from './Common/Types';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The Predefined Configuration for the Dashboard function
 *
 * The Dashboard is the area above the grid which contains buttons, tabs, toolbars and Quick Search.
 *
 * **Note**: In v.6.1 (March 2020) the Dashboard has been signficantly updated and improved with some previous properties now deprecated.
 *
 * The Dashboard comprises 2 sections:
 *
 * - **Dashboard Header**: contains the Home Dropdown, Function Buttons and Quick Search
 *
 * - **Dashboard Tabs**: named groups of Toolbars
 *
 * You use Dashboard State to set these Tabs and Function Toolbars.
 *
 * You also use Dashboard State to define 2 sets of bespoke items in your Dashboard:
 *
 * - Custom Toolbars that you can then include in your Dashboard Tabs.
 *
 * - Custom Buttons that will alongside the Function buttons in the top left corner of the Dashboard.
 *
 *  --------------
 *
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/dashboard) | [Api](_src_api_dashboardapi_.dashboardapi.html) | [ReadMe](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/Functions/dashboard_function.md)
 *
 *  --------------
 *
 * **Dashboard Predefined Config Example**
 *
 * ```ts
 * export default {
 * Dashboard: {
 *   VisibleButtons: ['GridInfo', 'SystemStatus', 'BulkUpdate'],
 *   CustomToolbars: [
 *          {
 *            Name: 'appToolbar',
 *            Title: 'Trades',
 *            ShowFunctionsDropdown: true,
 *          },
 *        ],
 *   Tabs: [
 *          {
 *            Name: 'Search',
 *            Toolbars: ['QuickSearch', 'DataSource', 'Query'],
 *          },
 *          {
 *            Name: 'Edit',
 *            Toolbars: ['BulkUpdate','SmartEdit'],
 *          },
 *          {
 *            Name: 'Grid',
 *            Toolbars: ['Layout', 'CellSummary', 'SystemStatus', 'appToolbar']
 *          },
 *        ],
 *  CustomButtons: [
 *      {
 *        Name: 'cb1',
 *        Caption: 'First',
 *         ButtonStyle: {
 *          Variant: 'text',
 *          Tone: 'success',
 *        },
 *      },
 *      {
 *       Name: 'cb2',
 *       Caption: 'Second',
 *        ButtonStyle: {
 *          Variant: 'raised',
 *          Tone: 'accent',
 *        },
 *      },
 *    ],
 *  }
 * } as PredefinedConfig;
 *
 * ```
 * In this example we have:
 *
 * - created 3 Dashboard Tabs ('Search', 'Edit' and 'Grid') each with their own Toolbars
 *
 * - created a Custom Toolbar ('appToolbar') and put it in the 'Grid' Tab (and we set it display the Configure button)
 *
 * - set 3 Function Buttons to be visible
 *
 *  --------------
 *
 * **Custom Toolbars**
 *
 * Dashboard State can be supplied with custom toolbars that users can leverage in order to populate them with their own content.
 *
 * Each Custom Toolbar contains 2 divs (to cater for 2 different scenarios):
 *
 * - a div for you to **render any content that you want**; its your responsibilty to make sure that the div is populated and uses the correct styles.
 *
 * - a div which will **display any buttons that you provide** via the *ToolbarButtons* property of the Application state (see below).
 *
 * See [Custom Toolbar](_src_predefinedconfig_dashboardstate_.customtoolbar.html) for full documentation and code examples.
 *
 */
export interface DashboardState extends ConfigState {
  /**
   * A tab is a named group of Toolbars.
   *
   * You can create as many tabs as you want, but please ensure that each Toolbar is only in one tab.
   */
  Tabs?: DashboardTab[];

  /**
   * The index of the Active Tab (in the Tabs collection)
   *
   */
  ActiveTab?: number;

  /**
   * Whether or not the Dashboard can be floated.
   *
   * If set to true (the default) then double-clicking the Dasbhoard will put it in float mode.
   *
   * If set to false then double-clicking is disabled and the floating menu options are removed.
   *
   *  **Default Value: True**
   */
  CanFloat?: boolean;

  /**
   * Whether or not the Dashboard is collapsed.
   *
   * If the Dashboard is collapsed then only the header is visible but not the contents of any tabs.
   *
   *  **Default Value: False**
   */
  IsCollapsed?: boolean;

  /**
   * Whether or not the Dashboard is floating.
   *
   * If the Dashboard is floating then it will appear anywhere you drag it to (in minmised form).
   *
   * Double-click the Dashboard header to revert it to its default position above the grid.
   *
   *  **Default Value: False**
   */
  IsFloating?: boolean;

  /**
   * An alternative way of showing the Dashboard in 'Expanded' view.
   *
   * Instead of a Header and Body it has the headers section to the left of the Toolbars. (Similar to how it was pre Version 6.1)
   *
   * **Default Value: False**
   */
  IsInline?: boolean;

  /**
   * The position of the Dashboard when in 'floating mode'.
   *
   * This property is set by AdapTable and stored so the Dashboard will be in the same position when the grid next starts.
   */
  FloatingPosition?: AdaptableCoordinate;

  /**
   * Toolbars provided by the User
   *
   * Each Custom toolbar contains a Name (to identify it) and a Title.
   *
   * It can optionally also contain a Glyph and an array of `ToolbarButton`.
   */
  CustomToolbars?: CustomToolbar[];

  /**
   * Which Function Buttons should be visible in the Dasbhoard Header when the application loads.
   *
   * Each button is connected to a Function in AdapTable and opens the relevant popup screen.
   *
   * **Default Value**: 'SystemStatus', 'GridInfo', 'Layout', 'ConditionalStyle'
   */
  VisibleButtons?: AdaptableFunctionButtons;

  /**
   * Buttons set by the User at design-time to appear in the top corner of the Dashboard - next to the Visible Function Buttons
   *
   * These buttons - if provided - are always present and cannot be removed at design time.
   *
   * When a button is clicked the `DashboardButtonClicked` event is fired.
   */
  CustomButtons?: ToolbarButton[];

  /**
   * Whether to show the Home dropdown in the Dashboard Header.
   *
   * If 'true' (the default) then the dropdown will be visible as the first item (with a 'house' icon).
   *
   * Clicking the button will open a dropdown listing all the Functions that your `Entitlements` allows.
   *
   * Selecting a menu item in the dropdown will open the associated popup for that Function.
   *
   * **Default Value**: true
   */
  ShowFunctionsDropdown?: boolean;

  /**
   * Whether to show the Quick Search textbox in the Dashboard Header.
   *
   * If 'true' (the default) then the textbox will be visible.
   *
   * **Default Value**: true
   */
  ShowQuickSearchInHeader?: boolean;

  /**
   * The 'title' to display in the the Dashboard Header
   *
   * If no value is provided then it will display the value of the 'adaptableId' property in Adaptable Options
   *
   * Note: It is called `HomeToolbarTitle` for backward compatibiility
   *
   * **Default Value**: the `adaptableId` property in Adaptable Options
   */
  HomeToolbarTitle?: string;

  /**
   * *Depracated Property; instead create Tabs which include a `Toolbars` property*
   *
   * Note: in 6.1 any VisibleToolbars will be automatically added to a new Tab (which can then be edited by you)
   */
  VisibleToolbars?: AdaptableDashboardToolbars | string[];

  /**
   * *Depracated Property; instead any toolbar for an 'entitled' Function is available*
   */
  AvailableToolbars?: AdaptableDashboardToolbars;

  /**
   * *Depracated Property; instead select columns through the Column Chooser*
   */
  ShowColumnsDropdown?: boolean;

  /**
   * *Depracated Property; instead select toolbars and tabs through configuring the Dashboard*
   */
  ShowToolbarsDropdown?: boolean;

  /**
   * *Depracated Property*
   */
  MinimisedHomeToolbarButtonStyle?: ButtonStyle;

  /**
   * *Depracated Property; instead use the `IsCollapsed` and `IsFloating` properties*
   */
  DashboardVisibility?: 'Minimised' | 'Visible' | 'Hidden';

  /**
   * *Depracated Property; instead please make sure that 'SystemStatus' is included in the Visible Buttons collection*
   */
  ShowSystemStatusButton?: boolean;

  /**
   * *Depracated Property; instead please make sure that 'GridInfo' is included in Visible Buttons collection*
   */
  ShowGridInfoButton?: boolean;
}

/**
 * Custom toolbars enable users to populate toolbars with their own content which AdapTable will manage.
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
 * AdapTable provides the [dashboardApi](_src_api_dashboardapi_.dashboardapi.html#getcustomtoolbarcontentsdiv) **getCustomToolbarContentsDiv** method that returns the Div in which you should render the contents.
 *
 * You can listen to the **ToolbarVisibilityChanged** event published by AdapTable which provides the name of relevant toolbar (and the Tab in which it is contained).
 *
 * The list of potential values for the Toolbar name are: "Alert", "BulkUpdate", "CellSummary", "Chart", "ColumnFilter", "DataSource", "Export", "Layout", "SmartEdit", "Query", "QuickSearch" and "Theme"
 *
 * **Custom Toolbar Rendering Example** (Using React)
 *
 *  ```ts
 * adaptableApi.eventApi.on('ToolbarVisibilityChanged',
 *  (toolbarVisibilityChangedEventArgs: ToolbarVisibilityChangedEventArgs) => {
 * if (
 *   toolbarVisibilityChangedEventArgs.data[0].id.toolbar === 'myToolbar'
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
 *   VisibleButtons: ['BulkUpdate', 'CellValidation', 'ConditionalStyle', 'PercentBar'],
 *   CustomToolbars: [
 *     {
 *       Name: 'Toolbar1',
 *       Title: 'First Toolbar',
 *       ShowConfigureButton: true,
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
 */
export interface CustomToolbar extends AdaptableObject {
  /**
   * The name of the Toolbar
   *
   * This is how it will be referred to in the Dashboard Popup when managing toolbars
   *
   * It is **not** the name that will appear in the Toolbar itself when displayed - that is the `Title` property.
   */
  Name: string;

  /**
   * The title which will appear in the Toolbar when its displayed
   *
   * If not set (or set to an empty string) then no title will appear in the Toolbar
   */
  Title?: string;

  /**
   * An array of Toolbar Buttons - each of which is rendered as a button in a Custom Toolbar.
   *
   * When one of these buttons is clicked the on('ToolbarButtonClicked') event is fired.
   */
  ToolbarButtons?: ToolbarButton[];

  /**
   * Whether to show a Configure button at the bottom of the Custom Toolbar
   *
   * If set to true the wrench image will appear.
   *
   * When the button is clicked AdapTable will fire the `CustomToolbarConfigured` event.
   */
  ShowConfigureButton?: boolean;

  /**
   * An (optional) Glyph to display in the Custom Toolbar
   *
   * Since V.6 (Feb 2020) **this property has been deprecated** and is no longer used or applied
   */
  Glyph?: string;
}

export interface DashboardTab extends AdaptableObject {
  Name: string;
  Toolbars: AdaptableDashboardToolbars | string[];
  // changed this from
  /// Toolbars: (AdaptableDashboardToolbar | string)[];
}

export interface AdaptableCoordinate extends AdaptableObject {
  x: number;
  y: number;
}
